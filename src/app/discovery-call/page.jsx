import { getProfessional } from "@/actions/professional";
import CallScheduleForm from "@/components/calendar/call-schedule-form";
import Header from "@/components/header";

export default async function DiscoveryCall({ searchParams }) {
  const { start, end } = await searchParams;
  const professional = await getProfessional();

  return (
    <div className="min-h-screen bg-bone-700 py-5">
      <Header />
      <CallScheduleForm professional={professional} start={start} end={end} />
    </div>
  );
}
