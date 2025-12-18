import { useEffect, useRef, useState } from "react";

const partners = [
  "TechCrunch",
  "Forbes",
  "Bloomberg",
  "Wired",
  "Inc.",
  "Fast Company",
  "VentureBeat",
  "The Verge",
];

const FeaturedSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const doubledPartners = [...partners, ...partners, ...partners, ...partners];

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
    <section ref={sectionRef} className="py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className={`text-3xl md:text-5xl lg:text-6xl font-extrabold text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Featured In
        </h2>

        <div
          className={`relative mask-gradient transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="marquee-track">
            {doubledPartners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center px-8 mx-4 shrink-0"
              >
                <span className="text-xl md:text-2xl font-bold text-muted-foreground/60 whitespace-nowrap hover:text-foreground hover:scale-110 transition-all duration-300 cursor-pointer">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
