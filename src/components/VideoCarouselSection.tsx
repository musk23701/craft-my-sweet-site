import { useEffect, useRef } from 'react';

// Placeholder video URLs (short loops)
const instagramVideos = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
];

const youtubeVideos = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
];

const VideoCarouselSection = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Auto-play all videos
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

  const totalCards = 16;
  const angleStep = 360 / totalCards;
  const radius = 900;

  return (
    <section className="py-20 bg-background overflow-hidden">
      {/* Instagram Section */}
      <div className="mx-auto">
        {/* Instagram Button */}
        <div className="w-[150px] h-[47px] md:w-[180px] md:h-[56px] rounded-2xl px-5 mx-auto z-10 relative bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 font-extrabold mb-4 text-center cursor-pointer flex items-center justify-center">
          <span className="text-white text-lg font-bold">Instagram</span>
        </div>

        {/* Instagram Carousel */}
        <div className="mask-gradient h-[600px]">
          <div className="flex items-center justify-center w-full h-full overflow-visible">
            <div 
              className="relative -rotate-6"
              style={{ 
                transformStyle: 'preserve-3d', 
                perspective: '1500px', 
                width: '320px',
                height: '468px',
              }}
            >
              <div 
                className="instagram-carousel absolute inset-0"
                style={{ 
                  transformStyle: 'preserve-3d', 
                  willChange: 'transform',
                }}
              >
                {instagramVideos.map((video, index) => {
                  const angle = angleStep * index;
                  return (
                    <div
                      key={index}
                      className="absolute w-[320px] h-[468px] rounded-xl overflow-hidden shadow-xl left-1/2 top-1/2"
                      style={{
                        transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      <video
                        ref={addVideoRef}
                        className="w-full h-full object-cover"
                        src={video}
                        loop
                        muted
                        playsInline
                        autoPlay
                        disablePictureInPicture
                      />
                    </div>
                  );
                })}
                {/* Duplicate for seamless loop */}
                {instagramVideos.map((video, index) => {
                  const angle = angleStep * (index + 8);
                  return (
                    <div
                      key={`dup-${index}`}
                      className="absolute w-[320px] h-[468px] rounded-xl overflow-hidden shadow-xl left-1/2 top-1/2"
                      style={{
                        transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      <video
                        ref={addVideoRef}
                        className="w-full h-full object-cover"
                        src={video}
                        loop
                        muted
                        playsInline
                        autoPlay
                        disablePictureInPicture
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Section */}
      <div className="mx-auto mt-10 h-[700px]">
        {/* YouTube Button */}
        <div className="w-[150px] h-[47px] md:w-[180px] md:h-[56px] rounded-2xl px-5 mx-auto z-10 relative bg-[#00B4D8] font-extrabold mb-4 text-center cursor-pointer flex items-center justify-center">
          <span className="text-white text-lg font-bold">YouTube</span>
        </div>

        {/* YouTube Carousel */}
        <div className="lg:mask-gradient h-[600px]">
          <div className="flex items-center justify-center w-full h-full overflow-visible">
            <div 
              className="relative rotate-4"
              style={{ 
                transformStyle: 'preserve-3d', 
                perspective: '4000px',
                width: '400px',
                height: '200px',
              }}
            >
              <div 
                className="youtube-carousel absolute inset-0"
                style={{ 
                  transformStyle: 'preserve-3d', 
                  willChange: 'transform',
                }}
              >
                {youtubeVideos.map((video, index) => {
                  const angle = 18 * index;
                  return (
                    <div
                      key={index}
                      className="absolute w-[400px] h-[200px] rounded-xl overflow-hidden shadow-xl left-1/2 top-1/2"
                      style={{
                        transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(800px)`,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <video
                        ref={addVideoRef}
                        className="w-full h-full object-cover"
                        src={video}
                        loop
                        muted
                        playsInline
                        autoPlay
                        preload="metadata"
                        disablePictureInPicture
                        style={{ backfaceVisibility: 'hidden' }}
                      />
                    </div>
                  );
                })}
                {/* Additional cards to fill the carousel */}
                {[90, 108, 180, 198, 252, 270, 288, 306, 324, 342].map((angle, index) => (
                  <div
                    key={`extra-${index}`}
                    className="absolute w-[400px] h-[200px] rounded-xl overflow-hidden shadow-xl left-1/2 top-1/2"
                    style={{
                      transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(800px)`,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <video
                      ref={addVideoRef}
                      className="w-full h-full object-cover"
                      src={youtubeVideos[index % youtubeVideos.length]}
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
      </div>
    </section>
  );
};

export default VideoCarouselSection;
