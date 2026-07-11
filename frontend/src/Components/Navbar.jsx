import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX, HiChevronDown, HiSun, HiMoon } from "react-icons/hi";
import logo from "../assets/metaled logo.jpeg";

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

  useEffect(() => {
    // Check initial local storage on mount
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
      setIsLight(true);
    } else {
      document.documentElement.classList.remove("light");
      setIsLight(false);
    }
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
    // Dispatch a custom theme change event for other components to reload assets
    window.dispatchEvent(new Event("theme-change"));
  };

  const handleLinkClick = (e, to) => {
    setOpen(false);
    if (to === "#contact") {
      e.preventDefault();
      const footer = document.querySelector("footer");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
      <Link to="/" className="shrink-0 animate-fade-in">
        <img src={logo} alt="Metaled Trade FZCO" className="h-10 w-auto rounded border border-outline-variant/30" />
      </Link>

      <nav className={`fixed inset-0 z-40 bg-bg-alt/95 flex flex-col items-start p-10 gap-6 transition-transform duration-300 md:static md:bg-transparent md:flex-row md:p-0 md:translate-x-0 md:items-center ml-auto md:mr-6 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <button 
          className="absolute top-6 right-6 text-2xl md:hidden text-ivory hover:text-gold transition-colors"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <HiX />
        </button>
        {NAV_LINKS.map(({ label, href, dropdown }) => (
          href.startsWith('#') ? (
            <a key={label} href={href} onClick={(e) => handleLinkClick(e, href)} className="flex items-center gap-1 text-sm font-medium hover:text-[#ffe088] text-ivory transition-colors">
              {label}
              {dropdown && <HiChevronDown className="text-xs" />}
            </a>
          ) : (
            <Link key={label} to={href} onClick={(e) => handleLinkClick(e, href)} className="flex items-center gap-1 text-sm font-medium hover:text-[#ffe088] text-ivory transition-colors">
              {label}
              {dropdown && <HiChevronDown className="text-xs" />}
            </Link>
          )
        ))}
      </nav>

      <div className="flex items-center gap-3">
        {/* Light/Dark Mode Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 text-ivory hover:text-gold transition-colors cursor-pointer"
          aria-label="Toggle light and dark mode theme"
        >
          {isLight ? <HiMoon className="text-xl" /> : <HiSun className="text-xl" />}
        </button>

        {/* Mobile menu trigger */}
        <button
          className="text-2xl md:hidden text-ivory hover:text-gold transition-colors"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <HiMenu />
        </button>
      </div>
    </header>
  );
}
