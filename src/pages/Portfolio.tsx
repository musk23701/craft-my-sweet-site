import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { ExternalLink, Cpu, GraduationCap, Bot, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const companies = [
  {
    name: "Automation Institute",
    icon: GraduationCap,
    description: "Founded by Automind Labs and built for those who want to break out of the 'busy' loop. We're here to help you escape the chaos by teaching you how to use AI and automation to take back your time and redesign the way you work.",
    link: "#"
  },
  {
    name: "Hexona Systems",
    icon: Cpu,
    description: "It started with one client. Then two. Then hundreds. Now, 500+ agencies across 6 continents run smoothly because of Hexona. Hexona is a globally recognized AI-powered automation agency and software platform, streamlining workflows and powering 1000+ businesses across marketing and finance.",
    link: "#"
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
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop"
];

const Portfolio = () => {
  const [currentWin, setCurrentWin] = useState(0);

  const nextWin = () => setCurrentWin((prev) => (prev + 1) % featuredWins.length);
  const prevWin = () => setCurrentWin((prev) => (prev - 1 + featuredWins.length) % featuredWins.length);

  return (
    <div className="min-h-screen w-full bg-background">
      <PageHero 
        title="Our"
        titleAccent="Portfolio"
        subtitle="AI Automation Expert Turning Complex Problems Into Simple & Smart Systems"
        backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop"
      />

      <main>
        {/* Companies Section */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-16 text-primary">
              Companies
            </h2>

            <div className="space-y-16">
              {companies.map((company, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <company.icon className="w-12 h-12 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">{company.name}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{company.description}</p>
                    <a href={company.link} className="text-primary hover:underline inline-flex items-center gap-2">
                      Visit Website <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
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

        {/* Featured Wins */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Featured Wins
            </h2>
            <p className="text-muted-foreground mb-12">
              Proof that smart systems create powerful outcomes.
            </p>

            <div className="relative flex items-center justify-center">
              <button 
                onClick={prevWin}
                className="absolute left-0 z-10 p-3 rounded-full bg-card border border-border hover:border-primary transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="w-80 h-96 rounded-2xl overflow-hidden">
                <img 
                  src={featuredWins[currentWin]} 
                  alt="Featured win"
                  className="w-full h-full object-cover"
                />
              </div>

              <button 
                onClick={nextWin}
                className="absolute right-0 z-10 p-3 rounded-full bg-card border border-border hover:border-primary transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Portfolio;
