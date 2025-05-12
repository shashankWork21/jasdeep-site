"use server";

import { db } from "@/db";

export async function getProfessional() {
  return await db.user.findFirst({
    where: {},
    include: { tokens: true, schedule: true },
  });
}
