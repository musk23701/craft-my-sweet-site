import { Check, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const benefits = [
  "Custom-built — not generic templates",
  "AI grounded in real business data",
  "Scalable systems designed for growth",
  "Clear communication & fast execution",
  "Focus on ROI, not hype",
];

const results = [
  "Reduced operational workload",
  "Faster decision-making",
  "Lower staffing costs",
  "Increased efficiency & scalability",
  "AI that delivers measurable value",
];

const WhyUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float delay-500" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Why Automind Labs AI
            </h2>
            <p className="text-xl text-primary font-semibold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 animate-pulse" />
              Systems Over Tools. Intelligence Over Chaos.
            </p>
            <p className="text-muted-foreground mb-8">
              We build systems that actually work in production.
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div
            className={`p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-700 hover:shadow-xl hover:shadow-primary/10 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <h3 className="font-bold text-2xl mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Results Clients See
            </h3>
            <ul className="space-y-4">
              {results.map((result, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-muted-foreground">{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
