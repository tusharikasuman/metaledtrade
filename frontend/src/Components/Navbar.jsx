import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/metaled-logo.png";
import logoLight from "../assets/metaled-logo-light.png";

// Pages whose top section is a dark video/photo hero — the unscrolled,
// transparent navbar sits on dark there, so it needs the light logo.
const DARK_HERO_PATHS = ["/", "/about", "/projects", "/logistics", "/trade-finance"];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Products",
    href: "/products",
    dropdown: true,
    submenu: [
      { label: "Flat Products", href: "/products?category=flat" },
      { label: "Long Products", href: "/products?category=long" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Logistics", href: "/logistics" },
  { label: "Trade & Finance", href: "/trade-finance" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const onDarkHero = !isScrolled && DARK_HERO_PATHS.includes(pathname);

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
      {/* Fixed, full-width bar — transparent, no box/blur/shadow, just a soft scrim for legibility */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-5 ${
          isScrolled
            ? "bg-bg-alt"
            : "bg-gradient-to-b from-black/45 via-black/15 to-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between gap-6">
          <Link to="/" className="shrink-0 flex items-center">
            <img
              src={onDarkHero ? logoLight : logo}
              alt="Metaled Trade FZCO"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-9">
            {NAV_LINKS.map(({ label, href, dropdown, submenu }) =>
              submenu ? (
                <div key={label} className="relative group">
                  <Link
                    to={href}
                    className="flex items-center gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] xl:tracking-[0.16em] text-gold/90 hover:text-gold-soft transition-colors duration-300 whitespace-nowrap py-3"
                  >
                    {label}
                    {dropdown && (
                      <HiChevronDown className="text-[10px] transition-transform duration-300 group-hover:rotate-180" />
                    )}
                  </Link>

                  {/* Dropdown panel */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                    <div className="min-w-[190px] bg-bg-alt border border-gold/20 py-2">
                      {submenu.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="block px-4 py-2.5 text-[0.7rem] font-semibold uppercase tracking-wider text-ivory/80 hover:text-gold hover:bg-gold/5 transition-colors whitespace-nowrap"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={label}
                  to={href}
                  className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] xl:tracking-[0.16em] text-gold/90 hover:text-gold-soft transition-colors duration-300 whitespace-nowrap"
                >
                  {label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center gap-1 border border-gold text-gold text-[0.68rem] font-bold uppercase tracking-[0.14em] px-6 py-2.5 hover:bg-gold hover:text-[#131313] transition-colors duration-300 whitespace-nowrap"
            >
              Contact Us
            </Link>

            <button
              className="lg:hidden text-2xl text-gold transition-colors cursor-pointer"
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

            {[...NAV_LINKS, { label: "Contact Us", href: "/contact" }].map(({ label, href, dropdown, submenu }, i) => (
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
                {submenu && (
                  <div className="flex flex-col gap-1 pl-4 mb-2 border-l border-gold/30">
                    {submenu.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className="py-1 text-sm uppercase tracking-wide text-steel hover:text-gold transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
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
