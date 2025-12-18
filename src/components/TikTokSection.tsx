import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const videoPositions = [
  { top: "10vh", left: "0vw", width: "200px", height: "350px", rotate: -6 },
  { top: "20vh", left: "20vw", width: "180px", height: "320px", rotate: 3 },
  { top: "5vh", left: "40vw", width: "220px", height: "380px", rotate: -4 },
  { top: "15vh", left: "60vw", width: "190px", height: "340px", rotate: 5 },
  { top: "8vh", left: "80vw", width: "210px", height: "360px", rotate: -3 },
];

const TikTokSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const buttonY = useTransform(scrollYProgress, [0, 1], [0, 500]);

  return (
    <section ref={containerRef} className="relative h-[600px] overflow-hidden">
      {/* TikTok Button */}
      <motion.div 
        style={{ y: buttonY }}
        className="absolute left-1/2 -translate-x-1/2 top-10 z-20"
      >
        <a 
          href="https://tiktok.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-[150px] h-[47px] md:w-[180px] md:h-[56px] rounded-2xl px-5 py-3 bg-[#00B4D8] font-extrabold text-center cursor-pointer flex items-center justify-center gap-2"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-white">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
          <span className="text-white font-bold">TikTok</span>
        </a>
      </motion.div>

      {/* Floating Video Cards */}
      {videoPositions.map((pos, index) => (
        <motion.div
          key={index}
          className="absolute rounded-xl overflow-hidden shadow-2xl"
          style={{
            top: pos.top,
            left: pos.left,
            width: pos.width,
            height: pos.height,
            rotate: pos.rotate,
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <video
            src={`/videos/tiktok/${index + 1}.mp4`}
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
    </section>
  );
};

export default TikTokSection;
