import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Shield, Users, Calendar, Video, BookOpen, Bot, MessageSquare, ChevronDown, Star, Play } from "lucide-react";
import SEO from "@/components/SEO";
import automindLogo from "@/assets/automind-labs-logo-new.png";

// Scroll reveal hook
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
};

const RevealSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// FAQ Item
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-secondary/30 transition-colors">
        <span className="font-semibold text-sm md:text-base pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="px-5 md:px-6 pb-5 md:pb-6 text-muted-foreground text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const Mentorship = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="1:1 AI Automation Mentorship | Automind Labs"
        description="Get personalized 1:1 mentorship to master AI automation. Learn the exact systems, workflows, and strategies we use to deliver results for 50+ businesses."
        keywords="AI mentorship, AI automation training, 1:1 AI coaching, learn AI automation"
        canonical="/mentorship"
      />

      {/* Floating Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={automindLogo} alt="Automind Labs" className="h-8" />
          </Link>
          <a href="#apply">
            <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6">
              Apply Now
            </Button>
          </a>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 relative">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <RevealSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8">
              <Shield className="w-4 h-4" />
              Limited Spots Available
            </div>
          </RevealSection>

          {/* Headline */}
          <RevealSection delay={100}>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6">
              Master AI Automation{" "}
              <span className="text-gradient italic">1:1</span>
            </h1>
          </RevealSection>

          <RevealSection delay={200}>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Personal mentorship, hands-on guidance, and the exact playbooks &amp; AI systems I use to automate businesses — structured into a program that takes you from beginner to confident AI automation expert.
            </p>
          </RevealSection>

          {/* Video Embed Placeholder */}
          <RevealSection delay={300}>
            <div className="max-w-3xl mx-auto mb-10 rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10 aspect-video bg-secondary/50 flex items-center justify-center group cursor-pointer relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
              <p className="absolute bottom-4 text-xs text-muted-foreground">Your video will go here — add your YouTube/Loom link</p>
            </div>
          </RevealSection>

          {/* CTA */}
          <RevealSection delay={400}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#apply">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base animate-pulse-glow">
                  Book a Discovery Call <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <span className="text-sm text-muted-foreground">Only <strong className="text-primary">3 spots</strong> available this month</span>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 border-t border-border/20">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase text-center mb-3">The Program</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-16">How It Works</h2>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { num: "01", icon: <Calendar className="w-6 h-6" />, title: "1:1 Onboarding Call", desc: "We kick off with a deep-dive session to map your goals, assess your current skills, and build your personalized action plan. You leave with clarity on exactly what to do first.", tag: "Day 1 — Personalized strategy session" },
              { num: "02", icon: <Users className="w-6 h-6" />, title: "Weekly Group Sessions", desc: "Live group sessions every week — Q&A, hot seats, accountability, and real-time problem solving.", tag: "Weekly live calls + async support" },
              { num: "03", icon: <Video className="w-6 h-6" />, title: "Monthly 1:1 Check-ins", desc: "Monthly calls to review your progress, troubleshoot blockers, and adjust your roadmap as you grow.", tag: "Personalized milestone reviews" },
              { num: "04", icon: <Shield className="w-6 h-6" />, title: "Money-Back Guarantee", desc: "If you don't see results and have put in the work, you get your money back. Zero risk.", tag: "Full refund guarantee" },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="group p-6 md:p-8 rounded-2xl border border-border/40 bg-card/50 hover:border-primary/30 hover:bg-card transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl font-black text-primary/20">{item.num}</span>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mt-1">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.desc}</p>
                  <span className="inline-block text-xs font-medium text-primary/80 bg-primary/5 px-3 py-1 rounded-full">{item.tag}</span>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ROADMAP TIMELINE ============ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase text-center mb-3">Your Journey</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-16">The Roadmap</h2>
          </RevealSection>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />

            {[
              { time: "Day 1", title: "1:1 Onboarding Call", desc: "Goal setting, skill assessment, and your personalized action plan." },
              { time: "Weeks 1–4", title: "Foundation Phase", desc: "Build your first AI automations, understand the core tools, and start delivering value." },
              { time: "Day 30", title: "30-Day Check-in", desc: "Review progress, celebrate wins, troubleshoot blockers, and plan the next phase." },
              { time: "Weeks 5–8", title: "Advanced Systems", desc: "Complex workflows, multi-step automations, client delivery systems, and scaling." },
              { time: "Day 60", title: "60-Day Check-in", desc: "Deep-dive on what's working. Double down on your strengths." },
              { time: "Weeks 9–12", title: "Mastery & Independence", desc: "Build systems for sustainable, repeatable results. Graduate with confidence." },
              { time: "Day 90", title: "Final Review & Next Steps", desc: "Review your full journey, what you've built, and your plan for continued growth." },
            ].map((step, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div className="relative pl-16 md:pl-20 pb-10 last:pb-0">
                  <div className="absolute left-4 md:left-6 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{step.time}</span>
                  <h3 className="text-base md:text-lg font-bold mt-1 mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT YOU GET ============ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 border-t border-border/20">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase text-center mb-3">Everything Included</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-16">What You Get</h2>
          </RevealSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Calendar className="w-6 h-6" />, title: "1:1 Onboarding + Monthly Check-ins", desc: "Personalized coaching at every milestone of your journey." },
              { icon: <Users className="w-6 h-6" />, title: "Weekly Group Sessions", desc: "Live calls for Q&A, accountability, and real-time strategy." },
              { icon: <BookOpen className="w-6 h-6" />, title: "Complete AI Automation Roadmap", desc: "The exact step-by-step playbook to master AI automation." },
              { icon: <Bot className="w-6 h-6" />, title: "Pre-Built AI Agents & Templates", desc: "Production-ready workflows you can deploy immediately." },
              { icon: <MessageSquare className="w-6 h-6" />, title: "Async Support & Community", desc: "Get unstuck anytime with direct access and community support." },
              { icon: <Shield className="w-6 h-6" />, title: "Money-Back Guarantee", desc: "Full refund if you put in the work and don't see results." },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div className="p-6 rounded-2xl border border-border/30 bg-card/30 hover:border-primary/20 transition-all duration-300 h-full">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-sm md:text-base mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-secondary/20">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase text-center mb-3">Real Results</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-16">What People Are Saying</h2>
          </RevealSection>

          {/* Featured testimonial */}
          <RevealSection delay={100}>
            <div className="rounded-2xl border border-primary/20 bg-card/60 p-6 md:p-10 mb-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
              </div>
              <blockquote className="text-base md:text-lg leading-relaxed mb-6 italic text-foreground/90">
                "The mentorship completely changed how I approach AI automation. Having someone who's already done it guide you through the exact steps — not just theory but real implementation — is invaluable. I went from struggling with basic automations to confidently building complex multi-step workflows for clients."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">JD</div>
                <div>
                  <p className="font-semibold text-sm">John D.</p>
                  <p className="text-xs text-muted-foreground">1:1 Mentee — Now running AI automation services</p>
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Screenshot testimonials grid */}
          <RevealSection delay={200}>
            <h3 className="text-lg font-bold text-center mb-6">1:1 Screenshots & Wins</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { initials: "MR", name: "Mark R.", win: "First automation client signed", color: "bg-emerald-500/20 text-emerald-400" },
                { initials: "SK", name: "Sarah K.", win: "Built full CRM automation in 2 weeks", color: "bg-blue-500/20 text-blue-400" },
                { initials: "AP", name: "Ahmed P.", win: "Landed $5k automation project", color: "bg-amber-500/20 text-amber-400" },
                { initials: "LC", name: "Lisa C.", win: "Automated entire onboarding flow", color: "bg-purple-500/20 text-purple-400" },
                { initials: "TR", name: "Tom R.", win: "Scaled to 3 retainer clients", color: "bg-rose-500/20 text-rose-400" },
                { initials: "NN", name: "Nina N.", win: "Built AI chatbot for enterprise client", color: "bg-cyan-500/20 text-cyan-400" },
              ].map((t, i) => (
                <div key={i} className="p-5 rounded-xl border border-border/30 bg-card/40">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${t.color}`}>{t.initials}</div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-primary">{t.win}</p>
                    </div>
                  </div>
                  <div className="w-full h-32 rounded-lg bg-secondary/60 border border-border/20 flex items-center justify-center text-xs text-muted-foreground">
                    Screenshot placeholder
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 border-t border-border/20">
        <div className="max-w-xl mx-auto text-center">
          <RevealSection>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Investment</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-12">One Price. Everything Included.</h2>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="rounded-2xl border-2 border-primary/40 bg-card/60 p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
              <h3 className="text-xl font-bold mb-2">1:1 Mentorship Program</h3>
              <p className="text-muted-foreground text-sm mb-6">Everything you need to master AI automation</p>
              
              <div className="mb-8">
                <span className="text-5xl md:text-6xl font-black text-gradient">$X,XXX</span>
                <p className="text-sm text-muted-foreground mt-2">One-time investment</p>
              </div>

              <ul className="text-left space-y-3 mb-8">
                {[
                  "1:1 onboarding + monthly check-in calls",
                  "Weekly group sessions",
                  "Complete AI automation roadmap",
                  "Pre-built AI agents & templates",
                  "Async support & community access",
                  "Money-back guarantee",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a href="#apply">
                <Button size="lg" className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-base">
                  Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <p className="text-xs text-muted-foreground mt-4">Risk-free — money-back guarantee included</p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-secondary/20">
        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase text-center mb-3">Common Questions</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          </RevealSection>

          <div className="space-y-3">
            {[
              { q: "Who is this mentorship for?", a: "Anyone serious about mastering AI automation — whether you're a complete beginner, a freelancer looking to add AI services, or a business owner who wants to automate operations. If you're willing to put in the work, this program will meet you where you are." },
              { q: "How much time do I need to commit each week?", a: "Plan for 5–10 hours per week. That includes the weekly group session, working through the roadmap material, and hands-on practice. The program is designed to work even if you have a full-time job." },
              { q: "Do I need technical skills or coding experience?", a: "No. The program includes guides, templates, and pre-built systems you can use without coding. If you do have technical skills, you'll move even faster." },
              { q: "What's the money-back guarantee?", a: "If you complete the program — attend the calls, do the work, follow the roadmap — and don't see meaningful results, you get a full refund. No hoops, no fine print." },
              { q: "What happens after the program ends?", a: "You keep access to all resources, templates, and the community. The structured calls end, but everything you've built and learned is yours forever." },
              { q: "How is this different from AI courses on YouTube?", a: "Courses give you information. This gives you 1:1 mentorship, structured accountability, personalized feedback, and the actual systems running in real businesses — not just theory." },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 60}>
                <FAQItem question={item.q} answer={item.a} />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ APPLY / CTA ============ */}
      <section id="apply" className="py-16 md:py-24 px-4 sm:px-6 border-t border-border/20">
        <div className="max-w-2xl mx-auto text-center">
          <RevealSection>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">3 Simple Steps</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-12">Ready to Start?</h2>
          </RevealSection>

          {/* Steps */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { num: "1", title: "Book a Discovery Call", desc: "A quick call to understand your goals and see if we're a fit." },
              { num: "2", title: "Get Your Plan", desc: "Receive a personalized roadmap tailored to your experience level." },
              { num: "3", title: "Start Building", desc: "Your 1:1 onboarding kicks off. Group sessions start immediately." },
            ].map((step, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary text-primary font-black text-lg flex items-center justify-center mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={300}>
            <Link to="/booking">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-6 text-base animate-pulse-glow">
                Book Your Free Discovery Call <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">No commitment — just a conversation to see if this is right for you.</p>
          </RevealSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/20 text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-3">
          <img src={automindLogo} alt="Automind Labs" className="h-6 opacity-60" />
        </Link>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Automind Labs. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Mentorship;
