import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  HiOutlineArrowDown,
  HiOutlineArrowRight,
  HiOutlineArrowsRightLeft,
  HiOutlineBuildingLibrary,
  HiOutlineCalendarDays,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentCheck,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiXMark,
} from "react-icons/hi2";
import { DealFlow } from "../Components/ui/deal-flow";

const EASE = [0.16, 1, 0.3, 1];
const GOLD = "#e9c349";

// ── Content ──────────────────────────────────────────────────────────────────

// Each capability opens a detail window. `link` points to related detail
// elsewhere on the site.
const CAPABILITIES = [
  {
    icon: HiOutlineCalendarDays,
    title: "Structured payment terms",
    summary: "Payment terms structured around the deal, including financing through trade finance instruments, insurance and more.",
    what: "Payment terms are structured around each transaction and can include financing through trade finance instruments, insurance and more.",
    helps: "Both sides get terms that fit their cash flow, with the right financing and cover in place.",
  },
  {
    icon: HiOutlineDocumentCheck,
    title: "LC transactions",
    summary: "Letters of Credit give buyer and supplier a secure, bank-backed payment structure.",
    what: "The buyer's bank commits to pay the supplier once the agreed shipping documents are presented and checked.",
    helps: "The supplier is assured of payment, and the buyer pays only against documents that prove the goods were shipped as agreed.",
    link: { to: "#lc", label: "How an LC transaction works" },
  },
  {
    icon: HiOutlineBuildingLibrary,
    title: "Trade finance coordination",
    summary: "Facilitating trade with banks and financial partners, based on the end requirement and goal.",
    what: "We facilitate trade with banks and financial partners, setting up each arrangement around the end requirement and goal of the deal.",
    helps: "The financing fits what the buyer actually needs to achieve, so larger orders can move forward.",
  },
  {
    icon: HiOutlineArrowsRightLeft,
    title: "Supplier / buyer matching",
    summary: "Across all possible options, the optimum mix is searched, verified and applied based on the final use.",
    what: "Across all possible options, the optimum mix is always searched, verified and then applied, based on the final use and requirement.",
    helps: "Buyers get the source that best fits their application, and suppliers deal with qualified, serious buyers.",
    link: { to: "/projects#mills", label: "Our mill partners" },
  },
  {
    icon: HiOutlineTruck,
    title: "Shipment structuring",
    summary: "We can finance transactions across delivery and shipment options: Ex‑Works, FOB, CFR or CIF.",
    what: "We can finance transactions across delivery and shipment options, whether they are Ex‑Works, FOB, CFR or CIF.",
    helps: "The deal can be set up on the delivery term that suits the buyer, with financing in place either way.",
    link: { to: "/logistics", label: "How we ship" },
  },
  {
    icon: HiOutlineCurrencyDollar,
    title: "Currency considerations",
    summary: "All primary currencies are available, and flexibility is maintained.",
    what: "All primary currencies are available for pricing and settlement, and flexibility is maintained throughout the deal.",
    helps: "Deals can be priced and paid in the currency that works best for both sides.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Risk management",
    summary: "Financial and supply chain risk management services.",
    what: "We provide financial and supply chain risk management services, covering both how the deal is paid and how the material is supplied.",
    helps: "Risks are managed before money or cargo moves, which protects both supplier and buyer.",
    link: { to: "/logistics#inspection", label: "Our inspection process" },
  },
];

const LC_STEPS = [
  { title: "Contract", text: "Buyer and supplier agree price, specification, delivery and the LC terms." },
  { title: "LC issued", text: "The buyer's bank issues the Letter of Credit in favour of the supplier." },
  {
    title: "Shipment",
    text: "Material is inspected, loaded and shipped as agreed.",
    link: { to: "/logistics", label: "How we ship" },
  },
  {
    title: "Documents presented",
    text: "Bill of lading, invoice, packing list, certificate of origin and mill test certificates go to the bank.",
  },
  {
    title: "Payment & release",
    text: "Once the documents comply, the bank pays the supplier and releases them so the buyer can collect the cargo.",
  },
];

// ── Building blocks ──────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, delay, ease: EASE },
});

