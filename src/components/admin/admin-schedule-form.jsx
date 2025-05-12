"use client";

import { useActionState, useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import {
  dateDisplay,
  daysOfWeek,
  formatDateWithTimezone,
  timeDisplay,
} from "@/utils/calendar.util";
import ClockTimePicker from "../date-time/clock-time-picker";
import DatePicker from "../date-time/date-picker";
import { X } from "lucide-react";

export default function AdminScheduleForm({
  formAction,
  setEdit,
  professionalId,
  defaultValues,
}) {
  const now = new Date();
  const [editStartTime, setEditStartTime] = useState(false);
  const [editEndTime, setEditEndTime] = useState(false);
  const [isRange, setIsRange] = useState(false);
  const [date, setDate] = useState(now);
  const [holidays, setHolidays] = useState(defaultValues.holidays);
  const [holidayRange, setHolidayRange] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: now,
    end: addDays(now, 7),
  });
  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState(
    daysOfWeek.map((item) => {
      const dayItem = defaultValues.daysOfWeek.find(
        (day) => day === item.value
      );
      return { ...item, selected: dayItem ? true : false };
    })
  );

  const [startTime, setStartTime] = useState(defaultValues.startTime);
  const [endTime, setEndTime] = useState(defaultValues.endTime);
  const startHours = startTime?.getHours() || 0;
  const startMinutes = startTime?.getMinutes() || 0;
  const endHours = endTime?.getHours() || 0;
  const endMinutes = endTime?.getMinutes() || 0;

  const handleStartTimeChange = ({ hours, minutes }) => {
    const updatedTime = new Date();
    updatedTime.setHours(hours);
    updatedTime.setMinutes(minutes);
    setStartTime(updatedTime);
  };
  const handleEndTimeChange = ({ hours, minutes }) => {
    const updatedTime = new Date();
    updatedTime.setHours(hours);
    updatedTime.setMinutes(minutes);
    setEndTime(updatedTime);
  };

  const handleDayOfWeekClick = (value) => {
    setSelectedDaysOfWeek(
      selectedDaysOfWeek.map((day) => {
        if (day.value === value) {
          return { ...day, selected: !day.selected };
        }
        return day;
      })
    );
  };

  const renderedDaysOfWeek = (
    <div className="flex items-center space-x-2 py-2">
      {selectedDaysOfWeek.map((day, index) => {
        return (
          <div
            onClick={() => handleDayOfWeekClick(day.value)}
            key={index}
            className={`px-4 py-2 rounded-full ${
              day.selected ? "bg-bone" : "bg-bone-900 "
            } text-jet cursor-pointer`}
          >
            {day.name}
          </div>
        );
      })}
    </div>
  );

  const handleDateSelect = (date) => {
    if (!date) return;
    setDate(date);
    if (
      !holidays.map((item) => dateDisplay(item)).includes(dateDisplay(date)) &&
      !holidayRange.map((item) => dateDisplay(item)).includes(dateDisplay(date))
    ) {
      setHolidays((prev) => [...prev, date]);
    }
  };

  const handleDateRangeSelect = ({ start, end }) => {
    if (!start || !end) return;
    setDateRange({ start, end });
    start.setHours(0, 0, 0, 0);
    const holidaysFromRange = [];
    for (let i = start.getTime(); i <= end.getTime(); i += 86400000) {
      const date = new Date(i);

      if (
        !holidays.map((item) => dateDisplay(item)).includes(dateDisplay(date))
      ) {
        holidaysFromRange.push(date);
      }
    }
    setHolidayRange(holidaysFromRange);
  };

  const consolidatedHolidays = [...holidays, ...holidayRange];

  const formSubmitAction = formAction.bind(null, {
    daysOfWeek: selectedDaysOfWeek
      .filter((day) => day.selected)
      .map((day) => day.value),
    startTime: formatDateWithTimezone(startTime),
    endTime: formatDateWithTimezone(endTime),
    professionalId,
    holidays: consolidatedHolidays.map((holiday) =>
      formatDateWithTimezone(holiday)
    ),
  });

  const [formState, action] = useActionState(formSubmitAction, {
    errors: {},
    success: false,
  });

  useEffect(() => {
    if (!formState) {
      return;
    }
    if (formState?.success) {
      setEdit(false);
    }
  }, [formState.success, setEdit]);

  return (
    <form
      className="w-3/5 mt-5 mx-auto bg-white rounded-xl shadow-md py-5 px-32"
      action={action}
    >
      <h3 className="text-2xl font-bold text-center">Set your Schedule</h3>
      <div className="mt-10 flex flex-col space-y-3 items-center mx-auto">
        <h4 className="text-lg font-bold w-full ">Working Days:</h4>
        {renderedDaysOfWeek}
      </div>
      <div className="flex flex-row items-center justify-start space-x-3 mt-8">
        <div className="flex flex-row items-center justify-start space-x-3 mt-8">
          <label className="text-lg font-bold">
            Duration of each call (in Minutes):
          </label>
          <input
            type="number"
            name="slotLength"
            defaultValue={defaultValues.slotLength}
            className="w-1/8 text-center bg-white border border-bone-600 focus:outline-bone-400 text-jet rounded p-2"
          />
        </div>
        <div className="flex flex-row items-center justify-start space-x-3 mt-8">
          <label className="text-lg font-bold">
            Break after each Call (in Minutes):
          </label>
          <input
            type="number"
            name="breakBetweenSlots"
            defaultValue={defaultValues.breakBetweenSlots}
            className="w-1/8 text-center bg-white border border-bone-600 focus:outline-bone-400 text-jet rounded p-2"
          />
        </div>
      </div>
      <div className="flex flex-row justify-around mt-10">
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center justify-between space-x-5 px-3 py-2">
            <h3 className="text-xl">
              <span className="font-bold">Start Time: </span>
              {!editStartTime &&
                timeDisplay({ hours: startHours, minutes: startMinutes })}
            </h3>
            <button
              type="button"
              className="bg-bone px-3 py-1 shadow-md rounded cursor-pointer"
              onClick={() => setEditStartTime((prev) => !prev)}
            >
              {editStartTime ? "Done" : "Edit"}
            </button>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              editStartTime
                ? "max-h-[600px] opacity-100 transform translate-y-0"
                : "max-h-0 opacity-0 transform -translate-y-20"
            }`}
          >
            <ClockTimePicker
              selectedTime={{ hours: startHours, minutes: startMinutes }}
              onTimeChange={handleStartTimeChange}
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center justify-between space-x-5 px-3 py-2">
            <h3 className="text-xl">
              <span className="font-bold">End Time: </span>
              {!editEndTime &&
                timeDisplay({ hours: endHours, minutes: endMinutes })}
            </h3>
            <button
              type="button"
              className="bg-bone px-3 py-1 shadow-md rounded cursor-pointer"
              onClick={() => setEditEndTime((prev) => !prev)}
            >
              {editEndTime ? "Done" : "Edit"}
            </button>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              editEndTime
                ? "max-h-[600px] opacity-100 transform translate-y-0"
                : "max-h-0 opacity-0 transform -translate-y-20"
            }`}
          >
            <ClockTimePicker
              selectedTime={{ hours: endHours, minutes: endMinutes }}
              onTimeChange={handleEndTimeChange}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start space-y-3 mt-16">
        <h4 className="text-xl font-bold w-full">
          Holidays:
          {consolidatedHolidays.length === 0 ? (
            <span className="ml-3 text-bone-200">No Holidays Selected</span>
          ) : (
            ""
          )}
        </h4>
      </div>
      <div className="mt-5">
        {consolidatedHolidays.length !== 0 && (
          <>
            <div className="flex flex-row space-x-2 items-center flex-wrap mt-2">
              {consolidatedHolidays.map((holiday, index) => {
                return (
                  <div
                    key={index}
                    className="flex gap-4 bg-bone-700 px-2 py-1 rounded-full shadow-md my-2"
                  >
                    <p className="text-sm">{dateDisplay(holiday)}</p>
                    <X
                      className="cursor-pointer"
                      size={14}
                      onClick={() => {
                        setHolidays((prev) =>
                          prev.filter((item) => item !== holiday)
                        );
                        setHolidayRange((prev) =>
                          prev.filter((item) => item !== holiday)
                        );
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-5 w-full flex justify-center">
              <button
                type="button"
                className="border-bone-200 border mx-auto px-2 py-1 rounded cursor-pointer text-sm text-bone-200 hover:bg-bone-700"
                onClick={() => {
                  setHolidays([]);
                  setHolidayRange([]);
                }}
              >
                Clear All
              </button>
            </div>
          </>
        )}
      </div>
      <div className="mx-auto w-fit mt-8 flex flex-col items-center space-y-3">
        <button
          type="button"
          onClick={() => setIsRange((prev) => !prev)}
          className="bg-bone-700 px-3 py-2 rounded-lg shadow-md cursor-pointer"
        >
          {isRange ? "Select Individual Dates" : "Select From a Range"}
        </button>
        {isRange ? (
          <DatePicker
            isRange
            onRangeSelect={({ start, end }) => {
              handleDateRangeSelect({ start, end });
            }}
            initialStartDate={dateRange.start}
            initialEndDate={dateRange.end}
          />
        ) : (
          <DatePicker onDateSelect={handleDateSelect} initialDate={date} />
        )}
      </div>
      <div className="w-full flex flex-row items-center justify-center mt-10 space-x-3">
        <button
          type="submit"
          className="bg-bone-200 text-lg text-white px-4 py-2 rounded cursor-pointer"
        >
          Save Schedule
        </button>
        <button
          type="button"
          className="border-2 border-bone-200 text-bone-200 px-2 py-1 rounded cursor-pointer text-sm"
          onClick={() => {
            setEdit(false);
          }}
        >
          Cancel
        </button>
      </div>
      {formState.errors && (
        <div className="text-red-500 text-center mt-4">
          {formState.errors.message}
        </div>
      )}
      {formState.success && (
        <div className="text-green-500 text-center mt-4">
          Schedule saved successfully!
        </div>
      )}
    </form>
  );
}
