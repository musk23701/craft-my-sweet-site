import { Link } from "react-router-dom";
import TypingText from "./TypingText";
import SocialIcons from "./SocialIcons";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex w-full overflow-x-hidden">
      {/* Desktop Sidebar - only in hero */}
      <Sidebar />

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Hero Content */}
      <div className="flex-1 relative flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 pb-28 lg:pt-0 lg:pb-0">
        {/* Subtle glow */}
        <div className="absolute -top-1/2 -left-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-foreground/5 rounded-full blur-[200px] opacity-50 pointer-events-none" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float" />
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-primary/20 rounded-full animate-float delay-300" />
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-foreground/20 rounded-full animate-float delay-500" />
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-primary/25 rounded-full animate-float delay-700" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          {/* Label */}
          <p className="text-base md:text-xl font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase mb-2 opacity-0 animate-fade-up delay-100">
            WELCOME TO
          </p>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 md:mb-6 opacity-0 animate-fade-up delay-200">
            Automind Labs AI
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-primary mb-3 md:mb-4 opacity-0 animate-fade-up delay-300">
            Build Smarter. Scale Faster. Operate Effortlessly.
          </p>

          {/* Typing text */}
          <div className="min-h-[3rem] md:min-h-[4rem] mb-6 md:mb-8">
            <TypingText
              text="WE BUILD INTELLIGENT AI SYSTEMS THAT RUN YOUR BUSINESS FOR YOU — REPLACING MANUAL WORK, ELIMINATING BOTTLENECKS, AND SCALING WITHOUT HIRING ENDLESSLY."
              className="text-[10px] sm:text-xs md:text-sm font-light tracking-[0.08em] md:tracking-[0.1em] uppercase text-muted-foreground max-w-2xl mx-auto px-2"
              speed={20}
              delay={1000}
            />
          </div>

          {/* CTA */}
          <div className="opacity-0 animate-fade-up delay-500 flex justify-center">
            <Link to="/booking">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base rounded-full animate-pulse-glow"
              >
                Book a Free AI Strategy Call
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Social icons - centered on all devices */}
        <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center z-20">
          <SocialIcons />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
