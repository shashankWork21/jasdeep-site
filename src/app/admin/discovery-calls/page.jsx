export const dynamic = "force-dynamic";

import { validateSessionWithoutRedirect } from "@/actions/auth";
import { addExistingEventsToCalendar, getUpcomingSlots } from "@/actions/slot";
import AdminSessionComponent from "@/components/admin/admin-session-component";
import { redirect } from "next/navigation";

export default async function AdminSessionsPage() {
  const { user } = await validateSessionWithoutRedirect();
  const { success, message } = await addExistingEventsToCalendar(user);
  if (!user) {
    redirect("/admin");
  }
  const slots = await getUpcomingSlots();
  return (
    <div className="min-h-screen bg-bone-800 ">
      <AdminSessionComponent
        user={user}
        slots={slots}
        message={{ message, success }}
      />
    </div>
  );
}
