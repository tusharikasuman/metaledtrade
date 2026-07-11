import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Globe3D } from "../components/ui/3d-globe";

const GLOBE_MARKERS = [
  { lat: 25.2048, lng: 55.2708, src: "https://assets.aceternity.com/avatars/10.webp", label: "Dubai (HQ)" },
  { lat: 25.2854, lng: 51.531,  src: "https://assets.aceternity.com/avatars/1.webp",  label: "Doha, Qatar" },
  { lat: 24.4539, lng: 54.3773, src: "https://assets.aceternity.com/avatars/2.webp",  label: "Abu Dhabi" },
  { lat: 31.2304, lng: 121.4737, src: "https://assets.aceternity.com/avatars/9.webp", label: "Shanghai" },
  { lat: 19.076,  lng: 72.8777, src: "https://assets.aceternity.com/avatars/6.webp",  label: "Mumbai" },
  { lat: -26.2041, lng: 28.0473, src: "https://assets.aceternity.com/avatars/5.webp", label: "Johannesburg" },
  { lat: 1.3521,  lng: 103.8198, src: "https://assets.aceternity.com/avatars/12.webp", label: "Singapore" },
  { lat: 10.8231, lng: 106.6297, src: "https://assets.aceternity.com/avatars/13.webp", label: "Ho Chi Minh" },
];

// Local assets for mock photos grid
import heroBg from "../assets/projects/hero_projects.jpg";
import heroBgLight from "../assets/projects/hero_projects_light.jpg";
import downtownDubai from "../assets/projects/downtown_dubai.jpg";
import dubaiSouth from "../assets/projects/dubai_south.jpg";
import jebelAli from "../assets/projects/jebel_ali.jpg";
import businessBay from "../assets/projects/business_bay.jpg";
import futureDistrict from "../assets/projects/future_district.jpg";

const PROJECTS = [
  {
    id: "01",
    location: "DOWNTOWN DUBAI",
    title: "Iconic Spire Reinforcement",
    material: "AISI 316 Stainless",
    date: "Completed 2022",
    image: downtownDubai,
    span: "md:col-span-8",
  },
  {
    id: "02",
    location: "DUBAI SOUTH",
    title: "Logistics Hub Framework",
    material: "S355 Structural",
    date: "Completed 2023",
    image: dubaiSouth,
    span: "md:col-span-4",
  },
  {
    id: "03",
    location: "JEBEL ALI FREE ZONE",
    title: "Petrochemical Storage Grid",
    material: "High-grade Alloys",
    date: "Completed 2023",
    image: jebelAli,
    span: "md:col-span-12",
    isWide: true,
  },
  {
    id: "04",
    location: "BUSINESS BAY",
    title: "Prime Tower Cladding",
    material: "Alloy Cladding",
    date: "Completed 2021",
    image: businessBay,
    span: "md:col-span-6",
  },
  {
    id: "05",
    location: "FUTURE DISTRICT",
    title: "Metro Extension Support",
    material: "Brushed Aluminum & Steel",
    date: "Completed 2024",
    image: futureDistrict,
    span: "md:col-span-6",
  },
];

const LANDMARK_PROJECTS = [
  { id: "01", name: "OAPCO", sector: "ENERGY", isGold: true },
  { id: "02", name: "Dubai World Central Airport", sector: "AVIATION", isGold: false },
  { id: "03", name: "The Pearl Qatar", sector: "RESIDENTIAL", isGold: true },
  { id: "04", name: "Palm Jumeirah", sector: "WATERFRONT", isGold: false },
  { id: "05", name: "Yas Island", sector: "COMMERCIAL", isGold: true },
  { id: "06", name: "JAFZA", sector: "INDUSTRIAL", isGold: false },
  { id: "07", name: "Khalifa Port", sector: "LOGISTICS", isGold: true },
  { id: "08", name: "Dubai Metro", sector: "TRANSIT", isGold: false },
  { id: "09", name: "Dubai International Airport", sector: "AVIATION", isGold: true },
  { id: "10", name: "Fujairah Oil & Gas Terminal", sector: "REFINERY", isGold: false }
];

