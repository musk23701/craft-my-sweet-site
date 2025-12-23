import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useVideos } from "@/hooks/useCMSData";
import { Youtube } from "lucide-react";

interface FeaturedVideosSectionProps {
  platform?: 'youtube' | 'tiktok';
}

const videoPositions = [
  { id: 1, position: { top: "10vh", left: "5vw" }, mobilePosition: { top: "5vh", left: "5vw" }, zIndex: 50 },
  { id: 2, position: { top: "70vh", left: "65vw" }, mobilePosition: { top: "55vh", left: "55vw" }, zIndex: 50 },
  { id: 3, position: { top: "20vh", left: "70vw" }, mobilePosition: { top: "15vh", left: "55vw" }, zIndex: 50 },
  { id: 4, position: { top: "40vh", left: "50vw" }, mobilePosition: { top: "35vh", left: "30vw" }, zIndex: 50 },
  { id: 5, position: { top: "75vh", left: "6vw" }, mobilePosition: { top: "65vh", left: "5vw" }, zIndex: 30 },
  { id: 6, position: { top: "25vh", left: "80vw" }, mobilePosition: { top: "25vh", left: "65vw" }, zIndex: 30 },
  { id: 7, position: { top: "30vh", left: "15vw" }, mobilePosition: { top: "45vh", left: "5vw" }, zIndex: 30 },
];

// Fallback YouTube videos
const fallbackYoutubeVideos = [
  '/videos/youtube/1.mp4',
  '/videos/youtube/2.mp4',
  '/videos/youtube/3.mp4',
  '/videos/youtube/4.mp4',
  '/videos/youtube/5.mp4',
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

// Horizontal marquee for YouTube
const YouTubeCarousel = ({ videos }: { videos: string[] }) => {
  return (
    <div className="mask-gradient overflow-hidden py-8">
      <div 
        className="youtube-marquee flex"
        style={{
          width: 'max-content',
          gap: '24px',
        }}
      >
        {/* First set */}
        {videos.map((video, index) => (
          <div
            key={index}
            className="w-[400px] h-[225px] rounded-xl overflow-hidden shadow-xl flex-shrink-0"
          >
            <video
              src={video}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              autoPlay
            />
          </div>
        ))}
        {/* Second set for seamless loop */}
        {videos.map((video, index) => (
          <div
            key={`dup1-${index}`}
            className="w-[400px] h-[225px] rounded-xl overflow-hidden shadow-xl flex-shrink-0"
          >
            <video
              src={video}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              autoPlay
            />
          </div>
        ))}
        {/* Third set to fill any remaining gap */}
        {videos.map((video, index) => (
          <div
            key={`dup2-${index}`}
            className="w-[400px] h-[225px] rounded-xl overflow-hidden shadow-xl flex-shrink-0"
          >
            <video
              src={video}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              autoPlay
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Scattered layout for TikTok
const TikTokScattered = ({ videos }: { videos: any[] }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="relative w-full h-[100vh] md:h-[150vh] overflow-hidden bg-background">
      {videoPositions.map((pos, index) => (
        <motion.div
          key={pos.id}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="w-[120px] sm:w-[170px] md:w-[250px] lg:w-[300px] xl:w-[350px] h-[200px] sm:h-[280px] md:h-[440px] lg:h-[530px] xl:h-[620px] rounded-xl shadow-lg overflow-hidden"
          style={{
            position: "absolute",
            top: isMobile ? pos.mobilePosition.top : pos.position.top,
            left: isMobile ? pos.mobilePosition.left : pos.position.left,
            zIndex: pos.zIndex,
          }}
        >
          <VideoPlaceholder 
            index={index} 
            videoUrl={videos[index]?.video_url}
          />
        </motion.div>
      ))}
    </div>
  );
};

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const FeaturedVideosSection = ({ platform = 'youtube' }: FeaturedVideosSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const buttonY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const { videos: dbVideos } = useVideos(platform);

  // Use DB videos if available, otherwise fallback
  const videoUrls = dbVideos.length > 0 
    ? dbVideos.map(v => v.video_url)
    : fallbackYoutubeVideos;

  const platformConfig = {
    youtube: {
      label: 'YouTube',
      icon: <Youtube className="w-5 h-5 text-white" />,
      buttonClass: 'bg-[#FF0000]',
    },
    tiktok: {
      label: 'TikTok',
      icon: <TikTokIcon />,
      buttonClass: 'bg-black border border-cyan-400',
    },
  };

  const config = platformConfig[platform];

  return (
    <section ref={containerRef} className={`relative mx-auto ${platform === 'youtube' ? 'py-10' : 'mt-10 h-[100vh] md:h-[130vh] lg:h-[180vh]'} overflow-hidden`}>
      {/* Platform Button */}
      <motion.div 
        style={{ y: platform === 'tiktok' ? buttonY : 0 }}
        className={`w-[170px] h-[47px] md:w-[200px] md:h-[56px] rounded-2xl px-5 mx-auto z-50 relative ${config.buttonClass} font-extrabold mb-4 text-center cursor-pointer flex items-center justify-center gap-2`}
      >
        {config.icon}
        <span className="text-white text-lg font-bold">{config.label}</span>
      </motion.div>

      {/* Platform-specific layout */}
      {platform === 'youtube' ? (
        <YouTubeCarousel videos={videoUrls} />
      ) : (
        <div className="mask-gradient">
          <TikTokScattered videos={dbVideos} />
        </div>
      )}

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
