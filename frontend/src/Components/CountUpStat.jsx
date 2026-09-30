import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

// Animates "10M+" / "30+" style values by counting the leading number up
// from 0 once the stat scrolls into view, keeping the trailing suffix fixed.
export default function CountUpStat({ value, duration = 1.4, className }) {
  const [display, setDisplay] = useState("0");
  const hasStarted = useRef(false);

  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : "";

  const start = () => {
    if (hasStarted.current || target === null) return;
    hasStarted.current = true;

    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };
    requestAnimationFrame(tick);
  };

  return (
    <motion.span
      className={className}
      onViewportEnter={start}
      viewport={{ once: true, amount: 0.8 }}
    >
      {target === null ? value : display}
    </motion.span>
  );
}
