import { useEffect, useRef } from 'react';

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

const VideoCarouselSection = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        video.playsInline = true;
        video.play().catch(() => {});
      }
    });
  }, []);

  const addVideoRef = (el: HTMLVideoElement | null) => {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el);
    }
  };

  // Instagram: 16 cards, 22.5deg apart
  const instagramAngles = [
    0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5,
    180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5
  ];

  // YouTube: specific angles from the original
  const youtubeData = [
    { angle: 0, video: 1 },
    { angle: 18, video: 2 },
    { angle: 36, video: 3 },
    { angle: 54, video: 4 },
    { angle: 72, video: 5 },
    { angle: 90, video: 1 },
    { angle: 108, video: 2 },
    { angle: 252, video: 5 },
    { angle: 270, video: 1 },
    { angle: 288, video: 2 },
    { angle: 306, video: 3 },
    { angle: 324, video: 4 },
    { angle: 342, video: 5 },
  ];

  return (
    <section className="py-20 bg-background overflow-hidden">
      {/* Instagram Section */}
      <div className="mx-auto">
        {/* Instagram Button */}
        <div className="w-[150px] h-[47px] md:w-[180px] md:h-[56px] rounded-2xl px-5 mx-auto z-10 relative bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 font-extrabold mb-4 text-center cursor-pointer flex items-center justify-center">
          <span className="text-white text-lg font-bold">Instagram</span>
        </div>

        {/* Instagram Carousel - EXACT structure from original */}
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
                  animation: 'instagram-spin 25s linear infinite',
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
                    <video
                      ref={addVideoRef}
                      className="w-full h-full object-cover"
                      src={instagramVideos[index % 8]}
                      loop
                      muted
                      playsInline
                      autoPlay
                      disablePictureInPicture
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Section */}
      <div className="mx-auto mt-10 h-[700px]">
        {/* YouTube Button */}
        <div className="w-[150px] h-[47px] md:w-[180px] md:h-[56px] rounded-2xl px-5 pt-3 mx-auto z-0 relative bg-[#00B4D8] font-extrabold mb-4 text-center cursor-pointer">
          <span className="text-white text-lg font-bold">YouTube</span>
        </div>

        {/* YouTube Carousel - EXACT structure from original */}
        <div className="lg:mask-gradient">
          <div className="flex items-center justify-center w-full h-full overflow-hidden">
            <div 
              className="relative w-[320px] h-[568px] pt-40 rotate-4"
              style={{ 
                transformStyle: 'preserve-3d', 
                perspective: '4000px',
              }}
            >
              {youtubeData.map((item, index) => (
                <div
                  key={index}
                  className="absolute w-[400px] h-[200px] rounded-xl overflow-hidden shadow-xl"
                  style={{
                    transform: `rotateY(${item.angle}deg) translateZ(1500px)`,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                  }}
                >
                  <video
                    ref={addVideoRef}
                    className="w-full h-full object-cover"
                    src={youtubeVideos[item.video - 1]}
                    loop
                    muted
                    playsInline
                    autoPlay
                    preload="metadata"
                    disablePictureInPicture
                    style={{ backfaceVisibility: 'hidden' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoCarouselSection;
