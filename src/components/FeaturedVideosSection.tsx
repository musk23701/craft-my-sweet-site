import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useVideos } from "@/hooks/useCMSData";

const videos = [
  { id: 1, position: { top: "10vh", left: "5vw" }, mobilePosition: { top: "5vh", left: "5vw" }, zIndex: 50 },
  { id: 2, position: { top: "70vh", left: "65vw" }, mobilePosition: { top: "55vh", left: "55vw" }, zIndex: 50 },
  { id: 3, position: { top: "20vh", left: "70vw" }, mobilePosition: { top: "15vh", left: "55vw" }, zIndex: 50 },
  { id: 4, position: { top: "40vh", left: "50vw" }, mobilePosition: { top: "35vh", left: "30vw" }, zIndex: 50 },
  { id: 5, position: { top: "75vh", left: "6vw" }, mobilePosition: { top: "65vh", left: "5vw" }, zIndex: 30 },
  { id: 6, position: { top: "25vh", left: "80vw" }, mobilePosition: { top: "25vh", left: "65vw" }, zIndex: 30 },
  { id: 7, position: { top: "30vh", left: "15vw" }, mobilePosition: { top: "45vh", left: "5vw" }, zIndex: 30 },
];

const VideoPlaceholder = ({ index, videoUrl }: { index: number; videoUrl?: string }) => {
  const colors = [
    "from-primary/40 to-primary/20",
    "from-cyan-500/40 to-blue-500/20",
    "from-purple-500/40 to-pink-500/20",
    "from-emerald-500/40 to-teal-500/20",
    "from-orange-500/40 to-red-500/20",
    "from-indigo-500/40 to-violet-500/20",
    "from-rose-500/40 to-pink-500/20",
  ];

  if (videoUrl) {
    return (
      <video
        src={videoUrl}
        className="w-full h-full object-cover rounded-xl"
        muted
        loop
        playsInline
        autoPlay
      />
    );
  }
  
  return (
    <div className={`w-full h-full bg-gradient-to-br ${colors[index % colors.length]} rounded-xl flex items-center justify-center`}>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-white/20 flex items-center justify-center">
          <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1" />
        </div>
        <span className="text-white/70 text-sm font-medium">Video {index + 1}</span>
      </div>
    </div>
  );
};

const FeaturedVideosSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const buttonY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const { videos: tiktokVideos } = useVideos('tiktok');

  // Check if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section ref={containerRef} className="relative mx-auto mt-10 h-[100vh] md:h-[130vh] lg:h-[180vh] overflow-hidden">
      {/* TikTok Button - styled like Instagram/YouTube badges */}
      <motion.div 
        style={{ y: buttonY }}
        className="w-[170px] h-[47px] md:w-[200px] md:h-[56px] rounded-2xl px-5 mx-auto z-50 relative bg-black font-extrabold mb-4 text-center cursor-pointer flex items-center justify-center gap-2 border border-cyan-400"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
        <span className="text-white text-lg font-bold">TikTok</span>
      </motion.div>

      {/* Gradient Mask */}
      <div className="mask-gradient">
        <div className="relative w-full h-[100vh] md:h-[150vh] overflow-hidden bg-background">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-[120px] sm:w-[170px] md:w-[250px] lg:w-[300px] xl:w-[350px] h-[200px] sm:h-[280px] md:h-[440px] lg:h-[530px] xl:h-[620px] rounded-xl shadow-lg overflow-hidden"
              style={{
                position: "absolute",
                top: isMobile ? video.mobilePosition.top : video.position.top,
                left: isMobile ? video.mobilePosition.left : video.position.left,
                zIndex: video.zIndex,
              }}
            >
              <VideoPlaceholder 
                index={index} 
                videoUrl={tiktokVideos[index]?.video_url}
              />
            </motion.div>
          ))}
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

export default FeaturedVideosSection;
