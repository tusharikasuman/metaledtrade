import React, { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LAND_PATH } from "../../data/landPath";

// ─── Sea-route map ────────────────────────────────────────────────────────────
// SVG drawn directly in map coordinates: x = longitude, y = -latitude, so the
// coastlines (LAND_PATH) and routes line up exactly. Routes follow real sea
// lanes (Malacca Strait, south of Sri Lanka, Strait of Hormuz) instead of
// cutting across land.

const GOLD = "#e9c349";
const VIEW = { x: 30, y: -42, w: 96, h: 48 }; // lng 30–126°E, lat 42°N–6°S

// [lng, -lat] waypoints, origin → destination.
const ROUTES = [
  {
    // China (Shanghai / Yangtze mills) → Jebel Ali
    points: [
      [121.6, -31], [122.4, -27], [119.6, -23.4], [115, -19], [110, -11], [105.6, -4],
      [103.9, -1.4], [100.6, -3.6], [97.6, -6.2], [90, -6.2], [81, -5.2], [73, -11],
      [64, -19], [58.8, -23.6], [56.7, -26.3], [55.03, -25],
    ],
    duration: 14,
  },
  {
    // India (Mumbai) → Sohar
    points: [[72.85, -18.95], [68, -20.6], [62, -22.6], [58.4, -24.2], [56.75, -24.5]],
    duration: 7,
  },
  {
    // India (Mundra) → Fujairah
    points: [[69.7, -22.75], [64, -24.1], [59, -25], [56.4, -25.17]],
    duration: 6,
  },
];

const ORIGINS = [
  { label: "China", at: [121.6, -31], text: [119.8, -32.6], anchor: "end" },
  { label: "India", at: [72.85, -18.95], text: [74.4, -18.4], anchor: "start" },
  { at: [69.7, -22.75] },
];

const PORTS = [
  [55.03, -25],
  [56.4, -25.17],
  [56.75, -24.5],
];

// Smooth curve through the waypoints (Catmull-Rom → cubic Bézier).
function smoothPath(pts) {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

export function RouteMap({ className = "" }) {
  const id = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
      className={className}
      role="img"
      aria-label="Sea routes from mills in China and India to Jebel Ali, Fujairah and Sohar"
    >
      <style>{`
        @keyframes route-flow-${id} { to { stroke-dashoffset: -24; } }
        .route-flow-${id} { animation: route-flow-${id} 1.6s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .route-flow-${id} { animation: none; } }
        /* Label sizes are in map units; enlarge them when the map is drawn small (phones). */
        .rm-label-${id} { font-size: 1.7px; }
        .rm-eyebrow-${id} { font-size: 1.35px; }
        @media (max-width: 640px) {
          .rm-label-${id} { font-size: 3px; }
          .rm-eyebrow-${id} { font-size: 2.3px; }
        }
      `}</style>

      <defs>
        <pattern id={`${id}-dots`} width={0.9} height={0.9} patternUnits="userSpaceOnUse">
          <circle cx={0.45} cy={0.45} r={0.17} fill="#ffffff" />
        </pattern>
        {/* Fades the land out towards the edges so the map has no hard border */}
        <radialGradient id={`${id}-fade`} cx="0.55" cy="0.5" r="0.55">
          <stop offset="0.45" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id={`${id}-mask`}>
          <rect x={VIEW.x} y={VIEW.y} width={VIEW.w} height={VIEW.h} fill={`url(#${id}-fade)`} />
        </mask>
      </defs>

      {/* Land: dotted fill with a faint coastline (routes and labels stay sharp) */}
      <g mask={`url(#${id}-mask)`}>
        <path d={LAND_PATH} fill={`url(#${id}-dots)`} fillOpacity={0.32} />
        <path
          d={LAND_PATH}
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.14}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
      </g>

      {ROUTES.map((route, i) => {
        const d = smoothPath(route.points);
        const pathId = `${id}-route-${i}`;
        return (
          <g key={pathId}>
            {/* Base line draws in on load */}
            <motion.path
              id={pathId}
              d={d}
              fill="none"
              stroke={GOLD}
              strokeOpacity={0.35}
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              initial={{ pathLength: reduceMotion ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, delay: 0.6 + i * 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Flowing dashes on top */}
            <motion.path
              d={d}
              fill="none"
              stroke={GOLD}
              strokeWidth={1.5}
              strokeDasharray="4 8"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              className={`route-flow-${id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ duration: 0.8, delay: 2.4 + i * 0.35 }}
            />
            {/* Ship */}
            {!reduceMotion && (
              <g style={{ filter: `drop-shadow(0 0 3px ${GOLD})` }}>
                <circle r={0.6} fill={GOLD}>
                  <animateMotion dur={`${route.duration}s`} begin={`${2.6 + i * 0.5}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                </circle>
              </g>
            )}
          </g>
        );
      })}

      {/* Origins */}
      {ORIGINS.map(({ label, at, text, anchor }) => (
        <g key={at.join()}>
          <circle cx={at[0]} cy={at[1]} r={0.5} fill="#ffffff" fillOpacity={0.9} />
          {label && (
            <text
              x={text[0]}
              y={text[1]}
              textAnchor={anchor}
              fill="#ffffff"
              fillOpacity={0.75}
              className={`rm-label-${id}`}
              fontWeight={600}
              letterSpacing={0.25}
              stroke="#0b0b0c"
              strokeWidth={0.5}
              paintOrder="stroke"
              style={{ textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}
            >
              {label}
            </text>
          )}
        </g>
      ))}

      {/* Destination ports: pulsing dots */}
      {PORTS.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={0.55} fill={GOLD}>
            {!reduceMotion && (
              <>
                <animate attributeName="r" values="0.55;2;0.55" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                <animate attributeName="fill-opacity" values="0.6;0;0.6" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </>
            )}
          </circle>
          <circle cx={x} cy={y} r={0.55} fill={GOLD} />
        </g>
      ))}

      {/* Destination callout */}
      <g style={{ fontFamily: "Inter, sans-serif" }} stroke="#0b0b0c" strokeWidth={0.5} paintOrder="stroke">
        <line x1={55.6} y1={-26.4} x2={52} y2={-33.6} stroke={GOLD} strokeOpacity={0.6} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <text x={50.5} y={-38.4} fill={GOLD} className={`rm-eyebrow-${id}`} fontWeight={700} letterSpacing={0.3} style={{ textTransform: "uppercase" }}>
          Gulf gateways
        </text>
        <text x={50.5} y={-35.2} fill="#ffffff" className={`rm-label-${id}`} fontWeight={600}>
          Jebel Ali · Fujairah · Sohar
        </text>
      </g>
    </svg>
  );
}
