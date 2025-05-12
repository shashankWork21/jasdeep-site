"use client";

import { useState, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  isSameDay,
  getMonth,
  getYear,
  setMonth,
  setYear,
  addYears,
  subYears,
} from "date-fns";

import {
  getDaysInMonth,
  isInRange,
  isDateDisabled,
  areAllDaysDisabled,
  isDateInPast,
  isMonthInPast,
} from "@/utils/date-picker.utils";

const DatePicker = ({
  isRange = false,
  onDateSelect,
  onRangeSelect,
  initialDate,
  initialStartDate,
  initialEndDate,
  disabledDates = [],
  className = "",
  onMonthChange = null,
  onYearChange = null,
  size = "",
  allowHistoricDates = true,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState(initialDate);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [selectingEnd, setSelectingEnd] = useState(isRange);
  const [viewMode, setViewMode] = useState("days");
  const [displayedMonths, setDisplayedMonths] = useState([currentDate]);

  useEffect(() => {
    setStartDate(initialStartDate);
  }, [initialStartDate]);

  useEffect(() => {
    setEndDate(initialEndDate);
  }, [initialEndDate]);

  useEffect(() => {
    setCurrentDate(initialDate);
  }, [initialDate]);

  useEffect(() => {
    if (isRange && startDate && endDate) {
      if (
        Math.abs(getMonth(startDate) - getMonth(endDate)) < 1 &&
        getYear(startDate) === getYear(endDate)
      ) {
        setDisplayedMonths([
          startDate,
          new Date(endDate.getTime() + 30 * 24 * 60 * 60 * 1000),
        ]);
      } else {
        setDisplayedMonths([startDate, endDate]);
      }
    } else {
      setDisplayedMonths([currentDate]);
    }
  }, [isRange, startDate, endDate, currentDate]);

  const handleDateClick = (date) => {
    if (
      !date ||
      isDateDisabled(date, disabledDates) ||
      (!allowHistoricDates && isDateInPast(date))
    )
      return;

    if (!isRange) {
      setCurrentDate(date);
      onDateSelect && onDateSelect(date);
      return;
    }
    if (!isRange) {
      setCurrentDate(date);
      onDateSelect && onDateSelect(date);
      return;
    }

    if (!selectingEnd) {
      setStartDate(date);
      setEndDate(new Date(date.getTime() + 24 * 60 * 60 * 1000));
      setSelectingEnd(true);
      onRangeSelect && onRangeSelect({ start: date, end: null });
    } else {
      let newStart = startDate;
      let newEnd = date;

      if (date < startDate) {
        newStart = date;
        newEnd = startDate;
      }
      setStartDate(newStart);
      setEndDate(newEnd);

      onRangeSelect && onRangeSelect({ start: newStart, end: newEnd });
    }
  };
  const handlePrevYear = () => {
    if (
      !allowHistoricDates &&
      currentDate.getFullYear() <= today.getFullYear()
    ) {
      return;
    }
    setCurrentDate((prevDate) => {
      const newDate = subYears(prevDate, 1);
      onYearChange && onYearChange(newDate.getFullYear());
      return newDate;
    });
  };

  const handleNextYear = () => {
    setCurrentDate((prevDate) => {
      const newDate = addYears(prevDate, 1);
      onYearChange && onYearChange(newDate.getFullYear());
      return newDate;
    });
  };

  const handleMonthSelect = (monthIndex) => {
    const newDate = setMonth(currentDate, monthIndex);
    setCurrentDate(newDate);
    setViewMode("days");
    onMonthChange && onMonthChange(newDate.getMonth());
  };

  const handleYearSelect = (year) => {
    const newDate = setYear(currentDate, year);
    setCurrentDate(newDate);
    setViewMode("months");
    onYearChange && onYearChange(newDate.getFullYear());
  };

  const renderMonthHeader = (date, index) => {
    if (!date) return;

    // Determine if prev button should be disabled
    const isPrevMonthDisabled =
      !allowHistoricDates && isMonthInPast(subMonths(date, 1));

    return (
      <div className="flex items-center justify-between mb-4 cursor-pointer">
        <button
          type="button"
          onClick={() => handlePrevMonth(index)}
          disabled={isPrevMonthDisabled}
          className={`p-1 rounded-full ${
            isPrevMonthDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-bone-800 focus:outline-none focus:ring-2 focus:ring-bone"
          }`}
        >
          <svg
            className="w-5 h-5 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        {/* Rest of your existing header render code */}
        <button
          type="button"
          onClick={() => setViewMode("months")}
          className="text-lg font-semibold px-2 py-1 rounded hover:bg-bone-800 focus:outline-none cursor-pointer focus:ring-2 focus:ring-bone"
        >
          {format(date, "MMMM")}
        </button>
        <button
          type="button"
          onClick={() => setViewMode("years")}
          className="text-lg font-semibold px-2 py-1 rounded hover:bg-bone-800 focus:outline-none focus:ring-2 focus:ring-bone cursor-pointer"
        >
          {format(date, "yyyy")}
        </button>
        <button
          type="button"
          onClick={() => handleNextMonth(index)}
          className="p-1 rounded-full hover:bg-bone-800 focus:outline-none focus:ring-2 focus:ring-bone"
        >
          <svg
            className="w-5 h-5 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    );
  };

  const handlePrevMonth = (index = 0) => {
    let canNavigate = true;

    if (!allowHistoricDates) {
      const targetDate =
        isRange && index !== undefined
          ? subMonths(displayedMonths[index], 1)
          : subMonths(currentDate, 1);

      canNavigate = !isMonthInPast(targetDate);
    }

    if (!canNavigate) return;

    if (isRange && index !== undefined) {
      setDisplayedMonths((prevMonths) => {
        const newMonths = [...prevMonths];
        const newMonth = subMonths(newMonths[index], 1);
        newMonths[index] = newMonth;

        return newMonths;
      });
      const newMonth = addMonths(displayedMonths[index], 1);
      if (onMonthChange) {
        setTimeout(() => onMonthChange(newMonth.getMonth()), 0);
      }
    } else {
      const newDate = subMonths(currentDate, 1);
      setCurrentDate(newDate);
      if (onMonthChange) {
        setTimeout(() => onMonthChange(newDate.getMonth()), 0);
      }
    }
  };

  const handleNextMonth = (index = 0) => {
    if (isRange && index !== undefined) {
      setDisplayedMonths((prevMonths) => {
        const newMonths = [...prevMonths];
        const newMonth = addMonths(newMonths[index], 1);
        newMonths[index] = newMonth;
        return newMonths;
      });
      const newMonth = addMonths(displayedMonths[index], 1);
      if (onMonthChange) {
        setTimeout(() => onMonthChange(newMonth.getMonth()), 0);
      }
    } else {
      const newDate = addMonths(currentDate, 1);
      setCurrentDate(newDate);

      if (onMonthChange) {
        setTimeout(() => onMonthChange(newDate.getMonth()), 0);
      }
    }
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const renderDaysOfWeek = () => (
    <div className="grid grid-cols-7 mb-2">
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="text-center text-sm font-medium text-gray-500 py-1"
        >
          {day}
        </div>
      ))}
    </div>
  );

  const renderDays = (date) => {
    const days = getDaysInMonth(date);

    // Check if all dates are disabled (including historical check)
    const allDisabled =
      areAllDaysDisabled(date, disabledDates) ||
      (!allowHistoricDates && isMonthInPast(date));

    return (
      <>
        <div
          className={`grid grid-cols-7 ${size === "large" ? "gap-4" : "gap-2"}`}
        >
          {days.map((day, index) => {
            const isPastDate = !allowHistoricDates && isDateInPast(day.date);
            const isDisabled =
              isDateDisabled(day.date, disabledDates) || isPastDate;
            const isSelected = !isRange
              ? isSameDay(day.date, currentDate)
              : isSameDay(day.date, startDate) || isSameDay(day.date, endDate);

            const isRangeDay = isInRange(day.date, isRange, startDate, endDate);
            const isStartDay = startDate && isSameDay(day.date, startDate);
            const isEndDay = endDate && isSameDay(day.date, endDate);

            return (
              <button
                type="button"
                key={index}
                onClick={() => handleDateClick(day.date)}
                disabled={isDisabled}
                className={`
                  h-10 w-10 rounded-full flex items-center justify-center focus:outline-none
                  ${size === "large" ? "text-lg" : "text-sm"}
                  ${
                    !day.isCurrentMonth
                      ? "text-jet-800"
                      : isDisabled
                      ? "font-medium"
                      : "font-bold"
                  }
                  ${
                    isDisabled
                      ? "cursor-not-allowed text-jet-800"
                      : isSelected
                      ? "bg-bone-400 hover:bg-bone-500 cursor-pointer text-bone-200"
                      : "hover:bg-bone-800 cursor-pointer  text-bone-200"
                  }
                  ${
                    !isDisabled && isRangeDay && !isSelected
                      ? "bg-bone-500"
                      : ""
                  }
                  ${
                    !isDisabled && isRangeDay && isStartDay
                      ? "rounded-l-full bg-bone-400"
                      : ""
                  }
                  ${
                    !isDisabled && isRangeDay && isEndDay
                      ? "rounded-r-full bg-bone-400"
                      : ""
                  }
                `}
              >
                {format(day.date, "d")}
              </button>
            );
          })}
        </div>

        {allDisabled && !!date && (
          <div className="text-center text-red-700 font- bold mt-4 mb-2 p-2 w-fit mx-auto bg-red-200 rounded">
            No dates are available in {format(date, "MMMM")}
          </div>
        )}
      </>
    );
  };

  const renderMonths = () => {
    const months = Array.from({ length: 12 }, (_, i) => i);
    const currentMonth = getMonth(currentDate);

    return (
      <div className="grid grid-cols-3 gap-4 p-4">
        {months.map((month) => (
          <button
            type="button"
            key={month}
            onClick={() => handleMonthSelect(month)}
            className={`
              p-2 rounded text-center focus:outline-none focus:ring-2 cursor-pointer focus:ring-bone
              ${month === currentMonth ? "bg-bone" : "hover:bg-bone-800"}
            `}
          >
            {format(setMonth(new Date(), month), "MMMM")}
          </button>
        ))}
      </div>
    );
  };

  const renderYears = () => {
    const currentYear = getYear(currentDate);
    const years = Array.from({ length: 12 }, (_, i) => currentYear - 5 + i);

    // Disable prev button if it would go before current year when historical dates disallowed
    const isPrevYearsDisabled =
      !allowHistoricDates && years[0] <= today.getFullYear();

    return (
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={handlePrevYear}
            disabled={isPrevYearsDisabled}
            className={`p-1 rounded-full ${
              isPrevYearsDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-bone-800 focus:outline-none focus:ring-2 focus:ring-bone"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Rest of your year rendering code */}
          <span className="text-lg font-semibold">
            {years[0]} - {years[years.length - 1]}
          </span>
          <button
            type="button"
            onClick={handleNextYear}
            className="p-1 rounded-full hover:bg-bone-800 focus:outline-none focus:ring-2 cursor-pointer focus:ring-bone"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 p-4">
          {years.map((year) => {
            const isYearDisabled =
              !allowHistoricDates && year < today.getFullYear();

            return (
              <button
                type="button"
                key={year}
                onClick={() => !isYearDisabled && handleYearSelect(year)}
                disabled={isYearDisabled}
                className={`
                  p-2 rounded text-center focus:outline-none focus:ring-2 cursor-pointer focus:ring-bone
                  ${
                    isYearDisabled
                      ? "opacity-50 cursor-not-allowed text-bone-700"
                      : year === currentYear
                      ? "bg-bone-200 text-white"
                      : "hover:bg-bone-800"
                  }
                `}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCalendarView = () => {
    switch (viewMode) {
      case "months":
        return renderMonths();
      case "years":
        return renderYears();
      default:
        return (
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {displayedMonths.map((date, index) => (
              <div key={index} className="calendar-month">
                {renderMonthHeader(date, index)}
                {renderDaysOfWeek()}
                {renderDays(date)}
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className={`bg-bone-800 rounded-lg shadow-md p-4 ${className}`}>
      {renderCalendarView()}
      <div className="flex justify-center space-x-3 my-3">
        <button
          type="button"
          className="border-1 border-bone-200 text-bone-200 px-2 rounded-lg mx-auto py-1 text-sm cursor-pointer hover:bg-bone-600"
          onClick={() => {
            setSelectingEnd(false);
            setStartDate(Date.now());
            setEndDate(new Date(Date.now() + 24 * 60 * 60 * 1000));
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
