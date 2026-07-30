import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe3D } from "../components/ui/3d-globe";
import { HiX } from "react-icons/hi";
import {
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlineCube,
  HiOutlineMapPin,
  HiOutlineArrowRight,
} from "react-icons/hi2";

// Local assets for project photos
import heroBg from "../assets/projects/hero_projects.jpg";
import heroBgLight from "../assets/projects/modern_steel_facade_right.png";
import neomImg from "../assets/projects/future_district.jpg";
import jafurahImg from "../assets/projects/modern_steel_facade.png";
import oxyImg from "../assets/projects/dubai_south.jpg";
import dhafraImg from "../assets/projects/downtown_dubai.jpg";
import sudairImg from "../assets/projects/modern_steel_facade_right.png";
import shuaibahImg from "../assets/projects/business_bay.jpg";
import animalShedImg from "../assets/projects/jebel_ali.jpg";

// ── Real Projects Data with Pins & Full Details ──────────────────────────────
const FEATURED_PROJECTS = [
  {
    id: "01",
    lat: 28.003,
    lng: 35.228,
    name: "Neom Project",
    country: "Saudi Arabia",
    location: "Tabuk / Neom, KSA",
    year: "2024",
    subcontractor: "ARAMCO",
    material: "Hot Rolled Steel Plates",
    src: neomImg,
    sector: "INFRASTRUCTURE",
    description:
      "Heavy industrial structural steel and premium Hot Rolled Steel Plates supplied for the groundbreaking Neom mega-city infrastructure development under Aramco contracting standards.",
    details:
      "Engineered for high load-bearing capacity and environmental resilience in desert terrain. Supplied under strict Saudi Aramco quality specifications.",
    span: "md:col-span-8",
  },
  {
    id: "02",
    lat: 25.4,
    lng: 49.6,
    name: "Jafurah Project",
    country: "Saudi Arabia",
    location: "Eastern Province, KSA",
    year: "2024",
    subcontractor: "ARAMCO",
    material: "Hot Rolled Steel Plates",
    src: jafurahImg,
    sector: "ENERGY & GAS",
    description:
      "High-grade Hot Rolled Steel Plates supplied for Aramco's flagship Jafurah unconventional gas basin development project.",
    details:
      "Delivered under Aramco sub-contractor frameworks for high-pressure energy containment structures and industrial processing facilities.",
    span: "md:col-span-4",
  },
  {
    id: "03",
    lat: 20.15,
    lng: 56.4,
    name: "Oxy Project",
    country: "Oman",
    location: "Mukhaizna Field, Oman",
    year: "2022",
    subcontractor: "OXY (Occidental Petroleum)",
    material: "Structural Alloys & Piping Steel",
    src: oxyImg,
    sector: "OIL & GAS",
    description:
      "Certified structural steel alloys and specialized heavy steel plates supplied for Occidental Petroleum (OXY) onshore energy facilities in Oman.",
    details:
      "High-durability structural components tailored for demanding oilfield extraction and refinery environments.",
    span: "md:col-span-4",
  },
  {
    id: "04",
    lat: 24.15,
    lng: 54.5,
    name: "Al Dhafra Solar PV",
    country: "United Arab Emirates",
    location: "30 km South of Abu Dhabi, UAE",
    year: "2023",
    subcontractor: "EWEC & MASDAR",
    material: "Zinc Aluminium Magnesium (ZAM) Coated Steel Coils",
    src: dhafraImg,
    sector: "SOLAR ENERGY",
    description:
      "Located 30 km south of Abu Dhabi, this is the largest single-site solar photovoltaic plant in the world, generating over 2 GW of clean energy and powering over 160,000 households.",
    details:
      "Supplied premium Zinc Aluminium Magnesium Coated Steel Coils engineered for extreme anti-corrosion solar tracking frameworks in coastal desert climates.",
    span: "md:col-span-8",
  },
  {
    id: "05",
    lat: 25.6,
    lng: 45.6,
    name: "Sudair Solar PV Plant",
    country: "Saudi Arabia",
    location: "Riyadh Province, KSA",
    year: "2023 - 2024",
    subcontractor: "PIF & ACWA Power",
    material: "Zinc Aluminium Magnesium (ZAM) Coated Steel Coils",
    src: sudairImg,
    sector: "RENEWABLE ENERGY",
    description:
      "A 1,500 MW solar facility in Riyadh Province backed by Saudi Public Investment Fund (PIF) and ACWA Power providing power to roughly 185,000 homes.",
    details:
      "Heavy-volume supply of Zinc Aluminium Magnesium Coated Steel Coils providing superior anti-rust protection for tracker racking.",
    span: "md:col-span-6",
  },
  {
    id: "06",
    lat: 20.67,
    lng: 39.54,
    name: "Al-Shuaibah Solar Projects",
    country: "Saudi Arabia",
    location: "South of Jeddah, KSA",
    year: "2024",
    subcontractor: "ACWA Power & PIF",
    material: "Zinc Aluminium Magnesium (ZAM) Coated Steel Coils",
    src: shuaibahImg,
    sector: "RENEWABLE ENERGY",
    description:
      "A 2.6 GW solar capacity split across two sites south of Jeddah utilizing advanced bifacial modules.",
    details:
      "Supplied high-performance ZAM Coated Steel Coils designed to withstand high humidity and saline air near the Red Sea coastline.",
    span: "md:col-span-6",
  },
  {
    id: "07",
    lat: 23.588,
    lng: 58.382,
    name: "Oman Agricultural Project",
    country: "Oman",
    location: "Animal Shed Facilities, Oman",
    year: "2023",
    subcontractor: "Agricultural & Livestock Sector",
    material: "Pre-Painted Galvanised Coils (PPGI)",
    src: animalShedImg,
    sector: "AGRICULTURE",
    description:
      "Pre-Painted Galvanised Coils (PPGI) supplied for large-scale agricultural animal shed structures and livestock roofing across Oman.",
    details:
      "Delivered with custom weather-resistant coating formulations designed for thermal insulation and UV durability.",
    span: "md:col-span-12",
    isWide: true,
  },
];

