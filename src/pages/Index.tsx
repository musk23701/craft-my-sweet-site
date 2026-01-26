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
// import SkoolPopup from "@/components/SkoolPopup"; // Temporarily disabled
import { X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Service structured data for homepage
const homeServices = [
  { name: 'AI Workflow Automation', description: 'Automate repetitive business processes with intelligent AI systems that learn and adapt' },
  { name: 'Business Process Automation', description: 'Streamline operations and reduce manual work with custom automation solutions' },
  { name: 'AI Integration Services', description: 'Seamlessly integrate AI solutions into existing business systems and workflows' },
  { name: 'AI Chatbot Development', description: 'Build intelligent conversational AI for customer support and engagement' },
  { name: 'RPA Implementation', description: 'Robotic Process Automation to handle repetitive tasks with precision' },
  { name: 'Automation Consulting', description: 'Expert consulting to identify automation opportunities and maximize ROI' },
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
      {
        '@type': 'WebPage',
        '@id': 'https://automindlabs.ai/#webpage',
        url: 'https://automindlabs.ai',
        name: 'Automind Labs | #1 AI Automation Agency in USA',
        description: 'America\'s leading AI automation agency. We build custom AI workflow solutions, intelligent automation systems, and business process optimization for enterprises and startups.',
        isPartOf: { '@id': 'https://automindlabs.ai/#website' },
        about: { '@id': 'https://automindlabs.ai/#organization' },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: 'https://automindlabs.ai/og-image.png',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <SEO
        title="AI Automation Agency USA | Workflow Automation Experts"
        description="Automind Labs is America's leading AI automation agency. We help 50+ US businesses automate workflows, integrate AI solutions, and scale operations. Trusted in California, New York, Texas & nationwide. Book a free strategy call!"
        keywords="AI automation agency, best AI automation company USA, workflow automation, business process automation, AI integration services, automation consulting California, AI solutions New York, automation company Texas, enterprise AI automation, small business automation, RPA services, intelligent automation, machine learning solutions"
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

      {/* Skool Community Popup - Temporarily disabled */}
      {/* <SkoolPopup /> */}

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
