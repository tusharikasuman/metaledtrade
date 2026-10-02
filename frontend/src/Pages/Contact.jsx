import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WorldMap } from "../components/ui/world-map";
import HoneypotField from "../Components/HoneypotField";
import { submitForm } from "../lib/api";

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

const INITIAL_FORM = { name: "", email: "", company: "", message: "", website: "" };

// maxLength mirrors the backend limits, so visitors can't type more than the server accepts.
const FIELDS = [
  { id: "name", label: "Full Name", type: "text", autoComplete: "name", maxLength: 100 },
  { id: "email", label: "Email Address", type: "email", autoComplete: "email", maxLength: 254 },
  { id: "company", label: "Company", type: "text", autoComplete: "organization", maxLength: 150, optional: true },
  { id: "message", label: "Your Message", multiline: true, maxLength: 5000 },
];

const fieldBase =
  "w-full bg-transparent border-b py-3 text-ivory text-sm focus:outline-none transition-colors peer placeholder-transparent";
const fieldOk = "border-surface-variant focus:border-ivory";
const fieldError = "border-red-500/70 focus:border-red-500";
// The label floats up while the field is focused or has text in it.
const labelClass =
  "absolute left-0 top-3 text-steel text-sm uppercase tracking-wider transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-ivory peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px]";

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
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Please enter a valid email address.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return; // ignore double-clicks

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    setErrors({});

    const result = await submitForm("/api/contact", form);

    if (result.ok) {
      setStatus("success");
      setForm(INITIAL_FORM);
    } else {
      setErrors(result.errors);
      setServerMessage(result.message);
      setStatus("error");
    }
  };

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
              className="text-5xl md:text-7xl font-display font-medium uppercase tracking-tight mb-6 leading-[1.1] text-primary"
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
              <a href="mailto:indronil@metaledtrade.com" className="hover:text-[#ffe088] transition-colors">indronil@metaledtrade.com</a>
              <span className="text-surface-variant">•</span>
              <a href="tel:+97144412782" className="hover:text-[#ffe088] transition-colors">+971 4 441 2782</a>
              <span className="text-surface-variant">•</span>
              <a href="tel:+971542178600" className="hover:text-[#ffe088] transition-colors">+971 54 217 8600</a>
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

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    role="status"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                  >
                    <p className="font-display text-xl text-ivory mb-3">Thank you — your message is on its way.</p>
                    <p className="text-steel text-sm leading-relaxed mb-8">
                      We've sent a confirmation to your inbox. Our team will get back to you within 1–2 business days.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="text-xs font-bold uppercase tracking-widest text-ivory border-b border-ivory/40 pb-1 hover:border-ivory transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    exit={{ opacity: 0 }}
                    className="space-y-8 relative z-10"
                  >
                    <HoneypotField value={form.website} onChange={handleChange} />

                    {FIELDS.map((field) => {
                      const Tag = field.multiline ? "textarea" : "input";
                      const error = errors[field.id];
                      return (
                        <div key={field.id} className="relative">
                          <Tag
                            id={field.id}
                            {...(field.multiline ? { rows: 4 } : { type: field.type })}
                            value={form[field.id]}
                            onChange={handleChange}
                            placeholder={field.label}
                            autoComplete={field.autoComplete}
                            maxLength={field.maxLength}
                            aria-invalid={Boolean(error)}
                            aria-describedby={error ? `${field.id}-error` : undefined}
                            className={`${fieldBase} ${field.multiline ? "resize-none" : ""} ${error ? fieldError : fieldOk}`}
                          />
                          <label htmlFor={field.id} className={labelClass}>
                            {field.label}
                            {field.optional && <span className="normal-case text-steel/60"> (optional)</span>}
                          </label>
                          {error && (
                            <p id={`${field.id}-error`} className="mt-2 text-xs text-red-500">
                              {error}
                            </p>
                          )}
                        </div>
                      );
                    })}

                    {status === "error" && serverMessage && (
                      <p role="alert" className="text-sm text-red-500">
                        {serverMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full mt-6 bg-ivory text-bg py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-60 disabled:cursor-wait"
                    >
                      {status === "loading" ? "Sending…" : "Submit Inquiry"}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
