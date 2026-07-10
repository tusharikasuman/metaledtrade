import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Subcomponent to display real-time clock and active desk status for global trade desks
const TradeDesk = ({ city, timezone }) => {
  const [time, setTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateTimeAndStatus = () => {
      // Get formatted time string
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(formatter.format(new Date()));

      // Calculate if the desk is currently within working hours (Mon-Fri, 08:00 - 18:00)
      const now = new Date();
      const localString = now.toLocaleString("en-US", { timeZone: timezone });
      const localDate = new Date(localString);
      const hours = localDate.getHours();
      const day = localDate.getDay(); // 0 is Sunday, 6 is Saturday

      const workingDays = day >= 1 && day <= 5;
      const workingHours = hours >= 8 && hours < 18;
      setIsOpen(workingDays && workingHours);
    };

    updateTimeAndStatus();
    const interval = setInterval(updateTimeAndStatus, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="flex items-center gap-4 bg-[#141517]/80 border border-[#2a2c35]/40 rounded-full px-5 py-2.5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-[#ffd862]/30 hover:shadow-[#ffd862]/2">
      <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
      <div className="flex flex-col text-left">
        <span className="font-label-md text-[10px] text-[#8e9192] uppercase tracking-wider">{city} Desk</span>
        <span className="font-mono text-xs md:text-sm text-white font-semibold">
          {time} <span className="text-[10px] text-[#8e9192] font-normal ml-1">{isOpen ? "ACTIVE" : "OFFLINE"}</span>
        </span>
      </div>
    </div>
  );
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

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
        
        {/* Top Section: Live Global Trading Desk Statuses */}
        <div className="mb-20 pb-12 border-b border-[#444748]/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <span className="font-label-md text-xs text-[#ffd862] uppercase tracking-[0.25em] block mb-1">
                Global Operations
              </span>
              <h3 className="font-headline-lg text-lg md:text-2xl text-white uppercase">
                Trade Desks Status Monitor
              </h3>
            </div>
            <div className="hidden md:block w-32 h-[1px] bg-[#444748]/30 flex-grow mx-8" />
            <span className="font-mono text-[10px] text-[#8e9192] uppercase tracking-wider">
              Realtime Synced UTC/Local
            </span>
          </div>

          {/* Grid of Global Clock Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <TradeDesk city="Dubai" timezone="Asia/Dubai" />
            <TradeDesk city="Mumbai" timezone="Asia/Kolkata" />
            <TradeDesk city="Shanghai" timezone="Asia/Shanghai" />
            <TradeDesk city="Houston" timezone="America/Chicago" />
          </div>
        </div>

        {/* Middle Section: Links Grid & Newsletter Sign-up */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 items-start">
          
          {/* Brand Column & Newsletter */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full gap-8">
            <div className="max-w-md">
              <h2 className="font-display-lg text-3xl font-black text-white uppercase tracking-wider mb-4">
                METALED <span className="text-[#ffd862]">TRADE</span>
              </h2>
              <p className="font-body-md text-sm text-[#c4c7c7] leading-relaxed mb-6 font-light">
                Delivering certified structural steel, heavy plates, and high-performance alloys to landmark infrastructure developments worldwide.
              </p>
              
              {/* Newsletter form */}
              <form onSubmit={handleSubscribe} className="relative mt-8 group">
                <label className="font-label-sm text-[10px] uppercase text-[#8e9192] tracking-wider block mb-2">
                  Subscribe to Metallurgy Insights
                </label>
                <div className="flex border-b border-[#444748]/60 focus-within:border-[#ffd862] transition-colors duration-300 pb-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your corporate email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-sm placeholder-[#64748b] text-white pr-4 font-body-md"
                  />
                  <button 
                    type="submit" 
                    className="text-[#ffd862] font-label-md text-xs font-bold uppercase tracking-wider hover:text-white transition-colors cursor-pointer"
                  >
                    {isSubscribed ? "SUBBED" : "JOIN"}
                  </button>
                </div>
              </form>
            </div>

            {/* Social Icons Stack */}
            <div className="flex gap-4 items-center">
              <a 
                href="#linkedin" 
                className="w-10 h-10 rounded-full bg-[#141517] border border-[#2a2c35]/40 flex items-center justify-center text-[#8e9192] hover:text-[#ffd862] hover:border-[#ffd862]/30 hover:scale-110 transition-all duration-300"
              >
                <span className="font-mono text-xs font-bold">In</span>
              </a>
              <a 
                href="#youtube" 
                className="w-10 h-10 rounded-full bg-[#141517] border border-[#2a2c35]/40 flex items-center justify-center text-[#8e9192] hover:text-[#ffd862] hover:border-[#ffd862]/30 hover:scale-110 transition-all duration-300"
              >
                <span className="font-mono text-xs font-bold">Yt</span>
              </a>
              <a 
                href="#wechat" 
                className="w-10 h-10 rounded-full bg-[#141517] border border-[#2a2c35]/40 flex items-center justify-center text-[#8e9192] hover:text-[#ffd862] hover:border-[#ffd862]/30 hover:scale-110 transition-all duration-300"
              >
                <span className="font-mono text-xs font-bold">Wc</span>
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
            <div className="col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-[#444748]/20 pt-8 md:pt-0 md:pl-8">
              <h4 className="font-label-md text-xs text-[#ffd862] uppercase tracking-[0.2em] mb-6">
                Direct Desk
              </h4>
              <p className="font-body-md text-xs text-[#8e9192] uppercase tracking-wider mb-2">HEADQUARTERS</p>
              <p className="font-body-md text-sm text-white mb-6 font-light leading-relaxed">
                Jumeirah Lakes Towers,<br />
                DMCC Free Zone,<br />
                Dubai, UAE
              </p>
              <p className="font-body-md text-xs text-[#8e9192] uppercase tracking-wider mb-2">EMAIL ENQUIRIES</p>
              <a href="mailto:trade@metaledtrade.com" className="font-mono text-sm text-[#ffd862] hover:text-white transition-colors block mb-4">
                trade@metaledtrade.com
              </a>
            </div>
          </div>

        </div>

        {/* Giant Watermark Logo - Kinetic Cursor Hover Effect */}
        <div className="relative select-none border-t border-[#444748]/15 pt-12 mb-12 group overflow-hidden">
          <h2 className="font-display-lg text-[64px] sm:text-[100px] md:text-[150px] lg:text-[190px] font-black text-center uppercase tracking-tighter leading-none text-[#1b1d24] group-hover:text-[#ffd862]/5 transition-all duration-1000">
            METALED
          </h2>
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffd862]/30 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-700" />
        </div>

        {/* Bottom Row: Copyright & Legal Links & Back To Top */}
        <div className="border-t border-[#444748]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-label-sm text-[11px] text-[#64748b] font-light tracking-wide order-3 md:order-1">
            © {new Date().getFullYear()} MetalEd Trade DMCC. All rights reserved. Registered in Dubai, UAE.
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
