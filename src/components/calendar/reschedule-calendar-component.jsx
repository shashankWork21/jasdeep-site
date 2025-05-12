"use client";

import { dateDisplay } from "@/utils/calendar.util";
import {
  getAvailableSlots,
  getUnavailableDates,
  findNextAvailableDate,
} from "@/utils/slots.utils";
import { useState, useEffect, useActionState, useRef } from "react";
import DatePicker from "../date-time/date-picker";
import rescheduleSlot, { getSlotsByDate } from "@/actions/slot";
import { getCalendarEvents } from "@/actions/calendar-slot";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RescheduleCalendarComponent({
  schedule,
  slotId,
  userName,
}) {
  const router = useRouter();
  const now = new Date();
  now.setDate(now.getDate() + 1);
  const [selectedDate, setSelectedDate] = useState(now);
  const [monthRef, setMonthRef] = useState(now.getMonth());
  const [yearRef, setYearRef] = useState(now.getFullYear());
  const [slots, setSlots] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const initialCheckRef = useRef(true);
  const [suggestedDate, setSuggestedDate] = useState(null);

  useEffect(() => {
    async function fetchSlots() {
      const startDate =
        monthRef === now.getMonth() && yearRef === now.getFullYear()
          ? now
          : new Date(yearRef, monthRef, 1);
      const endDate = new Date(yearRef, monthRef + 1, 1);
      endDate.setSeconds(endDate.getSeconds() - 1);
      const slotsFromDb = await getSlotsByDate(
        startDate.toISOString(),
        endDate.toISOString()
      );

      const databaseSlots = slotsFromDb.map((slot) => {
        const { start, end } = slot;
        return { start, end };
      });
      const calendarSlots = await getCalendarEvents(
        startDate.toISOString(),
        endDate.toISOString()
      );
      const allSlots = [...databaseSlots, ...calendarSlots].map((slot) => ({
        start: new Date(slot.start),
        end: new Date(slot.end),
      }));
      setSlots(allSlots);
    }
    fetchSlots();
  }, [monthRef, yearRef]);

  const [availableSlotsForMonth, setAvailableSlotsForMonth] = useState(
    getAvailableSlots(
      monthRef,
      yearRef,
      slots,
      schedule.slotLength,
      new Date(schedule.startTime),
      new Date(schedule.endTime),
      schedule.daysOfWeek,
      schedule.holidays.map((date) => new Date(date)),
      schedule.breakBetweenSlots
    )
  );
  const [availableSlots, setAvailableSlots] = useState([]);
  const [unavailableDays, setUnavailableDays] = useState(
    getUnavailableDates(selectedDate, availableSlotsForMonth)
  );

  const handleMonthChange = (month) => {
    setMonthRef(month);
    setSelectedDate(new Date(yearRef, month, 1));
  };
  const handleYearChange = (year) => {
    setYearRef(year);
    setMonthRef(1);
    setSelectedDate(new Date(year, 1, 1));
  };

  useEffect(() => {
    const monthSlots = getAvailableSlots(
      monthRef,
      yearRef,
      slots,
      schedule?.slotLength,
      new Date(schedule?.startTime),
      new Date(schedule?.endTime),
      schedule?.daysOfWeek,
      schedule?.holidays.map((date) => new Date(date)),
      schedule?.breakBetweenSlots
    );
    setAvailableSlotsForMonth(monthSlots);
    if (initialCheckRef.current && monthSlots.length > 0) {
      initialCheckRef.current = false;
      const slotsForSelectedDate = monthSlots.filter(
        (slot) => dateDisplay(slot.start) === dateDisplay(selectedDate)
      );
      if (slotsForSelectedDate.length === 0) {
        const nextDate = findNextAvailableDate(monthSlots);

        if (nextDate) {
          // Update state with the next available date
          setSelectedDate(nextDate);
          setMonthRef(nextDate.getMonth());
          setYearRef(nextDate.getFullYear());
        }
      }
    }
  }, [monthRef, yearRef, slots, schedule]);

  useEffect(() => {
    const filteredSlots = availableSlotsForMonth.filter(
      (slot) => dateDisplay(slot.start) === dateDisplay(selectedDate)
    );

    setAvailableSlots(filteredSlots);
    if (filteredSlots.length === 0 && !isInitialLoad) {
      const nextDate = findNextAvailableDate(availableSlotsForMonth);
      if (nextDate) {
        setSuggestedDate(nextDate);
      }
    } else {
      setSuggestedDate(null);
    }
  }, [selectedDate, availableSlotsForMonth]);

  useEffect(() => {
    const unavailableDays = getUnavailableDates(
      monthRef,
      yearRef,
      availableSlotsForMonth
    );
    setUnavailableDays([new Date(), ...unavailableDays]);
  }, [monthRef, yearRef, availableSlotsForMonth]);

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const [selectedSlot, setSelectedSlot] = useState(null);

  const [rescheduleFormState, rescheduleAction] = useActionState(
    rescheduleSlot.bind(null, slotId, selectedSlot),
    {
      success: false,
      errors: {},
      message: "",
    }
  );

  useEffect(() => {
    if (rescheduleFormState.success) {
      setTimeout(() => {
        router.push("/admin/discovery-calls");
      }, 2000);
    }
  }, [rescheduleFormState.success]);

  return (
    <div className="border-2 border-bone-900 bg-white px-10 container mx-auto mt-5 rounded-lg shadow-lg pb-10">
      <h3 className="my-5 text-2xl font-semibold text-bone-200 text-center">
        Reschedule Discovery Call with {userName}
      </h3>
      <div className="flex flex-row gap-3 items-start justify-center">
        <div className="w-full md:w-1/2">
          <DatePicker
            onDateSelect={handleDateSelect}
            initialDate={selectedDate}
            size="large"
            className="border-2 border-bone w-fit mx-auto h-fit mt-5"
            disabledDates={unavailableDays}
            allowHistoricDates={false}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
          />
        </div>
        <div className="w-full md:w-1/2">
          <div className="mt-8 px-4 mx-auto">
            <h3 className="text-xl font-semibold text-bone-200 mb-4 w-full text-center">
              {dateDisplay(selectedDate)}
            </h3>

            <div className="bg-bone-900 rounded-lg p-4">
              {availableSlots.length === 0 ? (
                <p className="text-bone-400 text-center py-4">
                  No available slots for this date
                </p>
              ) : (
                <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 h-fit max-h-96 overflow-scroll">
                  {availableSlots.map((slot, index) => (
                    <div
                      onClick={() => {
                        setSelectedSlot(slot);
                      }}
                      key={index}
                      className={`${
                        selectedSlot?.start === slot.start &&
                        selectedSlot?.end === slot.end
                          ? "bg-bone-200 hover:bg-bone-300 text-white"
                          : "bg-bone hover:bg-bone-600"
                      }  cursor-pointer transition-colors rounded-md px-3 py-2 text-sm col-span-3 lg:col-span-2 text-center`}
                    >
                      {new Date(slot.start)
                        .toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                        .toUpperCase()}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {!!selectedSlot && (
        <form
          action={rescheduleAction}
          className="w-full flex items-center justify-center"
        >
          <button
            type="submit"
            className="bg-bone-200 text-white px-4 py-2 rounded cursor-pointer mx-auto w-fit mt-5"
          >
            Reschedule
          </button>
        </form>
      )}
      {!!rescheduleFormState.message && (
        <p
          className={`w-fit px-4 py-2 rounded-md mx-auto my-3 ${
            rescheduleFormState.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          } transition-all duration-300 ease-in-out`}
        >
          {rescheduleFormState.message}
        </p>
      )}
      {!!rescheduleFormState.errors._form && (
        <div className="flex flex-row items-center w-full justify-center gap-3 mt-5">
          <p
            className={`w-fit px-4 py-2 rounded-md ${
              rescheduleFormState.success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            } transition-all duration-300 ease-in-out`}
          >
            {rescheduleFormState.errors._form.map((error, index) => (
              <span key={index}>{error}</span>
            ))}
          </p>
          <Link
            href="/admin/discovery-calls"
            className="border border-bone-200 text-bone-200 bg-white px-4 py-2 rounded cursor-pointer"
          >
            Go Back
          </Link>
        </div>
      )}
      {availableSlots.length === 0 && suggestedDate && (
        <div className="mt-4 text-center">
          <p className="text-bone-300">Try this date instead:</p>
          <button
            onClick={() => {
              setSelectedDate(suggestedDate);
              setMonthRef(suggestedDate.getMonth());
              setYearRef(suggestedDate.getFullYear());
            }}
            className="mt-2 bg-bone-400 hover:bg-bone-500 text-white px-4 py-2 rounded"
          >
            {dateDisplay(suggestedDate)}
          </button>
        </div>
      )}
    </div>
  );
}
