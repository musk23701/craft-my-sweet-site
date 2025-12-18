import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const videoSources = [
  "/videos/instagram/1.mp4",
  "/videos/instagram/2.mp4",
  "/videos/instagram/3.mp4",
  "/videos/instagram/4.mp4",
  "/videos/instagram/5.mp4",
  "/videos/instagram/6.mp4",
  "/videos/instagram/7.mp4",
  "/videos/instagram/8.mp4",
];

const ReviewsCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const buttonY = useTransform(scrollYProgress, [0, 1], [0, 500]);

  useEffect(() => {
    let rotation = 141;
    let animationId: number;

    const animate = () => {
      rotation += 0.15;
      if (carouselRef.current) {
        const cards = carouselRef.current.querySelectorAll('.carousel-card');
        cards.forEach((card, index) => {
          const angle = rotation + (index * 22.5);
          (card as HTMLElement).style.transform = `rotateY(${angle}deg) translateZ(-900px)`;
        });
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Create 16 video cards (8 videos repeated twice)
  const allVideos = [...videoSources, ...videoSources];

  return (
    <div ref={containerRef} className="mt-10 h-[750px] relative">
      {/* Instagram Button */}
      <motion.div 
        style={{ y: buttonY }}
        className="w-[150px] h-[47px] md:w-[180px] md:h-[56px] rounded-2xl px-5 pt-3 mx-auto z-0 relative bg-primary font-extrabold mb-4 text-center cursor-pointer"
      >
        <img 
          alt="instagram" 
          loading="lazy" 
          width="1200" 
          height="288" 
          decoding="async"
          className="w-full h-auto object-contain"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </motion.div>

      {/* Mask Gradient Container */}
      <div className="mask-gradient">
        <div className="flex items-center justify-center w-full h-full overflow-hidden">
          {/* 3D Carousel */}
          <div 
            ref={carouselRef}
            className="relative w-[320px] h-[568px] -rotate-6"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1500px",
              willChange: "transform"
            }}
          >
            {allVideos.map((videoSrc, index) => {
              const initialAngle = 141 + (index * 22.5);
              return (
                <div
                  key={index}
                  className="carousel-card absolute w-[320px] h-[468px] rounded-xl overflow-hidden shadow-xl"
                  style={{
                    transform: `rotateY(${initialAngle}deg) translateZ(-900px)`,
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <video
                    src={videoSrc}
                    muted
                    loop
                    playsInline
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
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
          height: calc(100% - 60px);
        }
      `}</style>
    </div>
  );
};

export default ReviewsCarousel;
