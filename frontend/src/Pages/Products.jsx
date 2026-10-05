import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import bgImg from "../assets/homebg.png";
import productImages from "../data/productImages.json";
import { longProducts, flatProducts } from "../data/productsData";
import HoneypotField from "../Components/HoneypotField";
import { submitForm } from "../lib/api";

// Load all product images from the Flat/Long asset folders.
const flatImageModules = import.meta.glob("../assets/Flat/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const longImageModules = import.meta.glob("../assets/Long/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const normalizeProductName = (value = "") =>
  value
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/&/g, " and ")
    .replace(/[_-]+/g, " ")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const getProductImage = (productName, category) => {
  const imageList = productImages[category] || [];
  const target = normalizeProductName(productName);

  const matchedFile = imageList.find((fileName) => {
    const fileBase = normalizeProductName(fileName);

    return (
      fileBase === target ||
      fileBase.includes(target) ||
      target.includes(fileBase)
    );
  });

  if (!matchedFile) return bgImg;

  const folder = category === "flat" ? "Flat" : "Long";
  const modules = category === "flat" ? flatImageModules : longImageModules;
  const imageKey = `../assets/${folder}/${matchedFile}`;

  return modules[imageKey] || bgImg;
};
import {
  HiOutlineArrowRight,
  HiOutlineCube,
  HiOutlineViewBoards,
  HiX,
  HiStar,
  HiOutlineStar,
  HiCheckCircle,
  HiOutlineArrowLeft,
} from "react-icons/hi";

// Helper to parse complex grade strings into array of tags
const parseGrades = (gradeString) => {
  if (!gradeString) return [];
  return gradeString
    .split(/\s*[\/,]\s*|\s*\/\/\s*|\s+&\s+/)
    .map((g) => g.trim())
    .filter((g) => g.length > 2);
};

// ── Mock Reviews Data ────────────────────────────────────────────────────────
const REVIEWS = [
  {
    id: 1,
    name: "Ahmed Al Mansoori",
    company: "Al Mansoori Construction",
    country: "🇦🇪 UAE",
    rating: 5,
    product: "TMT Bars",
    quote:
      "Exceptional quality and on-time delivery. Metaled Trade FZCO has been our go-to supplier for structural steel for over three years. The documentation and compliance standards are world-class.",
    avatar: "AM",
    color: "#ffe088",
  },
  {
    id: 2,
    name: "Ravi Krishnaswamy",
    company: "Infra Build India Pvt. Ltd.",
    country: "🇮🇳 India",
    rating: 5,
    product: "Hot Rolled Coils",
    quote:
      "We've sourced HR coils from dozens of suppliers, but none match the consistency Metaled Trade FZCO delivers. Competitive pricing with zero compromise on specifications.",
    avatar: "RK",
    color: "#6ee7b7",
  },
  {
    id: 3,
    name: "Khalid Al-Rashidi",
    company: "Gulf Steel Trading",
    country: "🇰🇼 Kuwait",
    rating: 5,
    product: "Structural Sections",
    quote:
      "Their H-beams and angles meet BS and ASTM standards consistently. The team is highly professional and responsive. I strongly recommend Metaled Trade FZCO to any serious buyer.",
    avatar: "KR",
    color: "#93c5fd",
  },
  {
    id: 4,
    name: "Priya Nair",
    company: "NairTech Infrastructure",
    country: "🇮🇳 India",
    rating: 4,
    product: "Cold Rolled Sheets",
    quote:
      "Smooth procurement process from inquiry to delivery. The cold rolled sheets were precisely within tolerance. Will definitely place repeat orders.",
    avatar: "PN",
    color: "#f9a8d4",
  },
  {
    id: 5,
    name: "Tariq Bin Saleh",
    company: "Saleh Global Trade",
    country: "🇸🇦 Saudi Arabia",
    rating: 5,
    product: "Wire Rod",
    quote:
      "Outstanding service. Metaled Trade FZCO sourced a specific grade wire rod that no other supplier in the region could provide. They go the extra mile every single time.",
    avatar: "TS",
    color: "#fbbf24",
  },
];

// Star Rating Display
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating ? (
          <HiStar key={star} className="text-gold text-sm" />
        ) : (
          <HiOutlineStar key={star} className="text-gold/40 text-sm" />
        )
      )}
    </div>
  );
}

