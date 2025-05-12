"use client";

import { createSlot } from "@/actions/slot";
import { useActionState } from "react";
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  User,
  Mail,
  MessageSquare,
  Timer,
} from "lucide-react";

export default function CallScheduleForm({ start, end, professional }) {
  const [formState, action] = useActionState(
    createSlot.bind(null, { start, end, professional }),
    { success: false, errors: {} }
  );

  const startDate = new Date(start);
  const endDate = new Date(end);
  const durationMinutes = Math.round((endDate - startDate) / (1000 * 60));

  return (
    <div className="max-w-4xl mx-auto bg-bone-900 rounded-xl shadow-lg">
      <div className="p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-bone-100 mb-6">
          Your Discovery Call with Jasdeep
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Call Details Section */}
          <div className="bg-bone-700 border border-bone p-6 rounded-lg text-xl">
            <div className="space-y-8">
              <div className="flex items-center">
                <CalendarIcon className="text-bone-300 mr-3" size={20} />
                <div>
                  <p className="text-bone-100 font-bold">
                    {format(startDate, "EEEE, MMMM d, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="text-bone-300 mr-3" size={20} />
                <div>
                  <p className="text-bone-100 font-bold">
                    {format(startDate, "h:mm a")} - {format(endDate, "h:mm a")}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Timer className="text-bone-300 mr-3" size={20} />
                <div>
                  <p className="text-bone-100 font-bold">
                    {durationMinutes} minutes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form Section */}
          <div className="bg-bone-700 border border-bone p-6 rounded-lg">
            <form action={action} className="space-y-4">
              <h2 className="text-xl font-semibold text-bone-100 mb-4">
                Your Information
              </h2>

              <div>
                <label
                  className="block text-bone-200 text-sm mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-bone-300" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-white text-bone-100 w-full pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:ring-bone-400 focus:outline-none"
                    placeholder="Your full name"
                  />
                </div>
                {formState.errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {formState?.errors.name.map((error, index) => (
                      <span key={index}>{error}</span>
                    ))}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-bone-200 text-sm mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-bone-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-white text-bone-100 w-full pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:ring-bone-400 focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
                {formState.errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {formState.errors.email.map((error, index) => (
                      <span key={index}>{error}</span>
                    ))}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-bone-200 text-sm mb-1"
                  htmlFor="description"
                >
                  Anything you'd like Jasdeep to know?
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquare size={16} className="text-bone-400" />
                  </div>
                  <textarea
                    name="description"
                    id="description"
                    rows="4"
                    className="bg-white text-bone-100 w-full pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:ring-bone-400 focus:outline-none"
                    placeholder="Optional: Topics you'd like to discuss, questions, etc."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-bone-200 hover:bg-bone-300 cursor-pointer text-bone-900 font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bone-500"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>
      {formState?.success && (
        <div className="text-center py-8">
          <div className="bg-green-100 w-fit mx-auto text-green-800 p-4 rounded-lg mb-4">
            <h3 className="font-bold text-lg mb-2">Booking Confirmed!</h3>
            <p>Your discovery call has been scheduled.</p>
            <p className="mt-2">Check your email for details.</p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-green-700 hover:bg-green-500 cursor-pointer text-white font-medium py-2 px-4 rounded-md transition-colors mt-2"
            >
              Return Home
            </button>
          </div>
        </div>
      )}
      {formState?.errors?._form && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {formState?.errors?.form?.map((error, index) => (
            <p key={index} className="text-sm">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
