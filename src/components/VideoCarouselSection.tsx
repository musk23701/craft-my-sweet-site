import { useEffect, useRef, useState } from 'react';
import { Instagram, Youtube } from 'lucide-react';
import { useVideos } from '@/hooks/useCMSData';

interface VideoCarouselSectionProps {
  platform?: 'instagram' | 'tiktok';
}

// Fallback Instagram videos
const fallbackInstagramVideos = [
  '/videos/instagram/1.mp4',
  '/videos/instagram/2.mp4',
  '/videos/instagram/3.mp4',
  '/videos/instagram/4.mp4',
  '/videos/instagram/5.mp4',
  '/videos/instagram/6.mp4',
  '/videos/instagram/7.mp4',
  '/videos/instagram/8.mp4',
];

// Optimized lazy video component - only loads when in viewport
const LazyVideo = ({ src, className }: { src: string; className: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
        }
        setIsPlaying(entry.isIntersecting);
      },
      { rootMargin: '200px', threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div ref={containerRef} className={`${className} bg-muted`}>
      {shouldLoad ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={src}
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[16px] border-l-white/50 border-y-[10px] border-y-transparent ml-1" />
          </div>
        </div>
      )}
    </div>
  );
};

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const VideoCarouselSection = ({ platform = 'instagram' }: VideoCarouselSectionProps) => {
  const { videos: dbVideos } = useVideos(platform);

  // Use DB videos if available, otherwise fallback
  const videos = dbVideos.length > 0 
    ? dbVideos.map(v => v.video_url)
    : fallbackInstagramVideos;

  // 16 cards, 22.5deg apart for 3D carousel
  const angles = [
    0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5,
    180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5
  ];

  const platformConfig = {
    instagram: {
      label: 'Instagram',
      icon: <Instagram className="w-5 h-5 text-white" />,
      buttonClass: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400',
    },
    tiktok: {
      label: 'TikTok',
      icon: <TikTokIcon />,
      buttonClass: 'bg-black border border-cyan-400',
    },
  };

  const config = platformConfig[platform];

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="mx-auto">
        {/* Platform Button */}
        <div className={`w-[170px] h-[47px] md:w-[200px] md:h-[56px] rounded-2xl px-5 mx-auto z-10 relative ${config.buttonClass} font-extrabold mb-4 text-center cursor-pointer flex items-center justify-center gap-2`}>
          {config.icon}
          <span className="text-white text-lg font-bold">{config.label}</span>
        </div>

        {/* 3D Carousel */}
        <div className="mask-gradient">
          <div className="flex items-center justify-center w-full h-full overflow-hidden">
            <div 
              className="relative w-[320px] h-[568px] -rotate-6"
              style={{ 
                transformStyle: 'preserve-3d', 
                perspective: '1500px', 
                willChange: 'transform',
              }}
            >
              <div 
                className="instagram-carousel"
                style={{ 
                  transformStyle: 'preserve-3d', 
                  willChange: 'transform',
                }}
              >
                {angles.map((angle, index) => (
                  <div
                    key={index}
                    className="absolute w-[320px] h-[468px] rounded-xl overflow-hidden shadow-xl"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(-900px)`,
                      transformStyle: 'preserve-3d',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <LazyVideo
                      src={videos[index % videos.length]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoCarouselSection;
