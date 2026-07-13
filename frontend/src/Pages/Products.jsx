import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgImg from "../assets/homebg.png";
import { longProducts, flatProducts } from "../data/productsData";
import { HiOutlineArrowRight, HiOutlineCube, HiOutlineViewBoards } from "react-icons/hi";

// Helper to parse complex grade strings into array of tags
const parseGrades = (gradeString) => {
  if (!gradeString) return [];
  // Split by slashes, commas, or double slashes
  return gradeString
    .split(/\s*[\/,]\s*|\s*\/\/\s*|\s+&\s+/)
    .map((g) => g.trim())
    .filter((g) => g.length > 2);
};

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("long"); // 'long' or 'flat'
  const [activeProduct, setActiveProduct] = useState(longProducts[0]);

  const currentProducts = activeCategory === "long" ? longProducts : flatProducts;

  // When switching categories, default to the first item
  useEffect(() => {
    setActiveProduct(activeCategory === "long" ? longProducts[0] : flatProducts[0]);
  }, [activeCategory]);

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
            <h1 className="text-4xl md:text-6xl font-display font-medium tracking-tight">
              Product Catalog
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl text-[#8e9192] text-sm md:text-base leading-relaxed"
          >
            Explore our comprehensive inventory of industrial-grade metal
            solutions. Precision engineered to meet the highest global standards.
          </motion.p>
        </div>

        {/* Category Toggles */}
        <div className="flex gap-4 mb-12 border-b border-[#2a2a2a] pb-px relative">
          <button
            onClick={() => setActiveCategory("long")}
            className={`pb-4 px-2 font-display text-sm md:text-lg font-medium tracking-wide transition-colors relative flex items-center gap-2 ${
              activeCategory === "long" ? "text-[#ffe088]" : "text-[#8e9192] hover:text-[#e4e2e1]"
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
          <button
            onClick={() => setActiveCategory("flat")}
            className={`pb-4 px-2 font-display text-sm md:text-lg font-medium tracking-wide transition-colors relative flex items-center gap-2 ${
              activeCategory === "flat" ? "text-[#ffe088]" : "text-[#8e9192] hover:text-[#e4e2e1]"
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
        </div>

        {/* Interactive Master-Detail Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start min-h-[600px]">
          
          {/* Master List (Left Column) */}
          <div className="w-full lg:w-1/3 flex flex-col border border-outline-variant/30 bg-bg-alt rounded-sm overflow-hidden shadow-2xl h-[500px] lg:h-[700px]">
            <div className="bg-surface-container p-4 border-b border-outline-variant/30">
              <span className="text-xs font-label-md text-[#8e9192] uppercase tracking-widest">
                Select a Product
              </span>
            </div>
            <div className="overflow-y-auto flex-grow custom-scrollbar">
              {currentProducts.map((product, idx) => {
                const isActive = activeProduct.product === product.product;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveProduct(product)}
                    className={`w-full text-left p-5 border-b border-outline-variant/30 transition-all duration-300 flex justify-between items-center group ${
                      isActive
                        ? "bg-bg-alt/80 border-l-4 border-l-[#ffe088]"
                        : "hover:bg-bg-alt/40 border-l-4 border-l-transparent"
                    }`}
                  >
                    <span
                      className={`font-display font-medium text-sm md:text-base ${
                        isActive ? "text-[#ffe088]" : "text-[#c4c7c7] group-hover:text-ivory"
                      }`}
                    >
                      {product.product}
                    </span>
                    <HiOutlineArrowRight
                      className={`text-lg transition-transform duration-300 ${
                        isActive ? "text-[#ffe088] translate-x-0" : "text-[#8e9192] -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail Viewer (Right Column - Sticky) */}
          <div className="w-full lg:w-2/3 lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.product}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-transparent"
              >
                {/* Visual Header */}
                <div className="relative h-48 md:h-64 w-full overflow-hidden rounded-sm border border-outline-variant/30 mb-8 group">
                  <img
                    src={bgImg}
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
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#8e9192] uppercase mb-4 block">
                      Dimensions & Sizes
                    </span>
                    <p className="text-ivory font-label-md text-sm leading-relaxed border-l-2 border-outline-variant/40 pl-4">
                      {activeProduct.size}
                    </p>
                  </div>

                  {/* Grades Block */}
                  <div className="bg-bg-alt border border-outline-variant/30 p-6 rounded-sm">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#8e9192] uppercase mb-4 block">
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
                    <span className="text-xs text-[#8e9192] block">Can't find your specification?</span>
                    <span className="text-sm font-medium text-ivory">Contact us for custom requirements.</span>
                  </div>
                  <button className="w-full md:w-auto bg-gold text-bg px-8 py-4 font-bold tracking-widest uppercase text-xs hover:bg-white transition-colors flex items-center justify-center gap-3">
                    Request Quote
                    <HiOutlineArrowRight className="text-lg" />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </main>
    </div>
  );
}
