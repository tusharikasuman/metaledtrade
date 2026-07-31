import React, { useEffect, useState, useRef } from 'react'
import heroBg from '../assets/about/hero_bg.jpg'
import heroBgLight from '../assets/about/hero_bg_light.jpg'
import buildingDetail from '../assets/about/building_detail.jpg'
import ahmedCeo from '../assets/about/ahmed_ceo.jpg'
import { motion, AnimatePresence } from 'framer-motion'

// ── Aceternity-style Sticky Scroll Reveal ────────────────────────────────────
// The outer div is n×100vh. The inner is sticky top-0 h-screen.
// useScroll on the outer div drives which item is active.
// Each AnimatePresence child captures its own snapshot of content (no stale refs).
function StickyScrollReveal({ content }) {
    const containerRef = useRef(null)
    const [activeItem, setActiveItem] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current
            if (!container) return

            const rect = container.getBoundingClientRect()
            const viewportHeight = window.innerHeight
            const totalScroll = rect.height - viewportHeight

            if (totalScroll <= 0) return

            // Progress goes from 0 (top of container hits top of viewport)
            // to 1 (bottom of container hits bottom of viewport)
            let progress = -rect.top / totalScroll
            progress = Math.max(0, Math.min(1, progress))

            const step = 1 / content.length
            const idx = Math.min(Math.floor(progress / step), content.length - 1)
            
            setActiveItem(idx)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleScroll)
        
        // Run on mount to set initial state
        setTimeout(handleScroll, 100)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [content.length])

    const item = content[activeItem] // stable snapshot for this render

    return (
        <div
            ref={containerRef}
            style={{ height: `${content.length * 100}vh` }}
            className="relative"
        >
            {/* Pinned viewport — fills screen while outer scrolls */}
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="w-full max-w-[1440px] mx-auto px-6 md:px-20 h-full py-20 flex items-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-center">

                        {/* ── Left ── */}
                        <div className="flex flex-col">
                            {/* Progress dots — outside AnimatePresence so they persist */}
                            <div className="flex items-center gap-2 mb-8">
                                {content.map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            width: i === activeItem ? '2rem' : '0.5rem',
                                            backgroundColor: i === activeItem ? '#ffd862' : '#444748',
                                            opacity: i === activeItem ? 1 : 0.5
                                        }}
                                        transition={{ duration: 0.35 }}
                                        className="h-[3px] rounded-full"
                                        style={{ width: '0.5rem' }}
                                    />
                                ))}
                            </div>

                            {/* Content — each key change triggers enter/exit */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeItem}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -24 }}
                                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className="text-[#ffd862] font-label-sm uppercase tracking-widest text-xs mb-3 block">
                                        {item.label}
                                    </span>
                                    <h3 className="font-display-lg text-3xl md:text-5xl font-bold text-primary uppercase leading-tight mb-4">
                                        {item.title}
                                    </h3>
                                    <div className="h-[2px] w-16 bg-[#ffd862] mb-6" />
                                    {item.body}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* ── Right ── */}
                        <div className="hidden lg:block relative h-[65vh]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeItem}
                                    initial={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
                                    transition={{ duration: 0.45, ease: 'easeOut' }}
                                    className="absolute inset-0 rounded-2xl overflow-hidden border border-outline-variant/30 shadow-2xl"
                                >
                                    {item.visual}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


// ── Main About Page ──────────────────────────────────────────────────────────

const About = () => {
    useEffect(() => {
        const reveals = document.querySelectorAll('.reveal')
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('active')
                })
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        )
        reveals.forEach((el) => observer.observe(el))
        return () => { reveals.forEach((el) => observer.unobserve(el)) }
    }, [])

    const [scrollProgress, setScrollProgress] = useState(0)
    const timelineRef = useRef(null)
    const [themeMode, setThemeMode] = useState(() => {
        return localStorage.getItem("theme") || (document.documentElement.classList.contains("light") ? "light" : "dark");
    });

    useEffect(() => {
        // Sync theme state on initial mount
        setThemeMode(
            document.documentElement.classList.contains("light") ? "light" : "dark"
        );
    }, []);

    useEffect(() => {
        const handleThemeChange = () => {
            setThemeMode(
                document.documentElement.classList.contains('light') ? 'light' : 'dark'
            )
        }
        window.addEventListener('theme-change', handleThemeChange)
        return () => window.removeEventListener('theme-change', handleThemeChange)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (!timelineRef.current) return
            const rect = timelineRef.current.getBoundingClientRect()
            const viewportHeight = window.innerHeight
            const start = viewportHeight / 2
            let progress = (start - rect.top) / rect.height
            progress = Math.max(0, Math.min(1, progress))
            setScrollProgress(progress * 100)
        }
        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const whyUsPillars = [
        { title: 'Integrity & Honesty', desc: 'We believe that trust is earned through transparency. We are always upfront and honest in every transaction, which is why our relationships with partners stand the test of time.', icon: 'gavel' },
        { title: 'Consistent & Timely Delivery', desc: 'We know that in this industry, delays can cost you dearly. Once we commit to a timeline, delivering on schedule becomes our absolute top priority.', icon: 'schedule' },
        { title: 'Financial Strength & Resources', desc: 'Our solid financial foundation means we have the resources to handle orders of any size, from clients anywhere in the world, without ever missing a beat.', icon: 'account_balance' },
        { title: 'Product Knowledge & Expertise', desc: 'Our team isn\'t just experienced—they\'re passionate about what they do. We bring deep, practical product knowledge to the table, helping us truly understand exactly what you need.', icon: 'workspace_premium' }
    ]

    const competencies = [
        { title: 'For Steel Producers', desc: 'We act as your dedicated bridge to global markets, offering cost-effective marketing and financial services that reliably secure new customers overseas.' },
        { title: 'For Steel Buyers', desc: 'We are more than a supplier—we are a flexible, dependable sourcing partner ready to back you with the financial support your projects require.' },
        { title: 'Value Additions', desc: 'From careful product handling and rigorous inspections to securing delivery and insurance, we provide a seamless, all-in-one platform for your sourcing needs.' }
    ]

    const journeyMilestones = [
        { year: '2012', title: 'Company Inception', desc: 'MetalEd Trade was founded in Dubai, UAE, starting with regional steel deliveries and key local distribution.' },
        { year: '2015', title: 'First Overseas Office', desc: 'Opened our first international desk in India, establishing direct mill-sourcing operations and trade integrations.' },
        { year: '2018', title: 'African Operations Desk', desc: 'Launched dedicated logistics and sales operations desks targeting massive public infrastructure works across East and West Africa.' },
        { year: '2021', title: 'DMCC Hub Consolidation', desc: 'Consolidated all global trade desks under the DMCC Free Zone in Dubai, optimizing trade finance and logistics capabilities.' },
        { year: '2024', title: 'Smelting Mill Integrations', desc: 'Integrated logistics channels with A1 Chinese mills and local GCC smelting plants to cater to high-tonnage supply contracts.' }
    ]

    // ── Sticky Scroll Content ────────────────────────────────────────────────
    const stickyContent = [
        {
            label: 'Our Mission',
            title: 'Commitment to Consistency',
            body: (
                <div className="flex flex-col gap-4">
                    <p className="font-body-lg text-lg text-on-surface-variant leading-relaxed font-light italic border-l-2 border-[#ffd862]/50 pl-5">
                        "To provide our steel customers, products that are as per industry standards, competitively priced and delivered consistently on time."
                    </p>
                    <p className="text-sm text-on-surface-variant/70 leading-relaxed">
                        Every decision we make is guided by this mission — from the mills we source from to the logistics partners we choose.
                    </p>
                </div>
            ),
            visual: (
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <img src={buildingDetail} alt="Commitment to Consistency" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-10 text-center">
                        <div className="w-16 h-[2px] bg-[#ffd862] mb-6" />
                        <h4 className="text-2xl md:text-3xl font-display font-medium text-white leading-snug">
                            Built on Trust.<br />Delivered with Precision.
                        </h4>
                    </div>
                </div>
            )
        },
        {
            label: 'Core Competency',
            title: 'Value Creation',
            body: (
                <div className="flex flex-col gap-4">
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                        Our strength lies in our focus. We concentrate on products we have full knowledge and expertise of, delivering best-in-class solutions that facilitate trade between stakeholders.
                    </p>
                    <div className="flex flex-col gap-3 mt-2">
                        {competencies.map((comp, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <span className="text-[#ffd862] font-bold text-xs mt-0.5 shrink-0">0{i + 1}.</span>
                                <div>
                                    <p className="text-sm font-bold text-primary uppercase tracking-wide">{comp.title}</p>
                                    <p className="text-xs text-on-surface-variant/80 mt-1 leading-relaxed">{comp.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ),
            visual: (
                <div className="w-full h-full bg-bg-alt flex flex-col">
                    {competencies.map((comp, i) => (
                        <div key={i} className="flex-1 flex items-center gap-6 p-8 border-b border-outline-variant/20 last:border-0 hover:bg-surface-container/50 transition-colors">
                            <span className="text-5xl font-black text-[#ffd862]/15 font-label-sm shrink-0">0{i + 1}</span>
                            <div>
                                <p className="font-display-lg font-bold text-primary text-sm uppercase tracking-wide mb-1">{comp.title}</p>
                                <p className="text-xs text-on-surface-variant/70 leading-relaxed">{comp.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )
        },
        {
            label: 'Competitive Edge',
            title: 'Why Choose Us?',
            body: (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {whyUsPillars.map((pillar, i) => (
                        <div key={i} className="bg-bg-alt/50 border border-outline-variant/20 p-4 rounded-lg hover:border-[#ffd862]/20 transition-colors">
                            <div className="w-8 h-8 bg-[#ffd862]/10 border border-[#ffd862]/20 flex items-center justify-center text-[#ffd862] mb-3 rounded">
                                <span className="material-symbols-outlined text-sm">{pillar.icon}</span>
                            </div>
                            <p className="font-bold text-primary text-xs uppercase tracking-wide mb-1">{pillar.title}</p>
                            <p className="text-xs text-on-surface-variant/75 leading-relaxed">{pillar.desc}</p>
                        </div>
                    ))}
                </div>
            ),
            visual: (
                <div className="w-full h-full bg-bg-alt grid grid-cols-2">
                    {whyUsPillars.map((pillar, i) => (
                        <div key={i} className="flex flex-col items-center justify-center gap-3 p-8 border-r border-b border-outline-variant/15 last:border-0 text-center hover:bg-surface-container/40 transition-colors">
                            <div className="w-14 h-14 bg-[#ffd862]/10 border border-[#ffd862]/20 flex items-center justify-center text-[#ffd862] rounded-xl">
                                <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
                            </div>
                            <p className="font-bold text-primary text-xs uppercase tracking-wide">{pillar.title}</p>
                        </div>
                    ))}
                </div>
            )
        },
        {
            label: 'Governance',
            title: 'Leadership',
            body: (
                <div className="flex flex-col gap-4">
                    <p className="text-xs uppercase tracking-widest text-[#ffd862] font-bold">Chief Executive Officer</p>
                    <h4 className="text-xl font-bold text-primary font-display-lg uppercase">Mr Indronil Mukherjee</h4>
                    <p className="text-sm text-on-surface leading-relaxed font-light">
                        From the day we started, our goal has always been simple: to understand exactly what the market needs, to keep innovating, and to empower our people to do their very best work. Sourcing steel isn't just about buying a commodity; with its wide range of technical specifications, varied origins, and unique mill capabilities, it can be an incredibly complex process.
                    </p>
                    <p className="text-xs text-on-surface-variant/80 leading-relaxed">
                        That's where we come in. At Metaled Trade FZCO, we take pride in cutting through that complexity. Whether you need strategic sourcing, flexible financing, or a seamless supply chain, we are here to provide our customers with reliable, efficient solutions for every project.
                    </p>
                </div>
            ),
            visual: (
                <div className="relative w-full h-full overflow-hidden group">
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500 z-10" />
                    <img
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                        alt="Mr Indronil Mukherjee"
                        src={ahmedCeo}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-[#ffd862] text-xs font-bold uppercase tracking-widest">Chief Executive Officer</p>
                        <p className="text-white font-display-lg text-xl font-bold mt-1">Mr Indronil Mukherjee</p>
                    </div>
                </div>
            )
        }
    ]

    return (
        <div className="bg-bg text-on-surface font-body-md min-h-screen antialiased selection:bg-tertiary-container selection:text-on-tertiary-container">

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-transparent z-10" />
                    <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-[10s] scale-105"
                        style={{
                            backgroundImage: `url(${themeMode === 'light' ? heroBgLight : heroBg})`,
                            backgroundAttachment: 'fixed'
                        }}
                    ></div>
                </div>
                <div className="relative z-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
                    <div className="max-w-4xl reveal">
                        <span className="inline-block font-label-md text-label-md text-[#ffd862] mb-3 uppercase tracking-[0.25em] bg-[#ffd862]/10 px-3 py-1 border border-[#ffd862]/20">
                            Dubai, UAE
                        </span>
                        <h1 className="font-display-lg text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight uppercase">
                            Gateway to Reliable <br />
                            <span className="text-[#ffd862] text-transparent bg-clip-text bg-gradient-to-r from-[#ffd862] via-[#ffe088] to-[#ffd862]">Steel Sourcing</span>
                        </h1>
                        <div className="w-32 h-[3px] bg-[#ffd862] mb-8 shadow-[0_0_15px_rgba(255,216,98,0.5)]"></div>
                    </div>
                </div>
            </section>

            {/* About Metaled Section */}
            <section className="py-unit-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
                    <div className="lg:col-span-5 reveal">
                        <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest block mb-2">Corporate Profile</span>
                        <h2 className="font-display-lg text-3xl md:text-4xl font-extrabold text-primary uppercase leading-tight">
                            About <br />Metaled Trade
                        </h2>
                        <div className="w-16 h-[2px] bg-tertiary mt-4"></div>
                    </div>
                    <div className="lg:col-span-7 reveal">
                        <p className="font-body-lg text-lg text-on-surface-variant leading-relaxed font-light mb-6">
                            Based in the bustling heart of Dubai, UAE, Metaled Trade is much more than a traditional steel trading company. We are dedicated specialists who oversee the entire lifecycle of steel trading—from the moment it leaves the production mill all the way to final delivery. While we have a global footprint, our primary focus is on empowering the rapidly growing markets across the Middle East, South East Asia, and Africa.
                        </p>
                        <p className="font-body-md text-base text-on-surface-variant/80 leading-relaxed font-light">
                            To ensure we consistently meet our customers' exact needs, we source materials from some of the world's most reputable steel-producing hubs, including India, Vietnam, top-tier Chinese mills, and respected local producers right here in the GCC. But we do more than just supply metal. We leverage our strong network of experienced partners and our deeply knowledgeable team to create tailored financial and distribution solutions that actually work for your projects.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Journey Section (Timeline) */}
            <section className="py-unit-xl bg-surface-container-lowest border-y border-outline-variant/35 relative">
                <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
                    <div className="text-center mb-20 reveal">
                        <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest block mb-2">Milestones</span>
                        <h2 className="font-display-lg text-3xl sm:text-4xl font-bold text-primary uppercase">Our Journey</h2>
                        <div className="w-16 h-[2px] bg-tertiary mx-auto mt-4"></div>
                    </div>

                    <div ref={timelineRef} className="relative">
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-outline-variant/20 -translate-x-1/2" />
                        <div
                            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-[#ffd862] shadow-[0_0_12px_#ffd862] -translate-x-1/2 transition-all duration-100 ease-out origin-top"
                            style={{ height: `${scrollProgress}%` }}
                        />
                        <div className="space-y-16">
                            {journeyMilestones.map((milestone, idx) => {
                                const isEven = idx % 2 === 0
                                const isDotActive = scrollProgress >= (idx * 25) - 5
                                return (
                                    <div
                                        key={milestone.year}
                                        className={`flex flex-col md:flex-row relative items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                                    >
                                        <div
                                            className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-20 transition-all duration-500 border-2 ${
                                                isDotActive
                                                    ? 'bg-[#ffd862] border-[#ffd862] shadow-[0_0_12px_rgba(255,216,98,0.8)]'
                                                    : 'bg-bg border-[#444748] shadow-none'
                                            }`}
                                        />
                                        <div className="hidden md:block w-1/2" />
                                        <div className="w-full md:w-1/2 pl-10 md:pl-0 md:px-12 reveal">
                                            <div className="bg-bg-alt p-8 border border-outline-variant/30 hover:border-tertiary/20 transition-all duration-300 relative rounded-sm shadow-lg">
                                                <span className="font-mono text-5xl font-black text-tertiary/10 absolute top-4 right-4 select-none">
                                                    0{idx + 1}
                                                </span>
                                                <span className="font-display-lg text-3xl font-extrabold text-tertiary block mb-2">
                                                    {milestone.year}
                                                </span>
                                                <h3 className="font-display-lg text-lg font-bold text-primary uppercase tracking-wide mb-3">
                                                    {milestone.title}
                                                </h3>
                                                <p className="font-body-md text-sm text-on-surface-variant/80 leading-relaxed font-light">
                                                    {milestone.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Sticky Scroll Reveal: Mission → Core Competency → Why Us → Leadership ── */}
            <StickyScrollReveal content={stickyContent} />

        </div>
    )
}

export default About