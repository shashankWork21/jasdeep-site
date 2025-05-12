"use client";

import { useActionState, useState } from "react";
import {
  Calendar,
  Clock,
  User,
  FileText,
  Trash2,
  CalendarClock,
} from "lucide-react";
import { format } from "date-fns";
import { SlotStatus } from "@/generated/prisma";

export default function SlotCard({ slot, cancelAction, deleteAction }) {
  const [expandedSlot, setExpandedSlot] = useState(null);
  const [cancelActionState, cancelSlotAction] = useActionState(
    cancelAction.bind(null, slot.id),
    { errors: {}, success: false }
  );
  const [deleteActionState, deleteSlotAction] = useActionState(
    deleteAction.bind(null, slot.id),
    { errors: {}, success: false }
  );

  return (
    <div
      key={slot.id}
      className="bg-bone-800 rounded-lg overflow-hidden shadow-lg transition-all duration-200 hover:shadow-xl border border-bone-700 h-fit"
    >
      {/* Card header with date */}
      <div className="bg-bone px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="text-bone-100 mr-2" size={18} />
          <div className="text-bone-100 font-medium">
            {format(new Date(slot.start), "MMM d, yyyy")}
          </div>
        </div>
        <div className="text-bone-100 text-sm flex items-center">
          <Clock className="mr-1" size={14} />
          {format(new Date(slot.start), "h:mm a")}
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 bg-white">
        {/* User info */}
        <div className="mb-4 px-5">
          <div className="w-full flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <User className="text-bone-400 mr-2" size={16} />
              <h4 className="text-bone-100 text-xl font-medium">
                {slot.userName || "Not provided"}
              </h4>
            </div>
            <div className="flex items-center text-sm text-bone-300">
              {!!slot.meetingLink && slot.status !== SlotStatus.CANCELLED ? (
                <a
                  href={slot.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-bone-500 text-md text-bone-100 rounded-md hover:bg-bone-400 transition duration-200"
                >
                  Join Call
                </a>
              ) : (
                <span className="text-bone-500">No link available</span>
              )}
            </div>
          </div>
        </div>

        {/* Description with animations */}

        {/* Status indicator */}
        <div className="flex items-center px-5 mb-4">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${
              slot.status === SlotStatus.CONFIRMED
                ? "bg-green-500"
                : slot.status === SlotStatus.PENDING
                ? "bg-yellow-500"
                : slot.status === SlotStatus.CANCELLED
                ? "bg-red-500"
                : "bg-bone-500"
            }`}
          ></div>
          <span className="text-sm font-medium text-bone-300">
            {slot.status.charAt(0).toUpperCase() +
              slot.status.slice(1).toLowerCase()}
          </span>
        </div>
        {slot.description && (
          <div className="mb-4">
            <button
              onClick={() =>
                setExpandedSlot(expandedSlot === slot.id ? null : slot.id)
              }
              className="flex items-center text-bone-300 text-sm hover:text-bone-100 hover:bg-bone-500 px-3 py-2 mb-1 cursor-pointer rounded-lg transform transition-all duration-300 hover:translate-x-1"
            >
              <FileText
                className={`mr-1 transition-transform duration-300 ${
                  expandedSlot === slot.id ? "rotate-180" : ""
                }`}
                size={14}
              />
              {expandedSlot === slot.id
                ? "Hide Description"
                : "View Description"}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedSlot === slot.id
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-2 text-bone-100 text-sm bg-bone-900 p-3 rounded-md transform transition-all duration-300 origin-top">
                {slot.description}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        {slot.status === SlotStatus.CONFIRMED && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-bone-700">
            <a
              href={`/admin/reschedule/${slot.id}`}
              className="flex items-center text-bone-200 hover:text-bone-100 text-sm"
            >
              <CalendarClock className="mr-1" size={16} />
              Reschedule
            </a>
            {cancelActionState.success && (
              <p
                className={`w-fit px-4 py-2 rounded-md mx-auto my-3 ${
                  deleteActionState.success
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } transition-all duration-300 ease-in-out`}
              >
                Call cancelled successfully
              </p>
            )}
            <form action={cancelSlotAction}>
              <button
                type="submit"
                className="flex cursor-pointer items-center text-red-400 hover:text-red-300 text-sm"
              >
                <Trash2 className="mr-1" size={16} />
                Cancel
              </button>
            </form>
          </div>
        )}
        {slot.status !== SlotStatus.CONFIRMED && (
          <div className="flex items-center justify-end mt-4 pt-4 border-t border-bone-700">
            <form action={deleteSlotAction}>
              <button
                type="submit"
                className="flex cursor-pointer items-center text-red-400 hover:text-red-300 text-sm"
              >
                <Trash2 className="mr-1" size={16} />
                Delete
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
