import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useContactInfo } from "@/hooks/useCMSData";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

const Contact = () => {
  const { toast } = useToast();
  const { contactInfo, loading: contactLoading } = useContactInfo();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formBody = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
        timestamp: new Date().toISOString(),
        source: "automind-contact-form"
      });
      
      await fetch("https://hook.eu1.make.com/m7e77kai1bcj7p6i4ck25fii4mfh4t2i", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "no-cors",
        body: formBody.toString(),
      });
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      console.error("Error sending form:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use data from admin panel or defaults
  const email = contactInfo?.email || "Info@automindlabs.ai";
  const phone = contactInfo?.phone || "+1 (555) 123-4567";
  const address = contactInfo?.address || "123 AI Innovation Drive, San Francisco, CA 94105";
  const bookingIframe = contactInfo?.booking_iframe_code || "";
  
  // Parse map URL from booking iframe or use default
  const defaultMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977906969!2d-122.39568068468195!3d37.78779727975763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807abad77c57%3A0xaf3c3c8c7e3a5b95!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890";
  
  const contactItems = [
    { icon: Mail, title: "Email Us", details: email, description: "We reply within 24 hours" },
    { icon: Phone, title: "Call Us", details: phone, description: "Mon-Fri, 9am-6pm EST" },
    { icon: MapPin, title: "Visit Us", details: address.split(',')[0], description: address.split(',').slice(1).join(',').trim() || "San Francisco, CA" }
  ];

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <PageHero
        title="Contact Us"
        subtitle="Let's start a conversation about your automation needs"
        backgroundImage="https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1920&q=80"
      />

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {contactItems.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-foreground font-medium">{item.details}</p>
                <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Send us a Message</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none transition-colors" placeholder="john@company.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none transition-colors" placeholder="Your Company" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none transition-colors resize-none" placeholder="Tell us about your project..." />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50">
                  {isSubmitting ? "Sending..." : <><Send className="w-5 h-5" />Send Message</>}
                </button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Find Us</h2>
              </div>
              <div className="rounded-2xl overflow-hidden border border-border h-[400px] lg:h-[calc(100%-60px)]">
                <iframe src={defaultMapUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Section - Show iframe if available */}
      {bookingIframe && (
        <section className="py-20 px-6 bg-card/30">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Book a Strategy Call</h2>
              <p className="text-muted-foreground">Schedule a free consultation with our team.</p>
            </motion.div>
            <div className="rounded-2xl overflow-hidden border border-border" dangerouslySetInnerHTML={{ __html: bookingIframe }} />
          </div>
        </section>
      )}

      <section className="py-20 px-6 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Clock className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prefer a Quick Call?</h2>
            <p className="text-muted-foreground text-lg mb-8">Book a free 30-minute strategy session with our AI experts.</p>
            <a href="/booking" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors">Book a Free Strategy Call</a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
