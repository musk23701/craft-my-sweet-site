import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFAQs } from "@/hooks/useCMSData";
import { Loader2 } from "lucide-react";

// Fallback data for when database is empty
const fallbackFaqs = [
  {
    id: '1',
    question: "What makes Automind Labs AI different?",
    answer: "We don't sell tools or one-off automations. We build complete AI operating systems designed around your business.",
  },
  {
    id: '2',
    question: "Is this only for large companies?",
    answer: "No. We work with startups, founders, and growing businesses ready to scale intelligently.",
  },
  {
    id: '3',
    question: "Is my data secure?",
    answer: "Yes. Security and privacy are built into every system we design.",
  },
  {
    id: '4',
    question: "How long does implementation take?",
    answer: "Timelines vary, but most core systems are deployed within weeks — not months.",
  },
];

const FAQSection = () => {
  const { faqs, loading } = useFAQs();
  
  const displayFaqs = faqs.length > 0 ? faqs : fallbackFaqs;

  return (
    <section id="faq" className="py-12 md:py-20 bg-card">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-center mb-8 md:mb-12">
          Frequently Asked Questions
        </h2>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {displayFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.id || index}
                value={`item-${index}`}
                className="border border-border rounded-xl px-6 bg-background"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