const PARTNERS = [
  {
    name: "Jindal Steel Works",
    logo: (
      <svg className="w-24 h-24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 12 18 C 24 11, 40 11, 52 18 C 40 14, 24 14, 12 18 Z" fill="#ED1C24" />
        <text x="32" y="44" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="20" fill="#2744A0" textAnchor="middle" letterSpacing="1">JSW</text>
        <text x="32" y="54" fontFamily="'Inter', sans-serif" fontWeight="500" fontSize="7" fill="#8e9192" textAnchor="middle" letterSpacing="0.5">STEEL</text>
      </svg>
    ),
  },
  {
    name: "Shagang Steel",
    logo: (
      <svg className="w-24 h-24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="28" r="20" stroke="#1E40AF" strokeWidth="2.5" fill="none" />
        <path d="M 22 22 L 42 22 L 38 36 L 26 36 Z" fill="#ED1C24" />
        <path d="M 16 28 C 24 22, 28 34, 38 28 S 44 22, 48 28" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
        <text x="32" y="56" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="8" fill="currentColor" className="text-on-surface-variant" textAnchor="middle" letterSpacing="0.8">SHAGANG</text>
      </svg>
    ),
  },
  {
    name: "HAOSEN Steel",
    logo: (
      <svg className="w-24 h-24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 10C32 10 36 18 36 24C36 30 32 34 32 34C32 34 28 30 28 24C28 18 32 10 32 10Z" fill="#F59E0B" />
        <path d="M32 20C24 22 18 30 22 34C26 38 32 34 32 34C32 34 38 34 42 34C46 30 40 22 32 20Z" fill="#F59E0B" opacity="0.9" />
        <path d="M22 26C16 30 16 38 24 38C32 38 32 34 32 34C32 34 32 38 40 38C48 38 48 30 42 26" fill="#D97706" opacity="0.8" />
        <path d="M 16 40 L 48 40 L 40 44 L 24 44 Z" fill="#7F1D1D" />
        <text x="32" y="54" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="7.5" fill="#7F1D1D" textAnchor="middle" letterSpacing="1.2">HOA SEN</text>
      </svg>
    ),
  },
  {
    name: "TAYNAM Steel",
    logo: (
      <svg className="w-24 h-24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 24 C 22 14, 28 34, 38 24 S 48 14, 52 24" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M12 30 C 22 20, 28 40, 38 30 S 48 20, 52 30" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <text x="32" y="48" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="8.5" fill="#DC2626" textAnchor="middle" letterSpacing="1">TAYNAM</text>
        <text x="32" y="56" fontFamily="'Inter', sans-serif" fontWeight="500" fontSize="6.5" fill="#8e9192" textAnchor="middle" letterSpacing="0.5">STEEL</text>
      </svg>
    ),
  },
  {
    name: "RHINO Steel",
    logo: (
      <svg className="w-24 h-24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 16 12 L 48 12 C 48 30, 32 44, 32 44 C 32 44, 16 30, 16 12 Z" fill="#374151" stroke="#4B5563" strokeWidth="1.5" />
        <path d="M 28 20 L 36 20 L 40 28 L 32 26 Z" fill="#F97316" />
        <path d="M 36 20 L 42 14 L 40 28 Z" fill="#EA580C" />
        <line x1="20" y1="16" x2="44" y2="16" stroke="#9CA3AF" strokeWidth="1" />
        <text x="32" y="54" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="8" fill="#F97316" textAnchor="middle" letterSpacing="1">RHINO STEEL</text>
      </svg>
    ),
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("theme") || (document.documentElement.classList.contains("light") ? "light" : "dark");
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setThemeMode(document.documentElement.classList.contains("light") ? "light" : "dark");
  }, []);

  useEffect(() => {
    const handleThemeChange = () => {
      setThemeMode(document.documentElement.classList.contains("light") ? "light" : "dark");
    };
    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  const handleReachUsClick = (e) => {
    e.preventDefault();
    const footer = document.querySelector("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-bg text-ivory font-body-md overflow-x-hidden flex flex-col justify-between">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[65vh] min-h-[480px] flex flex-col justify-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className={`w-full h-full bg-cover bg-center transition-all duration-1000 ${
                themeMode === "light" ? "opacity-100" : "opacity-70"
              }`}
              style={{ backgroundImage: `url(${themeMode === "light" ? heroBgLight : heroBg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-20 pb-12">
            <div className="max-w-2xl">
              <p className="font-bold text-xs md:text-sm text-[#ffd862] mb-3 uppercase tracking-[0.25em]">
                Global Supply Footprint
              </p>
              <h1
                className={`font-semibold text-4xl sm:text-5xl md:text-7xl leading-[1.1] mb-4 uppercase ${
                  themeMode === "light" ? "text-primary" : "text-white"
                }`}
              >
                Architectural <br />
                Integrity
              </h1>
              <p
                className={`font-extrabold text-sm md:text-base leading-relaxed ${
                  themeMode === "light" ? "text-on-surface-variant" : "text-zinc-300"
                }`}
              >
                Forging the backbone of the world&apos;s most ambitious infrastructure projects with certified industrial steel, specialized solar coatings, and heavy structural plates.
              </p>
            </div>
          </div>
        </section>

        {/* ── SINGLE CENTRAL 3D GLOBE SECTION (Pinned Projects) ──────────────── */}
        <section className="bg-surface-container-lowest border-y border-[#444748]/20 py-20 relative overflow-hidden select-none">
          <div className="max-w-[1440px] mx-auto px-5 md:px-20 text-center relative z-10 mb-8">
            <span className="font-label-md text-xs text-[#ffd862] uppercase tracking-[0.25em] block mb-2">
              Interactive 3D Supply Map
            </span>
            <h2 className="font-headline-lg text-3xl md:text-5xl text-primary uppercase tracking-wide">
              Global Project Pins
            </h2>
            <p className="text-steel text-sm max-w-xl mx-auto mt-3">
              Hover or click on any 3D pin to inspect project photos, subcontractor partnerships, and material specifications.
            </p>
          </div>

          <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto", position: "relative" }}>
            <Globe3D
              markers={FEATURED_PROJECTS}
              config={{ bumpScale: 3, autoRotateSpeed: 0.35, showAtmosphere: false }}
              onMarkerClick={(marker) => setSelectedProject(marker)}
            />
          </div>
        </section>

        {/* Separator / Brand Text banner */}
        <section className="bg-surface-container-lowest border-b border-outline-variant/30 py-8 overflow-hidden select-none">
          <div className="flex whitespace-nowrap gap-20 items-center justify-center animate-pulse">
            <span className="font-display-lg text-xl md:text-3xl font-extrabold text-gold-soft/30 uppercase tracking-widest">
              LANDMARK STEEL SOLUTIONS
            </span>
            <span className="text-gold-soft/30 text-2xl">•</span>
            <span className="font-display-lg text-xl md:text-3xl font-extrabold text-gold-soft/30 uppercase tracking-widest">
              CERTIFIED QUALITY ASSURED
            </span>
            <span className="text-gold-soft/30 text-2xl">•</span>
            <span className="font-display-lg text-xl md:text-3xl font-extrabold text-[#ffd862]/30 uppercase tracking-widest">
              GLOBAL SMELTING NETWORK
            </span>
          </div>
        </section>

        {/* ── FEATURED PROJECTS SHOWCASE GRID ─────────────────────────────────── */}
        <section className="px-5 md:px-20 py-20 max-w-[1440px] mx-auto">
          <div className="text-left mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-md text-xs text-[#ffd862] uppercase tracking-widest block mb-2">
                Portfolio Showcase
              </span>
              <h2 className="font-headline-lg text-2xl md:text-4xl text-primary uppercase">
                Featured Infrastructure Projects
              </h2>
              <div className="w-12 h-[2px] bg-[#ffd862] mt-3" />
            </div>
            <p className="text-steel text-xs md:text-sm max-w-md">
              Click any project card to view full subcontractor details, material grades, and supply scope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {FEATURED_PROJECTS.map((project, idx) => {
              const isThird = project.isWide;
              const isCol4 = project.span.includes("col-span-4");
              return (
                <motion.div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative overflow-hidden bg-surface-container border border-outline-variant/35 rounded-lg shadow-xl cursor-pointer ${
                    project.span
                  } ${isThird ? "h-[400px]" : "h-[480px]"}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.8, delay: idx * 0.08, ease: "easeOut" }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.src})` }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:from-black/90 transition-colors duration-500" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                    <span className="font-label-sm text-[10px] bg-[#ffd862] text-[#131313] font-bold px-3 py-1 uppercase rounded-sm shadow-md">
                      {project.subcontractor}
                    </span>
                    <span className="font-label-sm text-[10px] bg-black/80 text-[#ffd862] border border-[#ffd862]/40 px-3 py-1 uppercase rounded-sm backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>

                  {/* Bottom Card Details */}
                  <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-label-md text-xs text-[#ffd862] font-semibold">
                        {project.id} / {project.country}
                      </span>
                      <span className="text-zinc-500">•</span>
                      <span className="font-label-sm text-[10px] text-zinc-300 uppercase tracking-wider">
                        {project.location}
                      </span>
                    </div>

                    <h3
                      className={`text-white mb-2 uppercase font-display-lg ${
                        isCol4 ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
                      }`}
                    >
                      {project.name}
                    </h3>

                    <p className="text-zinc-300 text-xs line-clamp-2 mb-4 leading-relaxed font-body">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-white/15 pt-3">
                      <span className="font-label-sm text-[11px] text-[#ffd862] uppercase tracking-wider font-semibold">
                        {project.material}
                      </span>
                      <span className="text-xs font-bold text-white flex items-center gap-1 group-hover:text-[#ffd862] transition-colors">
                        View Details
                        <HiOutlineArrowRight className="text-base" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── REGIONAL FOOTPRINTS TYPOGRAPHIC INDEX ──────────────────────────── */}
        <section className="px-5 md:px-20 py-20 max-w-[1440px] mx-auto border-t border-[#444748]/15">
          <div className="text-left mb-14 max-w-2xl">
            <span className="font-label-md text-xs text-[#ffd862] uppercase tracking-[0.25em] block mb-2">
              Regional Index
            </span>
            <h2 className="font-headline-lg text-2xl md:text-4xl text-primary uppercase tracking-wide">
              Landmark Project Summary
            </h2>
            <div className="w-12 h-[2px] bg-[#ffd862] mt-3 mb-4" />
            <p className="font-body-md text-sm text-steel leading-relaxed">
              Metaled Trade has supplied certified steel and specialized metal alloys to premier global subcontractors including Aramco, EWEC, Masdar, and OXY.
            </p>
          </div>

          {/* List Column */}
          <div className="w-full">
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {FEATURED_PROJECTS.map((project, idx) => {
                const isHovered = hoveredIndex === idx;
                const isAnyHovered = hoveredIndex !== null;

                return (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="relative group cursor-pointer py-4 px-2 transition-all duration-500 border-b border-[#444748]/20"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    style={{
                      opacity: isAnyHovered ? (isHovered ? 1 : 0.4) : 0.85,
                      transform: isHovered ? "translateX(6px)" : "translateX(0px)",
                    }}
                  >
                    {isHovered && (
                      <motion.div
                        layoutId="spotlightGlow"
                        className="absolute -inset-x-2 -inset-y-1 bg-[#ffd862]/5 rounded-lg blur-sm z-0"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    <div className="relative z-10 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-[10px] text-[#ffd862] font-semibold tracking-widest">
                            {project.id}
                          </span>
                          <span className="w-3 h-[1px] bg-[#ffd862]/40" />
                          <span className="font-label-sm text-[9px] text-[#8e9192] uppercase tracking-wider">
                            {project.country}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-[#ffd862] bg-[#ffd862]/10 border border-[#ffd862]/30 px-2 py-0.5 rounded">
                          {project.subcontractor}
                        </span>
                      </div>

                      <h3 className="font-display-lg text-xl font-extrabold uppercase tracking-wide text-ivory group-hover:text-[#ffd862] transition-colors duration-300">
                        {project.name}
                      </h3>

                      <p className="text-xs text-steel line-clamp-1">{project.material}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Customized Orders Reach Us banner */}
        <section className="bg-[#1c2c43] border-y border-[#ffd862]/10 py-16 px-5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffd862]/5 to-transparent pointer-events-none" />
          <div className="max-w-2xl mx-auto relative z-10">
            <h3 className="font-display-lg text-lg sm:text-2xl md:text-3xl font-extrabold text-white uppercase tracking-widest mb-6">
              Looking for customised orders?
            </h3>
            <button
              onClick={handleReachUsClick}
              className="bg-[#ffd862] text-[#131313] hover:bg-white hover:text-black transition-colors duration-300 font-display-lg text-xs md:text-sm font-bold uppercase tracking-widest px-8 py-3.5 shadow-xl cursor-pointer"
            >
              Reach Us
            </button>
          </div>
        </section>

        {/* Partners Showcase Section (Infinite Marquee) */}
        <section className="bg-bg-alt border-y border-[#444748]/30 py-12 relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto mb-8 px-5 md:px-20 text-center">
            <span className="font-label-md text-xs text-[#ffd862] uppercase tracking-[0.25em] block mb-2">
              Mill Collaborations
            </span>
            <h2 className="font-headline-lg text-xl md:text-2xl text-primary uppercase tracking-wide">
              Global Smelting Partners
            </h2>
            <div className="w-12 h-[2px] bg-[#ffd862] mx-auto mt-2" />
          </div>

          <div className="w-full overflow-hidden relative py-6 bg-bg/30 border-y border-[#444748]/10">
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-bg via-bg/40 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-bg via-bg/40 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex gap-24 items-center">
              {PARTNERS.map((partner, idx) => (
                <div key={`loop1-${idx}`} className="flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110">
                  {partner.logo}
                </div>
              ))}
              {PARTNERS.map((partner, idx) => (
                <div key={`loop2-${idx}`} className="flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110">
                  {partner.logo}
                </div>
              ))}
              {PARTNERS.map((partner, idx) => (
                <div key={`loop3-${idx}`} className="flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110">
                  {partner.logo}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── PROJECT DETAIL MODAL ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#12141a] border border-[#ffd862]/40 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative text-ivory overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/60 text-ivory hover:text-[#ffd862] rounded-full backdrop-blur-md border border-white/20 transition-colors"
                aria-label="Close detail modal"
              >
                <HiX className="text-xl" />
              </button>

              {/* Header Image */}
              <div className="relative h-64 w-full">
                <img
                  src={selectedProject.src}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141a] via-[#12141a]/40 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="font-label-sm text-[10px] font-bold text-[#ffd862] uppercase tracking-widest bg-black/60 px-3 py-1 rounded border border-[#ffd862]/30">
                      {selectedProject.sector}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display uppercase font-bold text-white mt-2">
                      {selectedProject.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Body Info */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-steel uppercase tracking-wider flex items-center gap-1 mb-1">
                      <HiOutlineMapPin className="text-[#ffd862]" /> Location
                    </span>
                    <strong className="text-xs text-white">{selectedProject.location}</strong>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] text-steel uppercase tracking-wider flex items-center gap-1 mb-1">
                      <HiOutlineCalendar className="text-[#ffd862]" /> Year
                    </span>
                    <strong className="text-xs text-white">{selectedProject.year}</strong>
                  </div>

                  <div className="flex flex-col col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-steel uppercase tracking-wider flex items-center gap-1 mb-1">
                      <HiOutlineUserGroup className="text-[#ffd862]" /> Client / Subcontractor
                    </span>
                    <strong className="text-xs text-[#ffd862] font-bold">{selectedProject.subcontractor}</strong>
                  </div>
                </div>

                <div className="border-l-2 border-[#ffd862] pl-4">
                  <span className="text-[10px] text-steel uppercase tracking-wider flex items-center gap-1 mb-1">
                    <HiOutlineCube className="text-[#ffd862]" /> Material Supplied
                  </span>
                  <p className="text-sm font-semibold text-white">{selectedProject.material}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#ffd862] uppercase tracking-wider mb-2">
                    Project Scope & Overview
                  </h4>
                  <p className="text-steel text-sm leading-relaxed mb-3">{selectedProject.description}</p>
                  <p className="text-zinc-400 text-xs leading-relaxed italic">{selectedProject.details}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="bg-[#ffd862] text-[#131313] font-bold uppercase tracking-wider text-xs px-6 py-2.5 rounded hover:bg-white transition-colors"
                  >
                    Close Project Info
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
