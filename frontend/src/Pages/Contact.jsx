import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

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
      
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto w-full relative z-10 flex items-center">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 w-full">
          
          {/* Left Side: Typography & Info */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#ffe088]" />
              <span className="text-[#ffe088] font-bold tracking-[0.2em] uppercase text-xs">
                Get in Touch
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-8 leading-[1.1]"
            >
              Global Reach. <br />
              <span className="text-[#8e9192]">Local Precision.</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="max-w-md text-[#c4c7c7] text-sm md:text-base leading-relaxed mb-16"
            >
              Whether you're looking for bespoke metallurgical solutions or have a complex logistical requirement, our experts in Dubai are ready to assist.
            </motion.p>

            <div className="space-y-8">
              <motion.div variants={itemVariants} className="flex items-start gap-6 group">
                <div className="mt-1 text-[#ffe088] text-xl group-hover:scale-110 transition-transform">
                  <HiOutlineLocationMarker />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-[#8e9192] uppercase mb-1">Headquarters</h4>
                  <p className="text-[#e4e2e1] font-medium leading-relaxed">
                    Dubai Business Bay<br />
                    Dubai, United Arab Emirates
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start gap-6 group">
                <div className="mt-1 text-[#ffe088] text-xl group-hover:scale-110 transition-transform">
                  <HiOutlineMail />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-[#8e9192] uppercase mb-1">Email Us</h4>
                  <a href="mailto:info@metaledtrade.com" className="text-[#e4e2e1] font-medium leading-relaxed hover:text-[#ffe088] transition-colors">
                    info@metaledtrade.com
                  </a>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start gap-6 group">
                <div className="mt-1 text-[#ffe088] text-xl group-hover:scale-110 transition-transform">
                  <HiOutlinePhone />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-[#8e9192] uppercase mb-1">Call Us</h4>
                  <a href="tel:+9710000000" className="text-[#e4e2e1] font-medium leading-relaxed hover:text-[#ffe088] transition-colors">
                    +971 (0) 00 000 0000
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            className="w-full lg:w-1/2 flex items-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <form className="w-full max-w-lg bg-[#1a1c1c] p-8 md:p-12 border border-[#2a2a2a] shadow-2xl relative">
              {/* Form Decorative Element */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#ffe088] opacity-30 m-4" />
              
              <h3 className="font-display text-2xl font-medium mb-10 text-[#e4e2e1]">Send a Message</h3>

              <div className="space-y-8">
                {/* Name */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="w-full bg-transparent border-b border-[#353535] py-3 text-[#e4e2e1] text-sm focus:outline-none focus:border-[#ffe088] transition-colors peer placeholder-transparent"
                    placeholder="Full Name"
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-0 top-3 text-[#8e9192] text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#ffe088] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#8e9192] uppercase tracking-wider"
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
                    className="w-full bg-transparent border-b border-[#353535] py-3 text-[#e4e2e1] text-sm focus:outline-none focus:border-[#ffe088] transition-colors peer placeholder-transparent"
                    placeholder="Email Address"
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-0 top-3 text-[#8e9192] text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#ffe088] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#8e9192] uppercase tracking-wider"
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
                    className="w-full bg-transparent border-b border-[#353535] py-3 text-[#e4e2e1] text-sm focus:outline-none focus:border-[#ffe088] transition-colors peer placeholder-transparent"
                    placeholder="Company Name"
                  />
                  <label 
                    htmlFor="company" 
                    className="absolute left-0 top-3 text-[#8e9192] text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#ffe088] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#8e9192] uppercase tracking-wider"
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
                    className="w-full bg-transparent border-b border-[#353535] py-3 text-[#e4e2e1] text-sm focus:outline-none focus:border-[#ffe088] transition-colors peer placeholder-transparent resize-none"
                    placeholder="Your Message"
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className="absolute left-0 top-3 text-[#8e9192] text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#ffe088] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#8e9192] uppercase tracking-wider"
                  >
                    Your Message
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full mt-4 bg-[#e4e2e1] text-[#131313] py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#ffe088] transition-colors duration-300"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
