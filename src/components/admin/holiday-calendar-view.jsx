"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function HolidayCalendarView({
  holidays = [],
  onClose,
  initialMonth = new Date(),
}) {
  const [calendarMonth, setCalendarMonth] = useState(initialMonth);

  // Get start and end of current month
  const monthStart = startOfMonth(calendarMonth);
  const monthEnd = endOfMonth(calendarMonth);

  // Generate dates for the month
  const daysInMonth = [];
  let currentDate = new Date(monthStart);

  // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  const startDay = monthStart.getDay();

  // Add empty slots for days before the start of the month
  for (let i = 0; i < startDay; i++) {
    daysInMonth.push({ date: null, isCurrentMonth: false });
  }

  // Add all days in the month
  while (currentDate <= monthEnd) {
    daysInMonth.push({
      date: new Date(currentDate),
      isCurrentMonth: true,
      isHoliday: holidays.some((holiday) =>
        isSameDay(new Date(holiday), currentDate)
      ),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Navigate to previous month
  const goToPrevMonth = () => {
    setCalendarMonth((prevMonth) => subMonths(prevMonth, 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCalendarMonth((prevMonth) => addMonths(prevMonth, 1));
  };

  return (
    <div className="mt-3 bg-bone-900 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPrevMonth}
          className="p-1 rounded hover:bg-bone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-bone"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>

        <h4 className="font-medium text-lg">
          {format(calendarMonth, "MMMM yyyy")}
        </h4>

        <button
          onClick={goToNextMonth}
          className="p-1 rounded hover:bg-bone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-bone"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>

        <button
          onClick={onClose}
          className="ml-auto text-bone-400 hover:text-bone-200 transition-colors focus:outline-none focus:ring-2 focus:ring-bone p-1 rounded-full"
          aria-label="Close calendar view"
        >
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium py-1 text-bone-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={`
              h-10 w-full flex items-center justify-center text-sm rounded
              ${
                !day.date
                  ? ""
                  : day.isHoliday
                  ? "bg-bone-400 text-black font-medium"
                  : "text-bone-200 hover:bg-bone-800"
              }
            `}
          >
            {day.date ? format(day.date, "d") : ""}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center text-xs text-bone-400">
        {holidays.length
          ? `${holidays.length} holiday${
              holidays.length !== 1 ? "s" : ""
            } selected`
          : "No holidays selected"}
      </div>
    </div>
  );
}
