import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/metaled-logo.jpeg";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock background scroll during loading
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" } 
          }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-white select-none"
        >
          {/* Centered Simple Logo Circle */}
          <div className="relative flex items-center justify-center">
            {/* Subtle Outer Spinner Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -inset-3 rounded-full border-2 border-amber-500/70 border-t-transparent border-l-transparent"
            />

            {/* Logo Badge with Gentle Pulsing Scale */}
            <motion.div
              animate={{
                scale: [0.96, 1.04, 0.96],
                opacity: [0.85, 1, 0.85],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-28 h-28 rounded-full overflow-hidden p-1 bg-white border border-zinc-200 shadow-lg flex items-center justify-center"
            >
              <img
                src={logo}
                alt="Metal Ed Trade Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
