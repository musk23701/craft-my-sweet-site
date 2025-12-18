import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80",
    title: "How AI is Transforming Business Operations",
    subtitle: "Industry Insights"
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    title: "Building Your First AI Automation Workflow",
    subtitle: "Tutorial Series"
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
    title: "The Future of Work: AI & Human Collaboration",
    subtitle: "Podcast Episode"
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
    title: "Scaling Your Agency with AI Tools",
    subtitle: "Case Study"
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1200&q=80",
    title: "Expert Interview: AI Implementation Strategies",
    subtitle: "Podcast Episode"
  }
];

const BlogsPodcastsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleManualNav = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    if (direction === 'prev') prevSlide();
    else nextSlide();
    
    // Resume auto-play after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-[1300px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-6xl font-black text-center mb-12"
        >
          Blogs & <br className="lg:hidden" /> <span className="text-primary">Podcasts</span>
        </motion.h2>

        {/* Carousel Container */}
        <div className="relative w-full max-w-[900px] mx-auto">
          {/* Navigation Arrows */}
          <button 
            onClick={() => handleManualNav('prev')}
            className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-14 md:h-14 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          </button>

          <button 
            onClick={() => handleManualNav('next')}
            className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-14 md:h-14 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          </button>

          {/* Main Slider */}
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {videos.map((video) => (
                <div key={video.id} className="w-full flex-shrink-0">
                  <div className="relative w-full pt-[56.25%] overflow-hidden rounded-2xl cursor-pointer group">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl"
                      >
                        <svg className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </motion.div>
                    </div>

                    {/* Podcast Badge */}
                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-xs font-semibold text-primary">{video.subtitle}</span>
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg md:text-xl font-bold text-foreground tracking-wide">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 5000);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsPodcastsSection;
