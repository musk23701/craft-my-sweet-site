import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Shield, Users, Calendar, Video, BookOpen, Bot, MessageSquare, ChevronDown, Star, Play, Zap, Target, TrendingUp, Award } from "lucide-react";
import SEO from "@/components/SEO";
import automindLogo from "@/assets/automind-labs-logo-new.png";
import heroImg from "@/assets/mentorship-hero.jpg";
import mentorImg from "@/assets/mentor-portrait.jpg";
import win1 from "@/assets/mentorship-win-1.jpg";
import win2 from "@/assets/mentorship-win-2.jpg";
import win3 from "@/assets/mentorship-win-3.jpg";
import workflowImg from "@/assets/mentorship-workflow.jpg";

const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
};

const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const FAQItem = ({ question, answer, num }: { question: string; answer: string; num: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border/40 rounded-2xl overflow-hidden bg-card/30 hover:border-primary/20 transition-colors">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 p-5 md:p-6 text-left">
        <span className="text-primary font-black text-sm shrink-0">{num}</span>
        <span className="font-semibold text-sm md:text-base flex-1">{question}</span>
        <ChevronDown className={`w-5 h-5 shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="px-5 md:px-6 pb-5 md:pb-6 pl-14 text-muted-foreground text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

// Animated counter
const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const { ref, visible } = useScrollReveal();
  useEffect(() => {
    if (!visible) return;
    let current = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(interval); }
      else setCount(current);
    }, 30);
    return () => clearInterval(interval);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={automindLogo} alt="Automind Labs" className="h-8" />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-muted-foreground">Only <strong className="text-primary">3 spots</strong> left</span>
            <a href="#apply">
              <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6">
                Apply Now <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* ============ HERO — Full Visual ============ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        </div>

        {/* Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-20 text-center">
          {/* Badge */}
          <Reveal>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm text-primary text-sm font-semibold mb-8">
              <Shield className="w-4 h-4" />
              Limited Spots · Money-Back Guarantee
            </div>
          </Reveal>

          <Reveal delay={150}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-6 tracking-tight">
              Your <span className="text-gradient italic">1:1</span> AI<br />
              Automation Mentor
            </h1>
          </Reveal>

          <Reveal delay={250}>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Get hands-on, personalized guidance to build real AI automation systems — with someone who's already done it for 50+ businesses.
            </p>
          </Reveal>

          {/* Video Embed */}
          <Reveal delay={350}>
            <div className="max-w-3xl mx-auto mb-10 rounded-2xl overflow-hidden border border-border/30 shadow-2xl shadow-primary/20 aspect-video bg-black/60 backdrop-blur-sm relative group cursor-pointer">
              <img src={heroImg} alt="Mentorship preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/40">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <p className="text-xs text-foreground/70 font-medium">Watch: How the 1:1 mentorship program works</p>
              </div>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={450}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <a href="#apply">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 py-7 text-lg animate-pulse-glow shadow-lg shadow-primary/30">
                  Book a Free Discovery Call <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-5">Only <strong className="text-primary font-bold">3 spots</strong> available this month</p>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-muted-foreground/30" />
        </div>
      </section>

      {/* ============ SOCIAL PROOF STATS ============ */}
      <section className="py-6 border-y border-border/20 bg-card/30">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: 50, suffix: "+", label: "Businesses Automated" },
            { value: 200, suffix: "+", label: "Workflows Built" },
            { value: 95, suffix: "%", label: "Client Satisfaction" },
            { value: 10, suffix: "x", label: "Average ROI" },
          ].map((stat, i) => (
            <div key={i} className="py-4">
              <p className="text-2xl md:text-4xl font-black text-primary"><Counter target={stat.value} suffix={stat.suffix} /></p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ "MY STORY" — VISUAL SECTION ============ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[200px]" />
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image side */}
            <Reveal>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden border border-border/30 shadow-2xl">
                  <img src={mentorImg} alt="Your mentor" className="w-full aspect-[3/4] object-cover" />
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-6 -right-4 md:-right-8 bg-card border border-border/50 rounded-2xl p-4 shadow-xl backdrop-blur-sm max-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs font-bold">50+ Clients</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Automating businesses across the USA</p>
                </div>
              </div>
            </Reveal>

            {/* Text side */}
            <div>
              <Reveal delay={100}>
                <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">The Story</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  I Tried Everything.<br />
                  <span className="text-gradient">Then I Found What Works.</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                  <p>
                    I spent years testing every AI tool, automation platform, and business model out there. Most of them were overhyped. Some were outright scams. But through relentless experimentation, I found the <strong className="text-foreground">exact systems that actually work.</strong>
                  </p>
                  <p>
                    Now I've automated 50+ businesses, built hundreds of AI workflows, and helped clients save thousands of hours. And I want to teach you the <strong className="text-foreground">exact same systems</strong> — not theory, not courses, but real 1:1 mentorship.
                  </p>
                  <p>
                    If you're serious about mastering AI automation — whether to start a business, level up your career, or transform your company — <strong className="text-foreground">this is for you.</strong>
                  </p>
                </div>
              </Reveal>
              <Reveal delay={300}>
                <a href="#apply" className="inline-block mt-8">
                  <Button variant="outline" className="rounded-full border-primary/40 text-primary hover:bg-primary/10 font-semibold px-6">
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS — VISUAL CARDS ============ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase text-center mb-3">The Program</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-4">How It Works</h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">A structured mentorship designed to get you real results — not just information.</p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { num: "01", icon: <Calendar className="w-7 h-7" />, title: "1:1 Onboarding Call", desc: "Deep-dive session to map your goals, assess skills, and build your personalized action plan.", tag: "Day 1", gradient: "from-primary/20 to-primary/5" },
              { num: "02", icon: <Users className="w-7 h-7" />, title: "Weekly Inner Circle", desc: "Live group sessions — Q&A, hot seats, accountability, and real-time problem solving.", tag: "Every Week", gradient: "from-blue-500/20 to-blue-500/5" },
              { num: "03", icon: <Target className="w-7 h-7" />, title: "Monthly 1:1 Check-ins", desc: "Review progress, troubleshoot blockers, and adjust your roadmap as you grow.", tag: "Monthly", gradient: "from-emerald-500/20 to-emerald-500/5" },
              { num: "04", icon: <Shield className="w-7 h-7" />, title: "Money-Back Guarantee", desc: "Put in the work and don't see results? Full refund. Zero risk, zero questions.", tag: "100% Risk Free", gradient: "from-amber-500/20 to-amber-500/5" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className={`group relative p-7 md:p-8 rounded-2xl border border-border/30 bg-gradient-to-br ${item.gradient} hover:border-primary/30 transition-all duration-500 h-full overflow-hidden`}>
                  <div className="absolute top-0 right-0 text-[80px] font-black text-foreground/[0.03] leading-none">{item.num}</div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-background/80 border border-border/50 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{item.desc}</p>
                    <span className="inline-block text-xs font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full">{item.tag}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WORKFLOW IMAGE SECTION ============ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal>
                <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">What You'll Build</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight">Real AI Systems. Not Just Theory.</h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="text-muted-foreground mb-8 leading-relaxed">You'll get hands-on experience building the exact same automation workflows that power real businesses — CRM automations, AI chatbots, lead generation systems, and more.</p>
              </Reveal>
              <div className="space-y-4">
                {[
                  { icon: <Bot className="w-5 h-5" />, text: "Pre-built AI agents you can deploy immediately" },
                  { icon: <Zap className="w-5 h-5" />, text: "Production-ready automation templates" },
                  { icon: <TrendingUp className="w-5 h-5" />, text: "Client acquisition & scaling playbooks" },
                  { icon: <BookOpen className="w-5 h-5" />, text: "Step-by-step implementation guides" },
                ].map((item, i) => (
                  <Reveal key={i} delay={150 + i * 60}>
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/30 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">{item.icon}</div>
                      <p className="text-sm font-medium">{item.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={200}>
              <div className="rounded-3xl overflow-hidden border border-border/30 shadow-2xl shadow-primary/10">
                <img src={workflowImg} alt="AI Automation Workflow" className="w-full aspect-square object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ ROADMAP TIMELINE ============ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-secondary/30 to-background">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase text-center mb-3">Your Journey</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-4">The Roadmap</h2>
            <p className="text-muted-foreground text-center max-w-lg mx-auto mb-16">From complete beginner to confidently building and delivering AI automation systems.</p>
          </Reveal>

          <div className="relative">
            <div className="absolute left-[22px] md:left-[30px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/40 to-transparent" />

            {[
              { time: "Day 1", title: "1:1 Onboarding", desc: "Goal setting, skill assessment, and your personalized action plan.", color: "bg-primary" },
              { time: "Weeks 1–4", title: "Foundation Phase", desc: "Build your first AI automations. Understand core tools. Start delivering value.", color: "bg-primary" },
              { time: "Day 30", title: "30-Day Milestone", desc: "Review progress, celebrate first wins, adjust strategy.", color: "bg-emerald-500" },
              { time: "Weeks 5–8", title: "Advanced Systems", desc: "Complex multi-step automations, client systems, and scaling.", color: "bg-primary" },
              { time: "Day 60", title: "60-Day Review", desc: "Deep-dive on what's working. Double down on your strengths.", color: "bg-amber-500" },
              { time: "Weeks 9–12", title: "Mastery Phase", desc: "Build sustainable, repeatable systems. Graduate with confidence.", color: "bg-primary" },
              { time: "Day 90", title: "Final Review", desc: "Celebrate your journey. Plan for continued growth.", color: "bg-emerald-500" },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="relative pl-14 md:pl-20 pb-10 last:pb-0">
                  <div className={`absolute left-3 md:left-5 w-5 h-5 rounded-full ${step.color} border-4 border-background shadow-lg`} />
                  <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">{step.time}</span>
                  <h3 className="text-base md:text-lg font-bold mt-2 mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT YOU GET — VISUAL GRID ============ */}
      <section className="py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase text-center mb-3">Everything Included</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-16">What You Get</h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Calendar className="w-6 h-6" />, title: "1:1 Onboarding + Check-ins", desc: "Personalized coaching at every milestone.", color: "text-primary bg-primary/10" },
              { icon: <Users className="w-6 h-6" />, title: "Weekly Group Sessions", desc: "Live Q&A, accountability, and strategy.", color: "text-blue-400 bg-blue-500/10" },
              { icon: <BookOpen className="w-6 h-6" />, title: "Full Automation Roadmap", desc: "Step-by-step playbook to master AI.", color: "text-emerald-400 bg-emerald-500/10" },
              { icon: <Bot className="w-6 h-6" />, title: "Pre-Built AI Agents", desc: "Deploy production-ready systems instantly.", color: "text-amber-400 bg-amber-500/10" },
              { icon: <MessageSquare className="w-6 h-6" />, title: "Async Support", desc: "Get unstuck anytime with direct access.", color: "text-purple-400 bg-purple-500/10" },
              { icon: <Shield className="w-6 h-6" />, title: "Money-Back Guarantee", desc: "Full refund if you don't see results.", color: "text-rose-400 bg-rose-500/10" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="group p-6 rounded-2xl border border-border/30 bg-card/20 hover:bg-card/60 hover:border-border/60 transition-all duration-300 h-full">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${item.color} group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-sm md:text-base mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS — VISUAL ============ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase text-center mb-3">Real Results</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-4">From Mentee to Expert</h2>
            <p className="text-muted-foreground text-center max-w-lg mx-auto mb-16">Real stories from real people who went through the program.</p>
          </Reveal>

          {/* Featured testimonial */}
          <Reveal delay={100}>
            <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-8 md:p-12 mb-10 relative overflow-hidden">
              <div className="absolute top-6 right-8 text-[120px] leading-none font-serif text-primary/10">"</div>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
              </div>
              <blockquote className="text-lg md:text-xl leading-relaxed mb-8 font-medium relative z-10">
                "The mentorship completely changed how I approach AI automation. Having someone who's already done it guide you through the exact steps — not just theory but <span className="text-primary font-bold">real implementation</span> — is invaluable. I went from struggling with basic automations to confidently building complex workflows for clients."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">JD</div>
                <div>
                  <p className="font-bold">John D.</p>
                  <p className="text-sm text-muted-foreground">1:1 Mentee — Now running AI automation services</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Win screenshots */}
          <Reveal delay={200}>
            <h3 className="text-lg font-bold text-center mb-2">1:1 Chat Wins & Success Stories</h3>
            <p className="text-sm text-muted-foreground text-center mb-8">Real screenshots from mentorship conversations</p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { img: win1, name: "First AI Client Win", badge: "Mentee Win 🎉" },
              { img: win2, name: "$5K Project Landed", badge: "Revenue Milestone 💰" },
              { img: win3, name: "Full Workflow Automated", badge: "System Built 🚀" },
            ].map((item, i) => (
              <Reveal key={i} delay={250 + i * 100}>
                <div className="rounded-2xl overflow-hidden border border-border/30 bg-card/40 group hover:border-primary/20 transition-all">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{item.badge}</span>
                    <p className="text-sm font-semibold mt-2">{item.name}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* More testimonial cards */}
          <div className="grid sm:grid-cols-2 gap-5 mt-8">
            {[
              { initials: "MR", name: "Mark R.", quote: "Went from zero knowledge to building automations for paying clients in 6 weeks. The 1:1 guidance made all the difference.", stars: 5 },
              { initials: "SK", name: "Sarah K.", quote: "Best investment I've made. The pre-built templates alone saved me months. Having a mentor to review my work? Priceless.", stars: 5 },
            ].map((t, i) => (
              <Reveal key={i} delay={350 + i * 100}>
                <div className="p-6 rounded-2xl border border-border/30 bg-card/30">
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />)}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center font-bold text-xs text-primary">{t.initials}</div>
                    <p className="font-semibold text-sm">{t.name}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        <div className="max-w-xl mx-auto text-center relative z-10">
          <Reveal>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Investment</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-12">One Price. Everything Included.</h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl border-2 border-primary/40 bg-gradient-to-b from-card/80 to-card/40 p-8 md:p-10 relative overflow-hidden shadow-2xl shadow-primary/10">
              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-[80px]" />

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6">
                <Award className="w-3.5 h-3.5" /> MOST POPULAR
              </div>

              <h3 className="text-xl font-bold mb-2">1:1 Mentorship Program</h3>
              <p className="text-muted-foreground text-sm mb-8">Everything you need to master AI automation</p>
              
              <div className="mb-8">
                <span className="text-5xl md:text-7xl font-black text-gradient">$X,XXX</span>
                <p className="text-sm text-muted-foreground mt-2">One-time investment</p>
              </div>

              <ul className="text-left space-y-3.5 mb-8">
                {[
                  "1:1 onboarding + monthly check-in calls",
                  "Weekly Inner Circle group sessions",
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
                <Button size="lg" className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-7 text-base shadow-lg shadow-primary/30">
                  Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <p className="text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-primary" /> Risk-free — money-back guarantee included
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 bg-secondary/20">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase text-center mb-3">Common Questions</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-12">FAQ</h2>
          </Reveal>

          <div className="space-y-3">
            {[
              { q: "Who is this mentorship for?", a: "Anyone serious about mastering AI automation — beginners, freelancers adding AI services, or business owners wanting to automate operations. If you're willing to put in the work, this program meets you where you are." },
              { q: "How much time do I need per week?", a: "Plan for 5–10 hours per week including the weekly group session, roadmap material, and practice. Designed to work alongside a full-time job." },
              { q: "Do I need coding experience?", a: "No. The program includes guides, templates, and pre-built systems you can use without coding. Technical skills let you move faster, but aren't required." },
              { q: "What's the money-back guarantee?", a: "Complete the program, do the work, follow the roadmap — if you don't see meaningful results, full refund. No hoops, no fine print." },
              { q: "What happens after the program ends?", a: "You keep lifetime access to all resources, templates, and community. The structured calls end, but everything you've built is yours forever." },
              { q: "How is this different from YouTube courses?", a: "Courses give information. This gives 1:1 mentorship, structured accountability, personalized feedback, and the actual systems running in real businesses." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 50}>
                <FAQItem question={item.q} answer={item.a} num={`0${i + 1}`} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ APPLY / CTA ============ */}
      <section id="apply" className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <Reveal>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">3 Simple Steps</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-12">Ready to Start?</h2>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-8 mb-14">
            {[
              { num: "1", title: "Book a Call", desc: "Quick discovery call to understand your goals.", icon: <Calendar className="w-5 h-5" /> },
              { num: "2", title: "Get Your Plan", desc: "Receive a personalized roadmap.", icon: <Target className="w-5 h-5" /> },
              { num: "3", title: "Start Building", desc: "1:1 onboarding kicks off immediately.", icon: <Zap className="w-5 h-5" /> },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 text-primary flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <Link to="/booking">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-12 py-7 text-lg animate-pulse-glow shadow-2xl shadow-primary/30">
                Book Your Free Discovery Call <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-5">No commitment — just a conversation to see if this is right for you.</p>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-border/20 text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4 opacity-60 hover:opacity-100 transition-opacity">
          <img src={automindLogo} alt="Automind Labs" className="h-7" />
        </Link>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Automind Labs. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Mentorship;
