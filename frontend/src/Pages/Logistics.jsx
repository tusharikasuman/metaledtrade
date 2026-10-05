import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { FaIndustry, FaClipboardCheck, FaTruckLoading, FaShip, FaAnchor, FaHardHat } from "react-icons/fa";
import { GiCargoCrate, GiCrane, GiCargoShip } from "react-icons/gi";
import {
  HiCheck,
  HiOutlineArrowDown,
  HiOutlineArrowRight,
  HiOutlineArrowUpRight,
  HiOutlineArrowsPointingOut,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiXMark,
} from "react-icons/hi2";
import { RouteMap } from "../Components/ui/route-map";
import inspectBundleCheck from "../assets/projects/inspection_bundle_check.jpeg";
import inspectFlatBars from "../assets/projects/inspection_flat_bars.jpeg";
import inspectMillVisit from "../assets/projects/inspection_mill_visit.jpeg";

const EASE = [0.16, 1, 0.3, 1];
const GOLD = "#e9c349";

// ── Content ──────────────────────────────────────────────────────────────────

// `to` is where each step's link goes: a section on this page (#…) or another page.
const ROUTE = [
  {
    icon: FaIndustry,
    title: "Origin",
    detail: "Mill / supplier",
    text: "Material sourced from approved mills and suppliers, matched to your grade and specification.",
    to: "/projects#mills",
    link: "Our mill partners",
  },
  {
    icon: FaClipboardCheck,
    title: "Inspection & Documentation",
    text: "Quantity, dimensions and markings checked before dispatch. Mill test certificates and shipping documents prepared.",
    to: "#inspection",
    link: "What we check",
  },
  {
    icon: FaTruckLoading,
    title: "Port Handling",
    text: "Cargo moved to the load port, secured and loaded for its voyage.",
    to: "#shipping",
    link: "How it's loaded",
  },
  {
    icon: FaShip,
    title: "Container / Breakbulk / Vessel",
    text: "Shipped by the method that suits the material, size and volume of the order.",
    to: "#shipping",
    link: "Shipping methods",
  },
  {
    icon: FaAnchor,
    title: "Destination Port",
    text: "Arrival at the discharge port with the documents needed for clearance.",
    to: "#ports",
    link: "Ports we work with",
  },
  {
    icon: FaHardHat,
    title: "Customer / Project Site / Yard",
    text: "Final delivery to your yard, warehouse or project site.",
    to: "/contact",
    link: "Plan a delivery",
  },
];

const product = (category, name) => ({
  name,
  to: `/products?category=${category}&product=${encodeURIComponent(name)}`,
});

const SHIPPING_MODES = [
  {
    icon: GiCargoCrate,
    title: "Containers",
    summary: "For coils, sheets, bars and smaller lots. Sealed, trackable and suited to regular call-offs.",
    bestFor: "Coils, sheets, bars and smaller lots, or regular call-offs against a larger order.",
    loading: "Lashed and chocked inside 20ft or 40ft containers. Open-top or flat-rack containers for awkward sizes.",
    goodToKnow: "Sealed from load port to destination and easy to track door to door.",
    products: [
      product("flat", "Hot Rolled Steel Coils"),
      product("flat", "Galvanized Coils"),
      product("flat", "Cold Rolled Sheets"),
      product("long", "Flat Bars"),
      product("long", "Reinforcing Bars"),
    ],
  },
  {
    icon: GiCrane,
    title: "Breakbulk",
    summary: "For long beams, heavy plates and pipes that don't fit a container, loaded piece by piece in the hold.",
    bestFor: "Long sections, heavy plates and large-diameter pipes, too long or heavy for a container.",
    loading: "Lifted in bundles or piece by piece into the hold or on deck, then secured with dunnage and lashing.",
    goodToKnow: "No container length limits, so 12m+ sections ship as they are, without cutting.",
    products: [
      product("long", "Universal Beam"),
      product("long", "HEA & HEB Sections"),
      product("flat", "Hot Rolled Steel Plates / Sheets"),
      product("flat", "Steel Plates: High Tensile & Offshore Quality"),
      product("long", "Seamless Steel Pipes"),
    ],
  },
  {
    icon: GiCargoShip,
    title: "Bulk",
    summary: "For large single-commodity lots such as billets, where a full vessel or hold is the economical choice.",
    bestFor: "Large single-commodity lots such as billets and blooms.",
    loading: "Stowed directly in the vessel's holds, as a full or part cargo.",
    goodToKnow: "The lowest freight cost per tonne when volumes are large.",
    products: [product("long", "Billets & Blooms")],
  },
];

