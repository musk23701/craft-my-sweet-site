import { useEffect, useRef, useState } from "react";
import { Instagram, Star } from "lucide-react";
import { useReviews } from "@/hooks/useCMSData";

const fallbackReviewItems = [
  {
    type: "review",
    author_name: "Sarah Chen",
    author_title: "Startup Founder",
    content: "Working with Automind was fantastic. Great margins and their operations experience is huge!",
  },
  {
    type: "stat",
    title: "Plumber Automation",
    value: "$599 / month",
    description: "Full workflow automation"
  },
  {
    type: "review",
    author_name: "Mike Johnson",
    author_title: "Agency Owner",
    content: "POSITIVE: Send thank you email with future discount and a link to Google review",
  },
  {
    type: "stat",
    title: "Realtor Automation",
    value: "$750/month",
    description: "Lead generation & follow-up"
  },
  {
    type: "review",
    author_name: "Emily Davis",
    author_title: "SaaS CEO",
    content: "The AI agents handle customer inquiries 24/7. Our response time went from hours to seconds.",
  },
  {
    type: "stat",
    title: "Dental Clinic",
    value: "$25,000 / year",
    description: "Complete practice automation"
  },
  {
    type: "review",
    author_name: "Alex Rivera",
    author_title: "E-commerce Director",
    content: "Data systems gave us one source of truth. Decision-making is now instant.",
  },
  {
    type: "stat",
    title: "Restaurant System",
    value: "$12,500 / year",
    description: "Reservations & marketing"
  }
];

const ReviewsCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeButton, setActiveButton] = useState<'instagram' | 'youtube'>('instagram');
  const { reviews: dbReviews, loading } = useReviews();

  useEffect(() => {
    let rotation = 0;
    let animationId: number;
    const animate = () => {
      rotation += 0.15;
      if (carouselRef.current) {
        carouselRef.current.style.transform = `rotateY(${rotation}deg)`;
      }
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Merge database reviews with fallback stats
  const reviewItems = dbReviews.length > 0 
    ? dbReviews.map(r => ({
        type: "review" as const,
        author_name: r.author_name,
        author_title: r.author_title,
        content: r.content,
        rating: r.rating,
      }))
    : fallbackReviewItems.filter(r => r.type === 'review');

  const itemCount = reviewItems.length * 2;
  const angleStep = 360 / itemCount;
  const radius = 900;

  return (
    <section className="py-12 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-center mb-8">
          What Our Clients Say
        </h2>
        
        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewItems.slice(0, 6).map((review, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {review.author_name?.[0] || 'A'}
                </div>
                <div>
                  <p className="font-semibold">{review.author_name}</p>
                  <p className="text-sm text-muted-foreground">{review.author_title}</p>
                </div>
              </div>
              <p className="text-muted-foreground">{review.content}</p>
              {review.rating && (
                <div className="flex gap-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-4 h-4 ${star <= review.rating! ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} 
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
