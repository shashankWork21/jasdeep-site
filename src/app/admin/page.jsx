export const dynamic = "force-dynamic";

import { validateSessionWithoutRedirect } from "@/actions/auth";
import AdminComponent from "@/components/admin/admin-component";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const { user } = await validateSessionWithoutRedirect();
  if (user) {
    redirect("/admin/schedule");
  }

  return <AdminComponent />;
}
