"use client";

import Link from "next/link";
import ProtectedRoute from "./protected-route";
import { logout } from "@/actions/auth";

export default function AdminHeader() {
  return (
    <ProtectedRoute>
      <div className="flex items-center justify-between px-10 py-6 bg-bone-700 text-jet">
        <div className="flex items-center space-x-4">
          <Link href="/">Logo</Link>
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-8">
          <Link href="/admin/enquiries">Enquiries</Link>
          <Link href="/admin/schedule">Set Schedule</Link>
          <Link href="/admin/discovery-calls">Upcoming Sessions</Link>
          <form action={logout}>
            <button className="border-bone-200 text-bone-200 border-2 drop-shadow-xl px-3 py-1 rounded cursor-pointer">
              Logout
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
