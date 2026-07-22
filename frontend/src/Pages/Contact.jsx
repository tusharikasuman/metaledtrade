import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WorldMap } from "../components/ui/world-map";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const INITIAL_FORM = { name: "", email: "", company: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Please enter your full name.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    setErrors({});

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setForm(INITIAL_FORM);
      } else {
        // Server returned validation errors
        if (data.errors) setErrors(data.errors);
        setServerMessage(data.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setServerMessage("Could not connect to the server. Please try again later.");
      setStatus("error");
    }
  };

  const inputBase =
    "w-full bg-transparent border-b border-[#353535] py-3 text-[#e4e2e1] text-sm focus:outline-none transition-colors peer placeholder-transparent";
  const inputFocus = "focus:border-[#e4e2e1]";
  const inputError = "border-red-500/70 focus:border-red-400";
  const labelBase =
    "absolute left-0 top-3 text-[#8e9192] text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#8e9192] uppercase tracking-wider";

  return (
    <div className="min-h-screen bg-bg text-ivory font-body flex flex-col relative overflow-hidden">
      {/* Background ambient light effect */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-soft/5 via-bg/0 to-transparent pointer-events-none" />
      

      <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto w-full relative z-10 flex items-center">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 w-full">

          {/* ── Left: heading + map ─────────────────────────────────────── */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col justify-start pt-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-6 leading-[1.1] text-primary"
            >
              Contact us
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-md text-steel text-sm md:text-base leading-relaxed mb-10"
            >
              Whether you have a question about our products or need a custom quote,
              our team in Dubai is ready to help.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 text-on-surface-variant text-sm font-medium mb-12">
              <a href="mailto:info@metaledtrade.com" className="hover:text-[#ffe088] transition-colors">info@metaledtrade.com</a>
              <span className="text-surface-variant">•</span>
              <a href="tel:+9710000000" className="hover:text-[#ffe088] transition-colors">+971 (0) 00 000 0000</a>
              <span className="text-surface-variant">•</span>
              <a href="mailto:support@metaledtrade.com" className="hover:text-[#ffe088] transition-colors">support@metaledtrade.com</a>
            </motion.div>

            {/* World Map */}
            <motion.div variants={itemVariants} className="w-full">
              <WorldMap />
            </motion.div>
          </motion.div>

          {/* ── Right: form ─────────────────────────────────────────────── */}
          <motion.div
            className="w-full lg:w-1/2 flex items-start justify-end pt-10"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div 
              className="w-full max-w-lg p-8 md:p-12 rounded-xl relative overflow-hidden bg-bg-alt border border-surface-container-high shadow-2xl"
              style={{
                backgroundImage: `
                  linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
                  linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            >
              {/* Form Decorative Element */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-steel opacity-30 m-4" />
              
              <h3 className="font-display text-2xl font-medium mb-10 text-ivory">Send a Message</h3>

              <form className="space-y-8 relative z-10">
                {/* Name */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="w-full bg-transparent border-b border-surface-variant py-3 text-ivory text-sm focus:outline-none focus:border-ivory transition-colors peer placeholder-transparent"
                    placeholder="Full Name"
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-0 top-3 text-steel text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-ivory peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-steel uppercase tracking-wider"
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
                    className="w-full bg-transparent border-b border-surface-variant py-3 text-ivory text-sm focus:outline-none focus:border-ivory transition-colors peer placeholder-transparent"
                    placeholder="Email Address"
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-0 top-3 text-steel text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-ivory peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-steel uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                </div>

                    {/* Company (optional) */}
                    <div className="relative">
                      <input
                        type="text"
                        id="company"
                        value={form.company}
                        onChange={handleChange}
                        className={`${inputBase} ${inputFocus}`}
                        placeholder="Company Name"
                        autoComplete="organization"
                      />
                      <label htmlFor="company" className={`${labelBase} peer-focus:text-[#e4e2e1]`}>
                        Company <span className="normal-case text-[#444748]">(optional)</span>
                      </label>
                    </div>
                {/* Company */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="company"
                    required
                    className="w-full bg-transparent border-b border-surface-variant py-3 text-ivory text-sm focus:outline-none focus:border-ivory transition-colors peer placeholder-transparent"
                    placeholder="Company Name"
                  />
                  <label 
                    htmlFor="company" 
                    className="absolute left-0 top-3 text-steel text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-ivory peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-steel uppercase tracking-wider"
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
                    className="w-full bg-transparent border-b border-surface-variant py-3 text-ivory text-sm focus:outline-none focus:border-ivory transition-colors peer placeholder-transparent resize-none"
                    placeholder="Your Message"
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className="absolute left-0 top-3 text-steel text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-ivory peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-steel uppercase tracking-wider"
                  >
                    Your Message
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full mt-6 bg-ivory text-bg py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
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
