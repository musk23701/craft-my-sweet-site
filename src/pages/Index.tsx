import { useSearchParams } from "react-router-dom";
import { useSections } from "@/hooks/useCMSData";
import SEO, { createLocalBusinessSchema, createServiceSchema } from "@/components/SEO";
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

// Service structured data for homepage
const homeServices = [
  { name: 'AI Workflow Automation', description: 'Automate repetitive business processes with intelligent AI systems' },
  { name: 'Business Process Automation', description: 'Streamline operations and reduce manual work with custom automation' },
  { name: 'AI Integration Services', description: 'Integrate AI solutions into existing business systems and workflows' },
  { name: 'Automation Consulting', description: 'Expert consulting to identify automation opportunities and ROI' },
];

const Index = () => {
  const { isSectionVisible, loading } = useSections();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';
  const [showBanner, setShowBanner] = useState(true);

  // Combined structured data for homepage
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      createLocalBusinessSchema(),
      createServiceSchema(homeServices),
    ],
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <SEO
        title="AI Automation Agency USA | Workflow Automation & AI Integration"
        description="Automind Labs is a leading AI automation agency in the United States. We help businesses automate workflows, integrate AI solutions, and scale operations with custom automation systems. Serving California, New York, Texas & nationwide."
        keywords="AI automation agency USA, workflow automation company, AI integration services, business process automation, automation consulting, AI solutions United States, enterprise automation, small business automation, AI workflow optimization, automation agency California, New York AI services, Texas automation company"
        canonical="/"
        structuredData={combinedSchema}
      />
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

      {/* Rest of content */}
      <main>
        {isSectionVisible('about') && <AboutUsSection />}
        {isSectionVisible('featured') && <FeaturedSection />}
        {isSectionVisible('reviews') && <ReviewsCarousel />}
        {isSectionVisible('who-we-help') && <WhoWeHelp />}
        {isSectionVisible('services') && <ServicesSection />}
        {isSectionVisible('approach') && <ApproachSection />}
        {isSectionVisible('why-us') && <WhyUsSection />}
        {isSectionVisible('faq') && <FAQSection />}
        
        {/* Instagram Videos - separate section */}
        {isSectionVisible('videos-instagram') && (
          <VideoCarouselSection platform="instagram" />
        )}

        {/* YouTube Videos - separate section */}
        {isSectionVisible('videos-youtube') && (
          <FeaturedVideosSection platform="youtube" />
        )}

        {/* TikTok Videos - separate section */}
        {isSectionVisible('videos-tiktok') && (
          <FeaturedVideosSection platform="tiktok" />
        )}

        {/* Legacy videos section fallback for old data */}
        {isSectionVisible('videos') && 
         !isSectionVisible('videos-instagram') && 
         !isSectionVisible('videos-youtube') && 
         !isSectionVisible('videos-tiktok') && (
          <>
            <VideoCarouselSection platform="instagram" />
            <FeaturedVideosSection platform="youtube" />
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
