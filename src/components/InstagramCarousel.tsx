import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

// Instagram carousel images data
const instagramImages = [{
  id: 1,
  title: "Restaurant Automation",
  subtitle: "for $12,500 per year",
  gradient: "from-purple-600 via-pink-500 to-red-500"
}, {
  id: 2,
  title: "Plumber Automation",
  subtitle: "for $12,500 per year",
  gradient: "from-blue-600 via-cyan-500 to-teal-500"
}, {
  id: 3,
  title: "Dental Clinic Automation",
  subtitle: "for $25,000 per year",
  gradient: "from-orange-600 via-amber-500 to-yellow-500"
}, {
  id: 4,
  title: "Realtor Automation",
  subtitle: "for $750/month",
  gradient: "from-rose-600 via-pink-500 to-fuchsia-500"
}, {
  id: 5,
  title: "Plumber Automation",
  subtitle: "for $599 / month",
  gradient: "from-emerald-600 via-green-500 to-lime-500"
}, {
  id: 6,
  title: "E-commerce Automation",
  subtitle: "for $15,000 per year",
  gradient: "from-violet-600 via-purple-500 to-indigo-500"
}, {
  id: 7,
  title: "Healthcare Automation",
  subtitle: "for $20,000 per year",
  gradient: "from-sky-600 via-blue-500 to-indigo-500"
}, {
  id: 8,
  title: "Legal Automation",
  subtitle: "for $18,000 per year",
  gradient: "from-red-600 via-rose-500 to-pink-500"
}];
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
  return;
};
export default InstagramCarousel;