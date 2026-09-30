import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaYoutube, FaWeixin, FaFacebook } from "react-icons/fa";
import { PinContainer } from "./ui/3d-pin";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#0a0a0c] text-[#e4e2e1] pt-24 pb-8 border-t border-[#444748]/20 relative overflow-hidden mt-20">
      {/* Molten Steel Ambient Glows */}
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-[#ffd862]/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-amber-600/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="px-5 md:px-20 max-w-[1440px] mx-auto relative z-10">

        {/* Middle Section: Links Grid & Newsletter Sign-up */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 items-start">

          {/* Brand Column & Newsletter */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full gap-8">
            <div className="max-w-md">
              <h2 className="font-display-lg text-3xl font-black text-white uppercase tracking-wider mb-4">
                METALED <span className="text-[#ffd862]">TRADE FZCO</span>
              </h2>
              <p className="font-body-md text-sm text-[#c4c7c7] leading-relaxed mb-6 font-light">
                Delivering structural steel, heavy plates, and high-performance alloys — certified to ASTM, EN and BS standards with full mill test certificates — to landmark infrastructure developments across the Middle East, Southeast Asia and Africa.
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
                href="#facebook"
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
              <ul className="flex flex-col gap-4 text-sm font-light text-[#c4c7c7]">
                <li>
                  <Link to="/" className="hover:text-white transition-colors hover:pl-1 transition-all duration-200 block">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors hover:pl-1 transition-all duration-200 block">About Us</Link>
                </li>
                <li>
                  <Link to="/products" className="hover:text-white transition-colors hover:pl-1 transition-all duration-200 block">Products</Link>
                </li>
                <li>
                  <Link to="/projects" className="hover:text-white transition-colors hover:pl-1 transition-all duration-200 block">Projects</Link>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="font-label-md text-xs text-[#ffd862] uppercase tracking-[0.2em] mb-6">
                Materials
              </h4>
              <ul className="flex flex-col gap-4 text-sm font-light text-[#c4c7c7]">
                <li>
                  <Link to="/products#structural" className="hover:text-white transition-colors hover:pl-1 transition-all duration-200 block">Structural Beams</Link>
                </li>
                <li>
                  <Link to="/products#heavy-plates" className="hover:text-white transition-colors hover:pl-1 transition-all duration-200 block">Corrosion Plates</Link>
                </li>
                <li>
                  <Link to="/products#pipes" className="hover:text-white transition-colors hover:pl-1 transition-all duration-200 block">Line Pipes</Link>
                </li>
                <li>
                  <Link to="/products#marine" className="hover:text-white transition-colors hover:pl-1 transition-all duration-200 block">Marine Alloys</Link>
                </li>
              </ul>
            </div>

            {/* Column 3 (Contact desk info) */}
            <div className="col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-[#444748]/20 pt-8 md:pt-0 md:pl-8 flex flex-col justify-between">
              <div>
                <h4 className="font-label-md text-xs text-[#ffd862] uppercase tracking-[0.2em] mb-6">
                  Direct Desk
                </h4>

                <PinContainer title="Dubai Headquarters" href="https://maps.google.com/?q=Jumeirah+Lakes+Towers,+DMCC+Free+Zone,+Dubai">
                  <div className="flex flex-col bg-[#141517]/80 border border-[#2a2c35]/40 rounded-xl p-6 shadow-lg backdrop-blur-sm transition-colors duration-300 hover:border-[#ffd862]/20 w-full max-w-[280px]">
                    <span className="font-body-md text-[10px] text-[#8e9192] uppercase tracking-widest mb-3 block">Headquarters</span>
                    <p className="font-body-md text-sm text-white font-light leading-relaxed">
                      Jumeirah Lakes Towers,<br />
                      DMCC Free Zone,<br />
                      Dubai, UAE
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
                <p className="font-body-md text-xs text-[#8e9192] uppercase tracking-wider mb-2">PHONE</p>
                <a href="tel:+97144412782" className="font-mono text-sm text-[#ffd862] hover:text-white transition-colors block">
                  +971 4 441 2782
                </a>
                <a href="tel:+971542178600" className="font-mono text-sm text-[#ffd862] hover:text-white transition-colors block">
                  +971 54 217 8600
                </a>
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
