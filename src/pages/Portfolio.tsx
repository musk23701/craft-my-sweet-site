import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { ExternalLink, Cpu, GraduationCap, Bot, Users, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const companies = [
  {
    name: "Automation Institute",
    logo: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=180&h=180&fit=crop",
    description: "Founded by Hamza Automates and built for the ones who want to break out of the \"busy\" loop. We're here to help you escape the chaos by teaching you how to use AI and automation to take back your time and redesign the way you work.",
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

const partners = ["Zapier", "OpenAI", "Gamma", "Make", "Snowflake"];

const featuredWins = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=450&fit=crop",
    title: "Enterprise Automation Success",
    subtitle: "Case Study"
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=450&fit=crop",
    title: "Scaling Operations with AI",
    subtitle: "Client Story"
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=450&fit=crop",
    title: "Workflow Transformation",
    subtitle: "Featured Win"
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

  return (
    <div className="min-h-screen w-full bg-background">
      <PageHero 
        title="Our"
        titleAccent="Portfolio"
        subtitle="AI Automation Expert Turning Complex Problems Into Simple & Smart Systems"
        backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop"
      />

      <main>
        {/* Companies Section - Updated to match reference */}
        <section className="py-16 bg-background px-6 lg:px-24">
          <div className="max-w-[1300px] mx-auto">
            <h2 className="text-3xl lg:text-[70px] font-extrabold mb-4 text-center text-foreground">
              Companies
            </h2>

            <div className="bg-card mt-20">
              {companies.map((company, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row sm:items-center sm:px-5 sm:justify-between lg:px-20 sm:gap-8 border-t border-b border-border py-5"
                >
                  <div className="flex justify-center px-5 mb-6 sm:mb-0">
                    <img 
                      src={company.logo} 
                      alt={company.name}
                      className="h-[130px] w-[130px] md:h-[150px] md:w-[150px] lg:w-[180px] lg:h-[180px] object-contain rounded-xl"
                    />
                  </div>
                  <div className="text-center px-5 max-w-[500px] mx-auto">
                    <h3 className="text-[30px] md:text-[36px] font-medium mb-4 text-foreground">{company.name}</h3>
                    <p className="text-[10px] sm:text-[10px] md:text-[12px] xl:text-[16px] font-medium leading-relaxed text-muted-foreground">
                      {company.description}
                    </p>
                    <a 
                      href={company.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] sm:text-[10px] md:text-[12px] xl:text-[16px] inline-block mt-4 text-primary font-medium hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-card">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                  The Numbers<br />That Hold Stories
                </h2>
                <p className="text-muted-foreground mb-4">
                  These aren't just stats, they're snapshots of people, moments, and milestones.
                </p>
                <p className="text-muted-foreground">
                  Behind every number is a real person we've had the privilege to help automate, simplify, and grow.
                </p>
              </div>
              <div className="space-y-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-right">
                    <div className="text-4xl md:text-5xl font-black text-primary">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Where We Create Value */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-primary">
              Where We Create Value
            </h2>
            <p className="text-muted-foreground mb-16">
              We don't just automate tasks. We build machines that scale businesses.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valueItems.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients & Partners */}
        <section className="py-20 bg-card">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
              Clients & Partners
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              {partners.map((partner, index) => (
                <div 
                  key={index} 
                  className="px-8 py-4 rounded-full bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <span className="font-semibold">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Wins - Carousel like Blogs & Podcasts */}
        <section className="py-20 bg-background">
          <div className="max-w-[1300px] mx-auto px-6">
            <h2 className="text-[40px] lg:text-[70px] text-foreground font-extrabold mb-4 text-center">
              Featured <br className="lg:hidden" /> Wins
            </h2>
            <p className="text-muted-foreground text-center mb-12">
              Proof that smart systems create powerful outcomes.
            </p>

            <div className="w-[70%] lg:w-full max-w-[800px] mx-auto relative">
              {/* Previous Button */}
              <button 
                onClick={() => handleManualNav(prevSlide)}
                className="px-4 py-2 rounded cursor-pointer border-none absolute z-50 -left-16 md:-left-20 top-1/2 -translate-y-1/2"
              >
                <ChevronLeft className="w-[30px] md:w-[50px] h-auto text-foreground" />
              </button>

              {/* Next Button */}
              <button 
                onClick={() => handleManualNav(nextSlide)}
                className="px-4 py-2 rounded cursor-pointer border-none absolute z-50 -right-16 md:-right-20 top-1/2 -translate-y-1/2"
              >
                <ChevronRight className="w-[30px] md:w-[50px] h-auto text-foreground" />
              </button>

              {/* Carousel */}
              <div className="overflow-hidden">
                <motion.div 
                  className="flex"
                  animate={{ x: `-${currentIndex * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {featuredWins.map((win) => (
                    <div key={win.id} className="min-w-full px-2">
                      <div className="relative w-full pt-[56.25%] overflow-hidden rounded-xl">
                        <img 
                          src={win.thumbnail} 
                          alt={win.title}
                          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                        />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                            <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
                          </div>
                        </div>
                        {/* Title & Subtitle */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
                          <span className="text-xs px-3 py-1 bg-primary rounded-full text-primary-foreground mb-2 inline-block">
                            {win.subtitle}
                          </span>
                          <h3 className="text-lg md:text-xl font-bold text-foreground">{win.title}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {featuredWins.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleManualNav(() => setCurrentIndex(index))}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentIndex === index ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
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
