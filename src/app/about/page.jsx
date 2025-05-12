import Image from "next/image";
import Header from "@/components/header";
import { GraduationCap, Brain, Heart, Users, Quote } from "lucide-react";
import Footer from "@/components/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-bone-700">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
          {/* Personal Story */}
          <section className="mb-16">
            <h1 className="text-4xl md:text-5xl w-full text-center font-bold mb-12 text-bone-200">
              About Jasdeep
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-center text-bone-200">
              A therapist who believes in the power of authentic connection and
              the healing that comes from truly being seen.
            </p>
            <p className="text-xl text-bone-100 mb-6">
              Jasdeep never set out to become a therapist in the conventional
              sense. What began as a deep curiosity about the human mind,
              emotions, and relationships slowly evolved into a lifelong
              commitment—to understand people, to hold space for them, and to
              help them reconnect with the parts of themselves they'd forgotten
              or pushed away.
            </p>

            <div className="relative my-10 md:my-16 px-6 md:px-12 py-8 bg-gradient-to-br from-white to-old-lace-900 rounded-xl">
              <Quote
                className="absolute text-bone-200 top-4 left-4"
                size={24}
              />
              <p className="text-xl md:text-3xl font-bold text-bone-200 text-center">
                "At the heart of every psychological concern lies a version of
                the self shaped by those we have loved and those who raised us."
              </p>
            </div>
          </section>

          {/* Education & Training */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <GraduationCap className="text-giants-orange mr-3" size={28} />
              <h2 className="text-3xl font-semibold text-bone-100">
                Education & Training
              </h2>
            </div>

            <div className="space-y-6 text-bone-200">
              <div className="bg-gradient-to-br from-white to-old-lace-900 p-6 rounded-lg border border-bone-700">
                <h3 className="text-xl font-medium text-bone-100 mb-2 ">
                  Academic Qualifications
                </h3>
                <p className="text-lg">
                  Master's degree in Clinical Neuropsychology from Bangor
                  University, Wales (UK)
                </p>
                <p className="text-lg">
                  Diploma in Emotional Intelligence & Brain-Based Coaching from
                  the NeuroLeadership Institute, Australia
                </p>
              </div>

              <div className="bg-gradient-to-br from-white to-old-lace-900 p-6 rounded-lg border border-bone-700">
                <h3 className="text-xl font-medium text-bone-100 mb-2 ">
                  Therapeutic Training
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-lg">
                  <li>Psychoanalytic and Psychodynamic Therapy</li>
                  <li>Cognitive Behavioural Therapy (CBT)</li>
                  <li>Narrative Therapy (Externalisation Approach)</li>
                  <li>Gestalt Approach</li>
                  <li>Bowenian Model for Couples</li>
                  <li>
                    Specialized Training for Working with Child Sexual Abuse
                    Survivors
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Brain className="text-giants-orange mr-3" size={28} />
              <h2 className="text-3xl font-semibold text-bone-100">
                Professional Experience
              </h2>
            </div>

            <div className="space-y-8 text-bone-200 text-lg">
              <p>
                Her early years were spent working in neurorehabilitation,
                supporting stroke, dementia, and epilepsy patients—gaining
                first-hand insight into how deeply our emotional and relational
                worlds are impacted when the brain undergoes change.
              </p>

              <div className="bg-gradient-to-br from-white to-old-lace-900 p-6 rounded-lg border-l-4 border-bone border ">
                <h3 className="text-xl font-medium text-bone-100 mb-2">
                  Leadership in Mental Health
                </h3>
                <p>
                  For six years, Jasdeep led Invisible Illness India, a mental
                  health organisation focused on preventing suicides in
                  workplaces. Through this, she worked closely with leaders and
                  teams across industries, using emotional intelligence as a
                  tool to create systemic change from within.
                </p>
              </div>

              <div className="bg-gradient-to-br from-white to-old-lace-900 p-6 rounded-lg border-l-4 border-bone border">
                <h3 className="text-xl font-medium text-bone-100 mb-2">
                  Community Impact
                </h3>
                <p>
                  She ran a subsidised mental wellness clinic in Mumbai and
                  partnered with Prafulta to offer free support groups for young
                  adults facing mental health challenges—ensuring therapy was
                  accessible, not just aspirational.
                </p>
              </div>

              <div className="bg-gradient-to-br from-white to-old-lace-900 p-6 rounded-lg border-l-4 border-bone border">
                <h3 className="text-xl font-medium text-bone-100 mb-2">
                  Workshop Facilitation
                </h3>
                <p>
                  Over the last decade, Jasdeep has curated and facilitated over
                  500 workshops across India with some of the biggest names in
                  the corporate and education sectors. Her workshops blend
                  psychological insight with lived human experience—making them
                  impactful, real, and deeply personal.
                </p>
              </div>
            </div>
          </section>

          {/* Approach */}
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Heart className="text-giants-orange mr-3" size={28} />
              <h2 className="text-3xl font-semibold text-bone-100">
                Therapeutic Approach
              </h2>
            </div>

            <div className="space-y-6 text-bone-200 text-lg">
              <p>
                Through her private therapy practice, Jasdeep has worked with
                adults from their 20s to their 50s—individuals navigating a wide
                range of experiences: bipolar disorder, borderline personality
                disorder, narcissistic traits, anxiety, depression, and
                everything in between.
              </p>

              <p>
                But no matter the diagnosis or label, Jasdeep's core focus
                remained the same: exploring how our relationships shape who we
                become. Whether it's the parent-child dynamic, the complexities
                of romantic love, or the quiet pain in friendships and sibling
                bonds, Jasdeep's lens has always been relational.
              </p>

              <p>
                Now, with over a decade of experience, she's placing
                interpersonal relationships front and centre in her practice.
                Because when relationships falter—whether romantic, familial, or
                internal—the consequences ripple across generations.
              </p>
            </div>
          </section>

          {/* Philosophy */}
          <section className="mb-10 text-lg">
            <div className="flex items-center mb-8">
              <Users className="text-giants-orange mr-3" size={28} />
              <h2 className="text-3xl font-semibold text-bone-100">
                Philosophy
              </h2>
            </div>

            <p className="text-bone-200 mb-10">
              Her work now is devoted to redefining what love, commitment, and
              connection can look like in today's world. Not through idealism,
              but through honest exploration, practical tools, and deep
              emotional work.
            </p>

            <div className="bg-gradient-to-br from-white to-old-lace-900 shadow-sm text-bone-200 p-8 rounded-xl border border-bone-700">
              <Quote className="text-bone-200 mb-2" size={32} />
              <p className="text-2xl md:text-3xl font-bold">
                "I don't believe in labels. I believe in people. People who need
                to be loved, understood, and shown a way back to themselves."
              </p>
              <p className="mt-4 text-center text-bone-200 text-lg">
                This isn't just her philosophy—it's the energy she brings into
                every session, every group, and every space she holds.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
