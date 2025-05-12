import { z } from "zod";
import { dateDisplay } from "./calendar.util";

export function getAvailableSlots(
  month,
  year,
  unavailableSlots,
  slotLength,
  startTime,
  endTime,
  workingDays,
  holidays,
  breakBetweenSlots = 0
) {
  const now = new Date();
  const monthStart =
    now.getMonth() === month && now.getFullYear() === year
      ? now.getDate() + 1
      : 1;
  const startHour = startTime.getHours();
  const startMinute = startTime.getMinutes();
  const endHour = endTime.getHours();

  const startTimestamp = new Date(
    year,
    month,
    monthStart,
    startHour,
    startMinute
  );

  const endTimestamp = new Date(
    startTimestamp.getTime() + slotLength * 60 * 1000
  );

  const availableSlots = [];

  while (endTimestamp.getMonth() === month) {
    if (
      !workingDays.includes(startTimestamp.getDay()) ||
      holidays.some(
        (holiday) => dateDisplay(holiday) === dateDisplay(startTimestamp)
      )
    ) {
      startTimestamp.setDate(startTimestamp.getDate() + 1);
      endTimestamp.setDate(endTimestamp.getDate() + 1);
      continue;
    }
    const isUnavailable = unavailableSlots.some((slot) => {
      if (
        slot.start.getTime() <= startTimestamp.getTime() &&
        slot.end.getTime() >= startTimestamp.getTime()
      )
        return true;
      if (
        slot.start.getTime() <= endTimestamp.getTime() &&
        slot.end.getTime() >= endTimestamp.getTime()
      )
        return true;
      if (
        slot.start.getTime() <= startTimestamp.getTime() &&
        slot.end.getTime() >= endTimestamp.getTime()
      )
        return true;
      if (
        slot.start.getTime() >= startTimestamp.getTime() &&
        slot.end.getTime() <= endTimestamp.getTime()
      )
        return true;
      return false;
    });
    if (!isUnavailable) {
      availableSlots.push({
        start: new Date(startTimestamp),
        end: new Date(endTimestamp),
      });
    }
    startTimestamp.setMinutes(
      startTimestamp.getMinutes() + slotLength + breakBetweenSlots
    );
    endTimestamp.setMinutes(
      endTimestamp.getMinutes() + slotLength + breakBetweenSlots
    );

    if (startTimestamp.getHours() >= endHour) {
      startTimestamp.setDate(startTimestamp.getDate() + 1);
      startTimestamp.setHours(startTime.getHours());
      startTimestamp.setMinutes(startTime.getMinutes());
      endTimestamp.setDate(endTimestamp.getDate() + 1);
      endTimestamp.setHours(startTime.getHours());
      endTimestamp.setMinutes(startTime.getMinutes() + slotLength);
    }
  }

  return availableSlots;
}

export function getUnavailableDates(month, year, availableSlots) {
  const now = new Date();
  const startDay =
    now.getMonth() === month && now.getFullYear() === year
      ? now.getDate() + 1
      : 1;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const unavailableDates = [];

  for (let day = startDay; day <= daysInMonth; day++) {
    const dayDate = new Date(year, month, day);

    const hasSlotsForDay = availableSlots.some((slot) => {
      const slotDate = slot.start;
      return (
        slotDate.getDate() === day &&
        slotDate.getMonth() === month &&
        slotDate.getFullYear() === year
      );
    });

    // If no slots available for this day, add it to unavailable dates
    if (!hasSlotsForDay) {
      unavailableDates.push(new Date(year, month, day));
    }
  }

  return unavailableDates;
}

export function findNextAvailableDate(currentAvailableSlots) {
  if (!currentAvailableSlots || currentAvailableSlots.length === 0) {
    return null;
  }

  // Sort slots by start time
  const sortedSlots = [...currentAvailableSlots].sort(
    (a, b) => a.start.getTime() - b.start.getTime()
  );

  // Return the date of the first available slot
  return sortedSlots[0].start;
}

export function verifySlotInformation(name, email, description) {
  const slotInformationSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    description: z.string().optional(),
  });
  const result = slotInformationSchema.safeParse({
    name,
    email,
    description,
  });
  const errors = result.success ? {} : result.error.flatten().fieldErrors;
  return {
    success: result.success,
    errors,
  };
}
