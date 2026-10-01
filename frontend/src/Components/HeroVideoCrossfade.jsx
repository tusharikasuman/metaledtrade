import React, { useEffect, useRef, useState } from "react";

const FADE_SECONDS = 1.2;

// Seamless hero reel: every clip gets its own stacked <video>, all preloaded.
// Shortly before the active clip ends, the next one starts playing underneath
// and the two crossfade, so there is never a blank frame or a reload pause.
export default function HeroVideoCrossfade({ sources, poster, posterAlt = "", onClipChange }) {
  const videoRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const advancing = useRef(false);

  // Start the first clip as soon as it can play.
  useEffect(() => {
    const first = videoRefs.current[0];
    if (!first) return;
    const start = () => {
      first.play().catch(() => {});
      setStarted(true);
    };
    if (first.readyState >= 3) start();
    else first.addEventListener("canplay", start, { once: true });
    return () => first.removeEventListener("canplay", start);
  }, []);

  useEffect(() => {
    if (onClipChange) onClipChange(active);
    advancing.current = false;
    // Pause clips that have fully faded out, so only one or two ever decode.
    const t = setTimeout(() => {
      videoRefs.current.forEach((v, i) => {
        if (v && i !== active) v.pause();
      });
    }, FADE_SECONDS * 1000 + 100);
    return () => clearTimeout(t);
  }, [active, onClipChange]);

  const advanceFrom = (i) => {
    if (i !== active || advancing.current) return;
    advancing.current = true;
    const next = (i + 1) % sources.length;
    const nv = videoRefs.current[next];
    if (nv) {
      nv.currentTime = 0;
      nv.play().catch(() => {});
    }
    setActive(next);
  };

  const handleTimeUpdate = (i) => (e) => {
    const v = e.currentTarget;
    if (v.duration && v.currentTime >= v.duration - FADE_SECONDS) advanceFrom(i);
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0b0b0c]">
      {poster && (
        <img
          src={poster}
          alt={posterAlt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: started ? 0 : 1 }}
        />
      )}
      {sources.map((src, i) => (
        <video
          key={src}
          ref={(el) => (videoRefs.current[i] = el)}
          src={src}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: started && i === active ? 1 : 0,
            transition: `opacity ${FADE_SECONDS}s ease-in-out`,
          }}
          onTimeUpdate={handleTimeUpdate(i)}
          // Fallback if timeupdate didn't fire late enough (e.g. throttled tab).
          onEnded={() => advanceFrom(i)}
        />
      ))}
    </div>
  );
}