const PORTS = [
  {
    name: "Jebel Ali",
    location: "Dubai, UAE",
    coords: "25.01° N · 55.06° E",
    text: "The region's main container and breakbulk hub, minutes from our Dubai office.",
    map: "Jebel Ali Port, Dubai",
  },
  {
    name: "Fujairah",
    location: "UAE east coast",
    coords: "25.17° N · 56.36° E",
    text: "On the Gulf of Oman, outside the Strait of Hormuz, for faster vessel turnaround.",
    map: "Port of Fujairah",
  },
  {
    name: "Sohar",
    location: "Northern Oman",
    coords: "24.50° N · 56.63° E",
    text: "Industrial port serving Oman's energy and infrastructure projects.",
    map: "Sohar Port, Oman",
  },
];

// Our own photos from mill visits: pre-shipment inspection of material.
const INSPECTION_PHOTOS = [
  { src: inspectBundleCheck, caption: "Verifying bundle markings and dimensions" },
  { src: inspectFlatBars, caption: "Checking bundled flat bars with the mill team" },
  { src: inspectMillVisit, caption: "On the rolling mill floor" },
];

const INSPECTION_POINTS = [
  "Quantity, dimension and marking checks",
  "Bundle tags and heat numbers matched to mill test certificates",
  "MTC 3.1 or 3.2 certification",
  "Third Party Inspection on request",
  "Commercial invoice, packing list, bill of lading and certificate of origin",
];

// ── Building blocks ──────────────────────────────────────────────────────────
// The page follows the site's light theme. Only the hero and the ports band are
// dark, so `dark` switches a heading's colours for those two sections.

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, delay, ease: EASE },
});

function SectionTitle({ eyebrow, title, intro, dark = false, className = "" }) {
  return (
    <motion.div {...fadeUp()} className={className}>
      <span className="text-xs font-semibold uppercase tracking-[0.22em] block mb-3 text-gold">{eyebrow}</span>
      <h2
        className={`font-display text-3xl md:text-5xl font-semibold uppercase leading-[1.1] ${
          dark ? "text-white" : "text-ivory"
        }`}
      >
        {title}
      </h2>
      <div className="w-12 h-0.5 mt-5 bg-gold" />
      {intro && (
        <p className={`text-sm md:text-base leading-relaxed max-w-md mt-6 ${dark ? "text-white/60" : "text-steel"}`}>
          {intro}
        </p>
      )}
    </motion.div>
  );
}

