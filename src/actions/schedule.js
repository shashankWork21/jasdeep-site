"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getSchedule(professionalId) {
  const schedule = await db.schedule.findFirst({
    where: { professionalId },
    include: {
      professional: true,
    },
  });
  return schedule;
}

export async function createSchedule(data, formState, formData) {
  const slotLength = parseInt(formData.get("slotLength"));
  const breakBetweenSlots = parseInt(formData.get("breakBetweenSlots"));
  if (slotLength < 15) {
    return {
      errors: { slotLength: ["Session Duration must be at least 15 minutes"] },
      success: false,
    };
  }
  try {
    await db.schedule.create({
      data: {
        daysOfWeek: data.daysOfWeek,
        slotLength,
        breakBetweenSlots,
        startTime: data.startTime,
        endTime: data.endTime,
        professionalId: data.professionalId,
        holidays: data.holidays || [],
      },
    });
  } catch (error) {
    console.log(error);
    return {
      errors: { _form: ["Something went wrong, try again"] },
      success: false,
    };
  }
  revalidatePath("/admin/schedule");
  if (data.redirect) {
    redirect("/admin");
  }
  return { errors: {}, success: true };
}

export async function updateSchedule(id, data, formState, formData) {
  try {
    await db.schedule.update({
      where: { id },
      data: {
        daysOfWeek: data.daysOfWeek,
        slotLength: parseInt(formData.get("slotLength")),
        breakBetweenSlots: parseInt(formData.get("breakBetweenSlots")),
        startTime: data.startTime,
        endTime: data.endTime,
        holidays: data.holidays,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      errors: { _form: ["Something went wrong, try again"] },
      success: false,
    };
  }
  revalidatePath("/admin/schedule");
  return { errors: {}, success: true };
}
