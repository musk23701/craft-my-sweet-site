import { useEffect, useRef, useState } from "react";
import { Instagram, Star } from "lucide-react";

const reviewItems = [
  {
    type: "review",
    name: "Sarah Chen",
    role: "Startup Founder",
    content: "Working with Automind was fantastic. Great margins and their operations experience is huge!",
    avatar: "SC",
  },
  {
    type: "stat",
    title: "Plumber Automation",
    value: "$599 / month",
    description: "Full workflow automation",
  },
  {
    type: "review",
    name: "Mike Johnson",
    role: "Agency Owner",
    content: "POSITIVE: Send thank you email with future discount and a link to Google review",
    avatar: "MJ",
  },
  {
    type: "stat",
    title: "Realtor Automation",
    value: "$750/month",
    description: "Lead generation & follow-up",
  },
  {
    type: "review",
    name: "Emily Davis",
    role: "SaaS CEO",
    content: "The AI agents handle customer inquiries 24/7. Our response time went from hours to seconds.",
    avatar: "ED",
  },
  {
    type: "stat",
    title: "Dental Clinic",
    value: "$25,000 / year",
    description: "Complete practice automation",
  },
  {
    type: "review",
    name: "Alex Rivera",
    role: "E-commerce Director",
    content: "Data systems gave us one source of truth. Decision-making is now instant.",
    avatar: "AR",
  },
  {
    type: "stat",
    title: "Restaurant System",
    value: "$12,500 / year",
    description: "Reservations & marketing",
  },
];

const ReviewsCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeButton, setActiveButton] = useState<'instagram' | 'youtube'>('instagram');

  useEffect(() => {
    let rotation = 0;
    let animationId: number;

    const animate = () => {
      rotation += 0.15;
      if (carouselRef.current) {
        carouselRef.current.style.transform = `rotateY(${rotation}deg)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const itemCount = reviewItems.length * 2;
  const angleStep = 360 / itemCount;
  const radius = 900;

  return (
    <section className="py-12 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Platform buttons */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setActiveButton('instagram')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold transition-all duration-300 ${
              activeButton === 'instagram'
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            <Instagram className="w-5 h-5" />
            Instagram
          </button>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative h-[600px] flex items-center justify-center mask-gradient-vertical">
          <div
            ref={carouselRef}
            className="relative w-[320px] h-[468px] -rotate-6"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1500px",
              willChange: "transform"
            }}
          >
            {[...reviewItems, ...reviewItems].map((item, index) => {
              const angle = index * angleStep;
              return (
                <div
                  key={index}
                  className="absolute w-[320px] h-[468px] rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    willChange: "transform",
                  }}
                >
                  <div className="w-full h-full bg-card border border-border p-6 flex flex-col">
                    {item.type === 'review' ? (
                      <>
                        {/* Review card */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {item.avatar}
                          </div>
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.role}</p>
                          </div>
                        </div>
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <p className="text-muted-foreground flex-1">{item.content}</p>
                      </>
                    ) : (
                      <>
                        {/* Stat card */}
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse mb-4" />
                          <p className="text-sm text-muted-foreground mb-2">{item.title}</p>
                          <p className="text-3xl font-black text-primary mb-2">{item.value}</p>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
