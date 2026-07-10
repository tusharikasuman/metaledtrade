import React, { useState } from "react";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import logo from "../assets/metaled logo.jpeg";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about-us" },
  { label: "Products", href: "#products", dropdown: true },
  { label: "Projects", href: "#projects" },
  { label: "Contact Us", href: "#contact-us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
      <a href="#home" className="shrink-0">
        <img src={logo} alt="Metaled Trade FZCO" className="h-10 w-auto rounded" />
      </a>

      <nav className={`fixed inset-0 z-40 bg-bg-alt/95 flex flex-col items-start p-10 gap-6 transition-transform duration-300 md:static md:bg-transparent md:flex-row md:p-0 md:translate-x-0 md:items-center ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <button 
          className="absolute top-6 right-6 text-2xl md:hidden"
          onClick={() => setOpen(false)}
        >
          <HiX />
        </button>
        {NAV_LINKS.map(({ label, href, dropdown }) => (
          <a key={label} href={href} onClick={() => setOpen(false)} className="flex items-center gap-1 text-sm font-medium hover:text-gold transition-colors">
            {label}
            {dropdown && <HiChevronDown className="text-xs" />}
          </a>
        ))}
      </nav>

      <button
        className="text-2xl md:hidden z-50"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <HiMenu />
      </button>
    </header>
  );
}
