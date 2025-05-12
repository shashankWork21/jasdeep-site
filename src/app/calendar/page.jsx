import { getProfessional } from "@/actions/professional";
import { getSchedule } from "@/actions/schedule";
import CalendarComponent from "@/components/calendar/calendar-component";
import Header from "@/components/header";

export default async function CalendarPage() {
  const professional = await getProfessional();
  if (!professional) {
    return (
      <div className="min-h-screen bg-bone-700 text-xl text-bone-200 flex flex-col items-center pt-3">
        Loading..
      </div>
    );
  }
  const schedule = await getSchedule(professional.id);
  return (
    <div className="min-h-screen bg-bone-700 py-5">
      <Header />
      <CalendarComponent schedule={schedule} />
    </div>
  );
}
