import React from "react";
import { motion } from "framer-motion";

// Splits text into letters that fly in from alternating up/down offsets —
// used for the premium "sting" reveal once the preloader/hero video is ready.
export default function KineticText({ text, revealed, className, baseDelay = 0, offset = 26 }) {
  const letters = text.split("");

  return (
    <span className={`inline-block overflow-hidden ${className || ""}`} aria-label={text}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: i % 2 === 0 ? offset : -offset, opacity: 0 }}
          animate={revealed ? { y: 0, opacity: 1 } : undefined}
          transition={{
            duration: 0.55,
            delay: baseDelay + i * 0.035,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}
