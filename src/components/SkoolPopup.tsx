import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import skoolImage from "@/assets/skool-popup-image.avif";
import skoolLogo from "@/assets/skool-logo.png";

const SkoolPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Reset for testing - remove this line after testing
    localStorage.removeItem("skool-popup-seen");
    
    const hasSeenPopup = localStorage.getItem("skool-popup-seen");
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("skool-popup-seen", "true");
  };

  const handleJoin = () => {
    localStorage.setItem("skool-popup-seen", "true");
    window.open("https://www.skool.com/ai-automation-lab", "_blank");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Popup - True Center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="relative bg-background rounded-2xl shadow-2xl overflow-hidden w-full max-w-[900px] flex flex-col md:flex-row" style={{ border: '0.5px solid #019CC6' }}>
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-background/80 hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Left Content */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                {/* Skool Logo */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6"
                >
                  <img src={skoolLogo} alt="Skool" className="h-10 w-auto" />
                </motion.div>

                {/* Headline */}
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight"
                >
                  AI Automation Lab
                </motion.h2>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground text-base md:text-lg mb-8"
                >
                  Master AI automation with real-world use cases, step-by-step tutorials, expert guidance, and a supportive community of innovators.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    onClick={handleJoin}
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-xl text-base group"
                  >
                    Join Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>

                {/* Skip link */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={handleClose}
                  className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  No thanks
                </motion.button>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-[1px] bg-[#019CC6]/50" />

              {/* Right Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="hidden md:block flex-1 relative min-h-[300px] md:min-h-[400px]"
              >
                <img
                  src={skoolImage}
                  alt="AI Automation"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SkoolPopup;
