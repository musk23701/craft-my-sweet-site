import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const videoSources = [
  "/videos/instagram/1.mp4",
  "/videos/instagram/2.mp4",
  "/videos/instagram/3.mp4",
  "/videos/instagram/4.mp4",
  "/videos/instagram/5.mp4",
  "/videos/instagram/6.mp4",
  "/videos/instagram/7.mp4",
  "/videos/instagram/8.mp4",
  "/videos/instagram/1.mp4",
  "/videos/instagram/2.mp4",
  "/videos/instagram/3.mp4",
  "/videos/instagram/4.mp4",
  "/videos/instagram/5.mp4",
  "/videos/instagram/6.mp4",
  "/videos/instagram/7.mp4",
  "/videos/instagram/8.mp4",
];

// Starting angles for each video card in the carousel
const baseAngles = [
  75.5, 98, 120.5, 143, 165.5, 188, 210.5, 233,
  255.5, 278, 300.5, 323, 345.5, 8, 30.5, 53
];

const InstagramCarouselSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const buttonY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Auto-rotate the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.5);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="mt-10 h-[750px] relative">
      {/* Instagram Button */}
      <motion.div 
        style={{ y: buttonY }}
        className="w-[150px] h-[47px] md:w-[180px] md:h-[56px] rounded-2xl px-5 pt-3 mx-auto z-0 relative bg-primary font-extrabold mb-4 text-center cursor-pointer"
      >
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" className="w-20 h-6 fill-current text-primary-foreground">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      </motion.div>

      {/* Gradient Mask */}
      <div className="mask-gradient">
        <div className="flex items-center justify-center w-full h-full overflow-hidden">
          {/* 3D Carousel Container */}
          <div 
            className="relative w-[320px] h-[568px] -rotate-6"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1500px",
              willChange: "transform"
            }}
          >
            {videoSources.map((src, index) => (
              <div
                key={index}
                className="absolute w-[320px] h-[468px] rounded-xl overflow-hidden shadow-xl"
                style={{
                  transform: `rotateY(${baseAngles[index] + rotation}deg) translateZ(-900px)`,
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                  backfaceVisibility: "hidden"
                }}
              >
                <video
                  src={src}
                  muted
                  loop
                  playsInline
                  disablePictureInPicture
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .mask-gradient {
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }
      `}</style>
    </section>
  );
};

export default InstagramCarouselSection;
