import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  getMonth,
  getYear,
  setMonth,
  setYear,
  eachDayOfInterval,
  addYears,
  subYears,
} from "date-fns";

export function getDaysInMonth(date) {
  const firstDay = startOfMonth(date);
  const lastDay = endOfMonth(date);
  const days = eachDayOfInterval({ start: firstDay, end: lastDay });

  const dayOfWeek = firstDay.getDay();
  const prevDays = [];
  for (let i = dayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(firstDay);
    prevDate.setDate(prevDate.getDate() - (i + 1));
    prevDays.push({ date: prevDate, isCurrentMonth: false });
  }

  const currentDays = days.map((day) => ({
    date: day,
    isCurrentMonth: true,
  }));

  const lastDayOfWeek = lastDay.getDay();
  const nextDays = [];
  for (let i = 1; i < 7 - lastDayOfWeek; i++) {
    const nextDate = new Date(lastDay);
    nextDate.setDate(nextDate.getDate() + i);
    nextDays.push({ date: nextDate, isCurrentMonth: false });
  }

  return [...prevDays, ...currentDays, ...nextDays];
}

export function isInRange(date, isRange, startDate, endDate) {
  if (!isRange || !startDate || !endDate) return false;
  return isWithinInterval(date, { start: startDate, end: endDate });
}

export function isDateDisabled(date, disabledDates) {
  return disabledDates.some((disabledDate) =>
    isSameDay(new Date(disabledDate), date)
  );
}

export function areAllDaysDisabled(date, disabledDates) {
  const days = getDaysInMonth(date);
  const currentMonthDays = days.filter((day) => day.isCurrentMonth);
  return currentMonthDays.every((day) =>
    isDateDisabled(day.date, disabledDates)
  );
}

// Check if a date is in the past
export function isDateInPast(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0); // Normalize to start of day
  return compareDate < today;
}

// Check if a month/year combination is in the past
export function isMonthInPast(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day
  return (
    date.getFullYear() < today.getFullYear() ||
    (date.getFullYear() === today.getFullYear() &&
      date.getMonth() < today.getMonth())
  );
}
