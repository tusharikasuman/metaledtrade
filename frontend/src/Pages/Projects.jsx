import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Globe3D } from "../Components/ui/3d-globe";
import HeroVideoCrossfade from "../Components/HeroVideoCrossfade";
import { HiX } from "react-icons/hi";
import {
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlineCube,
  HiOutlineMapPin,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
} from "react-icons/hi2";

// Local assets for project photos
import neomImg from "../assets/projects/neom_hr_plates.jpg";
import oxyImg from "../assets/projects/oman_oxy_pipes.jpg";
import dhafraImg from "../assets/projects/al_dhafra_zam_coils.jpg";
import sudairImg from "../assets/projects/solar_pv_site.jpeg";
import shuaibahImg from "../assets/projects/al_shuaibah_trackers.jpg";
import oxyPipeRacks from "../assets/projects/oman_pipe_racks.jpg";
import animalShedImg from "../assets/projects/oman_animal_shed.jpeg";
import heroPoster from "../assets/projects/oman_animal_shed_poster.jpg";
import inspectFlatBars from "../assets/projects/inspection_flat_bars.jpeg";
import inspectMillVisit from "../assets/projects/inspection_mill_visit.jpeg";
import inspectBundleCheck from "../assets/projects/inspection_bundle_check.jpeg";

const EASE = [0.16, 1, 0.3, 1];
const DARK_GOLD = "#e9c349";

// ── Real Projects Data with Globe Pins & Full Details ────────────────────────
const FEATURED_PROJECTS = [
  {
    id: "01",
    lat: 28.003,
    lng: 35.228,
    latOffset: 6.9,
    lngOffset: -14.9,
    altitude: 1.1,
    name: "NEOM Project",
    country: "SAUDI ARABIA",
    location: "Tabuk / NEOM, KSA",
    year: "2024",
    subcontractor: "NEOM",
    material: "Hot Rolled Steel Plates",
    src: neomImg,
    sector: "INFRASTRUCTURE",
    description:
      "Heavy industrial structural steel and premium Hot Rolled Steel Plates supplied for the NEOM mega-city infrastructure project.",
    details:
      "2024 Year • NEOM • Material Supplied: Hot Rolled Steel Plates.",
    span: "md:col-span-8",
  },
  {
    id: "02",
    lat: 20.15,
    lng: 56.4,
    latOffset: -12.6,
    lngOffset: 9.3,
    altitude: 1.1,
    name: "Oman - Oxy Project",
    country: "OMAN",
    location: "Mukhaizna Field, Oman",
    year: "2022",
    subcontractor: "OXY",
    material: "Structural Alloys & Steel Piping",
    src: oxyPipeRacks,
    gallery: [oxyPipeRacks, oxyImg],
    sector: "OIL & GAS",
    description:
      "Certified structural steel alloys and specialized heavy steel plates supplied for Occidental Petroleum (OXY) onshore energy facilities in Oman.",
    details:
      "2022 Year • Subcontractor: OXY • Material Supplied: Structural Alloys & Steel Piping.",
    span: "md:col-span-4",
  },
  {
    id: "03",
    lat: 24.15,
    lng: 54.5,
    latOffset: 10.6,
    lngOffset: 13.7,
    altitude: 1.1,
    name: "Al Dhafra Solar PV",
    country: "UNITED ARAB EMIRATES",
    location: "30 km South of Abu Dhabi, UAE",
    year: "2023",
    subcontractor: "EWEC & MASDAR",
    material: "Zinc Aluminium Magnesium Coated Steel Coils",
    src: dhafraImg,
    sector: "SOLAR ENERGY",
    description:
      "Located 30 km south of Abu Dhabi, this is the largest single-site solar photovoltaic plant in the world, generating over 2 GW of clean energy and powering over 160,000 households.",
    details:
      "Subcontractor: EWEC and MASDAR • Material Supplied: Zinc Aluminium Magnesium Coated Steel Coils.",
    span: "md:col-span-4",
  },
  {
    id: "04",
    lat: 25.6,
    lng: 45.6,
    latOffset: 13.6,
    lngOffset: 0,
    altitude: 1.1,
    name: "Sudair Solar PV Plant",
    country: "SAUDI ARABIA",
    location: "Riyadh Province, KSA",
    year: "2023 - 2024",
    subcontractor: "PIF & ACWA POWER",
    material: "Zinc Aluminium Magnesium Coated Steel Coils",
    src: sudairImg,
    sector: "RENEWABLE ENERGY",
    description:
      "A 1,500 MW solar facility in Riyadh Province backed by Saudi Public Investment Fund (PIF) and ACWA Power providing power to roughly 185,000 homes.",
    details:
      "Subcontractor: PIF and ACWA Power • Material Supplied: Zinc Aluminium Magnesium Coated Steel Coils.",
    span: "md:col-span-8",
  },
  {
    id: "05",
    lat: 20.67,
    lng: 39.54,
    latOffset: -10.9,
    lngOffset: -10.3,
    altitude: 1.1,
    name: "Al-Shuaibah Projects",
    country: "SAUDI ARABIA",
    location: "South of Jeddah, KSA",
    year: "2024",
    subcontractor: "ACWA POWER & PIF",
    material: "Zinc Aluminium Magnesium Coated Steel Coils",
    src: shuaibahImg,
    sector: "RENEWABLE ENERGY",
    description:
      "A 2.6 GW capacity split across two sites south of Jeddah utilizing advanced bifacial modules.",
    details:
      "Subcontractor: ACWA Power and PIF • Material Supplied: Zinc Aluminium Magnesium Coated Steel Coils.",
    span: "md:col-span-4",
  },
  {
    id: "06",
    lat: 23.588,
    lng: 58.382,
    latOffset: -2.1,
    lngOffset: 16.5,
    altitude: 1.1,
    name: "Oman Animal Shed Project",
    country: "OMAN",
    location: "Sohar / Muscat Region, Oman",
    year: "2023",
    subcontractor: "AGRICULTURAL SECTOR",
    material: "Pre-Painted Galvanised Coils",
    src: animalShedImg,
    sector: "AGRICULTURE",
    description:
      "Pre-Painted Galvanised Coils (PPGI) supplied for animal shed roofing, livestock shelters, and agricultural infrastructure across Oman.",
    details:
      "Supplied for Animal Shed • Material Supplied: Pre-Painted Galvanised Coils (PPGI).",
    span: "md:col-span-8",
  },
];

