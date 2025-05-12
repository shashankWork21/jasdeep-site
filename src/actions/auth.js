"use server";

import { db } from "@/db";
import { getUserFromSession } from "@/utils/auth.utils";
import { google } from "googleapis";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function validateSession() {
  try {
    return await getUserFromSession();
  } catch (error) {
    console.log(error);
    redirect("/");
  }
}
export async function validateSessionWithoutRedirect() {
  try {
    return await getUserFromSession();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSessions(userId) {
  const now = new Date();
  try {
    await db.session.deleteMany({
      where: {
        userId,
        expiresAt: {
          lte: now,
        },
      },
    });
  } catch (error) {
    redirect("/");
  }
}

export async function deleteUsers() {
  const users = await db.user.findMany({ include: { tokens: true } });
  for (const user of users) {
    const authClient = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`
    );
    for (const token of user.tokens) {
      authClient.setCredentials({
        access_token: token.accessToken,
        refresh_token: token.refreshToken || "",
      });
      authClient.revokeToken(token.accessToken);
      if (token.refreshToken) {
        authClient.revokeToken(token.refreshToken);
      }
    }
    await db.user.delete({ where: { id: user.id } });
  }
  await db.session.deleteMany({});
  await db.token.deleteMany({});
  console.log("All users deleted");
}

export async function logout() {
  try {
    const c = await cookies();
    const sessionToken = c.get("session")?.value || "";
    const session = jwt.verify(sessionToken, process.env.SESSION_SECRET);
    await db.session.delete({
      where: { id: session.id },
    });
    c.delete("session");
  } catch (error) {
    console.log(error);
  }
  redirect("/");
}

export async function revokeTokens(formState, formData) {
  try {
    const c = await cookies();
    const tokens = await db.token.findMany();
    for (const token of tokens) {
      const authClient = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`
      );
      authClient.setCredentials({
        access_token: token.accessToken,
        refresh_token: token.refreshToken || "",
      });
      authClient.revokeToken(token.accessToken);
      if (token.refreshToken) {
        authClient.revokeToken(token.refreshToken);
      }
      await db.token.delete({ where: { id: token.id } });
    }
    c.delete("session");
    redirect("/admin");
  } catch (error) {
    console.log(error);
    return {
      errors: { _form: ["An error occurred. Please try again."] },
      success: false,
    };
  }
}

export async function revokeCalendarToken(formState) {
  try {
    const user = await getUserFromSession();

    if (!user) {
      return { success: false, errors: ["User not authenticated"] };
    }

    const calendarTokens = await db.token.findMany({
      where: {
        userId: user.id,
        scopes: { hasSome: ["CALENDAR"] },
      },
    });
    console.log("Calendar tokens:", calendarTokens);

    for (const token of calendarTokens) {
      // Revoke with Google
      const authClient = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`
      );

      authClient.setCredentials({
        access_token: token.accessToken,
        refresh_token: token.refreshToken || "",
      });
      authClient.revokeToken(token.accessToken);
      if (token.refreshToken) {
        authClient.revokeToken(token.refreshToken);
      }
      await db.token.delete({ where: { id: token.id } });
    }
  } catch (error) {
    console.error("Error revoking calendar tokens:", error);
    return { success: false, errors: [error.message] };
  }
  revalidatePath("/admin/discovery-calls");
  return { success: true, errors: [] };
}
