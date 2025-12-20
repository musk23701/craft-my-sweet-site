import SocialIcons from "./SocialIcons";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import TypingText from "./TypingText";

interface PageHeroProps {
  title: string;
  titleAccent?: string;
  subtitle?: string;
  backgroundImage?: string;
}

const PageHero = ({ title, titleAccent, subtitle, backgroundImage }: PageHeroProps) => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex w-full overflow-x-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
      )}

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Hero Content */}
      <div className="flex-1 relative flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 pb-28 lg:pt-0 lg:pb-0">
        {/* Subtle glow */}
        <div className="absolute -top-1/2 -left-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-foreground/5 rounded-full blur-[200px] opacity-50 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 md:mb-6 opacity-0 animate-fade-up delay-100">
            {title} {titleAccent && <span className="text-primary">{titleAccent}</span>}
          </h1>

          {/* Subtitle with Typing Animation */}
          {subtitle && (
            <TypingText 
              text={subtitle}
              speed={30}
              delay={800}
              className="text-xs sm:text-sm md:text-base font-light tracking-[0.15em] md:tracking-[0.2em] uppercase text-muted-foreground"
            />
          )}
        </div>
      </div>

      {/* Social icons - centered on all devices */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center opacity-0 animate-fade-up delay-300 z-20">
        <SocialIcons />
      </div>
    </section>
  );
};

export default PageHero;