// ── Customer Reviews Section ─────────────────────────────────────────────────
function CustomerReviews() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="mt-24 mb-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col border-l-2 border-gold pl-6 mb-12"
      >
        <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs mb-2">
          Client Testimonials
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-medium uppercase tracking-tight text-primary">
          What Our Partners Say
        </h2>
      </motion.div>

      {/* Reviews Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start">

        {/* Left: Reviewer selector list */}
        <div className="flex flex-col gap-2">
          {REVIEWS.map((r, idx) => (
            <motion.button
              key={r.id}
              onClick={() => setActiveIdx(idx)}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className={`w-full text-left flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                activeIdx === idx
                  ? "border-gold/60 bg-surface-container shadow-lg shadow-gold/5"
                  : "border-outline-variant/20 bg-bg-alt/40 hover:border-outline-variant/50 hover:bg-bg-alt/70"
              }`}
            >
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[#131313] shrink-0"
                style={{ backgroundColor: r.color }}
              >
                {r.avatar}
              </div>
              <div className="min-w-0">
                <p className={`text-sm font-semibold truncate ${activeIdx === idx ? "text-primary" : "text-ivory/70"}`}>
                  {r.name}
                </p>
                <p className="text-xs text-steel truncate">{r.country}</p>
              </div>
              {activeIdx === idx && (
                <motion.div
                  layoutId="activeReviewer"
                  className="ml-auto w-1.5 h-8 rounded-full bg-gold shrink-0"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Right: Active review card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-bg-alt border border-outline-variant/30 rounded-xl p-8 relative overflow-hidden shadow-2xl"
          >
            {/* Decorative accent */}
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"
              style={{ backgroundColor: REVIEWS[activeIdx].color }}
            />

            {/* Quote mark */}
            <span className="text-7xl font-display leading-none text-outline-variant/30 absolute top-4 left-6 select-none">
              "
            </span>

            {/* Rating + Product badge */}
            <div className="flex items-center justify-between mb-6 mt-4">
              <StarRating rating={REVIEWS[activeIdx].rating} />
              <span className="text-[10px] font-bold tracking-widest uppercase border border-gold/40 text-gold px-3 py-1 rounded-full">
                {REVIEWS[activeIdx].product}
              </span>
            </div>

            {/* Quote text */}
            <blockquote className="text-primary text-base md:text-lg leading-relaxed font-medium mb-8 relative z-10">
              {REVIEWS[activeIdx].quote}
            </blockquote>

            {/* Reviewer info */}
            <div className="flex items-center gap-4 border-t border-outline-variant/20 pt-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-[#131313] shrink-0"
                style={{ backgroundColor: REVIEWS[activeIdx].color }}
              >
                {REVIEWS[activeIdx].avatar}
              </div>
              <div>
                <p className="font-bold text-primary text-sm">
                  {REVIEWS[activeIdx].name}
                </p>
                <p className="text-steel text-xs">{REVIEWS[activeIdx].company}</p>
                <p className="text-steel text-xs">{REVIEWS[activeIdx].country}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ── Quote Request Modal ──────────────────────────────────────────────────────
const QUOTE_UNITS = ["MT", "KG", "Pieces", "Coils"];

const labelClass = "text-[11px] font-semibold tracking-[0.14em] uppercase text-steel";

function FieldError({ id, error }) {
  if (!error) return null;
  return (
    <p id={id} className="text-xs text-red-500">
      {error}
    </p>
  );
}

function QuoteModal({ product, onClose }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "",
    unit: "MT",
    grade: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return; // ignore double-clicks

    setStatus("loading");
    setErrors({});

    const result = await submitForm("/api/quote", { ...form, product: product.product });

    if (result.ok) {
      setStatus("success");
    } else {
      setErrors(result.errors);
      setServerMessage(result.message);
      setStatus("error");
    }
  };

  // Props shared by every input: value binding, error styling and screen-reader links.
  const fieldProps = (name, extraClass = "") => ({
    id: `quote-${name}`,
    name,
    value: form[name],
    onChange: handleChange,
    className: `${extraClass} bg-bg-alt border ${
      errors[name] ? "border-red-500/70" : "border-outline-variant/40"
    } text-primary placeholder:text-steel/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors`,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `quote-${name}-error` : undefined,
  });

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="bg-bg border border-outline-variant/40 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-steel hover:text-primary transition-colors rounded-full hover:bg-surface-variant/30"
            aria-label="Close"
          >
            <HiX className="text-xl" />
          </button>

          {status !== "success" ? (
            <div className="p-8">
              {/* Modal Header */}
              <div className="mb-8">
                <span className="text-gold font-bold tracking-[0.2em] uppercase text-[10px]">
                  Request a Quote
                </span>
                <h3 className="text-2xl font-display font-semibold text-primary mt-1">
                  {product.product}
                </h3>
                <p className="text-steel text-sm mt-1">
                  Fill in the details below and our team will get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative">
                <HoneypotField value={form.website} onChange={handleChange} />

                {/* Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="quote-name" className={labelClass}>Full Name *</label>
                    <input required maxLength={100} autoComplete="name" placeholder="John Doe" {...fieldProps("name")} />
                    <FieldError id="quote-name-error" error={errors.name} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="quote-company" className={labelClass}>Company</label>
                    <input maxLength={150} autoComplete="organization" placeholder="Your Company" {...fieldProps("company")} />
                    <FieldError id="quote-company-error" error={errors.company} />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="quote-email" className={labelClass}>Email *</label>
                    <input required type="email" maxLength={254} autoComplete="email" placeholder="you@company.com" {...fieldProps("email")} />
                    <FieldError id="quote-email-error" error={errors.email} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="quote-phone" className={labelClass}>Phone</label>
                    <input type="tel" maxLength={30} autoComplete="tel" placeholder="+971 50 000 0000" {...fieldProps("phone")} />
                    <FieldError id="quote-phone-error" error={errors.phone} />
                  </div>
                </div>

                {/* Quantity + Unit */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="quote-quantity" className={labelClass}>Quantity Required *</label>
                  <div className="flex gap-2">
                    <input
                      required
                      type="number"
                      min="0"
                      step="any"
                      inputMode="decimal"
                      placeholder="e.g. 500"
                      {...fieldProps("quantity", "flex-1 min-w-0")}
                    />
                    <select aria-label="Unit" {...fieldProps("unit")}>
                      {QUOTE_UNITS.map((unit) => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                  <FieldError id="quote-quantity-error" error={errors.quantity || errors.unit} />
                </div>

                {/* Grade/Spec */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="quote-grade" className={labelClass}>Grade / Specification</label>
                  <input maxLength={200} placeholder="e.g. IS 2062 E250, ASTM A36" {...fieldProps("grade")} />
                  <FieldError id="quote-grade-error" error={errors.grade} />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="quote-message" className={labelClass}>Additional Requirements</label>
                  <textarea
                    rows={3}
                    maxLength={5000}
                    placeholder="Delivery port, certifications, packaging preferences..."
                    {...fieldProps("message", "resize-none")}
                  />
                  <FieldError id="quote-message-error" error={errors.message} />
                </div>

                {status === "error" && serverMessage && (
                  <p role="alert" className="text-sm text-red-500">
                    {serverMessage}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 w-full bg-[#131313] text-white font-bold tracking-widest uppercase text-xs py-4 rounded-lg hover:bg-gold transition-colors flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-wait"
                >
                  {status === "loading" ? "Sending…" : "Submit Quote Request"}
                  {status !== "loading" && <HiOutlineArrowRight className="text-lg" />}
                </button>
              </form>
            </div>
          ) : (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 flex flex-col items-center text-center gap-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <HiCheckCircle className="text-6xl text-[#6ee7b7]" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-display font-semibold text-primary mb-2">
                  Request Received!
                </h3>
                <p className="text-steel text-sm leading-relaxed">
                  Thank you for your enquiry for <span className="text-gold font-semibold">{product.product}</span>.
                  Our team will contact you within 24 hours.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 border border-outline-variant/40 text-primary text-sm px-8 py-3 rounded-lg hover:border-gold transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main Products Page ───────────────────────────────────────────────────────
export default function Products() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") === "long" ? "long" : "flat";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeProduct, setActiveProduct] = useState(
    initialCategory === "long" ? longProducts[0] : flatProducts[0]
  );
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const currentProducts = activeCategory === "long" ? longProducts : flatProducts;
  const activeIndex = Math.max(0, currentProducts.findIndex((p) => p.product === activeProduct.product));
  const detailRef = useRef(null);

  const selectProduct = (product) => {
    setActiveProduct(product);
    // Stacked layout on small screens: bring the detail panel into view.
    if (window.innerWidth < 1024) {
      requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  const stepProduct = (dir) => {
    const next = (activeIndex + dir + currentProducts.length) % currentProducts.length;
    setActiveProduct(currentProducts[next]);
  };

  // ?product=<name> (e.g. from footer links) opens that product; otherwise the first one.
  const productParam = searchParams.get("product");
  useEffect(() => {
    const list = activeCategory === "long" ? longProducts : flatProducts;
    setActiveProduct(list.find((p) => p.product === productParam) || list[0]);
  }, [activeCategory, productParam]);

  // Arriving via Products → Flat / Long in the navbar (?category=flat|long)
  // shows only that category; plain /products shows both with tabs.
  const categoryParam = searchParams.get("category");
  const lockedCategory = categoryParam === "flat" || categoryParam === "long" ? categoryParam : null;

  // Respond to the nav dropdown / footer links changing ?category= after mount
  useEffect(() => {
    const param = searchParams.get("category") === "long" ? "long" : "flat";
    setActiveCategory(param);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showQuoteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showQuoteModal]);

  return (
    <div className="min-h-screen bg-bg text-ivory font-body flex flex-col">

      <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
        {/* Header Section */}
        <div className="mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col border-l-2 border-gold pl-6 mb-6"
          >
            <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs mb-2">
              {lockedCategory ? "Product Catalog" : "Inventory Hub"}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-medium uppercase tracking-tight text-primary">
              {lockedCategory === "flat" ? "Flat Products" : lockedCategory === "long" ? "Long Products" : "Product Catalog"}
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl text-steel text-sm md:text-base leading-relaxed"
          >
            Explore our comprehensive inventory of industrial-grade metal
            solutions. Precision engineered to meet the highest global standards.
          </motion.p>
        </div>

        {/* Category Toggles — only when browsing the full catalog */}
        {!lockedCategory && (
        <div className="flex gap-4 mb-12 border-b border-outline-variant/30 pb-px relative">
          <button
            onClick={() => setActiveCategory("flat")}
            className={`pb-4 px-2 font-display text-sm md:text-lg font-medium tracking-wide transition-colors relative flex items-center gap-2 ${
              activeCategory === "flat" ? "text-ivory" : "text-steel hover:text-ivory"
            }`}
          >
            <HiOutlineViewBoards className="text-xl" />
            Flat Products
            {activeCategory === "flat" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
              />
            )}
          </button>
          <button
            onClick={() => setActiveCategory("long")}
            className={`pb-4 px-2 font-display text-sm md:text-lg font-medium tracking-wide transition-colors relative flex items-center gap-2 ${
              activeCategory === "long" ? "text-ivory" : "text-steel hover:text-ivory"
            }`}
          >
            <HiOutlineCube className="text-xl" />
            Long Products
            {activeCategory === "long" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
              />
            )}
          </button>
        </div>
        )}

        {/* Master-Detail Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start min-h-[600px]">

          {/* Master List */}
          <div className="w-full lg:w-1/3 flex flex-col border border-outline-variant/30 bg-bg-alt rounded-sm overflow-hidden shadow-2xl h-[500px] lg:h-[700px]">
            <div className="bg-surface-container p-4 border-b border-outline-variant/30">
              <span className="text-xs font-label-md text-steel uppercase tracking-widest">
                Select a Product
              </span>
            </div>
            <div className="overflow-y-auto flex-grow custom-scrollbar">
              {currentProducts.map((product, idx) => {
                const isActive = activeProduct.product === product.product;
                const productImage = getProductImage(product.product, activeCategory);

                return (
                  <button
                    key={idx}
                    onClick={() => selectProduct(product)}
                    className={`w-full text-left px-4 py-3.5 border-b border-outline-variant/30 transition-all duration-300 flex justify-between items-center gap-3 group ${
                      isActive
                        ? "bg-surface-container-low border-l-4 border-l-gold"
                        : "hover:bg-surface-container-low/60 border-l-4 border-l-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-5 text-[11px] tabular-nums text-steel/60 shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <img
                        src={productImage}
                        alt=""
                        loading="lazy"
                        className={`w-12 h-12 md:w-14 md:h-14 object-cover rounded-sm border border-outline-variant/30 transition-all duration-300 shrink-0 ${
                          isActive ? "" : "grayscale group-hover:grayscale-0"
                        }`}
                      />
                      <span
                        className={`font-display text-sm md:text-base leading-snug ${
                          isActive ? "font-semibold text-ivory" : "font-medium text-on-surface-variant group-hover:text-ivory"
                        }`}
                      >
                        {product.product}
                      </span>
                    </div>
                    <HiOutlineArrowRight
                      className={`text-lg transition-transform duration-300 ${
                        isActive
                          ? "text-gold translate-x-0"
                          : "text-steel -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail Viewer */}
          <div ref={detailRef} className="w-full lg:w-2/3 lg:sticky lg:top-32 scroll-mt-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.product}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Product photo — shown clean, nothing drawn over it */}
                <div className="relative h-60 md:h-80 w-full overflow-hidden rounded-sm border border-outline-variant/30 group shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]">
                  <img
                    src={getProductImage(activeProduct.product, activeCategory)}
                    alt={activeProduct.product}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                  />
                </div>

                {/* Title + counter / prev-next, below the photo */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-6 mb-8">
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-gold mb-2">
                      {activeCategory === "flat" ? "Flat Product" : "Long Product"}
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl font-semibold text-ivory uppercase tracking-tight leading-[1.05]">
                      {activeProduct.product}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-steel tabular-nums">
                      {String(activeIndex + 1).padStart(2, "0")} / {String(currentProducts.length).padStart(2, "0")}
                    </span>
                    <button
                      onClick={() => stepProduct(-1)}
                      aria-label="Previous product"
                      className="w-10 h-10 rounded-full border border-outline-variant text-ivory flex items-center justify-center hover:bg-[#131313] hover:text-white hover:border-[#131313] transition-colors"
                    >
                      <HiOutlineArrowLeft />
                    </button>
                    <button
                      onClick={() => stepProduct(1)}
                      aria-label="Next product"
                      className="w-10 h-10 rounded-full border border-outline-variant text-ivory flex items-center justify-center hover:bg-[#131313] hover:text-white hover:border-[#131313] transition-colors"
                    >
                      <HiOutlineArrowRight />
                    </button>
                  </div>
                </div>

                {/* Technical Specs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {/* Sizes Block */}
                  <div className="bg-bg-alt border border-outline-variant/30 p-6 md:p-7 rounded-sm relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-outline-variant/10 rotate-45 translate-x-8 -translate-y-8 opacity-20" />
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-gold uppercase mb-4 block">
                      Dimensions &amp; Sizes
                    </span>
                    <p className="text-ivory text-base md:text-lg leading-relaxed border-l-2 border-gold/50 pl-4">
                      {activeProduct.size}
                    </p>
                  </div>

                  {/* Grades Block */}
                  <div className="bg-bg-alt border border-outline-variant/30 p-6 md:p-7 rounded-sm shadow-sm">
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-gold uppercase mb-4 block">
                      Supported Grades
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {parseGrades(activeProduct.grade).map((grade, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 border border-outline-variant text-sm text-ivory rounded-sm bg-bg hover:border-gold hover:text-gold transition-colors cursor-default"
                        >
                          {grade}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Row */}
                <div className="mt-12 flex items-center justify-between border-t border-outline-variant/30 pt-8">
                  <div className="hidden md:block">
                    <span className="text-xs text-steel block">Can't find your specification?</span>
                    <span className="text-sm font-medium text-ivory">Contact us for custom requirements.</span>
                  </div>
                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="w-full md:w-auto bg-[#131313] text-white px-8 py-4 font-bold tracking-widest uppercase text-xs hover:bg-gold transition-colors flex items-center justify-center gap-3"
                  >
                    Request Quote
                    <HiOutlineArrowRight className="text-lg" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <CustomerReviews />
      </main>

      {/* Quote Modal */}
      {showQuoteModal && (
        <QuoteModal
          product={activeProduct}
          onClose={() => setShowQuoteModal(false)}
        />
      )}
    </div>
  );
}
