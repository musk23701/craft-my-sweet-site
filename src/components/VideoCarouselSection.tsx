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

  return (
    <section className="py-20 bg-background overflow-hidden">
      {/* Instagram Section */}
      <div className="mx-auto">
        {/* Instagram Button */}
        <div className="w-[150px] h-[47px] md:w-[180px] md:h-[56px] rounded-2xl px-5 pt-3 mx-auto z-0 relative bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 font-extrabold mb-4 text-center cursor-pointer flex items-center justify-center">
          <span className="text-white text-lg font-bold">Instagram</span>
        </div>

        {/* Instagram Carousel */}
        <div className="mask-gradient">
          <div className="flex items-center justify-center w-full h-full overflow-hidden">
            <div 
              className="relative w-[320px] h-[568px] -rotate-6"
              style={{ transformStyle: 'preserve-3d', perspective: '1500px', willChange: 'transform' }}
            >
              <div 
                className="instagram-carousel"
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              >
                {instagramVideos.map((video, index) => {
                  const angle = (360 / 16) * index;
                  return (
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
                  const angle = (360 / 16) * (index + 8);
                  return (
                    <div
                      key={`dup-${index}`}
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
        <div className="w-[150px] h-[47px] md:w-[180px] md:h-[56px] rounded-2xl px-5 pt-3 mx-auto z-0 relative bg-[#00B4D8] font-extrabold mb-4 text-center cursor-pointer flex items-center justify-center">
          <span className="text-white text-lg font-bold">YouTube</span>
        </div>

        {/* YouTube Carousel */}
        <div className="lg:mask-gradient">
          <div className="flex items-center justify-center w-full h-full overflow-hidden">
            <div 
              className="relative w-[320px] h-[568px] pt-40 rotate-4"
              style={{ transformStyle: 'preserve-3d', perspective: '4000px' }}
            >
              {youtubeVideos.map((video, index) => {
                const angle = 18 * index;
                return (
                  <div
                    key={index}
                    className="absolute w-[400px] h-[200px] rounded-xl overflow-hidden shadow-xl"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(1500px)`,
                      transformStyle: 'preserve-3d',
                      willChange: 'transform',
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
              {[90, 108, 252, 270, 288, 306, 324, 342].map((angle, index) => (
                <div
                  key={`extra-${index}`}
                  className="absolute w-[400px] h-[200px] rounded-xl overflow-hidden shadow-xl"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(1500px)`,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
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
    </section>
  );
};

export default VideoCarouselSection;
