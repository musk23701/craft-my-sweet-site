import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { Cpu, GraduationCap, Bot, Users, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const companies = [
  {
    name: "Automation Institute",
    logo: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=180&h=180&fit=crop",
    description: "Founded by Automind Labs and built for the ones who want to break out of the \"busy\" loop. We're here to help you escape the chaos by teaching you how to use AI and automation to take back your time and redesign the way you work.",
    link: "https://automationinstitute.ai/"
  },
  {
    name: "Hexona Systems",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=180&h=180&fit=crop",
    description: "It started with one client. Then two. Then hundreds. Now, 500+ agencies across 6 continents run smoothly because of Hexona. Hexona is a globally recognized AI-powered automation agency and software platform, streamlining workflows and powering 1000+ businesses across marketing and finance.",
    link: "https://www.hexonasystems.com/"
  }
];

const stats = [
  { value: "20,000+", label: "YouTube Subscribers" },
  { value: "80,000+", label: "Followers on Instagram" },
  { value: "30,000+", label: "Active Students in Skool" }
];

const valueItems = [
  { icon: Cpu, title: "Complex Automation Systems", subtitle: "Built to Transform Businesses" },
  { icon: GraduationCap, title: "Free Educational Programs to", subtitle: "License & Train Specialists" },
  { icon: Bot, title: "An AI-Powered Engine", subtitle: "Built to Support Agencies" },
  { icon: Users, title: "Hands on Mentorship & Coaching", subtitle: "to Help Entrepreneurs Scale" }
];

const partners = [
  { name: "Zapier", icon: "⚡" },
  { name: "OpenAI", icon: "🤖" },
  { name: "Gamma", icon: "📊" },
  { name: "Make", icon: "🔧" },
  { name: "Snowflake", icon: "❄️" }
];

const featuredWins = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=450&fit=crop",
    title: "Enterprise Automation Success",
    subtitle: "Case Study",
    testimonial: "Automind Labs transformed our entire workflow. We saved 40+ hours per week!",
    author: "Sarah Johnson",
    role: "CEO, TechFlow Inc."
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=450&fit=crop",
    title: "Scaling Operations with AI",
    subtitle: "Client Story",
    testimonial: "The ROI was incredible. Within 3 months, we doubled our output with half the effort.",
    author: "Michael Chen",
    role: "Operations Director, ScaleUp Co."
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=450&fit=crop",
    title: "Workflow Transformation",
    subtitle: "Featured Win",
    testimonial: "Best investment we ever made. The automation systems are game-changers.",
    author: "Emily Rodriguez",
    role: "Founder, Creative Agency"
  }
];

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredWins.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + featuredWins.length) % featuredWins.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleManualNav = (action: () => void) => {
    setIsAutoPlaying(false);
    action();
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <PageHero 
        title="Our"
        titleAccent="Portfolio"
        subtitle="AI Automation Expert Turning Complex Problems Into Simple & Smart Systems"
        backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop"
      />

      <main>
        {/* Companies Section */}
        <section className="py-12 md:py-16 bg-background px-4 sm:px-6 lg:px-24">
          <div className="max-w-[1300px] mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-4xl lg:text-6xl font-extrabold mb-8 md:mb-12 text-center text-foreground"
            >
              Companies
            </motion.h2>

            <div className="bg-card mt-8 md:mt-12">
              {companies.map((company, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row sm:items-center sm:px-5 sm:justify-between lg:px-20 sm:gap-8 border-t border-b border-border py-6 md:py-8"
                >
                  <motion.div 
                    className="flex justify-center px-4 mb-4 sm:mb-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img 
                      src={company.logo} 
                      alt={company.name}
                      className="h-[100px] w-[100px] sm:h-[130px] sm:w-[130px] md:h-[150px] md:w-[150px] lg:w-[180px] lg:h-[180px] object-contain rounded-xl"
                    />
                  </motion.div>
                  <div className="text-center px-4 max-w-[500px] mx-auto">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-3 text-foreground">{company.name}</h3>
                    <p className="text-xs sm:text-sm md:text-base font-medium leading-relaxed text-muted-foreground">
                      {company.description}
                    </p>
                    <motion.a 
                      href={company.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm md:text-base inline-block mt-4 text-primary font-medium hover:underline"
                      whileHover={{ x: 5 }}
                    >
                      Visit Website →
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-20 bg-card">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 md:mb-6">
                  The Numbers<br />That Hold Stories
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mb-3">
                  These aren't just stats, they're snapshots of people, moments, and milestones.
                </p>
                <p className="text-sm md:text-base text-muted-foreground">
                  Behind every number is a real person we've had the privilege to help automate, simplify, and grow.
                </p>
              </motion.div>
              <motion.div 
                className="space-y-4 md:space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-right"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: -5 }}
                  >
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black text-primary">{stat.value}</div>
                    <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Where We Create Value */}
        <section className="py-12 md:py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 text-primary"
            >
              Where We Create Value
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm md:text-base text-muted-foreground mb-10 md:mb-16"
            >
              We don't just automate tasks. We build machines that scale businesses.
            </motion.p>

            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {valueItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="text-center p-4"
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-xl bg-primary/10 flex items-center justify-center"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <item.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </motion.div>
                  <h3 className="font-bold text-sm md:text-base mb-1">{item.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{item.subtitle}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Clients & Partners */}
        <section className="py-12 md:py-20 bg-card overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 md:mb-12"
            >
              Clients & Partners
            </motion.h2>

            <motion.div 
              className="flex flex-wrap justify-center gap-3 md:gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {partners.map((partner, index) => (
                <motion.div 
                  key={index} 
                  className="group px-5 py-3 md:px-8 md:py-4 rounded-full bg-card border border-border cursor-pointer relative overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.08, 
                    borderColor: "hsl(var(--primary))",
                    boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.3)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative flex items-center gap-2 font-semibold text-sm md:text-base">
                    <span className="text-lg">{partner.icon}</span>
                    {partner.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Wins - Carousel with Testimonials */}
        <section className="py-12 md:py-20 px-4 sm:px-6 bg-background">
          <div className="max-w-[1300px] mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-4xl lg:text-6xl font-black text-center mb-8 md:mb-12"
            >
              Featured <br className="lg:hidden" /> <span className="text-primary">Wins</span>
            </motion.h2>

            {/* Carousel Container */}
            <div className="relative w-full max-w-[900px] mx-auto">
              {/* Navigation Arrows */}
              <button 
                onClick={() => handleManualNav(prevSlide)}
                className="absolute -left-2 sm:-left-4 md:-left-16 top-1/3 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary" />
              </button>

              <button 
                onClick={() => handleManualNav(nextSlide)}
                className="absolute -right-2 sm:-right-4 md:-right-16 top-1/3 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary" />
              </button>

              {/* Main Slider */}
              <div className="relative overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {featuredWins.map((win) => (
                    <div key={win.id} className="w-full flex-shrink-0">
                      <div className="relative w-full pt-[56.25%] overflow-hidden rounded-2xl cursor-pointer group">
                        <img 
                          src={win.thumbnail} 
                          alt={win.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                        
                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div 
                            whileHover={{ scale: 1.1 }}
                            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl"
                          >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </motion.div>
                        </div>

                        {/* Badge */}
                        <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-background/80 backdrop-blur-sm px-2 py-1 md:px-3 rounded-full">
                          <span className="text-[10px] md:text-xs font-semibold text-primary">{win.subtitle}</span>
                        </div>

                        {/* Title */}
                        <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground tracking-wide">
                            {win.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial Card */}
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 md:mt-8 p-4 md:p-6 bg-card rounded-xl border border-border"
              >
                <Quote className="w-6 h-6 md:w-8 md:h-8 text-primary mb-3" />
                <p className="text-sm md:text-lg text-foreground italic mb-4">
                  "{featuredWins[currentIndex].testimonial}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm md:text-base">
                      {featuredWins[currentIndex].author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm md:text-base text-foreground">{featuredWins[currentIndex].author}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{featuredWins[currentIndex].role}</p>
                  </div>
                </div>
              </motion.div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {featuredWins.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleManualNav(() => setCurrentIndex(index))}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-primary w-6 md:w-8' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Portfolio;
