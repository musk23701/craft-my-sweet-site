import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Zap, Cog, Bot } from "lucide-react";

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
    <section ref={sectionRef} id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8">
              About <span className="text-primary">Automind Labs</span>
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Automind Labs is a cutting-edge AI automation agency dedicated to transforming the way businesses operate. 
              We specialize in building intelligent systems that automate repetitive tasks, streamline workflows, and 
              eliminate operational bottlenecks.
            </p>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our team of experts combines deep technical knowledge with strategic business insight to deliver custom 
              AI solutions that scale with your growth. From startups to enterprises, we help organizations embrace 
              the future of work — where smart systems handle the mundane, and humans focus on what truly matters: 
              innovation, creativity, and strategic growth.
            </p>
          </div>

          {/* Right Column - Animated Visual */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Central Brain Icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Brain className="w-16 h-16 text-primary" />
                </div>
              </motion.div>

              {/* Orbiting Icons */}
              {[
                { Icon: Zap, delay: 0.4, position: "top-4 left-1/2 -translate-x-1/2" },
                { Icon: Cog, delay: 0.5, position: "right-4 top-1/2 -translate-y-1/2" },
                { Icon: Bot, delay: 0.6, position: "bottom-4 left-1/2 -translate-x-1/2" },
              ].map(({ Icon, delay, position }, index) => (
                <motion.div
                  key={index}
                  className={`absolute ${position}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-xl bg-card border border-border flex items-center justify-center shadow-lg"
                    animate={isVisible ? { y: [0, -8, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </motion.div>
                </motion.div>
              ))}

              {/* Animated Rings */}
              <motion.div
                className="absolute inset-8 rounded-full border border-primary/20"
                animate={isVisible ? { rotate: 360 } : {}}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-16 rounded-full border border-primary/10"
                animate={isVisible ? { rotate: -360 } : {}}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              {/* Glowing Dots */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                  }}
                  animate={isVisible ? {
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
