import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { HiPlay } from "react-icons/hi2";
import { Link } from "react-router-dom";
import KineticText from "../Components/KineticText";
import HeroVideoBackground from "../Components/HeroVideoBackground";
import CountUpStat from "../Components/CountUpStat";
import { isPreloaderDone, onPreloaderDone } from "../lib/preloaderStatus";
import bgImg from "../assets/homebg.png";
import bgImgLight from "../assets/homebg_light.png";
import ceoPhoto from "../assets/ceo_photo.jpeg";

const HERO_VIDEOS = [
  "/videos/metaled-hero-reel-1.mp4",
  "/videos/metaled-hero-reel-2.mp4",
];

const ABOUT_SUMMARY =
  "Based in the heart of Dubai, Metaled Trade FZCO oversees every step of the steel supply chain, from production at the mill right down to final delivery, with a strong focus on markets across the Middle East, South East Asia, and Africa. Our strong network of seasoned industry partners and our own expert team work tirelessly to bring you world-class steel precisely when and where you need it.";

const STATS = [
  { value: "10M+", label: "Tons Shipped" },
  { value: "30+", label: "Countries Served" },
  { value: "15+", label: "Years of Excellence" },
];

const VIDEO_ID = "DSWfdyWgg_A";
const THUMBNAIL = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

export default function Home() {
  const [playing, setPlaying] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const [revealed, setRevealed] = useState(isPreloaderDone());

  useEffect(() => {
    document.documentElement.classList.add("light");
    localStorage.setItem("theme", "light");
  }, []);

  useEffect(() => onPreloaderDone(() => setRevealed(true)), []);

  return (
    <div className="min-h-screen bg-bg text-ivory font-body overflow-x-hidden">
      <main>
        {/* Hero */}
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
          <HeroVideoBackground
            sources={HERO_VIDEOS}
            fallbackSrc={themeMode === "light" ? bgImgLight : bgImg}
            fallbackAlt="Metaled Trade FZCO steel operations"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(9, 10, 12, 0.45) 0%, rgba(9, 10, 12, 0.92) 100%)",
            }}
          />

          <div className="relative w-full max-w-[620px] px-6 md:px-12">
            <KineticText
              text="METALED TRADE FZCO"
              revealed={revealed}
              offset={30}
              className="block font-display text-lg md:text-xl font-bold tracking-[0.2em] text-[#ffd862] mb-4"
            />

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={revealed ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
            >
              <span className="inline-block text-[0.72rem] font-semibold tracking-[0.22em] uppercase text-[#ffd862] mb-3">Established Excellence</span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold uppercase leading-[1.12] mb-6 text-white">
                A Legacy of Strength in
                <br /> the Heart of Dubai
              </h1>
              <div className="w-16 h-0.5 bg-[#ffd862] my-6" />
              <p className="text-zinc-300 leading-relaxed max-w-[480px]">
                Structural steel, plates and alloys, sourced from trusted mills
                and delivered on time across the Middle East, Asia and Africa.
              </p>
            </motion.div>
          </div>
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
            <h2 className="font-display text-3xl md:text-4xl font-semibold uppercase mb-6 text-ivory">A Leader in Global Steel Trading</h2>
            <p className="text-steel leading-relaxed mb-8">{ABOUT_SUMMARY}</p>

            <div className="grid grid-cols-3 gap-6 mb-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="border-l-2 border-gold pl-4">
                  <CountUpStat
                    value={stat.value}
                    className="block font-display text-2xl md:text-3xl font-bold text-gold"
                  />
                  <span className="block text-xs uppercase tracking-wider text-steel mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs uppercase tracking-wider text-steel mb-8">
              Key projects delivered across the Middle East, India and Africa
            </p>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold hover:text-white transition-colors"
            >
              Learn more about us
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>

          <motion.div
            className="relative rounded-lg overflow-hidden h-[400px] md:h-full"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img src={bgImg} alt="Metaled Trade FZCO steel production facility" className="w-full h-full object-cover grayscale-[0.2] contrast-[1.05]" />
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

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-surface shadow-2xl">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gold text-bg flex items-center justify-center text-2xl transition-transform group-hover:scale-110">
                    <HiPlay />
                  </div>
                </button>
              )}
            </div>

            {/* Caption — kept outside the video frame so it never overlaps the play control */}
            <div className="text-left mt-4">
              <span className="inline-block text-[0.72rem] font-semibold tracking-[0.22em] uppercase text-gold mb-1">Commodities This Quarter</span>
              <strong className="block font-display text-xl text-ivory mb-1">Experience Excellence in Steel Trading</strong>
              <span className="block text-xs text-steel uppercase tracking-wider">
                {/* TODO: confirm the real outlet name and publish date for this feature */}
                Source &amp; date to be confirmed
              </span>
            </div>
          </div>
        </section>

        {/* CEO Message */}
        <section id="ceo-message" className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-14 items-center max-w-6xl mx-auto px-6 md:px-12 pb-24">
          <div className="rounded-lg overflow-hidden h-[300px] md:h-[500px]">
            <img src={ceoPhoto} alt="CEO Mr Indronil Mukherjee" className="w-full h-full object-cover" />
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
                From the day we started, our goal has always been simple: to understand exactly what the market needs, to keep innovating, and to empower our people to do their very best work. We know that sourcing steel isn't just about buying a commodity. With its wide range of technical specifications, varied origins, and unique mill capabilities, it can be an incredibly complex process.
              </p>
              <p className="text-steel text-sm md:text-base leading-relaxed">
                Add to that the logistical challenges of land and sea transport, complex payment structures, and shifting global dynamics—especially when dealing with large volumes. That's exactly where we come in. At Metaled Trade FZCO, we take pride in cutting through that complexity. Whether you need strategic sourcing, flexible financing, or a seamless supply chain, we are here to provide our customers with reliable, efficient solutions for every project.
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
