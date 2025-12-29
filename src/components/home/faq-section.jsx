import FaqCard from "./faq-card";
import { faqs } from "./faqs";

export default function FaqSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Therapy can feel intimidating, but it doesn't have to be. Here's what
          to expect:
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {faqs.map((faq, index) => (
            <FaqCard key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
