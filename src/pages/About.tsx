import { motion } from "framer-motion";
import { Target, Eye, Award, Users, Lightbulb, Rocket } from "lucide-react";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import SEO, { createAboutPageSchema, createBreadcrumbSchema } from "@/components/SEO";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 20
    }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 20
    }
  }
};

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We constantly push boundaries to deliver cutting-edge AI solutions."
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "Every solution is designed to deliver measurable business outcomes."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We work alongside our clients as true partners in their success."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in everything we build."
    }
  ];

  const timeline = [
    {
      year: "2022",
      title: "Founded",
      description: "Automind Labs was born from a vision to democratize AI automation for businesses of all sizes."
    },
    {
      year: "2023",
      title: "First Enterprise Client",
      description: "Secured our first major enterprise partnership, automating workflows for a Fortune 500 company."
    },
    {
      year: "2024",
      title: "50+ Clients",
      description: "Expanded our team and crossed 50+ successful client implementations worldwide."
    },
    {
      year: "2025",
      title: "AI Innovation Leader",
      description: "Recognized as an industry leader in AI automation and workflow optimization."
    }
  ];

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      createAboutPageSchema(),
      createBreadcrumbSchema([
        { name: 'Home', url: 'https://automindlabs.ai' },
        { name: 'About Us', url: 'https://automindlabs.ai/about' },
      ]),
    ],
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <SEO
        title="About Us | AI Automation Experts Since 2022"
        description="Automind Labs was founded in 2022 to democratize AI automation. We've helped 50+ US businesses save thousands of hours through intelligent workflow automation. Meet our team of AI experts in California."
        keywords="about Automind Labs, AI automation company USA, automation experts, AI agency California, business automation team, workflow automation specialists, AI consulting firm, automation company founded 2022, AI innovation leaders, trusted automation partner"
        canonical="/about"
        structuredData={aboutSchema}
      />
      <PageHero
        title="About Automind Labs"
        subtitle="Transforming businesses through intelligent automation"
        backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
      />

      {/* Mission & Vision */}
      <section className="py-20 px-6">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              variants={slideInLeft}
              className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors duration-300"
            >
              <motion.div 
                className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Target className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses of all sizes with intelligent AI automation solutions that eliminate 
                repetitive tasks, streamline operations, and unlock human potential for strategic growth 
                and innovation.
              </p>
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors duration-300"
            >
              <motion.div 
                className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Eye className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the global leader in AI-powered business transformation, creating a future where 
                every organization can harness the power of artificial intelligence to achieve 
                extraordinary results.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-8"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Our <span className="text-primary">Story</span>
            </motion.h2>
            <motion.p 
              className="text-muted-foreground text-lg leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Automind Labs was founded with a simple yet powerful belief: that AI automation should be 
              accessible to every business, not just tech giants. Our founders, coming from backgrounds 
              in enterprise AI and business consulting, saw firsthand how manual processes were holding 
              companies back.
            </motion.p>
            <motion.p 
              className="text-muted-foreground text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Today, we've helped over 50 businesses across industries transform their operations, 
              saving thousands of hours and millions in costs. But more importantly, we've helped our 
              clients rediscover what they do best — innovating, creating, and growing — while AI 
              handles the rest.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our <span className="text-primary">Journey</span>
          </motion.h2>
          <div className="relative">
            {/* Timeline Line */}
            <motion.div 
              className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{ originY: 0 }}
            />
            
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                  delay: index * 0.15
                }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <motion.div 
                  className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary md:-translate-x-1/2 z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.5 }}
                />
                
                {/* Content */}
                <motion.div 
                  className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-primary font-bold text-lg">{item.year}</span>
                  <h3 className="text-xl font-semibold mt-1">{item.title}</h3>
                  <p className="text-muted-foreground mt-2">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our <span className="text-primary">Values</span>
          </motion.h2>
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="text-center"
              >
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.4 }
                  }}
                >
                  <value.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Rocket className="w-12 h-12 text-primary mx-auto mb-6" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's discuss how AI automation can help you achieve your goals.
            </p>
            <motion.a
              href="/booking"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Free Strategy Call
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
