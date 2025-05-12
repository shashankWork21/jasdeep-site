"use client";

import { updateSchedule } from "@/actions/schedule";
import CoachScheduleForm from "./admin-schedule-form";
import HolidayCalendarView from "./holiday-calendar-view";
import { daysOfWeek, timeDisplay } from "@/utils/calendar.util";
import {
  CalendarDays,
  Clock,
  Phone,
  CalendarIcon,
  PencilIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { format, isSameMonth, isSameDay } from "date-fns";

export default function ScheduleDisplay({ schedule, edit, setEdit }) {
  const [showCalendarView, setShowCalendarView] = useState(false);
  const defaultValues = {
    daysOfWeek: schedule.daysOfWeek,
    slotLength: schedule.slotLength,
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    holidays: schedule.holidays,
    breakBetweenSlots: schedule.breakBetweenSlots,
  };

  // Group holidays into date ranges for cleaner display
  const holidayRanges = useMemo(() => {
    if (!schedule.holidays.length) return [];

    // Sort holidays by date
    const sortedHolidays = [...schedule.holidays].sort((a, b) => a - b);

    // Group into ranges
    const ranges = [];
    let rangeStart = sortedHolidays[0];
    let rangeEnd = sortedHolidays[0];

    for (let i = 1; i < sortedHolidays.length; i++) {
      const current = sortedHolidays[i];
      const prev = sortedHolidays[i - 1];

      // If dates are consecutive (1 day apart)
      if (current.getTime() - prev.getTime() === 86400000) {
        rangeEnd = current;
      } else {
        // End of a range, start a new one
        ranges.push({ start: rangeStart, end: rangeEnd });
        rangeStart = current;
        rangeEnd = current;
      }
    }

    // Add the final range
    ranges.push({ start: rangeStart, end: rangeEnd });
    return ranges;
  }, [schedule.holidays]);

  // Group holidays by month
  const holidaysByMonth = useMemo(() => {
    if (!schedule.holidays.length) return {};

    return schedule.holidays.reduce((acc, date) => {
      const monthKey = format(date, "MMMM yyyy");
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(date);
      return acc;
    }, {});
  }, [schedule.holidays]);

  const scheduleDisplay = (
    <div className="flex flex-col gap-6 mt-5 container lg:w-3/5 xl:w-2/5 mx-auto bg-white py-6 px-8 rounded-lg shadow-md">
      {/* Header with title and edit button */}
      <div className="flex flex-row items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-bold">Your Schedule</h2>
        <button
          className="px-4 py-2 bg-bone text-black rounded-lg shadow-md hover:bg-bone-600 transition-colors flex items-center gap-1 cursor-pointer"
          onClick={() => setEdit(true)}
        >
          <PencilIcon size={16} />
          <span>Edit</span>
        </button>
      </div>

      {/* Two-column grid layout */}
      <div className="grid grid-cols-12 gap-y-6">
        {/* Working Days Section */}
        <div className="col-span-12 sm:col-span-4 flex items-center">
          <CalendarDays className="text-bone-400 mr-2" size={20} />
          <h3 className="text-lg font-medium">Working Days</h3>
        </div>
        <div className="col-span-12 sm:col-span-8 flex flex-wrap gap-2">
          {daysOfWeek.map((day) => {
            const isWorkingDay = schedule.daysOfWeek.includes(day.value);
            return (
              <div
                key={day.value}
                className={`px-3 py-1 rounded-md ${
                  isWorkingDay
                    ? "bg-bone text-black"
                    : "bg-bone-800 text-bone-400 opacity-60"
                }`}
              >
                {day.name}
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="col-span-12 border-b my-1"></div>

        {/* Timings Section */}
        <div className="col-span-12 sm:col-span-4 flex items-center">
          <Clock className="text-bone-400 mr-2" size={20} />
          <h3 className="text-lg font-medium">Timings</h3>
        </div>
        <div className="col-span-12 sm:col-span-8 flex flex-col sm:flex-row gap-3">
          <div className="bg-bone-800 rounded-md px-3 py-2">
            <span className="text-bone-200">Start: </span>
            <span className="font-medium">
              {timeDisplay({
                hours: schedule.startTime.getHours(),
                minutes: schedule.startTime.getMinutes(),
              })}
            </span>
          </div>
          <div className="bg-bone-800 rounded-md px-3 py-2">
            <span className="text-bone-200">End: </span>
            <span className="font-medium">
              {timeDisplay({
                hours: schedule.endTime.getHours(),
                minutes: schedule.endTime.getMinutes(),
              })}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="col-span-12 border-b my-1"></div>

        {/* Call Length Section */}
        <div className="col-span-12 sm:col-span-4 flex items-center">
          <Phone className="text-bone-400 mr-2" size={20} />
          <h3 className="text-lg font-medium">Call Length</h3>
        </div>
        <div className="col-span-12 sm:col-span-8">
          <div className="bg-bone-800 rounded-md px-3 py-2 inline-block">
            <span className="font-medium">{schedule.slotLength} minutes</span>
          </div>
        </div>

        {/* Divider */}
        <div className="col-span-12 border-b my-1"></div>

        {/* Break Between Slots Section */}
        <div className="col-span-12 sm:col-span-4 flex items-center">
          <Clock className="text-bone-400 mr-2" size={20} />
          <h3 className="text-lg font-medium">Break Between Slots</h3>
        </div>
        <div className="col-span-12 sm:col-span-8">
          <div className="bg-bone-800 rounded-md px-3 py-2 inline-block">
            <span className="font-medium">
              {schedule.breakBetweenSlots
                ? `${schedule.breakBetweenSlots} minutes`
                : "No Break Scheduled"}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="col-span-12 border-b my-1"></div>

        <div className="col-span-12 sm:col-span-4 flex items-start">
          <CalendarIcon className="text-bone-400 mr-2 mt-1" size={20} />
          <h3 className="text-lg font-medium">Holidays</h3>
        </div>
        <div className="col-span-12 sm:col-span-8">
          {schedule.holidays.length === 0 ? (
            <div className="text-bone-400">No holidays selected</div>
          ) : (
            <div className="flex flex-col gap-3">
              {/* View toggle button - moved outside content area */}
              <button
                className="text-sm text-bone-200 hover:text-bone transition-colors underline w-fit cursor-pointer self-end"
                onClick={() => setShowCalendarView(!showCalendarView)}
              >
                {showCalendarView ? "View as Ranges" : "View as Calendar"}
              </button>

              {/* Conditional rendering of content */}
              {showCalendarView ? (
                /* Calendar View */
                <HolidayCalendarView
                  holidays={schedule.holidays}
                  onClose={() => setShowCalendarView(false)}
                  initialMonth={new Date()}
                />
              ) : (
                /* Ranges View */
                <>
                  <div className="mb-2">
                    {holidayRanges.map((range, index) => (
                      <div
                        key={index}
                        className="bg-bone-800 rounded-md px-3 py-2 mb-2 inline-block mr-2"
                      >
                        {
                          isSameDay(range.start, range.end)
                            ? format(range.start, "d MMMM yyyy") // Single day
                            : isSameMonth(range.start, range.end)
                            ? `${format(range.start, "d")}–${format(
                                range.end,
                                "d"
                              )} ${format(range.start, "MMMM yyyy")}` // Same month
                            : `${format(range.start, "d MMMM yyyy")} – ${format(
                                range.end,
                                "d MMMM yyyy"
                              )}` // Different months
                        }
                      </div>
                    ))}
                  </div>

                  {/* "View all dates" only visible in ranges view */}
                  <details className="cursor-pointer">
                    <summary className="text-sm text-bone-400 hover:text-bone-200 transition-colors">
                      View all dates ({schedule.holidays.length})
                    </summary>
                    <div className="mt-3">
                      {Object.entries(holidaysByMonth).map(([month, dates]) => (
                        <div key={month} className="mb-3">
                          <h4 className="text-sm font-semibold mb-2">
                            {month}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {dates.map((date, i) => (
                              <div
                                key={i}
                                className="bg-bone-800 rounded-md px-2 py-1 text-sm"
                              >
                                {format(date, "d")}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return edit ? (
    <CoachScheduleForm
      formAction={updateSchedule.bind(null, schedule.id)}
      professionalId={schedule.professional.id}
      setEdit={setEdit}
      defaultValues={defaultValues}
    />
  ) : (
    scheduleDisplay
  );
}
