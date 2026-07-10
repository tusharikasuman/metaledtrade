import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export const Globe = ({ className = "" }) => {
  const canvasRef = useRef(null);
  const globeRef = useRef(null);

  useEffect(() => {
    let phi = 0;
    let animFrameId;

    // Give the DOM one paint cycle to measure itself
    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const size = canvas.parentElement?.offsetWidth || 500;
      const dpr = Math.min(window.devicePixelRatio, 2);

      // Set actual canvas pixel dimensions explicitly
      canvas.width = size * dpr;
      canvas.height = size * dpr;

      globeRef.current = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: size * dpr,
        height: size * dpr,
        phi: 0,
        theta: 0.35,
        dark: 1,
        diffuse: 1.4,
        mapSamples: 20000,
        mapBrightness: 6,
        baseColor: [0.12, 0.12, 0.12],
        markerColor: [1.0, 0.878, 0.333], // #ffe088
        glowColor: [0.06, 0.06, 0.06],
        markers: [
          { location: [25.2048, 55.2708], size: 0.12 }, // Dubai HQ
          { location: [25.2854, 51.531],  size: 0.07 }, // Qatar
          { location: [24.4539, 54.3773], size: 0.08 }, // Abu Dhabi
          { location: [31.2304, 121.4737], size: 0.07 }, // Shanghai
          { location: [19.076, 72.8777],  size: 0.07 }, // Mumbai
          { location: [-26.2041, 28.0473], size: 0.06 }, // Johannesburg
          { location: [1.3521, 103.8198], size: 0.07 }, // Singapore
          { location: [10.8231, 106.6297], size: 0.06 }, // Ho Chi Minh
        ],
        onRender: (state) => {
          phi += 0.002;
          state.phi = phi;
          state.width = size * dpr;
          state.height = size * dpr;
        },
      });

      // Fade in
      canvas.style.opacity = "1";
    }, 100);

    return () => {
      clearTimeout(timer);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className={`relative ${className}`}
      style={{ width: "100%", height: "100%" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          opacity: 0,
          transition: "opacity 1.2s ease",
          cursor: "grab",
          display: "block",
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, transparent 38%, #131313 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
