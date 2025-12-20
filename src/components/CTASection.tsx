import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowRight, Mail, Phone, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-12 md:py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          Let's Build Something Amazing
        </div>

        <h2
          className={`text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Ready to Automate, Scale, and Think Smarter?
        </h2>
        <p
          className={`text-muted-foreground text-sm sm:text-base mb-6 md:mb-8 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          If you're serious about building AI systems that drive real results, let's talk.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 md:mb-8 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link to="/booking" className="w-full sm:w-auto flex justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base rounded-full animate-pulse-glow hover:scale-105 transition-transform w-full sm:w-auto"
            >
              <Phone className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Book Your Free Strategy Call
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
        </div>

        <a
          href="mailto:Info@automindlabs.ai"
          className={`inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-700 delay-400 hover:scale-105 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Mail className="w-5 h-5" />
          Info@automindlabs.ai
        </a>
      </div>
    </section>
  );
};

export default CTASection;
