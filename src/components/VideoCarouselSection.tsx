import { useEffect, useRef, useState } from 'react';
import { Instagram, Youtube } from 'lucide-react';

// Instagram videos (8 videos, duplicated to fill 16 cards)
const instagramVideos = [
  '/videos/instagram/1.mp4',
  '/videos/instagram/2.mp4',
  '/videos/instagram/3.mp4',
  '/videos/instagram/4.mp4',
  '/videos/instagram/5.mp4',
  '/videos/instagram/6.mp4',
  '/videos/instagram/7.mp4',
  '/videos/instagram/8.mp4',
];

// YouTube videos (5 videos)
const youtubeVideos = [
  '/videos/youtube/1.mp4',
  '/videos/youtube/2.mp4',
  '/videos/youtube/3.mp4',
  '/videos/youtube/4.mp4',
  '/videos/youtube/5.mp4',
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

const VideoCarouselSection = () => {
  // Instagram: 16 cards, 22.5deg apart
  const instagramAngles = [
    0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5,
    180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5
  ];

  return (
    <section className="py-20 bg-background overflow-hidden">
      {/* Instagram Section */}
      <div className="mx-auto">
        {/* Instagram Button with Logo */}
        <div className="w-[170px] h-[47px] md:w-[200px] md:h-[56px] rounded-2xl px-5 mx-auto z-10 relative bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 font-extrabold mb-4 text-center cursor-pointer flex items-center justify-center gap-2">
          <Instagram className="w-5 h-5 text-white" />
          <span className="text-white text-lg font-bold">Instagram</span>
        </div>

        {/* Instagram Carousel */}
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
                {instagramAngles.map((angle, index) => (
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
                      src={instagramVideos[index % 8]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Section */}
      <div className="mx-auto mt-10">
        {/* YouTube Button with Logo */}
        <div className="w-[170px] h-[47px] md:w-[200px] md:h-[56px] rounded-2xl px-5 mx-auto z-0 relative bg-[#FF0000] font-extrabold mb-8 text-center cursor-pointer flex items-center justify-center gap-2">
          <Youtube className="w-5 h-5 text-white" />
          <span className="text-white text-lg font-bold">YouTube</span>
        </div>

        {/* YouTube Horizontal Carousel - moves left to right */}
        <div className="mask-gradient overflow-hidden">
          <div 
            className="youtube-marquee flex"
            style={{
              width: 'max-content',
              gap: '24px',
            }}
          >
            {/* First set */}
            {youtubeVideos.map((video, index) => (
              <div
                key={index}
                className="w-[400px] h-[225px] rounded-xl overflow-hidden shadow-xl flex-shrink-0"
              >
                <LazyVideo
                  src={video}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {/* Second set for seamless loop */}
            {youtubeVideos.map((video, index) => (
              <div
                key={`dup1-${index}`}
                className="w-[400px] h-[225px] rounded-xl overflow-hidden shadow-xl flex-shrink-0"
              >
                <LazyVideo
                  src={video}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {/* Third set to fill any remaining gap */}
            {youtubeVideos.map((video, index) => (
              <div
                key={`dup2-${index}`}
                className="w-[400px] h-[225px] rounded-xl overflow-hidden shadow-xl flex-shrink-0"
              >
                <LazyVideo
                  src={video}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoCarouselSection;
