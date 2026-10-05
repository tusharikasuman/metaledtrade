import React, { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineBuildingOffice2, HiOutlineArrowsRightLeft, HiOutlineWrenchScrewdriver } from "react-icons/hi2";

// ─── Deal-flow diagram ────────────────────────────────────────────────────────
// Supplier ⇄ Metaled Trade ⇄ Buyer. Goods and shipping documents travel one
// way along the top lane; payment, secured by a Letter of Credit, travels back
// along the bottom lane. SVG draws the lanes; nodes are HTML on top, positioned
// in the same 600 × 300 coordinate space (as percentages). Node labels sit in
// their own row underneath so they never collide with the lanes.

const GOLD = "#e9c349";
const W = 600;
const H = 300;
const NODE_Y = 150;

const NODES = [
  { x: 90, label: "Supplier", sub: "Mill / producer", icon: HiOutlineBuildingOffice2 },
  { x: 300, label: "Metaled Trade", sub: "Structures the deal", icon: HiOutlineArrowsRightLeft, main: true },
  { x: 510, label: "Buyer", sub: "Project / end user", icon: HiOutlineWrenchScrewdriver },
];

const LANES = [
  { d: "M 112 118 C 200 10, 400 10, 488 118", label: "Steel + shipping documents", labelY: 22, dur: 4 },
  { d: "M 488 182 C 400 290, 200 290, 112 182", label: "Payment secured by LC", labelY: 292, dur: 4 },
];

const pct = (v, total) => `${(v / total) * 100}%`;

export function DealFlow({ className = "" }) {
  const id = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={className}
      role="img"
      aria-label="Goods and shipping documents move from supplier to buyer; payment secured by a Letter of Credit moves from buyer to supplier, with Metaled Trade structuring the deal in between."
    >
      <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
          <defs>
            <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={GOLD} />
            </marker>
          </defs>

          {LANES.map((lane, i) => {
            const pathId = `${id}-lane-${i}`;
            return (
              <g key={pathId}>
                <motion.path
                  id={pathId}
                  d={lane.d}
                  fill="none"
                  stroke={GOLD}
                  strokeOpacity={0.55}
                  strokeWidth={1.5}
                  strokeDasharray="5 7"
                  markerEnd={`url(#${id}-arrow)`}
                  initial={{ pathLength: reduceMotion ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, delay: 0.6 + i * 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Moving markers along each lane */}
                {!reduceMotion &&
                  [0, 1, 2].map((k) => (
                    <circle key={k} r={3.5} fill={GOLD} style={{ filter: `drop-shadow(0 0 4px ${GOLD})` }}>
                      <animateMotion dur={`${lane.dur}s`} begin={`${2.2 + i * 0.4 + (k * lane.dur) / 3}s`} repeatCount="indefinite">
                        <mpath href={`#${pathId}`} />
                      </animateMotion>
                    </circle>
                  ))}
                <text
                  x={W / 2}
                  y={lane.labelY}
                  textAnchor="middle"
                  fill="#ffffff"
                  fillOpacity={0.8}
                  fontSize={12}
                  fontWeight={600}
                  letterSpacing={1.5}
                  style={{ textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}
                >
                  {lane.label}
                </text>
              </g>
            );
          })}
        </svg>

        {NODES.map(({ x, label, icon: Icon, main }, i) => (
          <motion.div
            key={label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: pct(x, W), top: pct(NODE_Y, H) }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className={`flex items-center justify-center rounded-full ${
                main
                  ? "w-16 h-16 md:w-20 md:h-20 text-[#131313]"
                  : "w-12 h-12 md:w-16 md:h-16 bg-white/[0.06] border border-white/20 text-white"
              }`}
              style={main ? { background: GOLD } : undefined}
            >
              <Icon className={main ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"} aria-hidden="true" />
            </span>
          </motion.div>
        ))}
      </div>

      {/* Node labels */}
      <div className="relative h-12 mt-4">
        {NODES.map(({ x, label, sub }) => (
          <div key={label} className="absolute -translate-x-1/2 text-center w-36" style={{ left: pct(x, W) }}>
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.16em] text-white">{label}</p>
            <p className="text-[10px] md:text-[11px] text-white/50 mt-1">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
