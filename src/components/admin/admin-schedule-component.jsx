"use client";

import { useState } from "react";
import AdminHeader from "../auth/admin-header";
import { createSchedule } from "@/actions/schedule";
import ScheduleDisplay from "./schedule-display";
import CoachScheduleForm from "./admin-schedule-form";
import Link from "next/link";

export default function AdminScheduleComponent({ professionalId, schedule }) {
  const [edit, setEdit] = useState(false);
  const defaultValues = {
    daysOfWeek: [],
    slotLength: 15,
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 9 * 60 * 60 * 1000),
    holidays: [],
    breakBetweenSlots: 0,
  };
  return (
    <div className="bg-bone-700 pb-32 min-h-screen">
      <AdminHeader />

      <div>
        {!!schedule ? (
          <ScheduleDisplay schedule={schedule} edit={edit} setEdit={setEdit} />
        ) : (
          <CoachScheduleForm
            professionalId={professionalId}
            formAction={createSchedule}
            defaultValues={defaultValues}
            setEdit={setEdit}
          />
        )}
      </div>
    </div>
  );
}
