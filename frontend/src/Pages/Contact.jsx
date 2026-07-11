import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { WorldMap } from "../components/ui/world-map";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#131313] text-[#e4e2e1] font-body flex flex-col relative overflow-hidden">
      {/* Background ambient light effect */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#ffe088]/5 via-[#131313]/0 to-transparent pointer-events-none" />
      

      <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto w-full relative z-10 flex items-center">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 w-full">
          
          {/* Left Side: Typography & Globe */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col justify-start pt-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-6 leading-[1.1] text-white"
            >
              Contact us
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="max-w-md text-[#8e9192] text-sm md:text-base leading-relaxed mb-10"
            >
              We are always looking for ways to improve our products and services. Contact us and let us know how we can help you.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 text-[#c4c7c7] text-sm font-medium mb-12">
              <a href="mailto:info@metaledtrade.com" className="hover:text-[#ffe088] transition-colors">info@metaledtrade.com</a>
              <span className="text-[#353535]">•</span>
              <a href="tel:+9710000000" className="hover:text-[#ffe088] transition-colors">+971 (0) 00 000 0000</a>
              <span className="text-[#353535]">•</span>
              <a href="mailto:support@metaledtrade.com" className="hover:text-[#ffe088] transition-colors">support@metaledtrade.com</a>
            </motion.div>

            {/* Map Container */}
            <motion.div variants={itemVariants} className="relative w-full max-w-[600px] -ml-6 lg:-ml-10">
              <WorldMap />
            </motion.div>

          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            className="w-full lg:w-1/2 flex items-center justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div 
              className="w-full max-w-lg p-8 md:p-12 rounded-xl relative overflow-hidden bg-[#131313] border border-[#2a2a2a] shadow-2xl"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            >
              {/* Form Decorative Element */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#8e9192] opacity-30 m-4" />
              
              <h3 className="font-display text-2xl font-medium mb-10 text-[#e4e2e1]">Send a Message</h3>

              <form className="space-y-8 relative z-10">
                {/* Name */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="w-full bg-transparent border-b border-[#353535] py-3 text-[#e4e2e1] text-sm focus:outline-none focus:border-[#e4e2e1] transition-colors peer placeholder-transparent"
                    placeholder="Full Name"
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-0 top-3 text-[#8e9192] text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#e4e2e1] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#8e9192] uppercase tracking-wider"
                  >
                    Full Name
                  </label>
                </div>

                {/* Email */}
                <div className="relative group">
                  <input 
                    type="email" 
                    id="email"
                    required
                    className="w-full bg-transparent border-b border-[#353535] py-3 text-[#e4e2e1] text-sm focus:outline-none focus:border-[#e4e2e1] transition-colors peer placeholder-transparent"
                    placeholder="Email Address"
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-0 top-3 text-[#8e9192] text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#e4e2e1] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#8e9192] uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                </div>

                {/* Company */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="company"
                    required
                    className="w-full bg-transparent border-b border-[#353535] py-3 text-[#e4e2e1] text-sm focus:outline-none focus:border-[#e4e2e1] transition-colors peer placeholder-transparent"
                    placeholder="Company Name"
                  />
                  <label 
                    htmlFor="company" 
                    className="absolute left-0 top-3 text-[#8e9192] text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#e4e2e1] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#8e9192] uppercase tracking-wider"
                  >
                    Company Name
                  </label>
                </div>

                {/* Message */}
                <div className="relative group">
                  <textarea 
                    id="message"
                    required
                    rows="4"
                    className="w-full bg-transparent border-b border-[#353535] py-3 text-[#e4e2e1] text-sm focus:outline-none focus:border-[#e4e2e1] transition-colors peer placeholder-transparent resize-none"
                    placeholder="Your Message"
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className="absolute left-0 top-3 text-[#8e9192] text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#e4e2e1] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#8e9192] uppercase tracking-wider"
                  >
                    Your Message
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full mt-6 bg-[#e4e2e1] text-[#131313] py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
