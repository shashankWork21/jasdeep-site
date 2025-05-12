"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FaqCard({ question, answer }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-bone-600 bg-gradient-to-br from-white to-old-lace-900 p-6 rounded-xl shadow-md h-fit transition-all duration-200">
      {/* Question header - always visible and clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex justify-between items-center w-full text-left cursor-pointer"
        aria-expanded={isExpanded}
      >
        <h3 className="text-xl font-semibold text-bone-100">{question}</h3>
        {isExpanded ? (
          <ChevronUp
            className={`text-bone-300 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            size={20}
          />
        ) : (
          <ChevronDown
            className={`text-bone-300 transition-transform duration-300 ${
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
        <div className="text-bone-200 text-lg">{answer}</div>
      </div>
    </div>
  );
}
