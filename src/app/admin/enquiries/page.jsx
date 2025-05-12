import { getEnquiries } from "@/actions/enquiry";
import EnquiriesList from "@/components/admin/admin-enquiries";

export default async function EnquiriesPage() {
  const enquiries = await getEnquiries();
  return <EnquiriesList enquiries={enquiries} />;
}
