import { useEffect, useRef, useState } from "react";

const AboutUsSection = () => {
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
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2
          className={`text-3xl md:text-5xl font-extrabold mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          About <span className="text-primary">Automind Labs</span>
        </h2>
        
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Automind Labs is a cutting-edge AI automation agency dedicated to transforming the way businesses operate. 
            We specialize in building intelligent systems that automate repetitive tasks, streamline workflows, and 
            eliminate operational bottlenecks. Our team of experts combines deep technical knowledge with strategic 
            business insight to deliver custom AI solutions that scale with your growth. From startups to enterprises, 
            we help organizations embrace the future of work — where smart systems handle the mundane, and humans 
            focus on what truly matters: innovation, creativity, and strategic growth.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
