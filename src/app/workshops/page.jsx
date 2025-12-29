import Header from "@/components/header";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Users,
  Bell,
  ArrowRight,
  Check,
  BookOpen,
} from "lucide-react";
import Footer from "@/components/footer";

export default function WorkshopsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-16 pb-12 md:pt-20 md:pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Workshops with Jasdeep
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Transformative group experiences designed to deepen your
              understanding of yourself and your relationships
            </p>
          </div>
        </div>
      </section>

      {/* Relationship Series Section */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="bg-white rounded-xl p-8 md:p-10 shadow-sm border border-gray-200 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Navigating Relationships: A 5-Part Series
            </h2>

            <p className="text-lg text-gray-700 mb-10">
              Relationships thrive on trust, communication, and self-awareness.
              This 5-part series is designed to help individuals and couples
              explore, understand, and strengthen their connections through
              practical tools, guided reflections, and deep conversations.
            </p>

            {/* Workshop 1 */}
            <div className="mb-12 border-b border-gray-200 pb-10">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-[#fa5719] flex items-center justify-center text-white font-bold mr-4">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Trust & Safety: The Invisible Foundation
                </h3>
              </div>

              <p className="text-gray-700 pl-14">
                Every strong relationship—whether romantic, familial, or
                professional—rests on trust. This workshop explores how trust is
                built, broken, and rebuilt, helping you create emotional safety
                in all your connections. Learn to navigate insecurities,
                recognize trust patterns, and foster relationships where
                everyone feels valued and secure.
              </p>
            </div>

            {/* Workshop 2 */}
            <div className="mb-12 border-b border-gray-200 pb-10">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-[#fa5719] flex items-center justify-center text-white font-bold mr-4">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Communication: What's Left Unsaid
                </h3>
              </div>

              <p className="text-gray-700 pl-14">
                Words can connect or divide us. This session unpacks the art of
                effective communication—how to express needs without blame,
                handle tough conversations, and truly listen. Whether with
                family, friends, or colleagues, discover practical tools to
                reduce misunderstandings, improve clarity, and strengthen
                emotional connections in all areas of life.
              </p>
            </div>

            {/* Workshop 3 */}
            <div className="mb-12 border-b border-gray-200 pb-10">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-[#fa5719] flex items-center justify-center text-white font-bold mr-4">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Core Beliefs: Rewriting Your Relationship Story
                </h3>
              </div>

              <p className="text-gray-700 pl-14">
                Our beliefs about connection, conflict, and commitment are
                shaped by past experiences. This workshop helps you uncover
                hidden patterns influencing your relationships, challenge
                limiting beliefs, and consciously redefine how you engage with
                others—ensuring your relationships align with your values and
                authentic self.
              </p>
            </div>

            {/* Workshop 4 */}
            <div className="mb-12 border-b border-gray-200 pb-10">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-[#fa5719] flex items-center justify-center text-white font-bold mr-4">
                  4
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Intimacy & Love Languages: Beyond the Surface
                </h3>
              </div>

              <p className="text-gray-700 pl-14">
                Intimacy isn't just physical—it's emotional, intellectual, and
                psychological. This workshop explores the different ways we
                connect and how love languages shape relationships of all kinds.
                Learn to recognize what makes you and others feel valued,
                fostering deeper and more meaningful connections in every aspect
                of life.
              </p>
            </div>

            {/* Workshop 5 */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-[#fa5719] flex items-center justify-center text-white font-bold mr-4">
                  5
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Conflict to Connection: Transforming Disagreements
                </h3>
              </div>

              <p className="text-gray-700 pl-14">
                Conflict is inevitable, but disconnection isn't. This workshop
                shifts your perspective on conflict, showing how
                disagreements—whether with family, friends, or colleagues—can
                strengthen relationships instead of damaging them. Learn healthy
                conflict styles, de-escalation techniques, and how to turn
                tension into opportunities for understanding and connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Workshops Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="bg-white rounded-xl p-8 md:p-10 shadow-sm">
            <div className="flex items-center mb-6">
              <BookOpen className="text-[#fa5719] mr-3" size={28} />
              <h2 className="text-3xl font-bold text-gray-900">
                Other Workshops by Jasdeep
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-8">
              Jasdeep also conducts workshops for corporates, schools, and
              colleges, covering various aspects of mental health, emotional
              intelligence, and well-being. Some of her signature workshops
              include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-gray-50 p-6 rounded-lg border-l-4  border-[#fa5719]">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Burnout & Workplace Mental Health
                </h3>
                <p className="text-gray-700">
                  Strategies to manage stress and build resilience in
                  professional settings.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#fa5719]">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Emotional Intelligence for Leaders
                </h3>
                <p className="text-gray-700">
                  Helping managers and teams enhance self-awareness, empathy,
                  and communication.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#fa5719]">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Mental Health Awareness for Schools & Colleges
                </h3>
                <p className="text-gray-700">
                  Equipping students and educators with tools for emotional
                  well-being.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#fa5719]">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Stress & Anxiety Management
                </h3>
                <p className="text-gray-700">
                  Practical exercises and mindfulness techniques to cope with
                  everyday stressors.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#fa5719]">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Healthy Boundaries & Assertiveness
                </h3>
                <p className="text-gray-700">
                  Learning to say no without guilt and communicate effectively
                  in all aspects of life.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#fa5719]">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Art Therapy for Emotional Healing
                </h3>
                <p className="text-gray-700">
                  Using creative expression as a tool for self-discovery and
                  mental wellness.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#fa5719]">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Mental Skills Training
                </h3>
                <p className="text-gray-700">
                  Overcoming procrastination, improving time management, and
                  enhancing focus.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#fa5719]">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Overcoming Stress & Anxiety with Neuropsychological Techniques
                </h3>
                <p className="text-gray-700">
                  Evidence-based strategies to manage and rewire stress
                  responses.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700">
                If you'd like to invite Jasdeep as a speaker for your
                organization or institute, book a workshop discovery call to
                discuss workshop customization and further details.
              </p>
            </div>

            <div className="flex justify-center">
              <a
                href="https://wa.me/919004025163"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#fa5719] hover:bg-[#fb7a47] text-white font-medium px-8 py-3 rounded-md inline-flex items-center transition-colors"
              >
                BOOK A WORKSHOP DISCOVERY CALL
                <ArrowRight size={18} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
