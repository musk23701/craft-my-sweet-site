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
        className="w-[150px] h-[47px] md:w-[180px] md:h-[56px] rounded-2xl px-5 pt-3 mx-auto z-0 relative bg-[#00B4D8] font-extrabold mb-4 text-center cursor-pointer"
      >
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          <img 
            src="/images/instagram-logo.png" 
            alt="instagram" 
            className="h-full w-auto object-contain"
          />
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