function SectionTitle({ eyebrow, title, intro, className = "" }) {
  return (
    <motion.div {...fadeUp()} className={className}>
      <span className="text-xs font-semibold uppercase tracking-[0.22em] block mb-3 text-gold">{eyebrow}</span>
      <h2 className="font-display text-3xl md:text-5xl font-semibold uppercase leading-[1.1] text-ivory">{title}</h2>
      <div className="w-12 h-0.5 mt-5 bg-gold" />
      {intro && <p className="text-steel text-sm md:text-base leading-relaxed max-w-md mt-6">{intro}</p>}
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

// Detail window for a capability.
function CapabilityModal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const Icon = item.icon;

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
        aria-labelledby="capability-title"
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

        <span className="w-14 h-14 rounded-full bg-[#131313] text-gold flex items-center justify-center mb-6">
          <Icon className="text-2xl" aria-hidden="true" />
        </span>
        <span className="text-xs font-semibold text-gold uppercase tracking-[0.22em]">Trade &amp; finance</span>
        <h3 id="capability-title" className="font-display text-3xl font-semibold text-ivory uppercase mt-2">
          {item.title}
        </h3>
        <div className="w-12 h-0.5 bg-gold mt-4 mb-8" />

        <dl className="flex flex-col gap-6">
          {[
            ["What it means", item.what],
            ["How it helps", item.helps],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel mb-1.5">{label}</dt>
              <dd className="text-ivory text-[15px] leading-relaxed">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 pt-6 border-t border-outline-variant/30 flex flex-col sm:flex-row gap-3">
          {item.link && (
            <Link
              to={item.link.to}
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 border border-outline-variant text-ivory py-4 text-[11px] font-bold uppercase tracking-[0.1em] hover:border-gold hover:text-gold transition-colors"
            >
              {item.link.label}
              <HiOutlineArrowRight />
            </Link>
          )}
          <Link
            to="/contact"
            className="flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 bg-[#131313] text-white py-4 text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-gold transition-colors"
          >
            Discuss your deal
            <HiOutlineArrowRight />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TradeFinance() {
  const [openItem, setOpenItem] = useState(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-bg text-ivory font-body overflow-x-clip">
      {/* ── Hero (dark): title + deal-flow diagram ── */}
      <section className="relative overflow-hidden bg-[#0b0b0c]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-20 pt-36 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-center min-h-[86vh]">
          <div className="lg:col-span-5">
            <motion.span
              className="text-xs font-semibold uppercase tracking-[0.22em] block mb-5"
              style={{ color: GOLD }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Trade &amp; Finance
            </motion.span>
            <h1 className="font-display text-[2.6rem] sm:text-6xl lg:text-[4.6rem] font-semibold uppercase leading-[1.02] text-white">
              {[
                { text: "Deals that work", gold: false },
                { text: "for both sides", gold: true },
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
            className="lg:col-span-7 lg:pl-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <DealFlow className="w-full max-w-[640px] mx-auto" />
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
            <Link to="#approach" className="group inline-flex items-end gap-4 text-white/55 hover:text-white transition-colors">
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
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] pb-0.5">Scroll to see how we structure deals</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Approach: the core statement ── */}
      <section id="approach" className="scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div {...fadeUp()} className="lg:col-span-3">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] block text-gold">Our approach</span>
            <div className="w-12 h-0.5 mt-5 bg-gold" />
          </motion.div>
          <motion.p
            {...fadeUp(0.1)}
            className="lg:col-span-9 font-display text-2xl md:text-4xl lg:text-[2.75rem] font-semibold text-ivory leading-[1.25]"
          >
            Steel trading is not only about finding the right price. It is about structuring transactions that work for{" "}
            <span className="text-gold">both the supplier and the buyer.</span>
          </motion.p>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section id="capabilities" className="scroll-mt-20 bg-bg-alt border-y border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 py-20 md:py-28">
          <div className="mb-12 md:mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionTitle eyebrow="Capabilities" title="What we can structure" />
            <motion.p {...fadeUp(0.1)} className="text-steel text-sm md:text-base leading-relaxed max-w-md">
              Every deal is different. These are the tools we combine to make each one work. Open any of them for detail.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CAPABILITIES.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.button
                  type="button"
                  key={item.title}
                  {...fadeUp((i % 4) * 0.06)}
                  onClick={() => setOpenItem(item)}
                  className="group text-left flex flex-col rounded-sm border border-outline-variant/40 bg-bg p-7 shadow-sm transition-all duration-300 hover:border-gold/60 hover:shadow-md hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <div className="flex items-start justify-between">
                    <span className="w-12 h-12 rounded-full bg-[#131313] text-gold flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                      <Icon className="text-xl" aria-hidden="true" />
                    </span>
                    <span className="font-display text-3xl font-semibold text-ivory/10">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ivory uppercase leading-snug mt-7">{item.title}</h3>
                  <p className="text-steel text-sm leading-relaxed mt-3 flex-1">{item.summary}</p>
                  <LinkLabel className="mt-6">Know more</LinkLabel>
                </motion.button>
              );
            })}

            {/* Closing card fills the last slot of the grid */}
            <motion.div {...fadeUp(0.18)} className="flex">
              <Link
                to="/contact"
                className="group flex-1 flex flex-col justify-between rounded-sm bg-[#131313] p-7 text-white transition-colors hover:bg-[#1c1d20]"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                  Have a deal in mind?
                </span>
                <p className="font-display text-2xl font-semibold uppercase leading-tight mt-6">
                  Tell us the material, volume and terms you need
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 group-hover:gap-3">
                  Talk to our trade desk
                  <HiOutlineArrowRight />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How an LC transaction works ── */}
      <section id="lc" className="scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 py-20 md:py-28">
          <SectionTitle
            eyebrow="Letters of credit"
            title="How an LC transaction works"
            intro="Most of our trade is settled through Letters of Credit. Here is how a typical one runs, step by step."
            className="mb-14 md:mb-16"
          />

          <ol className="relative grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
            {/* Connecting line: vertical on phones, horizontal on wider screens */}
            <div className="absolute left-6 top-6 bottom-6 w-px bg-outline-variant/60 md:hidden" aria-hidden="true" />
            <div className="hidden md:block absolute left-6 right-6 top-6 h-px bg-outline-variant/60" aria-hidden="true" />

            {LC_STEPS.map((step, i) => (
              <motion.li key={step.title} {...fadeUp(i * 0.08)} className="relative flex md:flex-col gap-5">
                <span className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-[#131313] text-white font-display text-lg font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-semibold text-ivory uppercase leading-tight">{step.title}</h3>
                  <p className="text-steel text-sm leading-relaxed mt-2.5">{step.text}</p>
                  {step.link && (
                    <Link to={step.link.to} className="group inline-block mt-4">
                      <LinkLabel>{step.link.label}</LinkLabel>
                    </Link>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <AnimatePresence>
        {openItem && <CapabilityModal item={openItem} onClose={() => setOpenItem(null)} />}
      </AnimatePresence>
    </div>
  );
}