// Our own photos from mill visits — pre-shipment inspection of material.
const INSPECTION_PHOTOS = [
  { src: inspectFlatBars, alt: "Inspecting bundled flat bars with the mill team", caption: "Checking bundled flat bars with the mill team" },
  { src: inspectBundleCheck, alt: "Verifying bundle markings and dimensions", caption: "Verifying bundle markings and dimensions" },
  { src: inspectMillVisit, alt: "Walking the rolling mill floor", caption: "On the rolling mill floor" },
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

// Photos for a project: its `gallery` if provided, otherwise the card image.
const projectPhotos = (project) => (project.gallery && project.gallery.length ? project.gallery : [project.src]);

function SectionHeading({ eyebrow, title, intro, center = false }) {
  return (
    <div className={`mb-10 md:mb-12 flex flex-col gap-4 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div>
        <span className="text-xs font-semibold text-gold uppercase tracking-[0.22em] block mb-3">{eyebrow}</span>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-ivory uppercase leading-[1.1]">{title}</h2>
        <div className={`w-12 h-0.5 bg-gold mt-5 ${center ? "mx-auto" : ""}`} />
      </div>
      {intro && <p className="text-steel text-sm md:text-base leading-relaxed max-w-md">{intro}</p>}
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const photos = projectPhotos(project);
  const [photoIdx, setPhotoIdx] = useState(0);
  const step = (dir) => setPhotoIdx((i) => (i + dir + photos.length) % photos.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (photos.length > 1 && e.key === "ArrowRight") step(1);
      if (photos.length > 1 && e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="bg-bg-alt rounded-sm shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-black/55 text-white hover:bg-black rounded-full backdrop-blur transition-colors"
          aria-label="Close"
        >
          <HiX className="text-lg" />
        </button>

        {/* Photos */}
        <div className="relative aspect-[16/9] bg-[#0b0b0c] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={photoIdx}
              src={photos[photoIdx]}
              alt={`${project.name}, photo ${photoIdx + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          {photos.length > 1 && (
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-black/55 backdrop-blur text-[11px] font-semibold text-white tabular-nums">
                {photoIdx + 1} / {photos.length}
              </span>
              <button onClick={() => step(-1)} aria-label="Previous photo" className="w-9 h-9 rounded-full bg-black/55 backdrop-blur text-white flex items-center justify-center hover:bg-black">
                <HiOutlineArrowLeft />
              </button>
              <button onClick={() => step(1)} aria-label="Next photo" className="w-9 h-9 rounded-full bg-black/55 backdrop-blur text-white flex items-center justify-center hover:bg-black">
                <HiOutlineArrowRight />
              </button>
            </div>
          )}
        </div>
        {photos.length > 1 && (
          <div className="flex gap-2 px-6 sm:px-8 pt-4 overflow-x-auto">
            {photos.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setPhotoIdx(i)}
                aria-label={`Show photo ${i + 1}`}
                className={`shrink-0 w-20 h-14 rounded-sm overflow-hidden ring-2 transition ${i === photoIdx ? "ring-gold" : "ring-transparent opacity-60 hover:opacity-100"}`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Details */}
        <div className="p-6 sm:p-8">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{project.sector}</span>
          <h3 className="font-display text-2xl sm:text-4xl font-semibold text-ivory uppercase leading-tight mt-2">{project.name}</h3>

          <dl className="mt-6 grid grid-cols-1 sm:grid-cols-3 border-y border-outline-variant divide-y sm:divide-y-0 sm:divide-x divide-outline-variant">
            {[
              { icon: HiOutlineMapPin, label: "Location", value: project.location },
              { icon: HiOutlineCalendar, label: "Year", value: project.year },
              { icon: HiOutlineUserGroup, label: "Client / Subcontractor", value: project.subcontractor },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="py-4 sm:px-5 first:sm:pl-0">
                <dt className="text-[11px] uppercase tracking-[0.16em] text-steel flex items-center gap-1.5 mb-1.5">
                  <Icon className="text-gold" /> {label}
                </dt>
                <dd className="text-sm font-semibold text-ivory">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 border-l-2 border-gold pl-4">
            <span className="text-[11px] uppercase tracking-[0.16em] text-steel flex items-center gap-1.5 mb-1">
              <HiOutlineCube className="text-gold" /> Material Supplied
            </span>
            <p className="text-base font-semibold text-ivory">{project.material}</p>
          </div>

          <p className="mt-6 text-on-surface-variant leading-relaxed">{project.description}</p>

          <div className="mt-8 pt-6 border-t border-outline-variant flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
            <button onClick={onClose} className="text-sm font-semibold text-steel hover:text-ivory transition-colors self-start">
              Close
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 bg-[#131313] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] hover:bg-gold transition-colors"
            >
              Request a Quote for similar supply
              <HiOutlineArrowRight />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const HERO_VIDEOS = ["/videos/oman-animal-shed.mp4", "/videos/solar-pv-flyover.mp4"];

// Globe opens facing the Gulf (most of our projects are in and around Saudi Arabia)
// and stays put; visitors can still drag to rotate.
const GLOBE_CONFIG = { bumpScale: 3, autoRotateSpeed: 0, showAtmosphere: false, focus: { lat: 24, lng: 47 } };
const HERO_LINES = [
  { text: "Steel for landmark", gold: false },
  { text: "projects", gold: true },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const heroCopyY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const heroCopyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    document.documentElement.classList.add("light");
  }, []);

  return (
    <div className="min-h-screen bg-bg text-ivory font-body overflow-x-hidden flex flex-col justify-between">
      <main className="flex-grow">
        {/* ── Hero: real project photo (Oman Animal Shed), cinematic treatment ── */}
        <section ref={heroRef} className="relative h-screen min-h-[620px] flex flex-col overflow-hidden bg-[#0b0b0c]">
          <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
            {/* Hero footage: Oman Animal Shed (PPGI roofing) → solar PV flyover, cycling */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.12, opacity: 0 }}
              animate={{ scale: 1.02, opacity: 1 }}
              transition={{ duration: 2.4, ease: EASE }}
            >
              <HeroVideoCrossfade
                sources={HERO_VIDEOS}
                poster={heroPoster}
                posterAlt="Aerial view of PPGI roofing on the Oman Animal Shed Project"
              />
            </motion.div>
          </motion.div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(90deg, rgba(9,10,12,0.88) 0%, rgba(9,10,12,0.55) 45%, rgba(9,10,12,0.15) 100%), linear-gradient(0deg, rgba(9,10,12,0.92) 0%, rgba(9,10,12,0.2) 45%, rgba(9,10,12,0.35) 100%)" }}
          />

          <motion.div
            className="relative z-10 flex-1 flex items-end w-full max-w-[1440px] mx-auto px-6 md:px-20 pt-32 pb-14 md:pb-20"
            style={{ y: heroCopyY, opacity: heroCopyOpacity }}
          >
            <div className="max-w-3xl">
              <h1 className="font-display text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold uppercase leading-[1.02] text-white">
                {HERO_LINES.map((line, i) => (
                  <span key={line.text} className="block overflow-hidden pb-[0.06em]">
                    <motion.span
                      className="block"
                      style={line.gold ? { color: DARK_GOLD } : undefined}
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1.1, delay: 0.5 + i * 0.14, ease: EASE }}
                    >
                      {line.text}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.div
                className="w-20 h-px my-7 origin-left"
                style={{ background: DARK_GOLD }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.1, ease: EASE }}
              />
            </div>
          </motion.div>

        </section>

        {/* ── Globe ── */}
        <section className="py-20 md:py-24 relative overflow-hidden select-none">
          <div style={{ width: "100%", maxWidth: "1050px", margin: "0 auto", position: "relative" }}>
            <Globe3D
              markers={FEATURED_PROJECTS}
              config={GLOBE_CONFIG}
              onMarkerClick={(marker) => setSelectedProject(marker)}
              isModalOpen={!!selectedProject}
            />
          </div>
        </section>

        {/* ── Project cards ── */}
        <section className="px-6 md:px-20 pb-20 md:pb-28 max-w-[1440px] mx-auto">
          <SectionHeading
            eyebrow="Portfolio"
            title="Featured projects"
            intro="Open any project for the client, location, year and the material we supplied."
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {FEATURED_PROJECTS.map((project, idx) => {
              const isNarrow = project.span.includes("col-span-4");
              return (
                <motion.button
                  type="button"
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative overflow-hidden rounded-sm text-left bg-[#0b0b0c] h-[440px] md:h-[480px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${project.span}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.8, delay: (idx % 2) * 0.1, ease: EASE }}
                >
                  <img
                    src={project.src}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/0" />

                  <span className="absolute top-5 left-5 md:top-6 md:left-6 text-xs font-semibold tracking-[0.2em] text-white/80 tabular-nums">
                    {project.id}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: DARK_GOLD }}>
                      {project.sector}
                    </span>
                    <h3 className={`font-display font-semibold text-white uppercase leading-tight ${isNarrow ? "text-2xl" : "text-2xl md:text-4xl"}`}>
                      {project.name}
                    </h3>
                    <p className="mt-3 text-sm text-zinc-300">
                      {project.material} · {project.year} · {project.location}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white border-b border-white/30 pb-1 group-hover:border-[#e9c349] group-hover:text-[#e9c349] transition-colors">
                      View project
                      <HiOutlineArrowRight className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* ── Inspection at the mill (own photos) ── */}
        <section className="bg-bg-alt border-y border-outline-variant py-20 md:py-28">
          <div className="px-6 md:px-20 max-w-[1440px] mx-auto">
            <SectionHeading
              eyebrow="On the ground"
              title="Inspected at the mill, before it ships"
              intro="We visit the mills we source from and check material in person, alongside independent third-party inspection."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INSPECTION_PHOTOS.map((photo, idx) => (
                <motion.figure
                  key={photo.caption}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: EASE }}
                >
                  <div className="relative h-[380px] md:h-[440px] overflow-hidden rounded-sm bg-surface-container shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)]">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-4 flex items-start gap-3">
                    <span className="text-xs font-semibold text-gold tabular-nums pt-0.5">0{idx + 1}</span>
                    <span className="text-sm text-on-surface-variant leading-relaxed">{photo.caption}</span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
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

      <AnimatePresence>
        {selectedProject && <ProjectModal key={selectedProject.id} project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </div>
  );
}