function LinkLabel({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.14em] text-gold transition-all duration-300 group-hover:gap-2.5 ${className}`}
    >
      {children}
      <HiOutlineArrowRight />
    </span>
  );
}

// Vertical journey: the line fills in as the visitor scrolls past the steps.
function RouteTimeline() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative">
      <div className="absolute left-6 md:left-8 top-2 bottom-2 w-px bg-outline-variant/60" aria-hidden="true" />
      <motion.div
        className="absolute left-[23px] md:left-[31px] top-2 bottom-2 w-0.5 origin-top bg-[#131313]"
        style={{ scaleY: reduceMotion ? 1 : progress }}
        aria-hidden="true"
      />

      {ROUTE.map(({ icon: Icon, title, detail, text, to, link }, i) => (
        <motion.li key={title} {...fadeUp(0.05)} className="relative pl-16 md:pl-24 pb-6 last:pb-0">
          <div className="absolute left-0 top-4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#131313] flex items-center justify-center text-gold">
            <Icon className="text-base md:text-xl" aria-hidden="true" />
          </div>

          <Link
            to={to}
            className="group relative block overflow-hidden rounded-sm border border-outline-variant/40 bg-bg-alt p-6 md:p-8 shadow-sm transition-all duration-300 hover:border-gold/60 hover:shadow-md"
          >
            {/* Large step number in the corner */}
            <span
              className="pointer-events-none absolute -right-1 -top-3 font-display text-7xl md:text-8xl font-semibold text-ivory/[0.05] transition-colors duration-300 group-hover:text-gold/20"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="text-[11px] font-semibold tracking-[0.18em] text-steel uppercase">
              Step {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-ivory uppercase leading-tight mt-1.5">
              {title}
            </h3>
            {detail && <p className="text-sm font-medium mt-1 text-gold">{detail}</p>}
            <p className="text-steel text-sm md:text-[15px] leading-relaxed mt-3 max-w-xl">{text}</p>
            <LinkLabel className="mt-5">{link}</LinkLabel>
          </Link>
        </motion.li>
      ))}
    </ol>
  );
}

// Detail window for a shipping method (light, like the site's quote window).
function ModeModal({ mode, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const Icon = mode.icon;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mode-title"
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-bg border border-outline-variant/40 rounded-sm shadow-2xl p-8 md:p-10"
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-full text-steel hover:text-ivory hover:bg-surface-variant/30 transition-colors"
        >
          <HiXMark className="text-xl" />
        </button>

        <Icon className="text-4xl mb-5 text-gold" aria-hidden="true" />
        <span className="text-xs font-semibold text-gold uppercase tracking-[0.22em]">Shipping method</span>
        <h3 id="mode-title" className="font-display text-3xl font-semibold text-ivory uppercase mt-2">
          {mode.title}
        </h3>
        <div className="w-12 h-0.5 bg-gold mt-4 mb-8" />

        <dl className="flex flex-col gap-6">
          {[
            ["Best for", mode.bestFor],
            ["How it's loaded", mode.loading],
            ["Good to know", mode.goodToKnow],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel mb-1.5">{label}</dt>
              <dd className="text-ivory text-[15px] leading-relaxed">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 pt-6 border-t border-outline-variant/30">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel block mb-3">
            Typical products
          </span>
          <div className="flex flex-wrap gap-2">
            {mode.products.map(({ name, to }) => (
              <Link
                key={name}
                to={to}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-outline-variant text-sm text-ivory rounded-sm hover:border-gold hover:text-gold transition-colors"
              >
                {name}
                <HiOutlineArrowRight className="text-xs" />
              </Link>
            ))}
          </div>
        </div>

        <Link
          to="/contact"
          className="mt-8 w-full inline-flex items-center justify-center gap-3 bg-[#131313] text-white py-4 text-xs font-bold uppercase tracking-[0.18em] hover:bg-gold transition-colors"
        >
          Get a delivered price
          <HiOutlineArrowRight />
        </Link>
      </motion.div>
    </motion.div>
  );
}

// Full-size photo viewer with previous / next (arrow keys and Esc work too).
function PhotoViewer({ photos, index, onChange, onClose }) {
  const step = (dir) => onChange((index + dir + photos.length) % photos.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, photos.length, onChange, onClose]);

  const photo = photos[index];
  const navButton =
    "absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors";

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Inspection photos"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
      >
        <HiXMark className="text-2xl" />
      </button>

      <figure className="flex flex-col items-center max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={photo.src}
            src={photo.src}
            alt={photo.caption}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-sm"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>
        <figcaption className="mt-5 flex items-center gap-4 text-white/80 text-sm">
          <span className="tabular-nums text-white/45">
            {index + 1} / {photos.length}
          </span>
          {photo.caption}
        </figcaption>
      </figure>

      <button
        onClick={(e) => {
          e.stopPropagation();
          step(-1);
        }}
        aria-label="Previous photo"
        className={`${navButton} left-3 md:left-8`}
      >
        <HiOutlineChevronLeft className="text-xl" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          step(1);
        }}
        aria-label="Next photo"
        className={`${navButton} right-3 md:right-8`}
      >
        <HiOutlineChevronRight className="text-xl" />
      </button>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Logistics() {
  const [openMode, setOpenMode] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(null);
  const reduceMotion = useReducedMotion();

  return (
    // overflow-x-clip (not hidden) so the sticky heading keeps working.
    <div className="min-h-screen bg-bg text-ivory font-body overflow-x-clip">
      {/* ── Hero (dark, like the other pages' photo/video heroes) ── */}
      <section className="relative overflow-hidden bg-[#0b0b0c]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-20 pt-36 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[86vh]">
          <div className="lg:col-span-5">
            <motion.span
              className="text-xs font-semibold uppercase tracking-[0.22em] block mb-5"
              style={{ color: GOLD }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Logistics
            </motion.span>
            <h1 className="font-display text-[2.6rem] sm:text-6xl lg:text-[4.6rem] font-semibold uppercase leading-[1.02] text-white">
              {[
                { text: "Your supply chain", gold: false },
                { text: "partner", gold: true },
              ].map((line, i) => (
                <span key={line.text} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    style={line.gold ? { color: GOLD } : undefined}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.1, delay: 0.4 + i * 0.14, ease: EASE }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.div
              className="w-20 h-px my-7 origin-left"
              style={{ background: GOLD }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1, ease: EASE }}
            />
          </div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <RouteMap className="w-full h-auto" />
            <p className="mt-3 text-[11px] text-white/45 tracking-wide">
              Illustrative sea routes from our mill partners in India and China to Gulf ports.
            </p>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-0 inset-x-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-20 pb-8">
            <Link to="#route" className="group inline-flex items-end gap-4 text-white/55 hover:text-white transition-colors">
              <span className="flex flex-col items-center gap-1">
                <span className="relative block w-px h-12 bg-white/20 overflow-hidden">
                  {!reduceMotion && (
                    <motion.span
                      className="absolute left-0 top-0 w-px h-4 bg-white"
                      animate={{ y: ["-100%", "300%"] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </span>
                <HiOutlineArrowDown className="text-sm transition-transform duration-300 group-hover:translate-y-0.5" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] pb-0.5">Scroll to see how it moves</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── From mill to destination: pinned heading + scrolling journey ── */}
      <section id="route" className="scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionTitle
                eyebrow="How it moves"
                title="From mill to destination"
                intro="One partner across every handover, so nothing falls between supplier, shipper and site."
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <RouteTimeline />
          </div>
        </div>
      </section>

      {/* ── Inspection & documentation ── */}
      <section id="inspection" className="scroll-mt-20 bg-bg-alt border-y border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Our own photos from mill visits; click to view full size */}
          <motion.div {...fadeUp()} className="lg:col-span-6 grid grid-cols-2 grid-rows-2 gap-3 md:gap-4 h-[440px] md:h-[560px]">
            {INSPECTION_PHOTOS.map((photo, i) => (
              <button
                type="button"
                key={photo.caption}
                onClick={() => setPhotoIndex(i)}
                aria-label={`View photo: ${photo.caption}`}
                className={`group relative overflow-hidden rounded-sm shadow-[0_20px_40px_-24px_rgba(0,0,0,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  i === 0 ? "row-span-2" : ""
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-transparent" />
                <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <HiOutlineArrowsPointingOut className="text-sm" />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4 text-left flex items-start gap-2.5">
                  <span className="text-[11px] font-semibold tabular-nums pt-0.5" style={{ color: GOLD }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white text-xs md:text-sm leading-snug">{photo.caption}</span>
                </span>
              </button>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="lg:col-span-6">
            <span className="text-xs font-semibold text-gold uppercase tracking-[0.22em] block mb-3">
              Inspection &amp; documentation
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-ivory uppercase leading-[1.1]">
              Checked before it ships
            </h2>
            <div className="w-12 h-0.5 bg-gold mt-5 mb-8" />
            <p className="text-steel text-base md:text-lg leading-relaxed max-w-xl mb-10">
              Problems are cheapest to fix at the mill. Our team inspects material before it leaves, so what arrives
              matches what you ordered, with the paperwork to prove it.
            </p>
            <ul className="border-t border-outline-variant/40">
              {INSPECTION_POINTS.map((point, i) => (
                <li key={point} className="flex items-center gap-5 py-4 border-b border-outline-variant/40">
                  <span className="shrink-0 text-[11px] font-semibold tabular-nums text-steel w-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="shrink-0 w-7 h-7 rounded-full bg-[#131313] text-white flex items-center justify-center">
                    <HiCheck className="text-sm" />
                  </span>
                  <span className="text-ivory text-[15px] leading-snug">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── Ocean freight ── */}
      <section id="shipping" className="scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 py-20 md:py-28">
          <div className="mb-12 md:mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionTitle eyebrow="Ocean freight" title="Shipped the right way" />
            <motion.p {...fadeUp(0.1)} className="text-steel text-sm md:text-base leading-relaxed max-w-md">
              Steel isn't one-size-fits-all cargo. We match the shipping method to the product, size and volume.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SHIPPING_MODES.map((mode, i) => {
              const Icon = mode.icon;
              return (
                <motion.button
                  type="button"
                  key={mode.title}
                  {...fadeUp(i * 0.08)}
                  onClick={() => setOpenMode(mode)}
                  className="group text-left flex flex-col rounded-sm border border-outline-variant/40 bg-bg-alt p-7 md:p-8 shadow-sm transition-all duration-300 hover:border-gold/60 hover:shadow-md hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <div className="flex items-start justify-between">
                    <span className="w-14 h-14 rounded-full bg-[#131313] text-gold flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                      <Icon className="text-3xl" aria-hidden="true" />
                    </span>
                    <span className="font-display text-4xl font-semibold text-ivory/10">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-ivory uppercase mt-8">{mode.title}</h3>
                  <p className="text-steel text-sm md:text-[15px] leading-relaxed mt-3 flex-1">{mode.summary}</p>
                  <LinkLabel className="mt-7">Know more</LinkLabel>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Gulf gateways (dark band for contrast) ── */}
      <section id="ports" className="scroll-mt-20 bg-[#0b0b0c] text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 py-20 md:py-28">
          <SectionTitle dark eyebrow="Gulf gateways" title="Key ports we work with" className="mb-12 md:mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTS.map(({ name, location, coords, text, map }, i) => (
              <motion.a
                key={name}
                {...fadeUp(i * 0.08)}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(map)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-sm border border-white/10 bg-white/[0.03] p-7 md:p-8 transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  <span>{location}</span>
                  <span className="tabular-nums tracking-[0.08em] normal-case">{coords}</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-semibold uppercase mt-6 text-white">{name}</h3>
                <p className="text-white/60 text-sm md:text-[15px] leading-relaxed mt-4">{text}</p>
                <span className="mt-7 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 group-hover:text-white transition-colors">
                  View on map
                  <HiOutlineArrowUpRight />
                </span>
              </motion.a>
            ))}
          </div>

          <p className="text-white/50 text-sm mt-10">
            Other discharge ports arranged as your project requires.{" "}
            <Link to="/contact" className="text-white/85 underline underline-offset-4 hover:text-white transition-colors">
              Ask about your port
            </Link>
          </p>
        </div>
      </section>

      <AnimatePresence>
        {openMode && <ModeModal mode={openMode} onClose={() => setOpenMode(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {photoIndex !== null && (
          <PhotoViewer
            photos={INSPECTION_PHOTOS}
            index={photoIndex}
            onChange={setPhotoIndex}
            onClose={() => setPhotoIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
