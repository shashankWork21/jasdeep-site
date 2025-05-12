import Link from "next/link";
import Header from "@/components/header";
import {
  Search,
  Phone,
  Check,
  X,
  MessageCircle,
  Users,
  User,
  Heart,
  Clock,
  ArrowRight,
  BrainCircuit,
} from "lucide-react";
import Footer from "@/components/footer";
// import AnonymousQueryForm from "@/components/anonymous-query-form";

export default function TherapyPage() {
  return (
    <div className="min-h-screen bg-bone-700">
      <Header />
      <section className=" text-bone-200 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Therapy with Jasdeep
          </h1>
        </div>
      </section>

      {/* What is Therapy Section */}
      <section className="py-12 md:py-16 text-bone-200">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center mb-6">
            <Heart size={24} className="text-giants-orange mr-3" />
            <h2 className="text-3xl font-bold text-bone-100">
              What is Therapy?
            </h2>
          </div>

          <div className="bg-white bg-opacity-60 shadow-sm p-8 rounded-xl mb-16">
            <p className="text-lg text-bone-100 leading-relaxed">
              Therapy is a collaborative process designed to help you gain
              insight, develop coping strategies, and create meaningful change
              in your life. It's a safe, judgment-free space where you can
              explore your thoughts, emotions, and behaviors with professional
              guidance. Whether you're facing anxiety, relationship challenges,
              past trauma, or simply seeking personal growth, therapy offers the
              tools and support to navigate your journey.
            </p>
          </div>

          {/* Discovery Call Section */}
          <div className="flex items-center mb-6">
            <Phone size={24} className="text-giants-orange mr-3" />
            <h2 className="text-3xl font-bold text-bone-100">
              What is a Discovery Call?
            </h2>
          </div>

          <div className="bg-white bg-opacity-60 shadow-sm p-8 rounded-xl mb-8">
            <p className="text-lg text-bone-100 leading-relaxed mb-8">
              A discovery call is a 15-20 minute initial conversation to help
              you understand if therapy with Jasdeep is the right fit for you.
              During this call, you can share a bit about what brings you to
              therapy, ask any questions about the process, and discuss next
              steps. It's an opportunity to ensure that you feel comfortable and
              aligned with Jasdeep's therapeutic approach before beginning
              sessions.
            </p>

            <div className="text-center">
              <Link
                href="/calendar"
                className="bg-giants-orange hover:bg-giants-orange-300 text-white text-xl font-medium px-8 py-3 rounded-md inline-block transition-colors shadow-md"
              >
                Book a Discovery Call Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Therapy Approach Section */}
      <section className="py-12 text-bone-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center mb-8">
            <BrainCircuit size={24} className="text-giants-orange mr-3" />
            <h2 className="text-3xl font-bold">
              Jasdeep's Therapy Approach & Modalities
            </h2>
          </div>

          <p className="text-lg mb-8 leading-relaxed">
            Therapy isn't just about talking—it's about understanding the "why"
            behind your struggles and actively transforming them. As a
            psychodynamic and psychoanalytic therapist, Jasdeep works with the
            past as a tool to uncover patterns that shape your present.
          </p>

          <div className="bg-white bg-opacity-60 shadow-sm p-8 rounded-xl mb-10 text-lg">
            <h3 className="text-2xl font-semibold mb-4">
              This approach helps you:
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-giants-orange text-xl mr-3">🔍</span>
                <span>
                  Recognize unconscious patterns that influence your emotions,
                  relationships, and decisions.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-giants-orange text-xl mr-3">👶</span>
                <span>
                  Access and heal the wounded inner child—the part of you
                  carrying unresolved pain, fear, and unmet needs.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-giants-orange text-xl mr-3">🌱</span>
                <span>
                  Learn, adapt, and grow using past insights to make empowered
                  choices today.
                </span>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-4">
            To create deep, lasting change, Jasdeep integrates:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-lg">
            <div className="bg-white bg-opacity-60 shadow-sm p-6 rounded-xl">
              <h4 className="font-medium mb-2">Inner Child Healing</h4>
              <p className="text-bone-200">
                Understanding and nurturing the younger parts of yourself that
                still seek safety and validation.
              </p>
            </div>
            <div className="bg-white bg-opacity-60 shadow-sm p-6 rounded-xl">
              <h4 className="font-medium mb-2">Somatic Exercises</h4>
              <p className="text-bone-200">
                Connecting the mind and body to release stored trauma and
                regulate emotions.
              </p>
            </div>
            <div className="bg-white bg-opacity-60 shadow-sm p-6 rounded-xl">
              <h4 className="font-medium mb-2">Trauma-Informed Therapy</h4>
              <p className="text-bone-200">
                Providing a safe space to explore past wounds while focusing on
                present resilience.
              </p>
            </div>
          </div>

          <div className="bg-white bg-opacity-60 shadow-sm p-8 rounded-xl mb-6 text-lg">
            <h3 className="text-xl font-semibold mb-4">
              This approach is ideal if you're struggling with:
            </h3>
            <ul className="space-y-3 list-disc list-inside">
              <li className="flex items-start">
                Repeating the same unhealthy relationship patterns.
              </li>
              <li className="flex items-start">
                Feeling emotionally stuck but unsure why.
              </li>
              <li className="flex items-start">
                Childhood wounds that still impact your adult life
              </li>
              <li className="flex items-start">
                A deep desire for self-awareness and emotional healing.
              </li>
            </ul>
          </div>

          <p className="text-xl font-medium text-center italic">
            Therapy isn't just about "getting over" the past—it's about
            reclaiming your present and future.
          </p>
        </div>
      </section>

      {/* Expectations Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-lg">
            <div>
              <div className="flex items-center mb-6">
                <Check size={24} className="text-green-600 mr-3" />
                <h3 className="text-2xl font-bold text-bone-100">
                  What Can You Expect
                </h3>
              </div>

              <div className="bg-white bg-opacity-60 shadow-sm p-6 rounded-xl">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check
                      size={18}
                      className="text-green-600 mt-1 mr-3 flex-shrink-0"
                    />
                    <span className="text-bone-200">
                      A warm, empathetic, and non-judgmental environment where
                      you can be yourself.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check
                      size={18}
                      className="text-green-600 mt-1 mr-3 flex-shrink-0"
                    />
                    <span className="text-bone-200">
                      A science-backed, trauma-informed approach that integrates
                      neuropsychology and emotional intelligence.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check
                      size={18}
                      className="text-green-600 mt-1 mr-3 flex-shrink-0"
                    />
                    <span className="text-bone-200">
                      Active collaboration in setting goals and working toward
                      meaningful personal or relational growth.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check
                      size={18}
                      className="text-green-600 mt-1 mr-3 flex-shrink-0"
                    />
                    <span className="text-bone-200">
                      Practical tools and techniques to help you navigate
                      challenges and build emotional resilience.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check
                      size={18}
                      className="text-green-600 mt-1 mr-3 flex-shrink-0"
                    />
                    <span className="text-bone-200">
                      A focus on self-awareness, behavioral patterns, and
                      relational dynamics to create long-lasting change.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <X size={24} className="text-red-600 mr-3" />
                <h3 className="text-2xl font-bold text-bone-100">
                  What NOT to Expect
                </h3>
              </div>

              <div className="bg-white bg-opacity-60 p-6 rounded-xl shadow-sm">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <X
                      size={18}
                      className="text-red-600 mt-1 mr-3 flex-shrink-0"
                    />
                    <span className="text-bone-200">
                      Quick fixes or instant solutions—therapy is a process that
                      unfolds over time.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <X
                      size={18}
                      className="text-red-600 mt-1 mr-3 flex-shrink-0"
                    />
                    <span className="text-bone-200">
                      Generic advice or one-size-fits-all approaches—each
                      session is tailored to your unique needs.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <X
                      size={18}
                      className="text-red-600 mt-1 mr-3 flex-shrink-0"
                    />
                    <span className="text-bone-200">
                      A passive listener—Jasdeep actively engages in the
                      therapeutic process to challenge and support you.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <X
                      size={18}
                      className="text-red-600 mt-1 mr-3 flex-shrink-0"
                    />
                    <span className="text-bone-200">
                      Diagnosing or prescribing medication—while Jasdeep can
                      help you understand mental health conditions, she is not a
                      psychiatrist.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Come Section */}
      <section className="py-16 text-bone-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-lg">
          <div className="flex items-center mb-8">
            <Users size={24} className="text-giants-orange mr-3" />
            <h2 className="text-3xl font-bold">
              Who Should Come to Jasdeep for Therapy?
            </h2>
          </div>

          <p className="text-lg mb-6">
            Jasdeep works with individuals and couples navigating:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white bg-opacity-60 shadow-sm p-6 rounded-xl">
              <p>Anxiety, stress, and emotional regulation challenges.</p>
            </div>
            <div className="bg-white bg-opacity-60 shadow-sm p-6 rounded-xl">
              <p>
                Relationship struggles, including communication breakdowns and
                trust issues.
              </p>
            </div>
            <div className="bg-white bg-opacity-60 shadow-sm p-6 rounded-xl">
              <p>
                Premarital concerns or strengthening a marriage/partnership.
              </p>
            </div>
            <div className="bg-white bg-opacity-60 shadow-sm p-6 rounded-xl">
              <p>Trauma, past experiences, and self-worth exploration.</p>
            </div>
            <div className="bg-white bg-opacity-60 shadow-sm p-6 rounded-xl">
              <p>
                Workplace stress, burnout, and emotional intelligence
                development.
              </p>
            </div>
            <div className="bg-white bg-opacity-60 shadow-sm p-6 rounded-xl">
              <p>Life transitions, personal growth, and self-discovery.</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-6">
            Individual Therapy vs. Couples Therapy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-60 shadow-sm p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <User size={20} className="text-giants-orange mr-2" />
                <h4 className="text-xl font-medium">Individual Therapy</h4>
              </div>
              <p className="text-bone-200">
                A space for self-exploration, healing, and personal growth. It
                helps address emotions, thought patterns, and behaviors that
                impact your well-being. Sessions focus on building
                self-awareness, coping strategies, and emotional resilience.
              </p>
            </div>

            <div className="bg-white bg-opacity-60 shadow-sm p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Users size={20} className="text-giants-orange mr-2" />
                <h4 className="text-xl font-medium">Couples Therapy</h4>
              </div>
              <p className="text-bone-200">
                Designed for partners who want to improve their relationship,
                resolve conflicts, or rebuild trust. Sessions focus on
                communication, emotional connection, and navigating challenges
                together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <Link
            href="/calendar"
            className="bg-giants-orange hover:bg-giants-orange-300 text-white text-lg font-medium px-8 py-3 rounded-md inline-flex items-center transition-colors shadow-md"
          >
            BOOK A DISCOVERY CALL NOW
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
