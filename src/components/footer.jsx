import EnquiryForm from "./home/enquiry-form";

export default function Footer() {
  return (
    <footer className="bg-gray-100 pb-12 pt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-gray-600 mr-3">📍</span>
                <span>Based in Mumbai, available online globally.</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-3">📧</span>
                <a
                  href="mailto:jasdeepm28@gmail.com"
                  className="hover:text-[#fa5719]"
                >
                  jasdeepm28@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-3">📞</span>
                <a
                  href="https://wa.me/919004025163"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#fa5719]"
                >
                  +91 90040 25163
                </a>
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-3">🌐</span>
                <a
                  href="https://jasdeepjethani.com"
                  className="hover:text-[#fa5719]"
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

        <div className="border-t border-gray-300 mt-12 pt-6 text-center text-gray-700">
          <p>
            © {new Date().getFullYear()} Jasdeep Mago Jethani. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
