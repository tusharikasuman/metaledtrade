import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { HiOutlineArrowRight, HiOutlineX, HiOutlineCloudUpload, HiOutlineLocationMarker, HiOutlineBriefcase, HiOutlinePencil } from "react-icons/hi";

const OPEN_POSITIONS = [
  {
    id: 1,
    title: "Senior Metallurgist",
    department: "Engineering",
    location: "Dubai, UAE",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Global Supply Chain Manager",
    department: "Logistics",
    location: "Dubai, UAE",
    type: "Full-time",
  },
  {
    id: 3,
    title: "Key Account Executive",
    department: "Sales",
    location: "Remote / UAE",
    type: "Full-time",
  },
  {
    id: 4,
    title: "Quality Control Inspector",
    department: "Operations",
    location: "Dubai, UAE",
    type: "Contract",
  },
];

export default function Careers() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [appState, setAppState] = useState("NAME"); // NAME, EMAIL, RESUME, SUMMARY, SUCCESS
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
  });

  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  // Auto-focus inputs when modal step changes
  useEffect(() => {
    if (appState === "NAME" || appState === "EMAIL") {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [appState]);

  const openModal = (role) => {
    setSelectedRole(role);
    setAppState("NAME");
    setFormData({ name: "", email: "", resume: null });
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedRole(null);
    document.body.style.overflow = "auto";
  };

  const handleKeyDown = (e, nextState) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if ((appState === "NAME" && formData.name.trim() !== "") || 
          (appState === "EMAIL" && formData.email.trim() !== "")) {
        setAppState(nextState);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFormData({ ...formData, resume: e.dataTransfer.files[0].name });
      setTimeout(() => setAppState("SUMMARY"), 500);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, resume: e.target.files[0].name });
      setTimeout(() => setAppState("SUMMARY"), 500);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-ivory font-body flex flex-col relative">

      <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
        
        {/* Clean Hero Section */}
        <section className="mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#ffe088] font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
              Careers
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-6">
              Build the Future with Us
            </h1>
            <p className="text-[#8e9192] text-sm md:text-base leading-relaxed">
              We are seeking driven professionals to join our global network. 
              Explore our open positions below and take the next step in your career.
            </p>
          </motion.div>
        </section>

        {/* Clean Job List Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OPEN_POSITIONS.map((job, idx) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-alt border border-outline-variant/30 p-8 rounded-sm hover:border-[#ffe088] transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold tracking-widest text-[#8e9192] uppercase bg-bg px-3 py-1 border border-outline-variant/30">
                      {job.department}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-6 text-ivory">
                    {job.title}
                  </h3>
                  
                  <div className="flex gap-6 text-sm text-[#8e9192] mb-8 font-label-md">
                    <div className="flex items-center gap-2">
                      <HiOutlineLocationMarker className="text-lg" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <HiOutlineBriefcase className="text-lg" />
                      {job.type}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => openModal(job)}
                  className="w-full sm:w-auto self-start px-6 py-3 border border-outline-variant/40 text-xs font-bold tracking-widest text-ivory uppercase hover:bg-accent hover:text-bg hover:border-accent transition-colors flex items-center gap-2"
                >
                  Apply Now
                  <HiOutlineArrowRight />
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Application Modal Overlay */}
      <AnimatePresence>
        {selectedRole && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-bg-alt border border-outline-variant/30 shadow-2xl rounded-sm overflow-hidden z-10"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-outline-variant/30">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#ffe088] uppercase block mb-1">
                    Applying for
                  </span>
                  <h2 className="font-display text-lg font-semibold text-primary">
                    {selectedRole.title}
                  </h2>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-[#8e9192] hover:text-primary transition-colors"
                >
                  <HiOutlineX className="text-2xl" />
                </button>
              </div>

              {/* Modal Body: State Machine */}
              <div className="p-8 md:p-12 min-h-[350px] flex flex-col justify-center">
                <AnimatePresence mode="wait">

                  {/* STEP 1: NAME */}
                  {appState === "NAME" && (
                    <motion.div 
                      key="name"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      <label className="block font-display text-2xl mb-6 text-ivory">
                        What is your full name?
                      </label>
                      <input 
                        ref={inputRef}
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        onKeyDown={(e) => handleKeyDown(e, "EMAIL")}
                        placeholder="John Doe"
                        className="w-full bg-transparent border-b-2 border-outline-variant/40 py-4 text-xl md:text-2xl text-primary focus:outline-none focus:border-[#ffe088] transition-colors placeholder-steel/50"
                      />
                      <button 
                        onClick={() => formData.name.trim() !== "" && setAppState("EMAIL")}
                        disabled={formData.name.trim() === ""}
                        className="mt-8 px-6 py-3 bg-ivory text-bg text-xs font-bold uppercase tracking-widest hover:bg-[#ffe088] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next Step
                      </button>
                    </motion.div>
                  )}

                  {/* STEP 2: EMAIL */}
                  {appState === "EMAIL" && (
                    <motion.div 
                      key="email"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      <label className="block font-display text-2xl mb-6 text-ivory">
                        What is your email address?
                      </label>
                      <input 
                        ref={inputRef}
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        onKeyDown={(e) => handleKeyDown(e, "RESUME")}
                        placeholder="john@example.com"
                        className="w-full bg-transparent border-b-2 border-outline-variant/40 py-4 text-xl md:text-2xl text-primary focus:outline-none focus:border-[#ffe088] transition-colors placeholder-steel/50"
                      />
                      <div className="mt-8 flex gap-4">
                        <button 
                          onClick={() => setAppState("NAME")}
                          className="px-6 py-3 border border-outline-variant/40 text-ivory text-xs font-bold uppercase tracking-widest hover:bg-bg-alt/20 transition-colors"
                        >
                          Back
                        </button>
                        <button 
                          onClick={() => formData.email.trim() !== "" && setAppState("RESUME")}
                          disabled={formData.email.trim() === ""}
                          className="px-6 py-3 bg-ivory text-bg text-xs font-bold uppercase tracking-widest hover:bg-[#ffe088] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next Step
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: RESUME UPLOAD */}
                  {appState === "RESUME" && (
                    <motion.div 
                      key="resume"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      <label className="block font-display text-2xl mb-6 text-ivory">
                        Upload your Resume/CV
                      </label>
                      <label 
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                        onDrop={handleDrop}
                        className={`w-full h-48 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 rounded-sm ${
                          isDragging 
                            ? "border-[#ffe088] bg-[#ffe088]/5" 
                            : "border-outline-variant/40 hover:border-[#8e9192]"
                        }`}
                      >
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                        />
                        <HiOutlineCloudUpload className={`text-5xl mb-4 transition-colors ${isDragging ? 'text-[#ffe088]' : 'text-[#444748]'}`} />
                        <span className="text-ivory text-sm font-medium">
                          {isDragging ? "Drop file to upload" : "Click or drag file here"}
                        </span>
                      </label>
                      <div className="mt-8 flex gap-4">
                        <button 
                          onClick={() => setAppState("EMAIL")}
                          className="px-6 py-3 border border-outline-variant/40 text-ivory text-xs font-bold uppercase tracking-widest hover:bg-bg-alt/20 transition-colors"
                        >
                          Back
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: SUMMARY & EDIT */}
                  {appState === "SUMMARY" && (
                    <motion.div 
                      key="summary"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      <h3 className="font-display text-2xl mb-8 text-ivory">
                        Review Your Application
                      </h3>
                      
                      <div className="space-y-4 mb-8">
                        {/* Name Summary Row */}
                        <div className="flex items-center justify-between p-4 border border-outline-variant/30 bg-bg rounded-sm group">
                          <div>
                            <span className="block text-[10px] font-bold tracking-widest text-[#8e9192] uppercase mb-1">Full Name</span>
                            <span className="text-primary font-medium">{formData.name}</span>
                          </div>
                          <button onClick={() => setAppState("NAME")} className="text-[#8e9192] hover:text-[#ffe088] transition-colors p-2 flex items-center gap-2 text-xs uppercase font-bold tracking-widest">
                            <HiOutlinePencil /> Edit
                          </button>
                        </div>
 
                        {/* Email Summary Row */}
                        <div className="flex items-center justify-between p-4 border border-outline-variant/30 bg-bg rounded-sm group">
                          <div>
                            <span className="block text-[10px] font-bold tracking-widest text-[#8e9192] uppercase mb-1">Email Address</span>
                            <span className="text-primary font-medium">{formData.email}</span>
                          </div>
                          <button onClick={() => setAppState("EMAIL")} className="text-[#8e9192] hover:text-[#ffe088] transition-colors p-2 flex items-center gap-2 text-xs uppercase font-bold tracking-widest">
                            <HiOutlinePencil /> Edit
                          </button>
                        </div>
 
                        {/* Resume Summary Row */}
                        <div className="flex items-center justify-between p-4 border border-outline-variant/30 bg-bg rounded-sm group">
                          <div className="overflow-hidden">
                            <span className="block text-[10px] font-bold tracking-widest text-[#8e9192] uppercase mb-1">Resume File</span>
                            <span className="text-primary font-medium truncate block max-w-[200px] md:max-w-xs">{formData.resume}</span>
                          </div>
                          <button onClick={() => setAppState("RESUME")} className="text-[#8e9192] hover:text-[#ffe088] transition-colors p-2 flex items-center gap-2 text-xs uppercase font-bold tracking-widest shrink-0">
                            <HiOutlinePencil /> Edit
                          </button>
                        </div>
                      </div>
 
                      <button 
                        onClick={() => setAppState("SUCCESS")}
                        className="w-full py-4 bg-gold text-bg text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
                      >
                        Submit Application
                      </button>
                    </motion.div>
                  )}

                  {/* STEP 5: SUCCESS */}
                  {appState === "SUCCESS" && (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full text-center py-8"
                    >
                      <div className="w-16 h-16 border-2 border-[#ffe088] rounded-full flex items-center justify-center mx-auto mb-6">
                        <div className="w-2 h-2 bg-[#ffe088] rounded-full" />
                      </div>
                      <h3 className="font-display text-3xl font-medium text-primary mb-4">
                        Application Sent
                      </h3>
                      <p className="text-[#8e9192] mb-8">
                        Thank you, {formData.name.split(" ")[0]}. Your application for {selectedRole.title} has been received. We will contact you at {formData.email} soon.
                      </p>
                      <button 
                        onClick={closeModal}
                        className="px-8 py-3 border border-outline-variant/40 text-ivory text-xs font-bold uppercase tracking-widest hover:bg-bg-alt/20 transition-colors"
                      >
                        Close Window
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
