import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const SkoolPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
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
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-md"
          >
            <div className="relative bg-background rounded-3xl shadow-2xl overflow-hidden border border-border/50">
              {/* Gradient accent top */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Content */}
              <div className="p-8 pt-10 text-center">
                {/* Skool Logo */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center justify-center gap-2">
                    {/* Skool "S" icon */}
                    <div className="w-12 h-12 rounded-xl bg-[#5865F2] flex items-center justify-center shadow-lg shadow-[#5865F2]/30">
                      <span className="text-white font-black text-2xl">S</span>
                    </div>
                    <span className="text-3xl font-black tracking-tight">
                      skool
                    </span>
                  </div>
                </motion.div>

                {/* Headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-3xl font-bold mb-3"
                >
                  AI Automation Lab
                </motion.h2>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground text-sm sm:text-base mb-8"
                >
                  Master AI automation with real-world use cases
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    onClick={handleJoin}
                    size="lg"
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-6 rounded-xl text-base group shadow-lg shadow-[#5865F2]/25"
                  >
                    Join Free Community
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SkoolPopup;
