import HeroSection from "@/components/HeroSection";
import AboutUsSection from "@/components/AboutUsSection";
import FeaturedSection from "@/components/FeaturedSection";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import WhoWeHelp from "@/components/WhoWeHelp";
import ServicesSection from "@/components/ServicesSection";
import ApproachSection from "@/components/ApproachSection";
import WhyUsSection from "@/components/WhyUsSection";
import FAQSection from "@/components/FAQSection";
import FeaturedVideosSection from "@/components/FeaturedVideosSection";
import BlogsPodcastsSection from "@/components/BlogsPodcastsSection";
import LinkedInConnectSection from "@/components/LinkedInConnectSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section with Sidebar */}
      <HeroSection />

      {/* Rest of content - full width without sidebar */}
      <main>
        <AboutUsSection />
        <FeaturedSection />
        <ReviewsCarousel />
        <WhoWeHelp />
        <ServicesSection />
        <ApproachSection />
        <WhyUsSection />
        <FAQSection />
        <FeaturedVideosSection />
        <BlogsPodcastsSection />
        <LinkedInConnectSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
