"use client";

import { createEnquiry } from "@/actions/enquiry";
import { useActionState } from "react";

export default function EnquiryForm() {
  const [formState, action] = useActionState(createEnquiry, {
    success: false,
    errors: {},
  });
  return (
    <div>
      <form className="space-y-4" action={action}>
        <div>
          <label htmlFor="name" className="block text-bone-200 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-3 rounded-md border border-bone-300 focus:outline-none focus:ring-2 focus:ring-bone-200"
          />
          {formState.errors.name && (
            <span className="text-red-600 text-sm">
              {formState.errors.name}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-bone-200 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full p-3 rounded-md border border-bone-300 focus:outline-none focus:ring-2 focus:ring-bone-200"
          />
          {formState.errors.email && (
            <span className="text-red-600 text-sm">
              {formState.errors.email}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-bone-200 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            className="w-full p-3 rounded-md border border-bone-300 focus:outline-none focus:ring-2 focus:ring-bone-200"
          />
          {formState.errors.phone && (
            <span className="text-red-600 text-sm">
              {formState.errors.phone}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="message" className="block text-bone-200 mb-1">
            Message
          </label>
          <textarea
            name="message"
            rows="4"
            className="w-full p-3 rounded-md border border-bone-300 focus:outline-none focus:ring-2 focus:ring-bone-200"
          />
          {formState.errors.message && (
            <span className="text-red-600 text-sm">
              {formState.errors.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-bone-200 cursor-pointer shadow-md hover:bg-bone-300 text-white w-full p-3 rounded-md transition-colors"
        >
          Send Message
        </button>
      </form>
      {formState.success && (
        <div className="mt-4 text-green-500">
          Your message has been sent successfully!
        </div>
      )}
    </div>
  );
}
