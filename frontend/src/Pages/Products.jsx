import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgImg from "../assets/homebg.png";
import productImages from "../data/productImages.json";
import { longProducts, flatProducts } from "../data/productsData";

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
      "Exceptional quality and on-time delivery. Metaled Trade has been our go-to supplier for structural steel for over three years. The documentation and compliance standards are world-class.",
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
      "We've sourced HR coils from dozens of suppliers, but none match the consistency Metaled Trade delivers. Competitive pricing with zero compromise on specifications.",
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
      "Their H-beams and angles meet BS and ASTM standards consistently. The team is highly professional and responsive. I strongly recommend Metaled Trade to any serious buyer.",
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
      "Outstanding service. Metaled Trade sourced a specific grade wire rod that no other supplier in the region could provide. They go the extra mile every single time.",
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
          <HiStar key={star} className="text-[#ffe088] text-sm" />
        ) : (
          <HiOutlineStar key={star} className="text-[#ffe088]/40 text-sm" />
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
        className="flex flex-col border-l-2 border-[#ffe088] pl-6 mb-12"
      >
        <span className="text-[#ffe088] font-bold tracking-[0.2em] uppercase text-xs mb-2">
          Client Testimonials
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight text-primary">
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
                  ? "border-[#ffe088]/60 bg-surface-container shadow-lg shadow-gold/5"
                  : "border-outline-variant/20 bg-bg-alt/40 hover:border-outline-variant/50 hover:bg-bg-alt/70"
              }`}
            >
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-bg shrink-0"
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
                  className="ml-auto w-1.5 h-8 rounded-full bg-[#ffe088] shrink-0"
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
              <span className="text-[10px] font-bold tracking-widest uppercase border border-[#ffe088]/40 text-[#ffe088] px-3 py-1 rounded-full">
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
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-bg shrink-0"
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
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

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

          {!submitted ? (
            <div className="p-8">
              {/* Modal Header */}
              <div className="mb-8">
                <span className="text-[#ffe088] font-bold tracking-[0.2em] uppercase text-[10px]">
                  Request a Quote
                </span>
                <h3 className="text-2xl font-display font-semibold text-primary mt-1">
                  {product.product}
                </h3>
                <p className="text-steel text-sm mt-1">
                  Fill in the details below and our team will get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-steel">
                      Full Name *
                    </label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="bg-bg-alt border border-outline-variant/40 text-primary placeholder:text-steel/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#ffe088]/60 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-steel">
                      Company
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="bg-bg-alt border border-outline-variant/40 text-primary placeholder:text-steel/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#ffe088]/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-steel">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="bg-bg-alt border border-outline-variant/40 text-primary placeholder:text-steel/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#ffe088]/60 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-steel">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+971 50 000 0000"
                      className="bg-bg-alt border border-outline-variant/40 text-primary placeholder:text-steel/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#ffe088]/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Quantity + Unit */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-steel">
                    Quantity Required *
                  </label>
                  <div className="flex gap-2">
                    <input
                      required
                      type="number"
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 500"
                      className="flex-1 bg-bg-alt border border-outline-variant/40 text-primary placeholder:text-steel/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#ffe088]/60 transition-colors"
                    />
                    <select
                      name="unit"
                      value={form.unit}
                      onChange={handleChange}
                      className="bg-bg-alt border border-outline-variant/40 text-primary rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-[#ffe088]/60 transition-colors"
                    >
                      <option value="MT">MT</option>
                      <option value="KG">KG</option>
                      <option value="Pieces">Pieces</option>
                      <option value="Coils">Coils</option>
                    </select>
                  </div>
                </div>

                {/* Grade/Spec */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-steel">
                    Grade / Specification
                  </label>
                  <input
                    name="grade"
                    value={form.grade}
                    onChange={handleChange}
                    placeholder="e.g. IS 2062 E250, ASTM A36"
                    className="bg-bg-alt border border-outline-variant/40 text-primary placeholder:text-steel/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#ffe088]/60 transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-steel">
                    Additional Requirements
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Delivery port, certifications, packaging preferences..."
                    className="bg-bg-alt border border-outline-variant/40 text-primary placeholder:text-steel/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#ffe088]/60 transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-2 w-full bg-gold text-bg font-bold tracking-widest uppercase text-xs py-4 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-3"
                >
                  Submit Quote Request
                  <HiOutlineArrowRight className="text-lg" />
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
                  Thank you for your enquiry for <span className="text-[#ffe088] font-semibold">{product.product}</span>.
                  Our team will contact you within 24 hours.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 border border-outline-variant/40 text-primary text-sm px-8 py-3 rounded-lg hover:border-[#ffe088]/60 transition-colors"
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
  const [activeCategory, setActiveCategory] = useState("flat");
  const [activeProduct, setActiveProduct] = useState(flatProducts[0]);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const currentProducts = activeCategory === "long" ? longProducts : flatProducts;

  useEffect(() => {
    setActiveProduct(activeCategory === "long" ? longProducts[0] : flatProducts[0]);
  }, [activeCategory]);

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
            className="flex flex-col border-l-2 border-[#ffe088] pl-6 mb-6"
          >
            <span className="text-[#ffe088] font-bold tracking-[0.2em] uppercase text-xs mb-2">
              Inventory Hub
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-medium tracking-tight text-primary">
              Product Catalog
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

        {/* Category Toggles */}
        <div className="flex gap-4 mb-12 border-b border-outline-variant/30 pb-px relative">
          <button
            onClick={() => setActiveCategory("flat")}
            className={`pb-4 px-2 font-display text-sm md:text-lg font-medium tracking-wide transition-colors relative flex items-center gap-2 ${
              activeCategory === "flat" ? "text-[#ffe088]" : "text-steel hover:text-ivory"
            }`}
          >
            <HiOutlineViewBoards className="text-xl" />
            Flat Products
            {activeCategory === "flat" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffe088]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveCategory("long")}
            className={`pb-4 px-2 font-display text-sm md:text-lg font-medium tracking-wide transition-colors relative flex items-center gap-2 ${
              activeCategory === "long" ? "text-[#ffe088]" : "text-steel hover:text-ivory"
            }`}
          >
            <HiOutlineCube className="text-xl" />
            Long Products
            {activeCategory === "long" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffe088]"
              />
            )}
          </button>
        </div>

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
                    onClick={() => setActiveProduct(product)}
                    className={`w-full text-left p-4 border-b border-outline-variant/30 transition-all duration-300 flex justify-between items-center gap-3 group ${
                      isActive
                        ? "bg-bg-alt/80 border-l-4 border-l-[#ffe088]"
                        : "hover:bg-bg-alt/40 border-l-4 border-l-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={productImage}
                        alt=""
                        className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-sm border border-outline-variant/30 grayscale group-hover:grayscale-0 transition-all duration-300 shrink-0"
                      />
                      <span
                        className={`font-display font-medium text-sm md:text-base ${
                          isActive ? "text-[#ffe088]" : "text-on-surface-variant group-hover:text-ivory"
                        }`}
                      >
                        {product.product}
                      </span>
                    </div>
                    <HiOutlineArrowRight
                      className={`text-lg transition-transform duration-300 ${
                        isActive
                          ? "text-[#ffe088] translate-x-0"
                          : "text-steel -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail Viewer */}
          <div className="w-full lg:w-2/3 lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.product}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Visual Header */}
                <div className="relative h-48 md:h-64 w-full overflow-hidden rounded-sm border border-outline-variant/30 mb-8 group">
                  <img
                    src={getProductImage(activeProduct.product, activeCategory)}
                    alt={activeProduct.product}
                    className="w-full h-full object-cover grayscale brightness-50 group-hover:brightness-75 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight drop-shadow-lg">
                      {activeProduct.product}
                    </h2>
                  </div>
                </div>

                {/* Technical Specs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {/* Sizes Block */}
                  <div className="bg-bg-alt border border-outline-variant/30 p-6 rounded-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-outline-variant/10 rotate-45 translate-x-8 -translate-y-8 opacity-20" />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-steel uppercase mb-4 block">
                      Dimensions &amp; Sizes
                    </span>
                    <p className="text-ivory font-label-md text-sm leading-relaxed border-l-2 border-outline-variant/40 pl-4">
                      {activeProduct.size}
                    </p>
                  </div>

                  {/* Grades Block */}
                  <div className="bg-bg-alt border border-outline-variant/30 p-6 rounded-sm">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-steel uppercase mb-4 block">
                      Supported Grades
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {parseGrades(activeProduct.grade).map((grade, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 border border-outline-variant/40 text-xs font-label-md text-ivory rounded-sm bg-bg hover:border-[#ffe088] hover:text-[#ffe088] transition-colors cursor-default"
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
                    className="w-full md:w-auto bg-gold text-bg px-8 py-4 font-bold tracking-widest uppercase text-xs hover:bg-white transition-colors flex items-center justify-center gap-3"
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
