import { Bot, Workflow, Database, BarChart3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: Bot,
    title: "AI Agents & Assistants",
    desc: "Custom AI agents trained on your business data to answer questions, handle inquiries, and assist operations 24/7.",
    features: ["Internal Q&A", "Customer Support", "Sales Assistance", "Operations Help"],
    gradient: "from-cyan-500/20 to-blue-600/20",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    desc: "Design and implement automations that remove repetitive tasks and connect tools seamlessly.",
    features: ["Task Automation", "Platform Integration", "Error Reduction", "Speed Increase"],
    gradient: "from-purple-500/20 to-pink-600/20",
  },
  {
    icon: Database,
    title: "Data Systems & Analytics",
    desc: "Build centralized data pipelines, real-time dashboards, and custom reports for smarter decisions.",
    features: ["Data Pipelines", "Real-time Dashboards", "Performance Tracking", "Single Source of Truth"],
    gradient: "from-green-500/20 to-emerald-600/20",
  },
  {
    icon: BarChart3,
    title: "Custom Dashboards",
    desc: "Understand your business at a glance with dashboards showing revenue, funnels, productivity, and AI impact.",
    features: ["Revenue Metrics", "Funnel Performance", "Team Productivity", "AI Impact Analysis"],
    gradient: "from-orange-500/20 to-red-600/20",
  },
];

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className={`text-2xl sm:text-3xl md:text-5xl font-extrabold text-center mb-3 md:mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Our Core Services
        </h2>
        <p
          className={`text-muted-foreground text-sm sm:text-base text-center mb-8 md:mb-12 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          AI-Driven Systems, Built for Scale. Most companies stack tools. We build connected systems.
        </p>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group p-5 md:p-8 rounded-2xl md:rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 relative overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <service.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg md:text-2xl mb-2 md:mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6">{service.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-2 md:px-3 py-1 text-[10px] md:text-xs font-medium bg-secondary rounded-full text-secondary-foreground group-hover:bg-primary/20 transition-colors duration-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
