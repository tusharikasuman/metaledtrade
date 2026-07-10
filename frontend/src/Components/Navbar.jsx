import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import logo from "../assets/metaled logo.jpeg";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Products", to: "/products", dropdown: true },
  { label: "Projects", to: "/projects" },
  { label: "Contact Us", to: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
      <Link to="/" className="shrink-0">
        <img src={logo} alt="Metaled Trade FZCO" className="h-10 w-auto rounded" />
      </Link>

      <nav className={`fixed inset-0 z-40 bg-bg-alt/95 flex flex-col items-start p-10 gap-6 transition-transform duration-300 md:static md:bg-transparent md:flex-row md:p-0 md:translate-x-0 md:items-center ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <button 
          className="absolute top-6 right-6 text-2xl md:hidden"
          onClick={() => setOpen(false)}
        >
          <HiX />
        </button>
        {NAV_LINKS.map(({ label, to, dropdown }) => {
          const isContact = to === "#contact";
          const isActive = !isContact && location.pathname === to;
          return isContact ? (
            <a
              key={label}
              href={to}
              onClick={(e) => handleLinkClick(e, to)}
              className="flex items-center gap-1 text-sm font-medium text-[#e4e2e1] hover:text-gold transition-colors"
            >
              {label}
            </a>
          ) : (
            <Link
              key={label}
              to={to}
              onClick={(e) => handleLinkClick(e, to)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isActive ? "text-gold font-semibold" : "text-[#e4e2e1] hover:text-gold"
              }`}
            >
              {label}
              {dropdown && <HiChevronDown className="text-xs" />}
            </Link>
          );
        })}
      </nav>

      <button
        className="text-2xl md:hidden z-50 text-white"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <HiMenu />
      </button>
    </header>
  );
}
