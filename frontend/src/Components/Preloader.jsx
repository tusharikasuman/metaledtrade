import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { markPreloaderDone } from "../lib/preloaderStatus";

// Isometric projection: world (x, y-up, z) -> SVG (sx, sy).
const COS30 = Math.cos(Math.PI / 6);
const project = (x, y, z) => [(x - z) * COS30, (x + z) * 0.5 - y];
const pts = (corners) => corners.map((c) => project(...c).join(",")).join(" ");

// The three faces of an axis-aligned box that face the camera (+x, +y, +z).
function boxFaces([x0, y0, z0], [x1, y1, z1]) {
  return {
    top: pts([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]]),
    side: pts([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]]),
    front: pts([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]),
  };
}

// Palette — light-theme golds for the beam, charcoal for the steel cube.
const GOLD = { front: "#a67c00", side: "#d4aa2c", top: "#f0d77a" };
const STEEL = { front: "#1c1c1e", side: "#2f2f31", top: "#4a4a4d" };

// I-beam cross-section extruded along z; drawn back-to-front.
const DEPTH = 90;
const BEAM_PARTS = [
  { faces: boxFaces([0, 0, 0], [60, 10, DEPTH]), delay: 0 },    // bottom flange
  { faces: boxFaces([23, 10, 0], [37, 70, DEPTH]), delay: 0.22 }, // web
  { faces: boxFaces([0, 70, 0], [60, 80, DEPTH]), delay: 0.44 },  // top flange
];

// Maps flat text onto the top flange's upper face: text runs along the beam
// (−z) with letter tops pointing to −x, centred on the face.
const [stampX, stampY] = project(30, 80, DEPTH / 2);
const STAMP_TRANSFORM = `matrix(${COS30} -0.5 ${COS30} 0.5 ${stampX} ${stampY})`;

const CUBE = 12;
const cubeFaces = boxFaces([0, 0, 0], [CUBE, CUBE, CUBE]);

// Cube path in world coords: drop onto the top flange, bounce, slide to the
// front edge, then tip off and fall away.
const CUBE_PATH = [
  [24, 220, 30],
  [24, 80, 30],
  [24, 100, 30],
  [24, 80, 30],
  [24, 86, 30],
  [24, 80, 30],
  [24, 80, DEPTH - CUBE],
  [24, 74, DEPTH + 4],
  [24, -40, DEPTH + 30],
];
const CUBE_TIMES = [0, 0.22, 0.33, 0.44, 0.5, 0.56, 0.8, 0.86, 1];
const cubeScreen = CUBE_PATH.map((p) => project(...p));

const CUBE_START = 1.0;
const CUBE_DURATION = 1.5;
const TOTAL_MS = (CUBE_START + CUBE_DURATION) * 1000 + 150;

function Faces({ faces, palette }) {
  return (
    <>
      <polygon points={faces.top} fill={palette.top} stroke={palette.top} strokeWidth="0.6" strokeLinejoin="round" />
      <polygon points={faces.side} fill={palette.side} stroke={palette.side} strokeWidth="0.6" strokeLinejoin="round" />
      <polygon points={faces.front} fill={palette.front} stroke={palette.front} strokeWidth="0.6" strokeLinejoin="round" />
    </>
  );
}

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Lock background scroll during loading
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
      markPreloaderDone();
    }, reduceMotion ? 600 : TOTAL_MS);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#f5f5f7] select-none"
          role="status"
          aria-label="Loading"
        >
          <svg viewBox="-100 -120 170 240" className="w-60 md:w-72 h-auto overflow-visible" aria-hidden="true">
            {/* Floor shadow */}
            <motion.polygon
              points={pts([[-4, 0, -4], [66, 0, -4], [66, 0, DEPTH + 6], [-4, 0, DEPTH + 6]])}
              fill="#000"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.06 }}
              transition={{ duration: 0.6 }}
              style={{ filter: "blur(4px)" }}
              transform="translate(6 6)"
            />

            {BEAM_PARTS.map((part, i) => (
              <motion.g
                key={i}
                initial={reduceMotion ? false : { y: -70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, delay: part.delay, ease: [0.34, 1.4, 0.64, 1] }}
              >
                <Faces faces={part.faces} palette={GOLD} />

                {/* Name stamped into the top flange, like a mill's rolled marking */}
                {i === BEAM_PARTS.length - 1 && (
                  <motion.g
                    transform={STAMP_TRANSFORM}
                    fill={GOLD.front}
                    textAnchor="middle"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: part.delay + 0.35 }}
                  >
                    <text y="1" fontFamily="Fraunces, serif" fontWeight="600" fontSize="13" letterSpacing="1">
                      METALED
                    </text>
                    <text y="11" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="6.2" letterSpacing="2.6">
                      TRADE FZCO
                    </text>
                  </motion.g>
                )}
              </motion.g>
            ))}

            {!reduceMotion && (
              <motion.g
                initial={{ x: cubeScreen[0][0], y: cubeScreen[0][1], opacity: 0 }}
                animate={{
                  x: cubeScreen.map((p) => p[0]),
                  y: cubeScreen.map((p) => p[1]),
                  opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0],
                }}
                transition={{
                  duration: CUBE_DURATION,
                  delay: CUBE_START,
                  times: CUBE_TIMES,
                  ease: ["easeIn", "easeOut", "easeIn", "easeOut", "easeIn", "easeInOut", "easeIn", "easeIn"],
                }}
              >
                <Faces faces={cubeFaces} palette={STEEL} />
              </motion.g>
            )}
          </svg>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
            className="absolute bottom-8 inset-x-0 px-6 text-center text-[0.65rem] md:text-[0.7rem] font-medium uppercase tracking-[0.25em] text-[#515255]"
          >
            &copy; {new Date().getFullYear()} Metaled Trade FZCO
            <span className="mx-2 text-[#b8860b]">·</span>
            All rights reserved
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
