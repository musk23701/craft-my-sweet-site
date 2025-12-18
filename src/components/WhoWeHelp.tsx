import { Rocket, User, Building2, GraduationCap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const audiences = [
  { icon: Rocket, title: "Digital Businesses & Startups", desc: "Scale without the chaos" },
  { icon: User, title: "Founders & Personal Brands", desc: "Automate your growth" },
  { icon: Building2, title: "Agencies & Service Companies", desc: "Deliver more with less" },
  { icon: GraduationCap, title: "Online Educators & SaaS Teams", desc: "Focus on what matters" },
];

const WhoWeHelp = () => {
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
    <section id="about" ref={sectionRef} className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className={`text-3xl md:text-5xl font-extrabold text-center mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Who We Help
        </h2>
        <p
          className={`text-muted-foreground text-center mb-12 max-w-xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          If your business is growing but your systems are breaking — we fix that.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((item, index) => (
            <div
              key={index}
              className={`group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
