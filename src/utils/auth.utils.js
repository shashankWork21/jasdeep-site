"use server";

import { db } from "@/db";
import { google } from "googleapis";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function validateGoogleTokens(tokens, now) {
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
    const { expiry_date } = await authClient.getTokenInfo(token.accessToken);
    if (expiry_date < now.getTime()) {
      if (token.refreshToken) {
        try {
          await authClient.refreshAccessToken();
          await db.token.update({
            where: { id: token.id },
            data: { accessToken: authClient.credentials.access_token },
          });
        } catch (error) {
          await db.token.delete({ where: { id: token.id } });
        }
      }
    }
  }
}

export async function getUserFromSession() {
  try {
    const c = await cookies();
    const sessionToken = c.get("session")?.value || "";
    const now = new Date();
    const sessionObject = jwt.verify(sessionToken, process.env.SESSION_SECRET);
    const session = await db.session.findUnique({
      where: { id: sessionObject.id },
      include: {
        user: {
          include: {
            tokens: true,
            schedule: true,
          },
        },
        tokens: true,
      },
    });
    if (!session) {
      throw new Error("Session not found");
    }
    const tokens = session.tokens;
    await validateGoogleTokens(tokens, now);
    if (Math.abs(session.expiresAt.getTime() - now.getTime()) < 10000) {
      await db.session.update({
        where: { id: session.id },
        data: {
          expiresAt: new Date(now.getTime() + 2 * 60 * 60 * 1000),
        },
      });
    }
    return { session, user: session.user };
  } catch (error) {
    console.log(error);
    return {
      session: null,
      user: null,
    };
  }
}
