"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FaqCard({ question, answer }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 bg-white p-6 rounded-xl shadow-md h-fit transition-all duration-200">
      {/* Question header - always visible and clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex justify-between items-center w-full text-left cursor-pointer"
        aria-expanded={isExpanded}
      >
        <h3 className="text-xl font-semibold text-gray-900">{question}</h3>
        {isExpanded ? (
          <ChevronUp
            className={`text-gray-600 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            size={20}
          />
        ) : (
          <ChevronDown
            className={`text-gray-600 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            size={20}
          />
        )}
      </button>

      {/* Answer section - conditionally rendered with animation */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-gray-700 text-lg">{answer}</div>
      </div>
    </div>
  );
}
