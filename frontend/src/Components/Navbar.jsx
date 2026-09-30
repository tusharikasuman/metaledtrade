import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/metaled-logo.png";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products", dropdown: true },
  { label: "Projects", href: "/projects" },
  { label: "Careers", href: "/careers" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("light");
    localStorage.setItem("theme", "light");

    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed, full-width bar — always present, solidifies on scroll */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-bg-alt/95 backdrop-blur-xl border-b border-[#ffd862]/15 shadow-[0_4px_30px_-6px_rgba(0,0,0,0.25)] py-2.5"
            : "bg-black/30 backdrop-blur-md border-b border-white/5 py-4"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between gap-6">
          <Link to="/" className="shrink-0 flex items-center">
            <img
              src={logo}
              alt="Metaled Trade FZCO"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href, dropdown }) => (
              <Link
                key={label}
                to={href}
                className={`relative flex items-center gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 whitespace-nowrap after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1.5 after:h-px after:bg-gold after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                  isScrolled ? "text-ivory/80 hover:text-ivory" : "text-white/90 hover:text-white"
                }`}
              >
                {label}
                {dropdown && <HiChevronDown className="text-[10px]" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-1 rounded-full bg-gold text-[#131313] text-[0.68rem] font-bold uppercase tracking-[0.12em] px-5 py-2.5 hover:bg-white transition-colors duration-300 whitespace-nowrap"
            >
              Contact Us
            </Link>

            <button
              className={`md:hidden text-2xl transition-colors cursor-pointer ${
                isScrolled ? "text-ivory" : "text-white"
              }`}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <HiMenu />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-bg-alt/97 backdrop-blur-xl flex flex-col items-start p-10 gap-2 justify-center"
          >
            <button
              className="absolute top-6 right-6 text-2xl text-ivory hover:text-gold transition-colors cursor-pointer"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <HiX />
            </button>

            <span className="text-[0.68rem] font-semibold tracking-[0.3em] uppercase text-gold mb-6">
              Navigate
            </span>

            {[...NAV_LINKS, { label: "Contact Us", href: "/contact" }].map(({ label, href, dropdown }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.08 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 py-2 text-2xl font-display font-medium uppercase tracking-wide text-ivory hover:text-gold transition-colors"
                >
                  {label}
                  {dropdown && <HiChevronDown className="text-sm" />}
                </Link>
              </motion.div>
            ))}

            <div className="w-10 h-px bg-gold/40 mt-8" />
            <span className="text-[0.68rem] tracking-[0.2em] uppercase text-steel mt-4">
              Metaled Trade FZCO &middot; Dubai
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
