import AdminHeader from "../auth/admin-header";
import { format } from "date-fns";
import { Mail, Phone } from "lucide-react";

export default function EnquiriesList({ enquiries }) {
  return (
    <div className="min-h-screen">
      <AdminHeader />
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center text-bone-200 my-12">
          Enquiries
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {enquiries.map((enquiry, index) => (
            <div
              key={index}
              className="border border-bone-600 bg-gradient-to-br from-bone-900 to-white p-6 rounded-xl shadow-md h-fit transition-all duration-200
              flex flex-col space-y-4"
            >
              <h3 className="text-xl font-semibold text-bone-100">
                {enquiry.name}
              </h3>

              {/* Contact Information */}
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <div className="flex items-center">
                  <Mail size={16} className="text-bone-400 mr-2" />
                  <a
                    href={`mailto:${enquiry.email}`}
                    className="text-bone-200 hover:text-bone-100"
                  >
                    {enquiry.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="text-bone-400 mr-2" />
                  <a
                    href={`tel:${enquiry.phone}`}
                    className="text-bone-200 hover:text-bone-100"
                  >
                    {enquiry.phone}
                  </a>
                </div>
              </div>

              <p className="text-bone-200 text-lg">{enquiry.message}</p>
              <p className="text-bone-200 text-sm">
                Asked at:{" "}
                {format(new Date(enquiry.createdAt), "d MMMM yyyy h:mm a")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
