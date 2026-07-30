import React, { useState } from "react";

export const PinContainer = ({
  children,
  title,
  href,
  className = "",
  containerClassName = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group/pin cursor-pointer ${containerClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (href) window.open(href, "_blank");
      }}
      style={{
        perspective: "1000px",
      }}
    >
      {/* 3D Rotated Card Wrapper */}
      <div
        style={{
          transform: isHovered
            ? "rotateX(20deg) scale(0.95) translate3d(0, -6px, 0)"
            : "rotateX(0deg) scale(1) translate3d(0, 0, 0)",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          transformStyle: "preserve-3d",
        }}
        className={`relative z-10 w-full h-full ${className}`}
      >
        {children}
      </div>

      {/* Floating Pin & Tooltip HUD */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 transition-all duration-400 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered 
            ? "translate3d(-50%, -100%, 40px) scale(1)" 
            : "translate3d(-50%, -50%, 0px) scale(0.6)",
        }}
      >
        <div className="flex flex-col items-center justify-center">
          {/* Tooltip Pill */}
          <div className="flex items-center gap-1.5 bg-black/90 border border-[#ffd862]/30 px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,216,98,0.2)] backdrop-blur-md">
            <span className="text-[10px] font-mono font-bold tracking-wider text-[#ffd862] uppercase whitespace-nowrap">
              {title}
            </span>
            <span className="material-symbols-outlined text-[10px] text-[#ffd862] font-bold">
              open_in_new
            </span>
          </div>

          {/* Floating Line */}
          <div className="w-[1px] h-12 bg-gradient-to-t from-transparent via-[#ffd862]/50 to-[#ffd862] relative mt-1">
            {/* Pulsing Dot at bottom of line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ffd862] shadow-[0_0_8px_#ffd862]" />
            
            {/* Radar Pulsing Waves */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-[#ffd862]/20 animate-ping" />
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border border-[#ffd862]/10 animate-ping delay-75" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
