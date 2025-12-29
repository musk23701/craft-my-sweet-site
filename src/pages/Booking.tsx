import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Clock, Video, CheckCircle, Loader2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { useContactInfo } from "@/hooks/useCMSData";

// Allowed booking domains for security
const ALLOWED_BOOKING_DOMAINS = [
  'calendly.com',
  'cal.com',
  'hubspot.com',
  'acuityscheduling.com',
  'youcanbook.me',
  'squareup.com',
  'schedule.google.com',
  'outlook.office365.com',
  'tidycal.com',
  'savvycal.com',
  'devtrest.com',
  'app.devtrest.com',
];

// Extract and validate iframe src URL from HTML or direct URL
const extractBookingUrl = (input: string): string | null => {
  if (!input || !input.trim()) return null;
  
  let url = input.trim();
  
  // If it looks like an iframe tag, extract the src
  if (url.toLowerCase().includes('<iframe')) {
    const srcMatch = url.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      url = srcMatch[1];
    } else {
      return null;
    }
  }
  
  // Validate URL format
  try {
    const parsedUrl = new URL(url);
    
    // Only allow https
    if (parsedUrl.protocol !== 'https:') {
      return null;
    }
    
    // Check against whitelist of allowed domains
    const hostname = parsedUrl.hostname.toLowerCase();
    const isAllowed = ALLOWED_BOOKING_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );
    
    if (!isAllowed) {
      console.warn('Booking URL domain not in allowlist:', hostname);
      return null;
    }
    
    return url;
  } catch {
    return null;
  }
};

const Booking = () => {
  const { contactInfo, loading: contactLoading } = useContactInfo();
  
  // Get booking URL from database or use default
  const bookingIframeRaw = contactInfo?.booking_iframe_code || "";
  const bookingUrl = useMemo(() => {
    const extractedUrl = extractBookingUrl(bookingIframeRaw);
    // Fallback to default if no valid URL in database
    return extractedUrl || "https://app.devtrest.com/widget/booking/Hn1hjHRLhl9BOC7z1PHN";
  }, [bookingIframeRaw]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.devtrest.com/js/form_embed.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const benefits = [
    "Discuss your specific automation challenges",
    "Get personalized AI solution recommendations",
    "Learn about potential ROI and time savings",
    "No commitment, completely free consultation"
  ];

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <PageHero
        title="Book Your Free"
        titleAccent="AI Strategy Call"
        subtitle="Schedule a complimentary 30-minute consultation with our AI automation experts"
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
      />

      {/* Quick Info Cards */}
      <section className="py-12 md:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            {[
              { icon: Clock, title: "30 Minutes", desc: "Quick & focused" },
              { icon: Video, title: "Video Call", desc: "Face-to-face online" },
              { icon: CheckCircle, title: "100% Free", desc: "No obligation" }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center"
              >
                <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
                <h3 className="font-semibold text-xs sm:text-base mb-0.5 sm:mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-[10px] sm:text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left Side - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">What to Expect</h2>
              <ul className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm sm:text-base">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 sm:mt-10 p-4 sm:p-6 bg-card border border-border rounded-xl sm:rounded-2xl">
                <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Who is this for?</h3>
                <ul className="text-muted-foreground text-xs sm:text-sm space-y-1.5 sm:space-y-2">
                  <li>• Business owners looking to scale</li>
                  <li>• Teams drowning in manual tasks</li>
                  <li>• Companies seeking efficiency gains</li>
                  <li>• Anyone curious about AI automation</li>
                </ul>
              </div>
            </motion.div>

            {/* Right Side - Calendar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-6 min-h-[450px] sm:min-h-[600px]">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">Select a Date & Time</h2>
                {contactLoading ? (
                  <div className="flex items-center justify-center h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <iframe
                    src={bookingUrl}
                    className="w-full border-none overflow-hidden"
                    style={{ minHeight: "400px" }}
                    scrolling="no"
                    title="Booking Calendar"
                  />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Booking;
