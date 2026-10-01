import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaYoutube, FaWeixin, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { PinContainer } from "./ui/3d-pin";

const LINK = "block text-[#c4c7c7] hover:text-white transition-colors duration-200";

const PLATFORM_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

// Materials shown in our projects, linked to the matching product on /products.
const productLink = (category, product) =>
  `/products?category=${category}&product=${encodeURIComponent(product)}`;
const MATERIAL_LINKS = [
  { label: "Hot Rolled Plates", to: productLink("flat", "Hot Rolled Steel Plates / Sheets") },
  { label: "High Tensile & Offshore Plates", to: productLink("flat", "Steel Plates: High Tensile & Offshore Quality") },
  { label: "Galvanised & Coated Coils", to: productLink("flat", "Galvanized Coils") },
  { label: "Structural Beams", to: productLink("long", "Hot Rolled I-Beams") },
  { label: "Seamless Steel Pipes", to: productLink("long", "Seamless Steel Pipes") },
];

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#0a0a0c] text-[#e4e2e1] pt-24 pb-8 border-t border-[#444748]/20 relative overflow-hidden mt-20">
      {/* Molten Steel Ambient Glows */}
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-[#ffd862]/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="px-5 md:px-20 max-w-[1440px] mx-auto relative z-10">

        {/* Site-wide quote CTA */}
        <div className="relative overflow-hidden rounded-sm border border-[#e9c349]/20 bg-gradient-to-br from-[#16171b] to-[#0e0f12] px-8 py-12 md:px-14 md:py-14 mb-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none bg-[#e9c349]" />
          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] block mb-3 text-[#e9c349]">Customised orders</span>
            <h2 className="font-display text-2xl md:text-4xl font-semibold text-white uppercase leading-tight max-w-xl">
              Supplying a project of your own?
            </h2>
          </div>
          <Link
            to="/contact"
            className="relative shrink-0 inline-flex items-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#131313] bg-[#e9c349] hover:bg-white transition-all duration-300 hover:gap-5"
          >
            Request a Quote
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Middle Section: Links Grid & Newsletter Sign-up */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 items-start">

          {/* Brand Column & Newsletter */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full gap-8">
            <div className="max-w-md">
              <h2 className="font-display-lg text-3xl font-black text-white uppercase tracking-wider mb-4">
                METALED <span className="text-[#ffd862]">TRADE FZCO</span>
              </h2>
              <p className="font-body-md text-sm text-[#c4c7c7] leading-relaxed mb-6 font-light">
                Delivering structural steel, heavy plates, and high-performance alloys, certified to ASTM, EN and BS standards with full mill test certificates, to landmark infrastructure developments across the Middle East, Southeast Asia and Africa.
              </p>
            </div>

            {/* Social Icons Stack */}
            <div className="flex gap-4 items-center">
              <a
                href="#linkedin"
                aria-label="Metaled Trade FZCO on LinkedIn"
                className="w-10 h-10 rounded-full bg-[#141517] border border-[#2a2c35]/40 flex items-center justify-center text-[#8e9192] hover:text-[#ffd862] hover:border-[#ffd862]/30 hover:scale-110 transition-all duration-300"
              >
                <FaLinkedin className="text-base" />
              </a>
              <a
                href="https://www.facebook.com/steel4all/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Metaled Trade FZCO on Facebook"
                className="w-10 h-10 rounded-full bg-[#141517] border border-[#2a2c35]/40 flex items-center justify-center text-[#8e9192] hover:text-[#ffd862] hover:border-[#ffd862]/30 hover:scale-110 transition-all duration-300"
              >
                <FaFacebook className="text-base" />
              </a>
              <a
                href="#youtube"
                aria-label="Metaled Trade FZCO on YouTube"
                className="w-10 h-10 rounded-full bg-[#141517] border border-[#2a2c35]/40 flex items-center justify-center text-[#8e9192] hover:text-[#ffd862] hover:border-[#ffd862]/30 hover:scale-110 transition-all duration-300"
              >
                <FaYoutube className="text-base" />
              </a>
              <a
                href="#wechat"
                aria-label="Metaled Trade FZCO on WeChat"
                className="w-10 h-10 rounded-full bg-[#141517] border border-[#2a2c35]/40 flex items-center justify-center text-[#8e9192] hover:text-[#ffd862] hover:border-[#ffd862]/30 hover:scale-110 transition-all duration-300"
              >
                <FaWeixin className="text-base" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div>
              <h4 className="font-label-md text-xs text-[#ffd862] uppercase tracking-[0.2em] mb-6">
                Platform
              </h4>
              <ul className="flex flex-col gap-4 text-sm font-light">
                {PLATFORM_LINKS.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className={LINK}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="font-label-md text-xs text-[#ffd862] uppercase tracking-[0.2em] mb-6">
                Materials
              </h4>
              <ul className="flex flex-col gap-4 text-sm font-light">
                {MATERIAL_LINKS.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className={LINK}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 (Contact desk info) */}
            <div className="col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-[#444748]/20 pt-8 md:pt-0 md:pl-8 flex flex-col justify-between">
              <div>
                <h4 className="font-label-md text-xs text-[#ffd862] uppercase tracking-[0.2em] mb-6">
                  Direct Desk
                </h4>

                <PinContainer title="Dubai Headquarters" href="https://maps.google.com/?q=Gemplex+Building+3,+DMCC,+Jumeirah+Lakes+Towers,+Dubai">
                  <div className="flex flex-col bg-[#141517]/80 border border-[#2a2c35]/40 rounded-xl p-6 shadow-lg backdrop-blur-sm transition-colors duration-300 hover:border-[#ffd862]/20 w-full max-w-[280px]">
                    <span className="font-body-md text-[10px] text-[#8e9192] uppercase tracking-widest mb-3 block">Headquarters</span>
                    <p className="font-body-md text-sm text-white font-light leading-relaxed">
                      Office #403, Building 3, Gemplex<br />
                      Jumeirah Lakes Towers,<br />
                      DMCC Free Zone, Dubai, UAE
                    </p>
                    <span className="text-[10px] font-mono text-[#ffd862] mt-4 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">location_on</span>
                      Open in Maps
                    </span>
                  </div>
                </PinContainer>
              </div>

              <div className="mt-8">
                <p className="font-body-md text-xs text-[#8e9192] uppercase tracking-wider mb-2">EMAIL ENQUIRIES</p>
                <a href="mailto:indronil@metaledtrade.com" className="font-mono text-sm text-[#ffd862] hover:text-white transition-colors block mb-4">
                  indronil@metaledtrade.com
                </a>
                <dl className="flex flex-col gap-2 text-sm">
                  <div className="flex items-baseline gap-3">
                    <dt className="w-16 shrink-0 text-xs text-[#8e9192] uppercase tracking-wider">Office</dt>
                    <dd><a href="tel:+97144412782" className="font-mono text-[#ffd862] hover:text-white transition-colors">+971 4 441 2782</a></dd>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <dt className="w-16 shrink-0 text-xs text-[#8e9192] uppercase tracking-wider">Mobile</dt>
                    <dd><a href="tel:+971542178600" className="font-mono text-[#ffd862] hover:text-white transition-colors">+971 54 217 8600</a></dd>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <dt className="w-16 shrink-0 text-xs text-[#8e9192] uppercase tracking-wider">WhatsApp</dt>
                    <dd>
                      <a href="https://wa.me/971542178600" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[#ffd862] hover:text-white transition-colors">
                        <FaWhatsapp className="text-sm" /> +971 54 217 8600
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

        </div>

        {/* Giant Watermark Logo - Kinetic Cursor Hover Effect */}
        <div className="relative select-none border-t border-[#444748]/15 pt-12 mb-12 group overflow-hidden">
          <h2 className="font-display-lg text-[64px] sm:text-[100px] md:text-[150px] lg:text-[190px] font-black text-center uppercase tracking-tighter leading-none text-outline-variant/30 group-hover:text-[#ffd862]/5 transition-all duration-1000">
            METALED
          </h2>
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffd862]/30 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-700" />
        </div>

        {/* Bottom Row: Copyright & Legal Links & Back To Top */}
        <div className="border-t border-[#444748]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-label-sm text-[11px] text-[#64748b] font-light tracking-wide order-3 md:order-1">
            © {new Date().getFullYear()} Metaled Trade FZCO. All rights reserved. Registered in Dubai, UAE.
          </p>

          <div className="flex flex-wrap justify-center gap-6 font-label-sm text-[11px] text-[#64748b] order-2">
            <a href="#patents" className="hover:text-white transition-colors">Patents</a>
            <span className="opacity-30">•</span>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="opacity-30">•</span>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Trade</a>
          </div>

          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-2 text-xs font-label-md text-[#ffd862] hover:text-white hover:scale-105 transition-all duration-300 uppercase tracking-widest font-bold cursor-pointer order-1 md:order-3 bg-[#141517] border border-[#2a2c35]/40 rounded-full px-5 py-2"
          >
            Back to Top
            <span className="material-symbols-outlined text-sm font-bold">arrow_upward</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