const PARTNERS = [
  {
    name: "Jindal Steel Works",
    logo: (
      <svg className="w-24 h-24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Red swoosh */}
        <path d="M 12 18 C 24 11, 40 11, 52 18 C 40 14, 24 14, 12 18 Z" fill="#ED1C24" />
        {/* JSW bold blue lettering */}
        <text x="32" y="44" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="20" fill="#2744A0" textAnchor="middle" letterSpacing="1">JSW</text>
        {/* Subtext */}
        <text x="32" y="54" fontFamily="'Inter', sans-serif" fontWeight="500" fontSize="7" fill="#8e9192" textAnchor="middle" letterSpacing="0.5">STEEL</text>
      </svg>
    )
  },
  {
    name: "Shagang Steel",
    logo: (
      <svg className="w-24 h-24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Blue outer circle */}
        <circle cx="32" cy="28" r="20" stroke="#1E40AF" strokeWidth="2.5" fill="none" />
        {/* Red steel ladle shape in center */}
        <path d="M 22 22 L 42 22 L 38 36 L 26 36 Z" fill="#ED1C24" />
        {/* Gold wave flowing across */}
        <path d="M 16 28 C 24 22, 28 34, 38 28 S 44 22, 48 28" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
        {/* Text */}
        <text x="32" y="56" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="8" fill="#dcdcdc" textAnchor="middle" letterSpacing="0.8">SHAGANG</text>
      </svg>
    )
  },
  {
    name: "HAOSEN Steel",
    logo: (
      <svg className="w-24 h-24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Yellow Lotus Petals (Hoa Sen logo) */}
        <path d="M32 10C32 10 36 18 36 24C36 30 32 34 32 34C32 34 28 30 28 24C28 18 32 10 32 10Z" fill="#F59E0B" />
        <path d="M32 20C24 22 18 30 22 34C26 38 32 34 32 34C32 34 38 34 42 34C46 30 40 22 32 20Z" fill="#F59E0B" opacity="0.9" />
        <path d="M22 26C16 30 16 38 24 38C32 38 32 34 32 34C32 34 32 38 40 38C48 38 48 30 42 26" fill="#D97706" opacity="0.8" />
        {/* Red-Brown Base */}
        <path d="M 16 40 L 48 40 L 40 44 L 24 44 Z" fill="#7F1D1D" />
        {/* Text HOA SEN */}
        <text x="32" y="54" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="7.5" fill="#7F1D1D" textAnchor="middle" letterSpacing="1.2">HOA SEN</text>
      </svg>
    )
  },
  {
    name: "TAYNAM Steel",
    logo: (
      <svg className="w-24 h-24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Red/Gold diagonal coils or wave lines */}
        <path d="M12 24 C 22 14, 28 34, 38 24 S 48 14, 52 24" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M12 30 C 22 20, 28 40, 38 30 S 48 20, 52 30" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        {/* Text TAYNAM */}
        <text x="32" y="48" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="8.5" fill="#DC2626" textAnchor="middle" letterSpacing="1">TAYNAM</text>
        <text x="32" y="56" fontFamily="'Inter', sans-serif" fontWeight="500" fontSize="6.5" fill="#8e9192" textAnchor="middle" letterSpacing="0.5">STEEL</text>
      </svg>
    )
  },
  {
    name: "RHINO Steel",
    logo: (
      <svg className="w-24 h-24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Slate shield */}
        <path d="M 16 12 L 48 12 C 48 30, 32 44, 32 44 C 32 44, 16 30, 16 12 Z" fill="#374151" stroke="#4B5563" strokeWidth="1.5" />
        {/* Rhino horn in orange */}
        <path d="M 28 20 L 36 20 L 40 28 L 32 26 Z" fill="#F97316" />
        <path d="M 36 20 L 42 14 L 40 28 Z" fill="#EA580C" />
        {/* Rhino shield details */}
        <line x1="20" y1="16" x2="44" y2="16" stroke="#9CA3AF" strokeWidth="1" />
        {/* Text */}
        <text x="32" y="54" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="8" fill="#F97316" textAnchor="middle" letterSpacing="1">RHINO STEEL</text>
      </svg>
    )
  }
];

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [themeMode, setThemeMode] = useState(
    document.documentElement.classList.contains("light") ? "light" : "dark"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleThemeChange = () => {
      setThemeMode(
        document.documentElement.classList.contains("light") ? "light" : "dark"
      );
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
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[65vh] flex flex-col justify-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center opacity-70 transition-all duration-1000"
              style={{ backgroundImage: `url(${themeMode === "light" ? heroBgLight : heroBg})` }}
            />
            <div className={`absolute inset-0 ${
              themeMode === "light" 
                ? "bg-gradient-to-t from-bg via-bg/40 to-transparent" 
                : "bg-gradient-to-t from-bg via-bg/55 to-transparent"
            }`} />
          </div>
          
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-20 pb-12">
            <div className="max-w-2xl">
              <p className="font-label-md text-xs md:text-sm text-[#ffd862] mb-3 uppercase tracking-[0.25em]">
                Global Portfolio
              </p>
              <h1 className="font-display-lg text-4xl sm:text-5xl md:text-7xl text-[#dcdcdc] leading-[1.1] mb-4 uppercase">
                Architectural <br />
                Integrity
              </h1>
              <p className="font-body-lg text-sm md:text-base text-[#c4c7c7] leading-relaxed">
                Forging the backbone of the world&apos;s most ambitious skylines with premium industrial alloys and structural precision.
              </p>
            </div>
          </div>
        </section>

        {/* Project Grid (Mock Photos Case Studies) */}
        <section className="px-5 md:px-20 py-16 max-w-[1440px] mx-auto">
          <div className="text-left mb-12">
            <span className="font-label-md text-xs text-[#ffd862] uppercase tracking-widest block mb-2">Featured Case Studies</span>
            <h2 className="font-headline-lg text-2xl md:text-4xl text-[#dcdcdc] uppercase">Infrastructure Showcases</h2>
            <div className="w-12 h-[2px] bg-[#ffd862] mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {PROJECTS.map((project, idx) => {
              const isThird = project.isWide;
              const isCol4 = project.span.includes("col-span-4");
              return (
                <motion.div
                  key={project.id}
                  className={`group relative overflow-hidden bg-[#1f2020] border border-[#444748]/40 rounded-lg shadow-xl cursor-pointer ${
                    project.span
                  } ${isThird ? "h-[400px]" : "h-[500px]"}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  
                  {isThird ? (
                    <>
                      <div className="absolute inset-0 bg-bg/40 group-hover:bg-[#ffd862]/10 transition-colors duration-500" />
                      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm">
                        <p className="font-label-md text-xs text-[#ffd862] mb-3 uppercase tracking-widest">
                          {project.location}
                        </p>
                        <h3 className="font-display-lg text-2xl sm:text-3xl md:text-4xl text-[#dcdcdc] mb-4 uppercase">
                          {project.title}
                        </h3>
                        <button className="bg-[#ffd862] text-[#131313] px-6 py-2.5 font-bold uppercase tracking-wider text-xs hover:opacity-90 transition-all cursor-pointer">
                          View Case Study
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent" />
                      {project.material && (
                        <div className="absolute top-4 right-4 z-20">
                          <span className="font-label-sm text-[10px] bg-bg/80 text-[#ffd862] border border-[#ffd862]/40 px-3 py-1 uppercase rounded-sm">
                            {project.material}
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="font-label-md text-xs text-[#ffd862] mb-2">
                          {project.id} / {project.location}
                        </p>
                        <h3 className={`text-[#dcdcdc] mb-2 uppercase ${isCol4 ? "font-headline-md text-lg md:text-xl" : "font-headline-lg text-xl md:text-2xl"}`}>
                          {project.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-[10px] text-[#c4c7c7] uppercase tracking-wider">
                            {project.date}
                          </span>
                          <span className="material-symbols-outlined text-[#ffd862] opacity-0 group-hover:opacity-100 transition-opacity text-lg">
                            arrow_forward
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Separator / Brand Text banner */}
        <section className="bg-[#0e0e0e] border-y border-[#444748]/20 py-8 overflow-hidden select-none">
          <div className="flex whitespace-nowrap gap-20 items-center justify-center animate-pulse">
            <span className="font-display-lg text-xl md:text-3xl font-extrabold text-[#ffd862]/30 uppercase tracking-widest">LANDMARK STEEL SOLUTIONS</span>
            <span className="text-[#ffd862]/30 text-2xl">•</span>
            <span className="font-display-lg text-xl md:text-3xl font-extrabold text-[#ffd862]/30 uppercase tracking-widest">CERTIFIED QUALITY ASSURED</span>
            <span className="text-[#ffd862]/30 text-2xl">•</span>
            <span className="font-display-lg text-xl md:text-3xl font-extrabold text-[#ffd862]/30 uppercase tracking-widest">GLOBAL SMELTING NETWORK</span>
          </div>
        </section>

        <section className="bg-[#0a0a0a] border-y border-[#444748]/20 py-24 relative overflow-hidden select-none">
          <div className="max-w-[1440px] mx-auto px-5 md:px-20 text-center relative z-10 mb-12">
            <span className="font-label-md text-xs text-[#ffd862] uppercase tracking-[0.25em] block mb-2">Global Operations</span>
            <h2 className="font-headline-lg text-3xl md:text-5xl text-[#dcdcdc] uppercase tracking-wide">Worldwide Supply Chain</h2>
          </div>
          
          <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
            <Globe3D
              markers={GLOBE_MARKERS}
              config={{ bumpScale: 3, autoRotateSpeed: 0.4, showAtmosphere: false }}
              onMarkerClick={(m) => console.log(m.label)}
            />
          </div>
        </section>

        {/* OPTION 2: SIDE-BY-SIDE TYPOGRAPHIC LANDMARK INDEX */}
        <section className="px-5 md:px-20 py-24 max-w-[1440px] mx-auto border-t border-[#444748]/10">
          <div className="text-left mb-16 max-w-2xl">
            <span className="font-label-md text-xs text-[#ffd862] uppercase tracking-[0.25em] block mb-2">Portfolio</span>
            <h2 className="font-headline-lg text-2xl md:text-4xl text-[#dcdcdc] uppercase tracking-wide">Key Regional Footprints</h2>
            <div className="w-12 h-[2px] bg-[#ffd862] mt-3 mb-4" />
            <p className="font-body-md text-sm text-[#c4c7c7] leading-relaxed">
              MetalEd Trade has supplied certified steel and custom metal alloys to some of the most iconic developments across the region.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div style={{ width: '100%', maxWidth: '550px', position: 'relative' }}>
              <Globe3D
                markers={GLOBE_MARKERS}
                config={{ bumpScale: 3, autoRotateSpeed: 0.4, showAtmosphere: false }}
                onMarkerClick={(m) => console.log(m.label)}
              />
            </div>

            {/* List Column */}
            <div className="w-full lg:w-1/2">
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-12"
                onMouseLeave={() => setHoveredIndex(null)}
              >
            {LANDMARK_PROJECTS.map((project, idx) => {
              const isHovered = hoveredIndex === idx;
              const isAnyHovered = hoveredIndex !== null;
              
              return (
                <div
                  key={project.id}
                  className="relative group cursor-pointer py-4 transition-all duration-500"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  style={{
                    opacity: isAnyHovered ? (isHovered ? 1 : 0.25) : 0.8,
                    transform: isHovered ? "translateX(8px)" : "translateX(0px)"
                  }}
                >
                  {/* Spotlight glow behind hovered item */}
                  {isHovered && (
                    <motion.div 
                      layoutId="spotlightGlow"
                      className="absolute -inset-x-4 -inset-y-2 bg-[#ffd862]/3 rounded-lg blur-lg z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="relative z-10 flex flex-col gap-2">
                    {/* Index & Category tag */}
                    <div className="flex items-center gap-2">
                      <span className="font-label-sm text-[10px] text-[#ffd862] font-semibold tracking-widest">{project.id}</span>
                      <span className="w-4 h-[1px] bg-[#ffd862]/40" />
                      <span className="font-label-sm text-[9px] text-[#8e9192] uppercase tracking-wider">{project.sector}</span>
                    </div>

                    {/* Project Name */}
                    <h3 className="font-display-lg text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-white group-hover:text-[#ffd862] transition-colors duration-300">
                      {project.name}
                    </h3>

                    {/* Bottom Line */}
                    <div className="w-full h-[1px] bg-[#444748]/20 mt-2 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[#ffd862] -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              );
            })}
              </div>
            </div>
          </div>
        </section>

        {/* Customized Orders Reach Us banner (matching screenshot CTA) */}
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
        <section className="bg-[#1b1c1c] border-y border-[#444748]/30 py-12 relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto mb-8 px-5 md:px-20 text-center">
            <span className="font-label-md text-xs text-[#ffd862] uppercase tracking-[0.25em] block mb-2">
              Mill Collaborations
            </span>
            <h2 className="font-headline-lg text-xl md:text-2xl text-[#dcdcdc] uppercase tracking-wide">
              Global Smelting Partners
            </h2>
            <div className="w-12 h-[2px] bg-[#ffd862] mx-auto mt-2" />
          </div>

          {/* Marquee Row */}
          <div className="w-full overflow-hidden relative py-6 bg-bg/30 border-y border-[#444748]/10">
            {/* Left/Right fading masks */}
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-bg via-bg/40 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-bg via-bg/40 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex gap-24 items-center">
              {/* Loop of pure logos */}
              {PARTNERS.map((partner, idx) => (
                <div key={`loop1-${idx}`} className="flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110">
                  {partner.logo}
                </div>
              ))}
              {/* Loop of pure logos for seamless cycle */}
              {PARTNERS.map((partner, idx) => (
                <div key={`loop2-${idx}`} className="flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110">
                  {partner.logo}
                </div>
              ))}
              {/* Loop of pure logos for extreme wide screens */}
              {PARTNERS.map((partner, idx) => (
                <div key={`loop3-${idx}`} className="flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110">
                  {partner.logo}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
