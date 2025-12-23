import { useSections } from "@/hooks/useCMSData";
import HeroSection from "@/components/HeroSection";
import AboutUsSection from "@/components/AboutUsSection";
import FeaturedSection from "@/components/FeaturedSection";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import WhoWeHelp from "@/components/WhoWeHelp";
import ServicesSection from "@/components/ServicesSection";
import ApproachSection from "@/components/ApproachSection";
import WhyUsSection from "@/components/WhyUsSection";
import FAQSection from "@/components/FAQSection";
import VideoCarouselSection from "@/components/VideoCarouselSection";
import FeaturedVideosSection from "@/components/FeaturedVideosSection";
import BlogsPodcastsSection from "@/components/BlogsPodcastsSection";
import LinkedInConnectSection from "@/components/LinkedInConnectSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  const { isSectionVisible, loading } = useSections();

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section with Sidebar - always visible */}
      <HeroSection />

      {/* Rest of content - full width without sidebar */}
      <main>
        {isSectionVisible('about') && <AboutUsSection />}
        {isSectionVisible('featured') && <FeaturedSection />}
        {isSectionVisible('reviews') && <ReviewsCarousel />}
        {isSectionVisible('who-we-help') && <WhoWeHelp />}
        {isSectionVisible('services') && <ServicesSection />}
        {isSectionVisible('approach') && <ApproachSection />}
        {isSectionVisible('why-us') && <WhyUsSection />}
        {isSectionVisible('faq') && <FAQSection />}
        {isSectionVisible('videos') && (
          <>
            <VideoCarouselSection />
            <FeaturedVideosSection />
          </>
        )}
        {isSectionVisible('blogs-podcasts') && <BlogsPodcastsSection />}
        {isSectionVisible('linkedin') && <LinkedInConnectSection />}
        {isSectionVisible('cta') && <CTASection />}
        {isSectionVisible('footer') && <Footer />}
      </main>
    </div>
  );
};

export default Index;
