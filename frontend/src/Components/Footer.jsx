import React from 'react'

const Footer = () => {
  const links = [
    { label: 'Expertise', href: '#expertise' },
    { label: 'Material Sourcing', href: '#sourcing' },
    { label: 'Trade Financing', href: '#financing' },
    { label: 'Global Desks', href: '#desks' },
    { label: 'Contact Us', href: '#contact' }
  ]

  return (
    <footer className="w-full bg-[#18191c] text-[#e4e2e1] pt-20 pb-10 rounded-t-[40px] border-t border-[#2a2c35]/40 relative overflow-hidden mt-20">
      
      {/* Container matching standard layout margins */}
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
        
        {/* Main Grid: Split Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 items-start">
          
          {/* Left Column: Bold Statement, Button, and Massive Logo */}
          <div className="lg:col-span-6 flex flex-col justify-between min-h-[380px]">
            <div>
              <p className="font-display-lg text-xl sm:text-3xl font-light leading-relaxed max-w-md text-white mb-8">
                Steel sourcing is complicated. Reaching us isn't. <br />
                Contact the MetalEd team anytime.
              </p>
              
              {/* Gold CTA button matching theme accents */}
              <button className="bg-tertiary text-[#0c0d0f] font-label-md px-8 py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-[#ffe088] hover:text-black transition-all duration-300 shadow-md cursor-pointer">
                Get in touch
              </button>
            </div>
            
            {/* Massive Brand Watermark Logo */}
            <div className="mt-12 select-none">
              <h2 className="font-display-lg text-7xl sm:text-8xl md:text-[110px] font-black text-[#262832]/35 uppercase tracking-tighter leading-none">
                METALED
              </h2>
            </div>
          </div>

          {/* Right Column: Vertically Stacked Links and Social Icons */}
          <div className="lg:col-span-6 flex flex-col justify-between min-h-[380px] lg:pl-12">
            
            {/* Stacked Links separated by thin black/dark lines */}
            <nav className="flex flex-col border-t border-[#2a2c35]/50" aria-label="Footer Navigation">
              {links.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  className="flex justify-between items-center py-4 border-b border-[#2a2c35]/50 font-display-lg text-lg sm:text-2xl font-light text-white hover:text-tertiary transition-all duration-300 hover:translate-x-2 group"
                >
                  <span>{link.label}</span>
                  {/* Subtle right arrow element */}
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-tertiary">
                    north_east
                  </span>
                </a>
              ))}
            </nav>
            
            {/* Social Text Links */}
            <div className="flex gap-4 text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] font-label-sm mt-8">
              <a href="#linkedin" className="hover:text-tertiary transition-colors">LinkedIn</a>
              <span className="opacity-30">/</span>
              <a href="#youtube" className="hover:text-tertiary transition-colors">YouTube</a>
              <span className="opacity-30">/</span>
              <a href="#global" className="hover:text-tertiary transition-colors">Global Portal</a>
            </div>
          </div>

        </div>

        {/* Legal & Copyright Row at Bottom */}
        <div className="border-t border-[#2a2c35]/30 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="font-label-sm text-[11px] text-[#64748b] font-light tracking-wide">
            © 2026 All rights reserved, MetalEd Trade, Inc.
          </p>
          <div className="flex gap-6 font-label-sm text-[11px] text-[#64748b]">
            <a href="#patents" className="hover:text-white transition-colors">Patents</a>
            <span className="opacity-30">•</span>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy and Policy</a>
            <span className="opacity-30">•</span>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
