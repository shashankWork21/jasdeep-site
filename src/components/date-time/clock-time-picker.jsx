"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ClockTimePicker({ selectedTime, onTimeChange }) {
  const [mode, setMode] = useState("hours");
  const [ampm, setAmpm] = useState(selectedTime.hours >= 12 ? "PM" : "AM");

  const handleAmPmSwitch = () => {
    const newAmPm = ampm === "AM" ? "PM" : "AM";
    setAmpm(newAmPm);
    const hours = selectedTime.hours + (newAmPm === "PM" ? 12 : -12);
    handleTimeChange(hours, selectedTime.minutes);
  };
  const handleTimeChange = (hours, minutes) => {
    onTimeChange({ hours, minutes });
  };

  const handleClockClick = (event) => {
    const clockRect = event.currentTarget.getBoundingClientRect();
    const clockCenterX = clockRect.left + clockRect.width / 2;
    const clockCenterY = clockRect.top + clockRect.height / 2;
    const clickX = event.clientX;
    const clickY = event.clientY;

    const angle =
      Math.atan2(clickY - clockCenterY, clickX - clockCenterX) *
      (180 / Math.PI);
    const adjustedAngle = (angle + 360 + 90) % 360;

    if (mode === "hours") {
      const hours = Math.round(adjustedAngle / 30) || 12;
      handleTimeChange(
        (hours % 12) + (ampm === "PM" ? 12 : 0),
        selectedTime.minutes
      );
      setMode("minutes");
    } else {
      const minutes = Math.round(adjustedAngle / 6) % 60;
      const roundedMinutes = Math.round(minutes / 5) * 5;
      handleTimeChange(selectedTime.hours, roundedMinutes % 60);
    }
  };

  const renderedClockNumbers = () => {
    const numbers = [];
    const count = 12;
    const step = 1;
    const radius = 120;
    const clockSize = 300;

    for (let i = 1; i <= count; i += step) {
      const angle = ((i / count) * 360 - 90) * (Math.PI / 180); // Start at top
      const x = clockSize / 2 + radius * Math.cos(angle) - 22.5; // Adjust -15 to center
      const y = clockSize / 2 + radius * Math.sin(angle) - 22.5;

      let displayNumber;
      if (mode === "hours") {
        displayNumber = i % 12 || 12;
      } else {
        displayNumber = (i * 5) % 60;
      }

      const isSelected =
        (mode === "hours" && displayNumber === selectedTime.hours % 12) ||
        (mode === "minutes" && displayNumber === selectedTime.minutes);

      numbers.push(
        <div
          key={i}
          className={`absolute flex items-center justify-center text-xl  ${
            isSelected
              ? "bg-bone-200 text-white hover:bg-bone-400"
              : "text-jet-500 hover:bg-bone-400"
          }`}
          style={{
            left: `${x}px`,
            top: `${y}px`,
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
          onClick={() => {
            if (mode === "hours") {
              handleTimeChange(displayNumber, selectedTime.minutes);
            } else {
              handleTimeChange(selectedTime.hours, displayNumber);
            }
          }}
        >
          {displayNumber}
        </div>
      );
    }
    return numbers;
  };

  return (
    <div className="flex flex-col items-center p-4 mt-10 bg-bone-900  rounded-lg border border-bone shadow-md w-[350px]">
      <div className="flex flex-row space-x-2 items-center mb-4">
        <div className="text-2xl font-bold ">
          {(selectedTime.hours % 12 || 12).toString().padStart(2, "0")}:
          {selectedTime.minutes.toString().padStart(2, "0")}
        </div>
        <div className="group relative">
          <button
            type="button"
            onClick={handleAmPmSwitch}
            className="px-3 py-1 rounded-lg bg-bone hover:bg-bone-600 shadow-lg cursor-pointer text-jet text-2xl font-bold"
            aria-label="Toggle between AM and PM"
          >
            {ampm}
          </button>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-jet text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Click to switch to {ampm === "AM" ? "PM" : "AM"}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-jet"></div>
          </div>
        </div>
      </div>

      <div
        className="relative w-[300px] h-[300px] rounded-full bg-bone border border-bone-400 mb-4"
        onClick={handleClockClick}
      >
        <div className="absolute top-1/2 left-1/2 -mt-1 -ml-1 w-2 h-2 rounded-full bg-bone-200"></div>
        {renderedClockNumbers()}
      </div>

      <div className="flex justify-center items-center gap-6 mt-2 mb-2 w-full">
        <button
          onClick={() => setMode("hours")}
          className={`p-2 rounded-full hover:bg-bone-800 cursor-pointer ${
            mode === "hours" ? "bg-bone-200 text-white" : ""
          }`}
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
        <div className="text-sm font-medium">
          {mode === "hours" ? "Hours" : "Minutes"}
        </div>
        <button
          onClick={() => setMode("minutes")}
          className={`p-2 rounded-full hover:bg-bone-800 cursor-pointer ${
            mode === "minutes" ? "bg-bone-200 text-white" : ""
          }`}
        >
          <ChevronRight size={24} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
