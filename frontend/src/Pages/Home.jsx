import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { HiPlay } from "react-icons/hi2";
import Navbar from "../Components/Navbar";
import bgImg from "../assets/homebg.png";
import bgImgLight from "../assets/homebg_light.png";



const PARAGRAPHS = [
  "Metaled Trade FZCO is a Steel Trading Company based in Dubai, UAE. We are specialists in steel trading, right from production to delivery of material. Our main focus is the Middle East, South East Asia & Africa markets.",
  "We supply from all major steel producing hubs such as India, Vietnam, A1 Chinese Mills and reputed local mills in GCC to cater to our esteemed customers. We provide customized financial and distribution options to our customers.",
  "Metaled Trade FZCO has a strong network of experienced partners and expert employees who enable us to nurture and develop solutions for supplying steel from world class mills.",
];

const VIDEO_ID = "DSWfdyWgg_A";
const THUMBNAIL = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

export default function Home() {
  const [playing, setPlaying] = useState(false);
  const [themeMode, setThemeMode] = useState(
    document.documentElement.classList.contains("light") ? "light" : "dark"
  );

  useEffect(() => {
    const handleThemeChange = () => {
      setThemeMode(
        document.documentElement.classList.contains("light") ? "light" : "dark"
      );
    };
    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-ivory font-body overflow-x-hidden">
      <Navbar />

      <main>
        {/* Hero */}
        <section
          id="home"
          className="relative min-h-screen flex items-center bg-cover bg-center"
          style={{ 
            backgroundImage: themeMode === "light" 
              ? `linear-gradient(180deg, rgba(245, 245, 247, 0.25) 0%, rgba(245, 245, 247, 0.95) 100%), url(${bgImgLight})`
              : `linear-gradient(180deg, rgba(9, 10, 12, 0.35) 0%, rgba(9, 10, 12, 0.92) 100%), url(${bgImg})`
          }}
        >
          <motion.div
            className="w-full max-w-[620px] px-6 md:px-12"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block text-[0.72rem] font-semibold tracking-[0.22em] uppercase text-gold mb-3">Established Excellence</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.12] mb-6">
              A Legacy of Strength in
              <br /> the Heart of Dubai
            </h1>
            <div className="w-16 h-0.5 bg-gold my-6" />
            <p className="text-steel leading-relaxed max-w-[480px]">
              At Metaled Trade FZCO, we bridge the gap between heavy industry and
              luxury architectural commodities, delivering resilient metal
              solutions to the world&apos;s most ambitious skylines.
            </p>
          </motion.div>
        </section>

        {/* About */}
        <section id="about-us" className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center max-w-6xl mx-auto px-6 md:px-12 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block text-[0.72rem] font-semibold tracking-[0.22em] uppercase text-gold mb-3">About Metaled Trade FZCO</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-ivory">A Leader in Global Steel Trading</h2>
            <div className="space-y-4">
              {PARAGRAPHS.map((text, i) => (
                <p key={i} className="text-steel leading-relaxed">{text}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-lg overflow-hidden h-[400px] md:h-full"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img src={bgImg} alt="Metaled Trade steel production facility" className="w-full h-full object-cover grayscale-[0.2] contrast-[1.05]" />
            <span className="absolute right-4 bottom-4 inline-flex items-center gap-2 bg-gold text-bg text-xs font-bold tracking-wider px-4 py-2 rounded">
              <HiOutlineGlobeAlt className="text-lg" />
              Global Supply Network
            </span>
          </motion.div>
        </section>

        {/* News Video */}
        <section id="news" className="text-center px-6 md:px-12 py-16 lg:py-24 max-w-6xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-semibold uppercase tracking-wider mb-2 text-ivory">Metaled in the News</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-12" />

          <div className="relative aspect-video rounded-lg overflow-hidden bg-surface max-w-4xl mx-auto shadow-2xl">
            {playing ? (
              <iframe
                className="w-full h-full border-none"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                title="Metaled Trade FZCO"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                className="group relative w-full h-full border-none p-0 cursor-pointer block"
                onClick={() => setPlaying(true)}
                aria-label="Play video: Experience Excellence in Steel Trading"
              >
                <img src={THUMBNAIL} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gold text-bg flex items-center justify-center text-2xl transition-transform group-hover:scale-110">
                  <HiPlay />
                </div>
                <div className="absolute left-8 bottom-6 text-left pointer-events-none">
                  <span className="inline-block text-[0.72rem] font-semibold tracking-[0.22em] uppercase text-gold mb-1">Commodities This Quarter</span>
                  <strong className="block font-display text-xl text-ivory">Experience Excellence in Steel Trading</strong>
                </div>
              </button>
            )}
          </div>
        </section>

        {/* CEO Message */}
        <section id="ceo-message" className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-14 items-center max-w-6xl mx-auto px-6 md:px-12 pb-24">
          <div className="rounded-lg overflow-hidden h-[300px] md:h-full">
            <img src={bgImg} alt="Metaled Trade port operations" className="w-full h-full object-cover grayscale-[0.35]" />
          </div>

          <motion.div
            className="relative bg-surface rounded-lg p-8 md:p-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="font-display text-5xl text-gold-soft leading-none block mb-2">&ldquo;</span>
            <span className="inline-block text-[0.72rem] font-semibold tracking-[0.22em] uppercase text-gold mb-4">Message from CEO</span>

            <div className="space-y-4">
              <p className="text-steel text-sm md:text-base leading-relaxed">
                We have continuously looked to innovate, understand market needs
                &amp; provide freedom to our employees to demonstrate their ability
                since inception. Steel with its range of products, technical
                requirements &amp; varied origins mixed with mill capabilities can
                be a very complex raw material to source.
              </p>
              <p className="text-steel text-sm md:text-base leading-relaxed">
                In addition to it are various risks of transport, payments &amp;
                socio-political issues that may come up specially when importing
                large volumes via sea or land. We at Metaled Trade FZCO have been
                successfully and efficiently providing solutions to our esteemed
                customers for importing steel products for their project &amp;
                stock requirements, whether it is in strategic sourcing, financing,
                or via supply chain.
              </p>
            </div>

            <footer className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-1">
              <strong className="text-ivory text-sm tracking-wide">Mr Indronil Mukherjee</strong>
              <span className="text-gold text-xs uppercase tracking-wider">CEO, Metaled Trade FZCO</span>
            </footer>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
