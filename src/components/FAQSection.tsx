import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What makes Automind Labs AI different?",
    a: "We don't sell tools or one-off automations. We build complete AI operating systems designed around your business.",
  },
  {
    q: "Is this only for large companies?",
    a: "No. We work with startups, founders, and growing businesses ready to scale intelligently.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Security and privacy are built into every system we design.",
  },
  {
    q: "How long does implementation take?",
    a: "Timelines vary, but most core systems are deployed within weeks — not months.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-12 md:py-20 bg-card">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-center mb-8 md:mb-12">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-xl px-6 bg-background"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
