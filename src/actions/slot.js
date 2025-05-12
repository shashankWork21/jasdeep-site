"use server";

import { db } from "@/db";
import { google } from "googleapis";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { Scope, SlotStatus } from "@/generated/prisma/client";
import { validateSession } from "./auth";
import { redirect } from "next/navigation";
import { verifySlotInformation } from "@/utils/slots.utils";

export async function getSlotsByDate(start, end) {
  const slots = await db.slot.findMany({
    where: {
      start: {
        gte: new Date(start),
        lte: new Date(end),
      },
    },
  });
  return slots;
}

export async function getUpcomingSlots() {
  const { user } = await validateSession();
  if (!user) {
    redirect("/");
  }
  const slots = await db.slot.findMany({
    where: {
      start: {
        gte: new Date(),
      },
      professionalId: user.id,
    },
    include: { professional: true },
  });
  return slots;
}

export async function getSlotById(id) {
  const slot = await db.slot.findUnique({
    where: { id },
    include: { professional: true },
  });
  if (!slot) {
    return { errors: { _form: ["Slot not found"] } };
  }
  return slot;
}

export async function createSlot(data, formState, formData) {
  try {
    const { start, end, professional } = data;
    const description = formData.get("description") || "";
    const userName = formData.get("name") || "";
    const userEmail = formData.get("email") || "";
    const title = `${userName} <> ${professional.firstName}, Discovery Call`;
    const parseResult = verifySlotInformation(userName, userEmail, description);
    if (!parseResult.success) {
      {
        return {
          errors: parseResult.errors,
          success: false,
        };
      }
    }
    const slot = await db.slot.create({
      data: {
        start,
        end,
        professionalId: data.professional.id,
        status: SlotStatus.PENDING,
        userName,
        userEmail,
        title,
        description,
      },
    });

    revalidatePath("/admin/discovery-calls");
    revalidatePath(`/calendar`);

    try {
      const authClient = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`
      );

      const calendar = google.calendar({
        version: "v3",
        auth: process.env.CALENDAR_API_KEY,
      });

      const token = professional.tokens.find((token) =>
        token.scopes.includes(Scope.CALENDAR)
      );

      authClient.setCredentials({
        access_token: token.accessToken,
        refresh_token: token.refreshToken || "",
      });

      const calendarInvite = await calendar.events.insert({
        calendarId: "primary",
        auth: authClient,
        sendNotifications: true,
        sendUpdates: "all",
        conferenceDataVersion: 1,
        requestBody: {
          summary: title,
          description,
          start: {
            dateTime: new Date(start).toISOString(),
            timeZone: "Asia/Kolkata",
          },
          end: {
            dateTime: new Date(end).toISOString(),
            timeZone: "Asia/Kolkata",
          },
          conferenceData: {
            createRequest: {
              requestId: `${crypto.randomBytes(16).toString("hex")}-${crypto
                .randomBytes(12)
                .toString("hex")}`,
            },
          },
          creator: {
            email: professional.email,
            self: true,
          },

          attendees: [
            {
              email: userEmail,
              organizer: false,
              responseStatus: "accepted",
            },
            {
              email: professional.email,
              organizer: true,
              responseStatus: "accepted",
            },
          ],
        },
      });

      await db.slot.update({
        where: { id: slot.id },
        data: {
          status: SlotStatus.CONFIRMED,
          meetingLink: calendarInvite.data.hangoutLink || "",
          eventId: calendarInvite.data.id || "",
        },
      });
      revalidatePath("/admin/discovery-calls");
      revalidatePath(`/calendar`);
    } catch (error) {
      console.log(error);
      return {
        errors: {
          _form: [
            `Event has been created but not added to your calendar. Please contact ${professional.firstName} ${professional.lastName} for more details`,
          ],
        },
      };
    }
    return { success: true, errors: {} };
  } catch (error) {
    console.log(error);
    return { errors: { _form: ["Something went wrong"] } };
  }
}

export async function modifySlot(data, formState, formData) {
  try {
    await db.slot.update({
      where: { id: data.id },
      data: {
        start: data.start,
        end: data.end,
        description: formData.get("description") || "",
        summary: data.summary,
      },
    });
    return { success: true, errors: {} };
  } catch (error) {
    return { error: error.message };
  }
}

export async function cancelSlotBooking(id) {
  const slot = await db.slot.findUnique({
    where: { id },
    include: { professional: { include: { tokens: true } } },
  });

  if (!slot) {
    return { errors: { _form: ["Slot not found"] } };
  }
  if (slot.status === SlotStatus.COMPLETED) {
    return { errors: { _form: ["Slot is completed"] } };
  }
  if (slot.status === SlotStatus.CANCELLED) {
    return { errors: { _form: ["Slot is already cancelled"] } };
  }
  try {
    const authClient = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`
    );
    const calendar = google.calendar({
      version: "v3",
      auth: process.env.CALENDAR_API_KEY,
    });
    const token = slot.professional.tokens.find((token) =>
      token.scopes.includes(Scope.CALENDAR)
    );

    authClient.setCredentials({
      access_token: token?.accessToken,
      refresh_token: token?.refreshToken || "",
    });

    await calendar.events.delete({
      calendarId: "primary",
      eventId: slot.eventId,
      auth: authClient,
      sendUpdates: "all",
    });

    await db.slot.update({
      where: { id },
      data: { status: SlotStatus.CANCELLED },
    });
    revalidatePath("/admin/discovery-calls");
    revalidatePath(`/calendar`);
    return {
      success: true,
      errors: {},
    };
  } catch (error) {
    console.log(error);
    await db.slot.update({
      where: { id },
      data: { status: SlotStatus.CANCELLED },
    });
    revalidatePath("/admin/discovery-calls");
    revalidatePath(`/calendar`);
    return { error: error.message };
  }
}

