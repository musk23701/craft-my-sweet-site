import { motion } from "framer-motion";
import { Target, Eye, Award, Users, Lightbulb, Rocket } from "lucide-react";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

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

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <PageHero
        title="About Automind Labs"
        subtitle="Transforming businesses through intelligent automation"
        backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
      />

        {/* Mission & Vision */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To empower businesses of all sizes with intelligent AI automation solutions that eliminate 
                  repetitive tasks, streamline operations, and unlock human potential for strategic growth 
                  and innovation.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the global leader in AI-powered business transformation, creating a future where 
                  every organization can harness the power of artificial intelligence to achieve 
                  extraordinary results.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-6 bg-card/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Our <span className="text-primary">Story</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Automind Labs was founded with a simple yet powerful belief: that AI automation should be 
                accessible to every business, not just tech giants. Our founders, coming from backgrounds 
                in enterprise AI and business consulting, saw firsthand how manual processes were holding 
                companies back.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Today, we've helped over 50 businesses across industries transform their operations, 
                saving thousands of hours and millions in costs. But more importantly, we've helped our 
                clients rediscover what they do best — innovating, creating, and growing — while AI 
                handles the rest.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Our <span className="text-primary">Journey</span>
            </h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
              
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary md:-translate-x-1/2 z-10" />
                  
                  {/* Content */}
                  <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span className="text-primary font-bold text-lg">{item.year}</span>
                    <h3 className="text-xl font-semibold mt-1">{item.title}</h3>
                    <p className="text-muted-foreground mt-2">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-6 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Our <span className="text-primary">Values</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Rocket className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Let's discuss how AI automation can help you achieve your goals.
              </p>
              <a
                href="/booking"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                Book a Free Strategy Call
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
  );
};

export default About;
