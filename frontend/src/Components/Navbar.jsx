import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX, HiChevronDown, HiSun, HiMoon } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/metaled-logo.jpeg";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products", dropdown: true },
  { label: "Projects", href: "/projects" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLight, setIsLight] = useState(
    document.documentElement.classList.contains("light")
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
      setIsLight(true);
    } else {
      document.documentElement.classList.remove("light");
      setIsLight(false);
    }

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("light")) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setIsLight(false);
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setIsLight(true);
    }
    window.dispatchEvent(new Event("theme-change"));
  };

  const handleLinkClick = (e, to) => {
    setOpen(false);
    setIsExpanded(false);
    if (to === "#contact") {
      e.preventDefault();
      const footer = document.querySelector("footer");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const showFullNavbar = !isScrolled || isExpanded;

  return (
    <>
      {/* Click-away backdrop overlay when scrolled and manually expanded */}
      <AnimatePresence>
        {isScrolled && isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px] cursor-pointer"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile fullscreen menu overlay — separate from the floating header */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-bg-alt/95 backdrop-blur-md flex flex-col items-start p-10 gap-6"
          >
            <button
              className="absolute top-6 right-6 text-2xl text-ivory hover:text-gold transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <HiX />
            </button>
            {NAV_LINKS.map(({ label, href, dropdown }) =>
              href.startsWith("#") ? (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => handleLinkClick(e, href)}
                  className="flex items-center gap-1 text-lg font-medium hover:text-[#ffe088] text-ivory transition-colors"
                >
                  {label}
                  {dropdown && <HiChevronDown className="text-xs" />}
                </a>
              ) : (
                <Link
                  key={label}
                  to={href}
                  onClick={(e) => handleLinkClick(e, href)}
                  className="flex items-center gap-1 text-lg font-medium hover:text-[#ffe088] text-ivory transition-colors"
                >
                  {label}
                  {dropdown && <HiChevronDown className="text-xs" />}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showFullNavbar ? (
          <motion.header
            key="full-nav"
            initial={{ y: -80, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: -80, opacity: 0, x: "-50%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 z-50 bg-bg-alt/85 backdrop-blur-md border border-outline-variant/30 rounded-full py-1.5 px-4 shadow-xl flex items-center gap-3 w-auto"
            style={{ left: "50%" }}
          >
            {/* Logo */}
            <Link to="/" className="shrink-0" onClick={() => setIsExpanded(false)}>
              <img
                src={logo}
                alt="Metaled Trade FZCO"
                className="h-8 w-auto rounded border border-outline-variant/30"
              />
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-4">
              {NAV_LINKS.map(({ label, href, dropdown }) =>
                href.startsWith("#") ? (
                  <a
                    key={label}
                    href={href}
                    onClick={(e) => handleLinkClick(e, href)}
                    className="flex items-center gap-1 text-sm font-medium hover:text-[#ffe088] text-ivory transition-colors whitespace-nowrap"
                  >
                    {label}
                    {dropdown && <HiChevronDown className="text-xs" />}
                  </a>
                ) : (
                  <Link
                    key={label}
                    to={href}
                    onClick={(e) => handleLinkClick(e, href)}
                    className="flex items-center gap-1 text-sm font-medium hover:text-[#ffe088] text-ivory transition-colors whitespace-nowrap"
                  >
                    {label}
                    {dropdown && <HiChevronDown className="text-xs" />}
                  </Link>
                )
              )}
            </nav>

            {/* Right-side controls */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-1.5 text-ivory hover:text-gold transition-colors cursor-pointer"
                aria-label="Toggle light and dark mode theme"
              >
                {isLight ? <HiMoon className="text-lg" /> : <HiSun className="text-lg" />}
              </button>

              {/* Collapse button (shown when manually expanded while scrolled) */}
              {isScrolled && (
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 text-ivory hover:text-gold transition-colors cursor-pointer"
                  aria-label="Collapse navbar"
                >
                  <HiX className="text-lg" />
                </button>
              )}

              {/* Mobile hamburger (only at top, not scrolled) */}
              {!isScrolled && (
                <button
                  className="text-xl md:hidden text-ivory hover:text-gold transition-colors cursor-pointer"
                  onClick={() => setOpen(true)}
                  aria-label="Open menu"
                >
                  <HiMenu />
                </button>
              )}
            </div>
          </motion.header>
        ) : (
          <motion.button
            key="collapsed-circle"
            initial={{ scale: 0.5, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsExpanded(true)}
            className="fixed top-6 right-6 md:right-12 w-12 h-12 rounded-full bg-bg-alt/90 backdrop-blur-md border border-outline-variant/40 shadow-lg flex items-center justify-center cursor-pointer hover:border-gold hover:scale-105 transition-all duration-300 text-ivory hover:text-gold z-50"
            aria-label="Open navigation menu"
          >
            <HiMenu className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