export async function completeSlots(user) {
  const slots = await db.slot.findMany({
    where: {
      status: SlotStatus.SCHEDULED,
      endTime: { lte: new Date() },
      OR: [{ coachId: user.id }, { studentId: user.id }],
    },
  });
  for (const slot of slots) {
    await db.slot.update({
      where: { id: slot.id },
      data: { status: SlotStatus.COMPLETED },
    });
  }
}

export async function addExistingEventsToCalendar(user) {
  const token = user?.tokens?.find((token) =>
    token.scopes.includes(Scope.CALENDAR)
  );

  if (!token) {
    return {
      message:
        "Either calendar access is not granted, or it's revoked. Please go to the calendar tab and re-authorize",
      success: false,
    };
  }
  const authClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`
  );

  authClient.setCredentials({
    access_token: token?.accessToken,
    refresh_token: token?.refreshToken || "",
  });

  const calendar = google.calendar({
    version: "v3",
    auth: process.env.CALENDAR_API_KEY,
  });

  const slots = await db.slot.findMany({
    where: { professionalId: user.id, eventId: null },
    include: { professional: true },
  });

  if (!slots.length) {
    return {
      message: "No new slots need to be added to the calendar",
      success: true,
    };
  }

  for (const slot of slots) {
    try {
      const calendarInvite = await calendar.events.insert({
        calendarId: "primary",
        auth: authClient,
        sendUpdates: "all",
        conferenceDataVersion: 1,
        requestBody: {
          summary: slot.title,
          description: slot.description,
          start: {
            dateTime: new Date(slot.start).toISOString(),
            timeZone: "Asia/Kolkata",
          },
          end: {
            dateTime: new Date(slot.end).toISOString(),
            timeZone: "Asia/Kolkata",
          },
          conferenceData: {
            createRequest: {
              requestId: `${crypto.randomBytes(16).toString("hex")}-${crypto
                .randomBytes(12)
                .toString("hex")}`,
            },
          },
          creator: {
            email: user.email,
            self: true,
          },
          attendees: [
            {
              email: slot.userEmail,
              organizer: false,
              responseStatus: "accepted",
            },
            {
              email: user.email,
              organizer: true,
              responseStatus: "accepted",
            },
          ],
        },
      });

      await db.slot.update({
        where: { id: slot.id },
        data: {
          meetingLink: calendarInvite.data.hangoutLink || "",
          eventId: calendarInvite.data.id || "",
        },
      });
      revalidatePath("/admin/discovery-calls");
      revalidatePath(`/calendar`);
      return {
        message:
          "Added all events to google calendar successfully. Please refresh the page to see the meeting links",
        success: true,
      };
    } catch (error) {
      console.log(error);
      // await db.token.deleteMany({
      //   where: { userId: user.id, scopes: { hasSome: [Scope.CALENDAR] } },
      // });
      return {
        message:
          "Something went wrong while adding slots to calendar. Please try authorizing again",
        success: false,
      };
    }
  }
}

export async function deleteSlots() {
  const slots = await db.slot.deleteMany({
    where: {},
  });
  revalidatePath("/admin/discovery-calls");
  revalidatePath(`/calendar`);
  return { errors: [], success: true };
}

export default async function rescheduleSlot(slotId, newSlot) {
  const slot = await db.slot.findUnique({
    where: { id: slotId },
    include: {
      professional: {
        include: { tokens: true },
      },
    },
  });
  if (!slot) {
    return { errors: { _form: ["Slot not found"] } };
  }
  if (slot.status === SlotStatus.COMPLETED) {
    return { errors: { _form: ["Slot is completed"] } };
  }
  if (slot.status === SlotStatus.CANCELLED) {
    return { errors: { _form: ["Slot is already cancelled"] } };
  }
  const token = slot.professional.tokens?.find((token) =>
    token.scopes.includes(Scope.CALENDAR)
  );
  if (!token) {
    return { errors: { _form: ["Calendar access not granted"] } };
  }
  const authClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`
  );
  authClient.setCredentials({
    access_token: token.accessToken,
    refresh_token: token.refreshToken || "",
  });
  const calendar = google.calendar({
    version: "v3",
    auth: process.env.CALENDAR_API_KEY,
  });
  try {
    await calendar.events.update({
      calendarId: "primary",
      eventId: slot.eventId,
      auth: authClient,
      sendUpdates: "all",
      requestBody: {
        summary: slot.title,
        description: slot.description,
        start: {
          dateTime: new Date(newSlot.start).toISOString(),
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: new Date(newSlot.end).toISOString(),
          timeZone: "Asia/Kolkata",
        },
        conferenceData: {
          createRequest: {
            requestId: `${crypto.randomBytes(16).toString("hex")}-${crypto
              .randomBytes(12)
              .toString("hex")}`,
          },
        },
        attendees: [
          {
            email: slot.userEmail,
            organizer: false,
            responseStatus: "accepted",
          },
          {
            email: slot.professional.email,
            organizer: true,
            responseStatus: "accepted",
          },
        ],
      },
    });
    await db.slot.update({
      where: { id: slotId },
      data: {
        start: new Date(newSlot.start),
        end: new Date(newSlot.end),
      },
    });
    revalidatePath("/admin/discovery-calls");
    revalidatePath(`/calendar`);
    return {
      success: true,
      errors: {},
      message: "Slot rescheduled successfully",
    };
  } catch (error) {
    return {
      errors: { _form: ["Something went wrong"] },
      success: false,
      message: error.message,
    };
  }
}

export async function deleteSlotById(id) {
  await db.slot.delete({
    where: { id },
  });
  revalidatePath("/admin/discovery-calls");
  revalidatePath(`/calendar`);
  return { errors: [], success: true };
}
