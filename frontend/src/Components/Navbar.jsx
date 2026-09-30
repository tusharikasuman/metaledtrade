import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("light");
    localStorage.setItem("theme", "light");

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
          <motion.div
            key="slim-bar"
            initial={{ y: -48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -48, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 h-12 z-50 bg-bg-alt/90 backdrop-blur-md border-b border-outline-variant/30 shadow-lg flex items-center justify-between px-4 md:px-8"
          >
            <Link to="/" className="shrink-0 flex items-center">
              <img
                src={logo}
                alt="Metaled Trade FZCO"
                className="h-6 w-auto rounded border border-outline-variant/30"
              />
            </Link>
            <button
              onClick={() => setIsExpanded(true)}
              className="p-1.5 text-ivory hover:text-gold transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <HiMenu className="text-xl" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
