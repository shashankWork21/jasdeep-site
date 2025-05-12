import EnquiryForm from "./home/enquiry-form";

export default function Footer() {
  return (
    <footer className="bg-bone-700 pb-12 pt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-bone-100 mb-6">
              Contact Information
            </h2>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="text-bone-400 mr-3">📍</span>
                <span>Based in Mumbai, available online globally.</span>
              </li>
              <li className="flex items-start">
                <span className="text-bone-400 mr-3">📧</span>
                <a
                  href="mailto:jasdeepm28@gmail.com"
                  className="hover:text-bone-200"
                >
                  jasdeepm28@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <span className="text-bone-400 mr-3">📞</span>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start">
                <span className="text-bone-400 mr-3">🌐</span>
                <a
                  href="https://jasdeepjethani.com"
                  className="hover:text-bone-200"
                >
                  jasdeepjethani.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <EnquiryForm />
          </div>
        </div>

        <div className="border-t border-bone-300 mt-12 pt-6 text-center text-bone-100">
          <p>
            © {new Date().getFullYear()} Jasdeep Mago Jethani. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
