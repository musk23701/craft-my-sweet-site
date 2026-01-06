import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";
import FeaturedWinsSection from "@/components/FeaturedWinsSection";
import ProjectsSection from "@/components/ProjectsSection";
import SEO, { createPortfolioSchema, createBreadcrumbSchema } from "@/components/SEO";
import { Cpu, GraduationCap, Bot, Users } from "lucide-react";
import { motion } from "framer-motion";

const companies = [
  {
    name: "Automation Institute",
    logo: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=180&h=180&fit=crop",
    description: "Founded by Automind Labs and built for the ones who want to break out of the \"busy\" loop. We're here to help you escape the chaos by teaching you how to use AI and automation to take back your time and redesign the way you work.",
    link: "https://automationinstitute.ai/"
  },
  {
    name: "Hexona Systems",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=180&h=180&fit=crop",
    description: "It started with one client. Then two. Then hundreds. Now, 500+ agencies across 6 continents run smoothly because of Hexona. Hexona is a globally recognized AI-powered automation agency and software platform, streamlining workflows and powering 1000+ businesses across marketing and finance.",
    link: "https://www.hexonasystems.com/"
  }
];

const stats = [
  { value: 20000, suffix: "+", label: "YouTube Subscribers" },
  { value: 80000, suffix: "+", label: "Followers on Instagram" },
  { value: 30000, suffix: "+", label: "Active Students in Skool" }
];

const valueItems = [
  { icon: Cpu, title: "Complex Automation Systems", subtitle: "Built to Transform Businesses" },
  { icon: GraduationCap, title: "Free Educational Programs to", subtitle: "License & Train Specialists" },
  { icon: Bot, title: "An AI-Powered Engine", subtitle: "Built to Support Agencies" },
  { icon: Users, title: "Hands on Mentorship & Coaching", subtitle: "to Help Entrepreneurs Scale" }
];

const partners = [
  { name: "Zapier", icon: "⚡" },
  { name: "OpenAI", icon: "🤖" },
  { name: "Gamma", icon: "📊" },
  { name: "Make", icon: "🔧" },
  { name: "Snowflake", icon: "❄️" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Portfolio = () => {
  const portfolioProjects = [
    { name: 'Automation Institute', description: 'AI-powered educational platform helping entrepreneurs escape the busy loop', url: 'https://automationinstitute.ai/' },
    { name: 'Hexona Systems', description: 'Globally recognized AI automation platform powering 500+ agencies across 6 continents', url: 'https://www.hexonasystems.com/' },
  ];

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      createPortfolioSchema(portfolioProjects),
      createBreadcrumbSchema([
        { name: 'Home', url: 'https://automindlabs.ai' },
        { name: 'Portfolio', url: 'https://automindlabs.ai/portfolio' },
      ]),
    ],
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <SEO
        title="Portfolio | AI Automation Case Studies & Success Stories"
        description="See how Automind Labs helped 50+ US businesses transform with AI automation. Our portfolio includes 80,000+ social followers, 20,000+ YouTube subscribers, and enterprise automation solutions. View our success stories."
        keywords="AI automation portfolio, automation case studies USA, AI project success stories, workflow automation results, business automation ROI, AI integration projects, enterprise automation examples, Automation Institute, Hexona Systems, small business automation"
        canonical="/portfolio"
        structuredData={portfolioSchema}
      />
      <PageHero 
        title="Our"
        titleAccent="Portfolio"
        subtitle="AI Automation Expert Turning Complex Problems Into Simple & Smart Systems"
        backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop"
      />

      <main>
        {/* Companies Section */}
        <section className="py-12 md:py-16 bg-background px-4 sm:px-6 lg:px-24">
          <div className="max-w-[1300px] mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-4xl lg:text-6xl font-extrabold mb-8 md:mb-12 text-center text-foreground"
            >
              Companies
            </motion.h2>

            <div className="bg-card mt-8 md:mt-12">
              {companies.map((company, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row sm:items-center sm:px-5 sm:justify-between lg:px-20 sm:gap-8 border-t border-b border-border py-6 md:py-8"
                >
                  <motion.div 
                    className="flex justify-center px-4 mb-4 sm:mb-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img 
                      src={company.logo} 
                      alt={company.name}
                      className="h-[100px] w-[100px] sm:h-[130px] sm:w-[130px] md:h-[150px] md:w-[150px] lg:w-[180px] lg:h-[180px] object-contain rounded-xl"
                    />
                  </motion.div>
                  <div className="text-center px-4 max-w-[500px] mx-auto">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-3 text-foreground">{company.name}</h3>
                    <p className="text-xs sm:text-sm md:text-base font-medium leading-relaxed text-muted-foreground">
                      {company.description}
                    </p>
                    <motion.a 
                      href={company.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm md:text-base inline-block mt-4 text-primary font-medium hover:underline"
                      whileHover={{ x: 5 }}
                    >
                      Visit Website →
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section - New section for portfolio items */}
        <ProjectsSection />

        {/* Stats Section */}
        <section className="py-12 md:py-20 bg-card">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center md:text-left"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 md:mb-6">
                  The Numbers<br />That Hold Stories
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mb-3">
                  These aren't just stats, they're snapshots of people, moments, and milestones.
                </p>
                <p className="text-sm md:text-base text-muted-foreground">
                  Behind every number is a real person we've had the privilege to help automate, simplify, and grow.
                </p>
              </motion.div>
              <motion.div 
                className="w-full space-y-6 md:space-y-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center md:text-right"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-4xl sm:text-5xl md:text-6xl font-black text-primary">
                      <AnimatedCounter 
                        value={stat.value} 
                        suffix={stat.suffix} 
                        duration={2.5}
                        className="text-primary"
                      />
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Where We Create Value */}
        <section className="py-12 md:py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 text-primary"
            >
              Where We Create Value
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm md:text-base text-muted-foreground mb-10 md:mb-16"
            >
              We don't just automate tasks. We build machines that scale businesses.
            </motion.p>

            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {valueItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="text-center p-4"
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-xl bg-primary/10 flex items-center justify-center"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <item.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </motion.div>
                  <h3 className="font-bold text-sm md:text-base mb-1">{item.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{item.subtitle}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Clients & Partners */}
        <section className="py-12 md:py-20 bg-card overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 md:mb-12"
            >
              Clients & Partners
            </motion.h2>

            <motion.div 
              className="flex flex-wrap justify-center gap-3 md:gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {partners.map((partner, index) => (
                <motion.div 
                  key={index} 
                  className="group px-5 py-3 md:px-8 md:py-4 rounded-full bg-card border border-border cursor-pointer relative overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.08, 
                    borderColor: "hsl(var(--primary))",
                    boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.3)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative flex items-center gap-2 font-semibold text-sm md:text-base">
                    <span className="text-lg">{partner.icon}</span>
                    {partner.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Wins - Using the BlogsPodcasts style carousel */}
        <FeaturedWinsSection title="Featured" titleAccent="Wins" />

        <Footer />
      </main>
    </div>
  );
};

export default Portfolio;
