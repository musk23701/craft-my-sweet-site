import { useEffect, useRef, useState } from "react";
import { Instagram, Star } from "lucide-react";
const reviewItems = [{
  type: "review",
  name: "Sarah Chen",
  role: "Startup Founder",
  content: "Working with Automind was fantastic. Great margins and their operations experience is huge!",
  avatar: "SC"
}, {
  type: "stat",
  title: "Plumber Automation",
  value: "$599 / month",
  description: "Full workflow automation"
}, {
  type: "review",
  name: "Mike Johnson",
  role: "Agency Owner",
  content: "POSITIVE: Send thank you email with future discount and a link to Google review",
  avatar: "MJ"
}, {
  type: "stat",
  title: "Realtor Automation",
  value: "$750/month",
  description: "Lead generation & follow-up"
}, {
  type: "review",
  name: "Emily Davis",
  role: "SaaS CEO",
  content: "The AI agents handle customer inquiries 24/7. Our response time went from hours to seconds.",
  avatar: "ED"
}, {
  type: "stat",
  title: "Dental Clinic",
  value: "$25,000 / year",
  description: "Complete practice automation"
}, {
  type: "review",
  name: "Alex Rivera",
  role: "E-commerce Director",
  content: "Data systems gave us one source of truth. Decision-making is now instant.",
  avatar: "AR"
}, {
  type: "stat",
  title: "Restaurant System",
  value: "$12,500 / year",
  description: "Reservations & marketing"
}];
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
  return <section className="py-12 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Platform buttons */}
        

        {/* 3D Carousel Container */}
        
      </div>
    </section>;
};
export default ReviewsCarousel;