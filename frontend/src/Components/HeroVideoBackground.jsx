import React, { useEffect, useRef, useState } from "react";

const CLIP_SECONDS = 6.5; // each clip plays for ~5-7s before cycling to the next

// Cycles between looping background clips using a SINGLE <video> element —
// only one clip is ever downloading/decoding at a time, which matters a lot
// for large hero video files. Crossfades via a brief opacity dip on switch.
export default function HeroVideoBackground({ sources, fallbackSrc, fallbackAlt = "" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [switching, setSwitching] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setSwitching(true);
    video.src = sources[activeIndex];
    video.load();

    const onCanPlay = () => {
      setHasPlayedOnce(true);
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
      requestAnimationFrame(() => setSwitching(false));
    };

    video.addEventListener("canplay", onCanPlay, { once: true });
    return () => video.removeEventListener("canplay", onCanPlay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const advance = () => {
    setActiveIndex((prev) => (prev + 1) % sources.length);
  };

  const handleTimeUpdate = (e) => {
    if (e.currentTarget.currentTime >= CLIP_SECONDS) {
      advance();
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-bg">
      <img
        src={fallbackSrc}
        alt={fallbackAlt}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{ opacity: hasPlayedOnce ? 0 : 1 }}
      />
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
        style={{ opacity: hasPlayedOnce && !switching ? 1 : 0 }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={advance}
      />
    </div>
  );
}
