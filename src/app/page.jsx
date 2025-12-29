import Image from "next/image";
import FaqSection from "@/components/home/faq-section";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      {/* Hero Section - improved spacing */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {" "}
          {/* Reduced max-width */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {" "}
            {/* Changed to justify-between with appropriate gap */}
            {/* Text content */}
            <div className="flex flex-col space-y-6 md:max-w-4xl">
              {" "}
              {/* Reduced vertical spacing and max-width */}
              <h1 className="text-4xl md:text-5xl font-bold lg:text-6xl text-gray-900">
                Authentic Connection. Lasting Healing.
              </h1>
              <h2 className="text-2xl lg:text-3xl text-gray-800 leading-tight">
                Empowering You to Overcome Doubt and Cultivate Meaningful Bonds
              </h2>
              <div className="flex flex-col space-y-4">
                <h3 className="text-gray-700 text-xl">
                  Feeling overwhelmed by self-doubt, emotional stress, or
                  relationship challenges?
                </h3>
                <h3 className="text-gray-700 text-xl">
                  In <span className="font-bold">Therapy with Jasdeep</span>,
                  you'll find a safe, compassionate space to explore, heal, and
                  grow. No judgment, just genuine support.
                </h3>
              </div>
              <div className="pt-4">
                <a
                  href="https://wa.me/919004025163"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#fa5719] hover:bg-giants-orange-600 text-white text-xl px-8 py-3 rounded-md inline-block transition-colors shadow-lg"
                >
                  Book a Free Discovery Call
                </a>
              </div>
            </div>
            {/* Hero image - Jasdeep's photo */}
            <div className="md:ml-4 mt-8 md:mt-0">
              <Image
                src="/therapy-connection.jpg"
                alt="Therapy with Jasdeep - Authentic Connection and Lasting Healing"
                width={450}
                height={450}
                className="rounded-2xl shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <FaqSection />
      {/* Testimonials Section */}
      <section className="text-gray-900 py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trust What Others Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm p-8 rounded-xl border border-gray-200">
              <div className="flex mb-4">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="italic mb-4 text-gray-700">
                "Jasdeep helped me gain clarity on my patterns and truly
                transform my relationships."
              </p>
              <p className="font-medium">– Anonymous</p>
            </div>

            <div className="bg-white shadow-sm p-8 rounded-xl border border-gray-200">
              <div className="flex mb-4">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="italic mb-4 text-gray-700">
                "I walked into therapy lost and overwhelmed. Jasdeep's approach
                made healing possible."
              </p>
              <p className="font-medium">– Anonymous</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-15 text-center bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Therapy isn't about fixing you—it's about helping you become the
            best version of yourself.
          </h2>
          <p className="text-gray-700 mb-8 text-xl">
            If you're ready to start your journey, let's talk.
          </p>
          <a
            href="https://wa.me/919004025163"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#fa5719] hover:bg-giants-orange-600 text-white text-xl px-8 py-4 rounded-md inline-block transition-colors"
          >
            Book a Free Discovery Call
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <Footer />
    </div>
  );
}
