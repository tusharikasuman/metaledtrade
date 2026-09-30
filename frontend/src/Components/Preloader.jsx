import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/metaled-logo.jpeg";
import { markPreloaderDone } from "../lib/preloaderStatus";

const HERO_VIDEO = "/videos/metaled-hero-reel-1.mp4";
const MIN_DISPLAY_MS = 1200;

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const videoRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let minTimeElapsed = false;
    let videoReady = !isHome;
    let finished = false;

    const tryFinish = () => {
      if (finished || !minTimeElapsed || !videoReady) return;
      finished = true;
      setLoading(false);
      document.body.style.overflow = "";
      markPreloaderDone();
    };

    const minTimer = setTimeout(() => {
      minTimeElapsed = true;
      tryFinish();
    }, MIN_DISPLAY_MS);

    // Safety net: never block the site on a slow/failed video fetch.
    const maxTimer = setTimeout(() => {
      videoReady = true;
      tryFinish();
    }, 5000);

    if (isHome) {
      const video = document.createElement("video");
      video.src = HERO_VIDEO;
      video.muted = true;
      video.preload = "auto";
      videoRef.current = video;

      const onReady = () => {
        videoReady = true;
        tryFinish();
      };
      video.addEventListener("canplaythrough", onReady, { once: true });
      video.addEventListener("error", onReady, { once: true });
      video.load();
    }

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      document.body.style.overflow = "";
      if (videoRef.current) {
        videoRef.current.src = "";
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
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
