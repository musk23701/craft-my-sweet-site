import { useSearchParams } from "react-router-dom";
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
import { X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Index = () => {
  const { isSectionVisible, loading } = useSections();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Preview Mode Banner */}
      {isPreview && showBanner && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-amber-950 py-2 px-4 flex items-center justify-center gap-4">
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium">Preview Mode - Changes are not yet published</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 hover:bg-amber-600"
            onClick={() => setShowBanner(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

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
