"use client";

import Link from "next/link";
import AdminHeader from "../auth/admin-header";
import { Scope } from "@/generated/prisma/client"; // Import SlotStatus enum
import { cancelSlotBooking, deleteSlotById } from "@/actions/slot";
import { useActionState, useEffect, useState } from "react";
import { revokeCalendarToken, revokeTokens } from "@/actions/auth";
import {
  Calendar,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  Layers,
} from "lucide-react";

import SlotCard from "./slot-card";

export default function AdminSessionComponent({ user, slots, message }) {
  const googleSigninUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth?scope=CALENDAR&role=coach&redirect_url=${process.env.NEXT_PUBLIC_BASE_URL}/admin/discovery-calls&user_id=${user.id}`;
  const calendarToken = user.tokens.find((token) =>
    token.scopes.includes(Scope.CALENDAR)
  );

  // Status filter state
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Filter slots based on selected status
  const filteredSlots =
    statusFilter === "ALL"
      ? slots
      : slots.filter((slot) => slot.status === statusFilter);

  // Count slots by status for badge numbers
  const slotCounts = {
    ALL: slots.length,
    PENDING: slots.filter((slot) => slot.status === "PENDING").length,
    CONFIRMED: slots.filter((slot) => slot.status === "CONFIRMED").length,
    COMPLETED: slots.filter((slot) => slot.status === "COMPLETED").length,
    CANCELLED: slots.filter((slot) => slot.status === "CANCELLED").length,
  };

  return (
    <div className="min-h-screen bg-bone-700">
      <AdminHeader />

      {/* Calendar connection section */}
      <div className="py-5 w-full bg-bone-700 flex items-center justify-center">
        {!calendarToken && (
          <Link
            className="bg-bone-200 text-white px-4 py-2 rounded cursor-pointer mx-auto w-fit"
            href={googleSigninUrl}
          >
            Connect your Calendar
          </Link>
        )}
      </div>

      {/* Message display */}
      {message && showMessage && (
        <p
          className={`w-fit px-4 py-2 rounded-md mx-auto my-3 ${
            message.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          } transition-all duration-300 ease-in-out`}
        >
          {message.message}
        </p>
      )}

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <h3 className="text-2xl font-semibold text-bone-100 text-center mb-8">
            Your Discovery Calls
          </h3>

          {/* Status Filter UI */}
          <div className="flex flex-wrap items-center justify-center mb-8 gap-2">
            <div className="flex items-center bg-white rounded-full p-1 shadow-md">
              <button
                onClick={() => setStatusFilter("ALL")}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  statusFilter === "ALL"
                    ? "bg-bone-200 text-bone-800"
                    : "text-bone-300 hover:text-bone-100"
                }`}
              >
                <Layers size={16} className="mr-1" />
                All
                <span className="ml-1 bg-bone-700 text-bone-300 text-xs py-0.5 px-2 rounded-full">
                  {slotCounts.ALL}
                </span>
              </button>

              <button
                onClick={() => setStatusFilter("PENDING")}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  statusFilter === "PENDING"
                    ? "bg-yellow-400 text-yellow-900"
                    : "text-bone-300 hover:text-bone-100"
                }`}
              >
                <Clock size={16} className="mr-1" />
                Pending
                <span className="ml-1 bg-bone-700 text-bone-300 text-xs py-0.5 px-2 rounded-full">
                  {slotCounts.PENDING}
                </span>
              </button>

              <button
                onClick={() => setStatusFilter("CONFIRMED")}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  statusFilter === "CONFIRMED"
                    ? "bg-blue-400 text-blue-900"
                    : "text-bone-300 hover:text-bone-100"
                }`}
              >
                <CheckCircle size={16} className="mr-1" />
                Confirmed
                <span className="ml-1 bg-bone-700 text-bone-300 text-xs py-0.5 px-2 rounded-full">
                  {slotCounts.CONFIRMED}
                </span>
              </button>

              <button
                onClick={() => setStatusFilter("COMPLETED")}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  statusFilter === "COMPLETED"
                    ? "bg-green-400 text-green-900"
                    : "text-bone-300 hover:text-bone-100"
                }`}
              >
                <CheckCircle size={16} className="mr-1" />
                Completed
                <span className="ml-1 bg-bone-700 text-bone-300 text-xs py-0.5 px-2 rounded-full">
                  {slotCounts.COMPLETED}
                </span>
              </button>

              <button
                onClick={() => setStatusFilter("CANCELLED")}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  statusFilter === "CANCELLED"
                    ? "bg-red-400 text-red-900"
                    : "text-bone-300 hover:text-bone-100"
                }`}
              >
                <XCircle size={16} className="mr-1" />
                Cancelled
                <span className="ml-1 bg-bone-700 text-bone-300 text-xs py-0.5 px-2 rounded-full">
                  {slotCounts.CANCELLED}
                </span>
              </button>
            </div>
          </div>

          {/* Display filtered count */}
          <div className="text-center mb-6 text-bone-300">
            Showing {filteredSlots.length} of {slots.length} discovery calls
          </div>

          {/* Calls grid */}
          {filteredSlots.length === 0 ? (
            <div className="text-center py-12 bg-bone-800 rounded-lg">
              <Filter className="mx-auto text-bone-400 mb-4" size={48} />
              <p className="text-bone-300 text-lg">
                {slots.length === 0
                  ? "No discovery calls scheduled yet."
                  : `No ${statusFilter.toLowerCase()} discovery calls found.`}
              </p>
              {statusFilter !== "ALL" && (
                <button
                  onClick={() => setStatusFilter("ALL")}
                  className="mt-4 text-bone-200 underline cursor-pointer hover:text-bone-100"
                >
                  Show all calls
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSlots.map((slot) => (
                <SlotCard
                  slot={slot}
                  key={slot.id}
                  cancelAction={cancelSlotBooking}
                  deleteAction={deleteSlotById}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
