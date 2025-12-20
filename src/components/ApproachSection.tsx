import { Search, PenTool, Wrench, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  { icon: Search, step: "01", title: "Diagnose", desc: "We analyze your workflows, tools, data, and bottlenecks." },
  { icon: PenTool, step: "02", title: "Design", desc: "We architect a custom AI + automation system tailored to your business." },
  { icon: Wrench, step: "03", title: "Build & Integrate", desc: "We implement, test, and optimize everything end-to-end." },
  { icon: TrendingUp, step: "04", title: "Scale & Optimize", desc: "We refine systems continuously as your business grows." },
];

const ApproachSection = () => {
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
    <section ref={sectionRef} className="py-12 md:py-20 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <h2
          className={`text-2xl sm:text-3xl md:text-5xl font-extrabold text-center mb-3 md:mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Our Approach
        </h2>
        <p
          className={`text-muted-foreground text-sm sm:text-base text-center mb-8 md:mb-16 max-w-xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          How Automind Labs AI transforms your operations
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className={`relative text-center group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 transition-all duration-1000 ${
                    isVisible ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  style={{ transitionDelay: `${600 + index * 200}ms`, transformOrigin: 'left' }}
                />
              )}

              <div className="relative z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <item.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                </div>
                <span className="text-[10px] md:text-xs font-bold text-primary tracking-wider animate-pulse">STEP {item.step}</span>
                <h3 className="font-bold text-base md:text-xl mt-1 md:mt-2 mb-1 md:mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
