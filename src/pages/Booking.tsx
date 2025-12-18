import { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, CheckCircle } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const Booking = () => {
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
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <MobileNav />
      
      <main className="flex-1 lg:ml-0 mt-[70px] lg:mt-0">
        <section className="relative py-20 px-6 bg-gradient-to-b from-primary/10 to-background">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full mb-6">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Free Strategy Session</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Book Your Free <span className="text-primary">AI Strategy Call</span></h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Schedule a complimentary 30-minute consultation with our AI automation experts.</p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              {[{ icon: Clock, title: "30 Minutes", desc: "Quick & focused session" }, { icon: Video, title: "Video Call", desc: "Meet face-to-face online" }, { icon: CheckCircle, title: "100% Free", desc: "No obligation whatsoever" }].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-card border border-border rounded-2xl p-6 text-center">
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6">What to Expect</h2>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 p-6 bg-card border border-border rounded-2xl">
                  <h3 className="font-semibold mb-3">Who is this for?</h3>
                  <ul className="text-muted-foreground text-sm space-y-2">
                    <li>• Business owners looking to scale</li>
                    <li>• Teams drowning in manual tasks</li>
                    <li>• Companies seeking efficiency gains</li>
                    <li>• Anyone curious about AI automation</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-3">
                <div className="bg-card border border-border rounded-2xl p-6 min-h-[600px]">
                  <h2 className="text-xl font-bold mb-6 text-center">Select a Date & Time</h2>
                  <iframe src="https://app.devtrest.com/widget/booking/Hn1hjHRLhl9BOC7z1PHN" style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "500px" }} scrolling="no" id="Hn1hjHRLhl9BOC7z1PHN_1762235387271" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Booking;
