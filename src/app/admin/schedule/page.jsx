import { validateSessionWithoutRedirect } from "@/actions/auth";
import { getSchedule } from "@/actions/schedule";
import AdminScheduleComponent from "@/components/admin/admin-schedule-component";
import { redirect } from "next/navigation";

export default async function AdminSchedulePage() {
  const { user } = await validateSessionWithoutRedirect();
  if (!user) {
    redirect("/admin");
  }
  const schedule = await getSchedule(user?.id);

  return (
    <AdminScheduleComponent professionalId={user?.id} schedule={schedule} />
  );
}
