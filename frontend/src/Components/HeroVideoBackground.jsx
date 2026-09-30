import React, { useEffect, useRef, useState } from "react";

const CLIP_SECONDS = 6.5; // each clip plays for ~5-7s before cycling to the next

// Cycles between two looping background clips, each capped to a short
// duration, crossfading between them. Falls back to a static image until
// the first clip is ready to play.
export default function HeroVideoBackground({ sources, fallbackSrc, fallbackAlt = "" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const videoRefs = useRef([]);

  useEffect(() => {
    const active = videoRefs.current[activeIndex];
    if (!active) return;
    active.currentTime = 0;
    const playPromise = active.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  }, [activeIndex]);

  const advance = () => {
    setActiveIndex((prev) => (prev + 1) % sources.length);
  };

  const handleTimeUpdate = (index) => (e) => {
    if (index !== activeIndex) return;
    if (e.currentTarget.currentTime >= CLIP_SECONDS) {
      advance();
    }
  };

  const handleEnded = (index) => () => {
    if (index !== activeIndex) return;
    advance();
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-bg">
      <img
        src={fallbackSrc}
        alt={fallbackAlt}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{ opacity: videoReady ? 0 : 1 }}
      />
      {sources.map((src, i) => (
        <video
          key={src}
          ref={(el) => (videoRefs.current[i] = el)}
          src={src}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ opacity: activeIndex === i ? 1 : 0 }}
          onTimeUpdate={handleTimeUpdate(i)}
          onEnded={handleEnded(i)}
          onCanPlay={() => setVideoReady(true)}
        />
      ))}
    </div>
  );
}
