"use server";

import { unstable_cache } from "next/cache";
import { Scope } from "@/generated/prisma/client";
import { google } from "googleapis";
import { getProfessional } from "./professional";

async function fetchCalendarEvents(start, end) {
  const user = await getProfessional();
  const token = user.tokens.find((token) =>
    token.scopes.includes(Scope.CALENDAR)
  );

  if (!token) {
    return [];
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

  try {
    const events = await calendar.events.list({
      calendarId: "primary",
      auth: authClient,
      timeMin: start,
      timeMax: end,
      singleEvents: true,
      orderBy: "startTime",
    });

    return events.data.items.map((item) => ({
      start: item.start.dateTime || item.start.date,
      end: item.end.dateTime || item.end.date,
    }));
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return [];
  }
}

export async function getCalendarEvents(start, end) {
  const cacheKey = `calendar-events-${start}-${end}`;

  return unstable_cache(
    async () => fetchCalendarEvents(start, end),
    [cacheKey],
    {
      revalidate: 1,
      tags: ["calendar"],
    }
  )();
}
