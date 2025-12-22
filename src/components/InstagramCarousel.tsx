import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

// Instagram carousel images data
const instagramImages = [
  {
    id: 1,
    title: "Restaurant Automation",
    subtitle: "for $12,500 per year",
    gradient: "from-purple-600 via-pink-500 to-red-500"
  },
  {
    id: 2,
    title: "Plumber Automation",
    subtitle: "for $12,500 per year",
    gradient: "from-blue-600 via-cyan-500 to-teal-500"
  },
  {
    id: 3,
    title: "Dental Clinic Automation",
    subtitle: "for $25,000 per year",
    gradient: "from-orange-600 via-amber-500 to-yellow-500"
  },
  {
    id: 4,
    title: "Realtor Automation",
    subtitle: "for $750/month",
    gradient: "from-rose-600 via-pink-500 to-fuchsia-500"
  },
  {
    id: 5,
    title: "Plumber Automation",
    subtitle: "for $599 / month",
    gradient: "from-emerald-600 via-green-500 to-lime-500"
  },
  {
    id: 6,
    title: "E-commerce Automation",
    subtitle: "for $15,000 per year",
    gradient: "from-violet-600 via-purple-500 to-indigo-500"
  },
  {
    id: 7,
    title: "Healthcare Automation",
    subtitle: "for $20,000 per year",
    gradient: "from-sky-600 via-blue-500 to-indigo-500"
  },
  {
    id: 8,
    title: "Legal Automation",
    subtitle: "for $18,000 per year",
    gradient: "from-red-600 via-rose-500 to-pink-500"
  }
];

const InstagramCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rotation = 0;
    let animationId: number;

    const animate = () => {
      rotation -= 0.2; // Negative for right to left movement
      if (carouselRef.current) {
        carouselRef.current.style.transform = `rotateY(${rotation}deg)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const itemCount = instagramImages.length;
  const angleStep = 360 / itemCount;
  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 400 : 700;

  return (
    <section className="py-16 md:py-24 overflow-hidden bg-background relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-6 py-3 rounded-full font-bold text-sm md:text-base hover:scale-105 transition-transform duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="w-5 h-5 md:w-6 md:h-6" />
            <span>Instagram</span>
          </motion.a>
        </motion.div>

        {/* 3D Carousel Container */}
        <div 
          className="relative h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
          style={{ perspective: '1500px' }}
        >
          {/* Gradient masks for edges */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent" />
          </div>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ 
              transformStyle: 'preserve-3d',
              width: '180px',
              height: '280px'
            }}
          >
            {instagramImages.map((image, index) => {
              const angle = angleStep * index;
              return (
                <div
                  key={image.id}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[220px] sm:w-[160px] sm:h-[260px] md:w-[200px] md:h-[320px] lg:w-[240px] lg:h-[380px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {/* Card content */}
                  <div className={`w-full h-full bg-gradient-to-br ${image.gradient} p-3 md:p-4 flex flex-col justify-between relative overflow-hidden`}>
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                    
                    {/* Flow diagram placeholder */}
                    <div className="flex-1 flex items-center justify-center relative z-10">
                      <div className="w-full h-[60%] rounded-lg bg-black/20 backdrop-blur-sm border border-white/20 p-2 md:p-3">
                        <div className="space-y-1 md:space-y-2">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-1 md:gap-2">
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/60" />
                              <div className="h-1.5 md:h-2 bg-white/30 rounded flex-1" style={{ width: `${60 + Math.random() * 40}%` }} />
                            </div>
                          ))}
                        </div>
                        {/* Connection lines */}
                        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path d="M20,20 Q50,50 80,30" stroke="white" strokeWidth="0.5" fill="none" />
                          <path d="M10,60 Q40,40 90,70" stroke="white" strokeWidth="0.5" fill="none" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Title and subtitle */}
                    <div className="relative z-10 text-white mt-2">
                      <h3 className="font-bold text-xs sm:text-sm md:text-lg leading-tight">{image.title}</h3>
                      <p className="text-[10px] sm:text-xs md:text-sm opacity-90">{image.subtitle}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default InstagramCarousel;
