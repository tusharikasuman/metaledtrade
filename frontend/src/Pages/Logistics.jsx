import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { FaIndustry, FaClipboardCheck, FaTruckLoading, FaShip, FaAnchor, FaHardHat } from "react-icons/fa";
import { GiCargoCrate, GiCrane, GiCargoShip } from "react-icons/gi";
import { HiCheck, HiOutlineArrowDown, HiOutlineArrowRight, HiOutlineArrowUpRight, HiXMark } from "react-icons/hi2";
import { RouteMap } from "../Components/ui/route-map";
import inspectBundleCheck from "../assets/projects/inspection_bundle_check.jpeg";

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

const INSPECTION_POINTS = [
  "Quantity, dimension and marking checks",
  "Bundle tags and heat numbers matched to mill test certificates",
  "MTC 3.1 or 3.2 certification",
  "Third Party Inspection on request",
  "Commercial invoice, packing list, bill of lading and certificate of origin",
];

// ── Building blocks ──────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, delay, ease: EASE },
});

// Faint grid used behind every section, so the page reads as one dark surface.
const GRID_BG = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
  backgroundSize: "64px 64px",
};

function Eyebrow({ children }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.22em] block mb-3" style={{ color: GOLD }}>
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title, intro, className = "" }) {
  return (
    <motion.div {...fadeUp()} className={className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-3xl md:text-5xl font-semibold text-white uppercase leading-[1.1]">{title}</h2>
      <div className="w-12 h-0.5 mt-5" style={{ background: GOLD }} />
      {intro && <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md mt-6">{intro}</p>}
    </motion.div>
  );
}

function LinkLabel({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300 group-hover:gap-2.5 ${className}`}
      style={{ color: GOLD }}
    >
      {children}
      <HiOutlineArrowRight />
    </span>
  );
}

// Vertical journey: the gold line fills in as the visitor scrolls past the steps.
function RouteTimeline() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative">
      <div className="absolute left-6 md:left-8 top-2 bottom-2 w-px bg-white/10" aria-hidden="true" />
      <motion.div
        className="absolute left-[23px] md:left-[31px] top-2 bottom-2 w-0.5 origin-top"
        style={{ background: GOLD, scaleY: reduceMotion ? 1 : progress }}
        aria-hidden="true"
      />

      {ROUTE.map(({ icon: Icon, title, detail, text, to, link }, i) => (
        <motion.li key={title} {...fadeUp(0.05)} className="relative pl-16 md:pl-24 pb-6 last:pb-0">
          <div
            className="absolute left-0 top-4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#0b0b0c] border flex items-center justify-center"
            style={{ borderColor: `${GOLD}80`, color: GOLD }}
          >
            <Icon className="text-base md:text-xl" aria-hidden="true" />
          </div>

          <Link
            to={to}
            className="group relative block overflow-hidden rounded-sm border border-white/10 bg-white/[0.025] p-6 md:p-8 transition-colors duration-300 hover:border-[#e9c349]/50 hover:bg-white/[0.05]"
          >
            {/* Large step number in the corner */}
            <span
              className="pointer-events-none absolute -right-1 -top-3 font-display text-7xl md:text-8xl font-semibold text-white/[0.04] transition-colors duration-300 group-hover:text-[#e9c349]/15"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="text-[11px] font-semibold tracking-[0.18em] text-white/45 uppercase">
              Step {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-white uppercase leading-tight mt-1.5">
              {title}
            </h3>
            {detail && (
              <p className="text-sm font-medium mt-1" style={{ color: GOLD }}>
                {detail}
              </p>
            )}
            <p className="text-white/60 text-sm md:text-[15px] leading-relaxed mt-3 max-w-xl">{text}</p>
            <LinkLabel className="mt-5">{link}</LinkLabel>
          </Link>
        </motion.li>
      ))}
    </ol>
  );
}

// Detail window for a shipping method.
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
      className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mode-title"
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#121315] border border-white/10 rounded-sm shadow-2xl p-8 md:p-10 text-white"
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          <HiXMark className="text-xl" />
        </button>

        <Icon className="text-4xl mb-5" style={{ color: GOLD }} aria-hidden="true" />
        <Eyebrow>Shipping method</Eyebrow>
        <h3 id="mode-title" className="font-display text-3xl font-semibold uppercase">
          {mode.title}
        </h3>
        <div className="w-12 h-0.5 mt-4 mb-8" style={{ background: GOLD }} />

        <dl className="flex flex-col gap-6">
          {[
            ["Best for", mode.bestFor],
            ["How it's loaded", mode.loading],
            ["Good to know", mode.goodToKnow],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45 mb-1.5">{label}</dt>
              <dd className="text-white/85 text-[15px] leading-relaxed">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 pt-6 border-t border-white/10">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45 block mb-3">
            Typical products
          </span>
          <div className="flex flex-wrap gap-2">
            {mode.products.map(({ name, to }) => (
              <Link
                key={name}
                to={to}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/15 text-sm text-white/85 rounded-sm hover:border-[#e9c349] hover:text-[#e9c349] transition-colors"
              >
                {name}
                <HiOutlineArrowRight className="text-xs" />
              </Link>
            ))}
          </div>
        </div>

        <Link
          to="/contact"
          className="mt-8 w-full inline-flex items-center justify-center gap-3 py-4 text-[#131313] text-xs font-bold uppercase tracking-[0.18em] hover:bg-white transition-colors"
          style={{ background: GOLD }}
        >
          Get a delivered price
          <HiOutlineArrowRight />
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Logistics() {
  const [openMode, setOpenMode] = useState(null);
  const reduceMotion = useReducedMotion();

  return (
    // overflow-x-clip (not hidden) so the sticky heading keeps working.
    // pb-20/-mb-20 paints the gap above the footer (its mt-20) dark too.
    <div className="min-h-screen bg-[#0b0b0c] text-white font-body overflow-x-clip pb-20 -mb-20">
      {/* ── Hero: title + live sea-route map ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={GRID_BG} />
        <div className="absolute -left-40 -bottom-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-[0.12]" style={{ background: GOLD }} />

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
                      className="absolute left-0 top-0 w-px h-4"
                      style={{ background: GOLD }}
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
      <section id="route" className="scroll-mt-20 relative border-t border-white/10">
        <div className="absolute inset-0" style={GRID_BG} />
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-20 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
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
      <section id="inspection" className="scroll-mt-20 relative bg-[#111214] border-y border-white/10">
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-20 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Teaser card: the full photo set lives on the Projects page */}
          <motion.div {...fadeUp()} className="lg:col-span-5">
            <Link
              to="/projects#inspection"
              className="group relative block h-[420px] md:h-[540px] overflow-hidden rounded-sm border border-white/10"
            >
              <img
                src={inspectBundleCheck}
                alt="Our inspector checking steel bundles before dispatch"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 md:p-8 flex items-end justify-between gap-6">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                    On the ground
                  </span>
                  <p className="font-display text-2xl md:text-3xl font-semibold text-white uppercase leading-tight mt-2">
                    See photos from our mill visits
                  </p>
                </div>
                <span
                  className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-[#131313] transition-transform duration-300 group-hover:translate-x-1"
                  style={{ background: GOLD }}
                >
                  <HiOutlineArrowRight className="text-lg" />
                </span>
              </div>
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="lg:col-span-7">
            <Eyebrow>Inspection &amp; documentation</Eyebrow>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-white uppercase leading-[1.1]">
              Checked before it ships
            </h2>
            <div className="w-12 h-0.5 mt-5 mb-8" style={{ background: GOLD }} />
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mb-10">
              Problems are cheapest to fix at the mill. Our team inspects material before it leaves, so what arrives
              matches what you ordered, with the paperwork to prove it.
            </p>
            <ul className="border-t border-white/10">
              {INSPECTION_POINTS.map((point, i) => (
                <li key={point} className="flex items-center gap-5 py-4 border-b border-white/10">
                  <span className="text-[11px] font-semibold tabular-nums text-white/35 w-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: `${GOLD}1f`, color: GOLD }}
                  >
                    <HiCheck className="text-sm" />
                  </span>
                  <span className="text-white/85 text-[15px] leading-snug">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── Ocean freight ── */}
      <section id="shipping" className="scroll-mt-20 relative">
        <div className="absolute inset-0" style={GRID_BG} />
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-20 py-20 md:py-28">
          <div className="mb-12 md:mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionTitle eyebrow="Ocean freight" title="Shipped the right way" />
            <motion.p {...fadeUp(0.1)} className="text-white/60 text-sm md:text-base leading-relaxed max-w-md">
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
                  className="group relative overflow-hidden text-left flex flex-col rounded-sm border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-7 md:p-8 transition-all duration-300 hover:border-[#e9c349]/50 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e9c349]"
                >
                  <div className="flex items-start justify-between">
                    <Icon className="text-5xl transition-transform duration-500 group-hover:scale-110" style={{ color: GOLD }} aria-hidden="true" />
                    <span className="font-display text-4xl font-semibold text-white/10">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white uppercase mt-8">{mode.title}</h3>
                  <p className="text-white/60 text-sm md:text-[15px] leading-relaxed mt-3 flex-1">{mode.summary}</p>
                  <LinkLabel className="mt-7">Know more</LinkLabel>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Gulf gateways ── */}
      <section id="ports" className="scroll-mt-20 relative bg-[#111214] border-t border-white/10">
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-20 py-20 md:py-28">
          <SectionTitle eyebrow="Gulf gateways" title="Key ports we work with" className="mb-12 md:mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTS.map(({ name, location, coords, text, map }, i) => (
              <motion.a
                key={name}
                {...fadeUp(i * 0.08)}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(map)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-sm border border-white/10 bg-[#0b0b0c] p-7 md:p-8 transition-colors duration-300 hover:border-[#e9c349]/50"
              >
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  <span>{location}</span>
                  <span className="tabular-nums tracking-[0.08em] normal-case">{coords}</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-semibold uppercase mt-6" style={{ color: GOLD }}>
                  {name}
                </h3>
                <p className="text-white/60 text-sm md:text-[15px] leading-relaxed mt-4">{text}</p>
                <span className="mt-7 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 group-hover:text-[#e9c349] transition-colors">
                  View on map
                  <HiOutlineArrowUpRight />
                </span>
              </motion.a>
            ))}
          </div>

          <p className="text-white/50 text-sm mt-10">
            Other discharge ports arranged as your project requires.{" "}
            <Link to="/contact" className="text-white/85 underline underline-offset-4 hover:text-[#e9c349] transition-colors">
              Ask about your port
            </Link>
          </p>
        </div>
      </section>

      <AnimatePresence>
        {openMode && <ModeModal mode={openMode} onClose={() => setOpenMode(null)} />}
      </AnimatePresence>
    </div>
  );
}
