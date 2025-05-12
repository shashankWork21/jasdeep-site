export const dynamic = "force-dynamic";

import { validateSessionWithoutRedirect } from "@/actions/auth";
import { getSchedule } from "@/actions/schedule";
import { getSlotById } from "@/actions/slot";
import RescheduleCalendarComponent from "@/components/calendar/reschedule-calendar-component";
import { redirect } from "next/navigation";

export default async function ReschedulePage({ params }) {
  const { user } = await validateSessionWithoutRedirect();
  if (!user) {
    redirect("/admin");
  }
  const schedule = await getSchedule(user?.id);
  const { slotId } = await params;
  const slot = await getSlotById(slotId);
  if (!slot) {
    redirect("/admin/discovery-calls");
  }

  return (
    <div className="min-h-screen bg-bone-700 py-5">
      <RescheduleCalendarComponent
        schedule={schedule}
        slotId={slotId}
        userName={slot?.userName}
      />
    </div>
  );
}
