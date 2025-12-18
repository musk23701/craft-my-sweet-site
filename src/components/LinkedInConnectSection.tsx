import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const LinkedInConnectSection = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-[1300px] mx-auto">
        <div className="flex flex-col-reverse lg:flex-row justify-center gap-10 lg:gap-14 items-center">
          {/* Mobile Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Phone Frame */}
            <div className="relative w-[280px] md:w-[320px]">
              {/* Phone Body */}
              <div className="relative rounded-[40px] border-4 border-muted bg-card shadow-2xl overflow-hidden">
                {/* Screen Content */}
                <div className="aspect-[9/19] bg-background p-4">
                  {/* Search Bar */}
                  <div className="bg-muted rounded-lg px-4 py-2 flex items-center gap-2 mb-4">
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-xs text-muted-foreground">Search</span>
                  </div>

                  {/* Profile Header */}
                  <div className="relative h-24 rounded-t-lg bg-gradient-to-r from-primary/20 to-primary/40 mb-12">
                    <div className="absolute -bottom-10 left-4 w-20 h-20 rounded-full border-4 border-background bg-primary/30 flex items-center justify-center">
                      <span className="text-2xl font-black text-primary">AI</span>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="mt-4">
                    <h3 className="font-bold text-sm flex items-center gap-1">
                      Automind Labs
                      <Linkedin className="w-3 h-3 text-[#0077B5]" />
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
                      AI Automation Agency | Building the Future of Business Automation
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      500+ connections
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3">
                      <div className="bg-primary text-primary-foreground text-[10px] px-4 py-1.5 rounded-full font-medium">
                        Follow
                      </div>
                      <div className="border border-muted-foreground/30 text-[10px] px-4 py-1.5 rounded-full flex items-center gap-1">
                        <span>Message</span>
                      </div>
                    </div>

                    {/* About Section */}
                    <div className="mt-4">
                      <h4 className="text-xs font-semibold">About</h4>
                      <p className="text-[9px] text-muted-foreground mt-1 leading-relaxed">
                        Transforming businesses through intelligent AI automation. We help companies save thousands of hours...
                      </p>
                    </div>

                    {/* Activity */}
                    <div className="mt-4">
                      <h4 className="text-xs font-semibold">Activity</h4>
                      <p className="text-[9px] text-muted-foreground">2,000+ followers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Glow Effect */}
              <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full -z-10" />
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5 text-center lg:text-left"
          >
            <a 
              href="https://www.linkedin.com/company/automindlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer bg-[#0077B5] h-[50px] lg:h-[60px] items-center font-medium text-[14px] sm:text-[16px] lg:text-[18px] gap-3 px-6 rounded-lg hover:bg-[#006297] transition-colors duration-300 text-white"
            >
              Connect on 
              <span className="flex items-center gap-1">
                <span className="font-bold">Linked</span>
                <Linkedin className="w-5 h-5" fill="white" />
              </span>
            </a>
            <p className="text-muted-foreground text-sm max-w-xs">
              Stay updated with the latest AI automation insights, tips, and industry news.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LinkedInConnectSection;
