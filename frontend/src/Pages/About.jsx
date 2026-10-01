import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import steelBeams from '../assets/about/steel_beams.jpg'
import dubaiFacade from '../assets/about/building_detail.jpg'
import ceoPhoto from '../assets/ceo.jpeg'
import HeroVideoBackground from '../Components/HeroVideoBackground'

const HERO_VIDEOS = [
    '/videos/metaled-hero-reel-1.mp4',
    '/videos/metaled-hero-reel-2.mp4',
]

const EASE = [0.16, 1, 0.3, 1]

// Gold tuned for dark bands — the theme's light-mode gold (#b8860b) is too muddy on black.
const DARK_GOLD = '#e9c349'

const HERO_FACTS = [
    { value: '2012', label: 'Founded in Dubai' },
    { value: '3', label: 'Core regions served' },
    { value: '4', label: 'Sourcing hubs' },
    { value: 'Mill → Site', label: 'End-to-end trade' },
]

const SOURCING_HUBS = ['India', 'Vietnam', 'China', 'GCC']
const MARKETS = ['Middle East', 'South East Asia', 'Africa']

const STANDARDS = [
    { code: 'EN', origin: 'European' },
    { code: 'BS', origin: 'British' },
    { code: 'ASTM', origin: 'American' },
    { code: 'JIS', origin: 'Japanese' },
]

const INSPECTION_STEPS = [
    { title: 'Third-party laboratory testing', desc: 'Material is tested by independent third-party laboratories against the standard specified for your order.', icon: 'science' },
    { title: 'Registered third-party inspectors', desc: 'Registered third-party inspectors examine the material before it is released for shipment.', icon: 'fact_check' },
    { title: 'TPI final report', desc: 'Third Party Inspection (TPI) final reports are submitted to the end user, as required.', icon: 'description' },
]

const MISSION_PILLARS = [
    { title: 'Industry Standards', desc: 'Every shipment verified against recognized international specifications before it ships.', icon: 'verified' },
    { title: 'Competitive Pricing', desc: 'Transparent, market-driven rates with no hidden costs or markups.', icon: 'payments' },
    { title: 'On-Time Delivery', desc: 'Reliable logistics planning that keeps every project on schedule.', icon: 'local_shipping' },
]

const WHY_US = [
    { title: 'Integrity & Honesty', desc: 'Trust is earned through transparency. We are upfront and honest in every transaction, which is why our partnerships stand the test of time.', icon: 'gavel' },
    { title: 'Consistent, Timely Delivery', desc: 'Delays cost you dearly. Once we commit to a timeline, delivering on schedule becomes our absolute top priority.', icon: 'schedule' },
    { title: 'Financial Strength', desc: 'A solid financial foundation lets us handle orders of any size, from clients anywhere in the world, without missing a beat.', icon: 'account_balance' },
    { title: 'Product Expertise', desc: 'Our team brings deep, practical product knowledge to the table, helping us understand exactly what you need.', icon: 'workspace_premium' },
]

const COMPETENCIES = [
    { title: 'For Steel Producers', desc: 'We act as your dedicated bridge to global markets, offering cost-effective marketing and financial services that reliably secure new customers overseas.' },
    { title: 'For Steel Buyers', desc: 'More than a supplier — a flexible, dependable sourcing partner ready to back you with the financial support your projects require.' },
    { title: 'Value Additions', desc: 'From careful handling and rigorous inspections to securing delivery and insurance, we provide a seamless, all-in-one platform for your sourcing needs.' },
]

const MILESTONES = [
    { year: '2012', title: 'Company Inception', desc: 'Founded in Dubai, UAE, starting with regional steel deliveries and key local distribution.' },
    { year: '2015', title: 'First Overseas Office', desc: 'Opened our first international desk in India, establishing direct mill-sourcing operations.' },
    { year: '2018', title: 'African Operations', desc: 'Launched dedicated logistics and sales desks for major infrastructure works across East and West Africa.' },
    { year: '2021', title: 'Global Hub Consolidation', desc: 'Consolidated all global trade desks in Dubai, optimizing trade finance and logistics capabilities.' },
    { year: '2024', title: 'Strategic Mill Partnerships', desc: 'Signed supply agreements with leading Chinese and GCC mills for large-volume contracts.' },
]


// ── Small building blocks ────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = '', amount = 0.3 }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount }}
            transition={{ duration: 0.8, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    )
}

function Eyebrow({ children, dark = false, center = false }) {
    return (
        <span
            className={`flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.28em] uppercase mb-5 ${center ? 'justify-center' : ''} ${dark ? '' : 'text-gold'}`}
            style={dark ? { color: DARK_GOLD } : undefined}
        >
            <span className="h-px w-8 bg-current opacity-70" />
            {children}
            {center && <span className="h-px w-8 bg-current opacity-70" />}
        </span>
    )
}


// ── Sections ─────────────────────────────────────────────────────────────────

function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden">
            <HeroVideoBackground
                sources={HERO_VIDEOS}
                fallbackSrc={steelBeams}
                fallbackAlt="Metaled Trade FZCO steel operations"
            />
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, rgba(9, 10, 12, 0.45) 0%, rgba(9, 10, 12, 0.92) 100%)' }}
            />

            {/* Left-aligned copy, vertically centred — mirrors the Home hero */}
            <div className="relative z-20 flex-1 flex items-center w-full px-6 md:px-12 pt-28 pb-10">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    className="w-full max-w-[620px]"
                >
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold uppercase leading-[1.12] text-white">
                        Gateway to reliable
                        <br />
                        <span style={{ color: DARK_GOLD }}>steel sourcing</span>
                    </h1>
                    <div className="w-16 h-0.5 my-6" style={{ background: DARK_GOLD }} />
                    <p className="text-zinc-300 leading-relaxed max-w-[480px]">
                        We oversee the entire lifecycle of steel trade — from the production mill to final delivery —
                        for the fastest-growing markets of the Middle East, South East Asia and Africa.
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="relative z-20 w-full px-6 md:px-12 pb-8 md:pb-10"
            >
                <div className="max-w-4xl grid grid-cols-2 md:grid-cols-4 border-t border-white/15">
                    {HERO_FACTS.map((fact, i) => (
                        <div
                            key={fact.label}
                            className={`pt-5 pb-1 pr-4 ${i > 0 ? 'md:pl-6 md:border-l md:border-white/15' : ''} ${i % 2 === 1 ? 'pl-4 border-l border-white/15 md:pl-6' : ''}`}
                        >
                            <span className="block font-display text-2xl md:text-3xl font-semibold text-white">{fact.value}</span>
                            <span className="block mt-1 text-[0.68rem] uppercase tracking-[0.2em] text-zinc-400">{fact.label}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

function Profile() {
    return (
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
                <FadeUp className="lg:col-span-5 relative order-2 lg:order-1">
                    <div className="absolute -top-4 -left-4 w-full h-full border border-gold/40 rounded-sm hidden sm:block" />
                    <div className="relative rounded-sm overflow-hidden aspect-[4/5] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]">
                        <img src={dubaiFacade} alt="Steel facade overlooking the Dubai skyline" className="w-full h-full object-cover scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <span className="block text-[0.65rem] uppercase tracking-[0.25em] mb-1" style={{ color: DARK_GOLD }}>Headquarters</span>
                            <span className="block font-display text-xl text-white">Dubai, United Arab Emirates</span>
                        </div>
                    </div>
                </FadeUp>

                <div className="lg:col-span-7 order-1 lg:order-2">
                    <FadeUp>
                        <Eyebrow>Corporate Profile</Eyebrow>
                        <h2 className="font-display text-3xl md:text-5xl font-semibold text-ivory uppercase leading-[1.1] mb-8">
                            From the mill<br />to your site
                        </h2>
                    </FadeUp>
                    <FadeUp delay={0.1}>
                        <p className="text-steel leading-relaxed mb-5">
                            We work on both sides of the trade. For steel mills, we open doors to buyers in new markets.
                            For buyers, we source the right grade from the right mill — in India, Vietnam, China or the
                            GCC — and back the order with trade finance when your project needs it.
                        </p>
                        <p className="text-steel leading-relaxed">
                            Between the mill and your site, we manage the parts that make steel trading complex:
                            technical specifications, independent inspection, shipping by land and sea, insurance and
                            payment structures.
                        </p>
                    </FadeUp>

                    <FadeUp delay={0.2} className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-outline-variant">
                        <div>
                            <span className="block text-[0.68rem] uppercase tracking-[0.22em] text-steel mb-3">Sourcing from</span>
                            <div className="flex flex-wrap gap-2">
                                {SOURCING_HUBS.map((hub) => (
                                    <span key={hub} className="px-3 py-1.5 text-xs font-medium border border-outline-variant rounded-full text-ivory bg-bg-alt">{hub}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="block text-[0.68rem] uppercase tracking-[0.22em] text-steel mb-3">Serving</span>
                            <div className="flex flex-wrap gap-2">
                                {MARKETS.map((m) => (
                                    <span key={m} className="px-3 py-1.5 text-xs font-medium rounded-full bg-gold/10 text-gold border border-gold/25">{m}</span>
                                ))}
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <span className="block text-[0.68rem] uppercase tracking-[0.22em] text-steel mb-3">Standards followed</span>
                            <div className="flex flex-wrap gap-2">
                                {STANDARDS.map((st) => (
                                    <span key={st.code} className="px-3 py-1.5 text-xs font-medium border border-outline-variant rounded-full text-ivory bg-bg-alt">
                                        {st.code} <span className="text-steel font-normal">· {st.origin}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </FadeUp>
                </div>
            </div>
        </section>
    )
}

function Inspection() {
    return (
        <section className="bg-bg-alt border-y border-outline-variant py-24 lg:py-32">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <FadeUp className="max-w-2xl mb-14 md:mb-16">
                    <Eyebrow>Quality Assurance</Eyebrow>
                    <h2 className="font-display text-3xl md:text-5xl font-semibold text-ivory uppercase leading-[1.1] mb-6">How we inspect material</h2>
                    <p className="text-steel leading-relaxed">
                        Every order is checked independently. We use both third-party laboratories and registered
                        third-party inspectors, and follow all major international standards.
                    </p>
                </FadeUp>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    <div className="lg:col-span-7 relative">
                        <span className="absolute left-6 top-6 bottom-6 w-px bg-outline-variant" aria-hidden="true" />
                        {INSPECTION_STEPS.map((step, i) => (
                            <FadeUp key={step.title} delay={i * 0.12} className="relative">
                                <div className={`group flex gap-6 ${i < INSPECTION_STEPS.length - 1 ? 'pb-10' : ''}`}>
                                    <span className="relative z-10 shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-bg-alt border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
                                        <span className="material-symbols-outlined text-xl">{step.icon}</span>
                                    </span>
                                    <div className="pt-2">
                                        <span className="block text-[0.68rem] uppercase tracking-[0.22em] text-gold mb-1">Step 0{i + 1}</span>
                                        <h3 className="font-display text-xl md:text-2xl font-semibold text-ivory uppercase mb-2">{step.title}</h3>
                                        <p className="text-steel leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            </FadeUp>
                        ))}
                    </div>

                    <FadeUp delay={0.2} className="lg:col-span-5">
                        <div className="relative overflow-hidden rounded-sm bg-[#0e0e0e] p-8 md:p-10">
                            <div
                                className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
                                style={{ background: DARK_GOLD }}
                            />
                            <span className="relative block text-[0.68rem] uppercase tracking-[0.25em] mb-2" style={{ color: DARK_GOLD }}>
                                International standards
                            </span>
                            <p className="relative font-display text-xl md:text-2xl text-white leading-snug mb-8">
                                All international standards followed
                            </p>
                            <div className="relative grid grid-cols-2 gap-px bg-white/10">
                                {STANDARDS.map((st) => (
                                    <div key={st.code} className="bg-[#0e0e0e] p-5 md:p-6">
                                        <span className="block font-display text-3xl md:text-4xl font-semibold" style={{ color: DARK_GOLD }}>{st.code}</span>
                                        <span className="block mt-1 text-[0.68rem] uppercase tracking-[0.2em] text-zinc-400">{st.origin}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeUp>
                </div>
            </div>
        </section>
    )
}

function Journey() {
    return (
        <section className="relative bg-[#0e0e0e] text-white py-24 lg:py-32 overflow-hidden">
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '64px 64px' }}
            />
            <div className="relative max-w-6xl mx-auto px-6 md:px-12">
                <FadeUp className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
                    <div>
                        <Eyebrow dark>Milestones</Eyebrow>
                        <h2 className="font-display text-3xl md:text-5xl font-semibold uppercase leading-[1.1]">Our journey</h2>
                    </div>
                    <p className="max-w-sm text-sm text-zinc-400 leading-relaxed">
                        Over a decade of steady growth — from regional deliveries in Dubai to large-volume mill partnerships worldwide.
                    </p>
                </FadeUp>

                <div className="relative">
                    {/* Track: vertical on mobile, horizontal on desktop */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10 md:hidden" />
                    <div className="hidden md:block absolute left-0 right-0 top-[7px] h-px bg-white/10" />
                    <motion.div
                        className="hidden md:block absolute left-0 right-0 top-[7px] h-px origin-left"
                        style={{ background: `linear-gradient(90deg, ${DARK_GOLD}, ${DARK_GOLD}55)` }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 1.8, ease: EASE }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6">
                        {MILESTONES.map((m, i) => (
                            <motion.div
                                key={m.year}
                                className="group relative pl-10 md:pl-0 md:pt-12"
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.7, delay: 0.25 + i * 0.18, ease: EASE }}
                            >
                                <span
                                    className="absolute left-0 top-1 md:top-0 w-[15px] h-[15px] rounded-full border-2 bg-[#0e0e0e] transition-transform duration-300 group-hover:scale-125"
                                    style={{ borderColor: DARK_GOLD, boxShadow: `0 0 0 5px #0e0e0e, 0 0 18px ${DARK_GOLD}66` }}
                                />
                                <span
                                    className="block font-display text-4xl lg:text-5xl font-semibold mb-4 text-transparent transition-colors duration-500 group-hover:text-[#e9c349]"
                                    style={{ WebkitTextStroke: `1px ${DARK_GOLD}` }}
                                >
                                    {m.year}
                                </span>
                                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white mb-3">{m.title}</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">{m.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function Mission() {
    return (
        <section className="relative py-28 lg:py-36 overflow-hidden">
            <img src={steelBeams} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover grayscale" />
            <div className="absolute inset-0 bg-black/80" />

            <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
                <FadeUp>
                    <Eyebrow dark center>Our Mission</Eyebrow>
                    <span className="block font-display text-7xl leading-none h-10 mb-2" style={{ color: DARK_GOLD }}>&ldquo;</span>
                    <blockquote className="font-display text-2xl sm:text-3xl md:text-[2.6rem] text-white leading-[1.3]">
                        To supply our customers with steel that meets industry standards, at competitive prices,
                        delivered <span style={{ color: DARK_GOLD }}>on time, every time.</span>
                    </blockquote>
                    <p className="mt-8 text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
                        Every decision we make is guided by this mission — from the mills we source from to the logistics partners we choose.
                    </p>
                </FadeUp>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 border border-white/10 bg-white/[0.03] backdrop-blur-sm rounded-sm">
                    {MISSION_PILLARS.map((p, i) => (
                        <FadeUp
                            key={p.title}
                            delay={0.15 + i * 0.12}
                            className={`p-8 text-left ${i > 0 ? 'border-t md:border-t-0 md:border-l border-white/10' : ''}`}
                        >
                            <span className="material-symbols-outlined text-3xl mb-4 block" style={{ color: DARK_GOLD }}>{p.icon}</span>
                            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white mb-2">{p.title}</h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
                        </FadeUp>
                    ))}
                </div>
            </div>
        </section>
    )
}

function ValueCreation() {
    return (
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-5">
                    <FadeUp className="lg:sticky lg:top-32">
                        <Eyebrow>Core Competency</Eyebrow>
                        <h2 className="font-display text-3xl md:text-5xl font-semibold text-ivory uppercase leading-[1.1] mb-6">Value creation</h2>
                        <p className="text-steel leading-relaxed max-w-md">
                            Our strength lies in our focus. We concentrate on products we know inside out, delivering
                            best-in-class solutions that facilitate trade between every stakeholder in the chain.
                        </p>
                    </FadeUp>
                </div>

                <div className="lg:col-span-7">
                    {COMPETENCIES.map((c, i) => (
                        <FadeUp key={c.title} delay={i * 0.1}>
                            <div className="group relative grid grid-cols-[auto_1fr] gap-6 md:gap-10 py-10 border-t border-outline-variant last:border-b">
                                <span className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-700 ease-out group-hover:w-full" />
                                <span className="font-display text-5xl md:text-6xl font-semibold text-gold/30 leading-none transition-colors duration-500 group-hover:text-gold">
                                    0{i + 1}
                                </span>
                                <div>
                                    <h3 className="font-display text-xl md:text-2xl font-semibold text-ivory uppercase mb-3">{c.title}</h3>
                                    <p className="text-steel leading-relaxed">{c.desc}</p>
                                </div>
                            </div>
                        </FadeUp>
                    ))}
                </div>
            </div>
        </section>
    )
}

function WhyUs() {
    return (
        <section className="bg-bg-alt border-y border-outline-variant py-24 lg:py-32">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <FadeUp className="text-center mb-16">
                    <Eyebrow center>Competitive Edge</Eyebrow>
                    <h2 className="font-display text-3xl md:text-5xl font-semibold text-ivory uppercase leading-[1.1]">Why choose us</h2>
                </FadeUp>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {WHY_US.map((w, i) => (
                        <FadeUp key={w.title} delay={i * 0.1} amount={0.2}>
                            <div className="group relative h-full p-8 bg-bg border border-outline-variant rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.25)] hover:border-gold/40">
                                <span className="absolute top-0 left-0 h-[2px] w-full bg-gold origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                                <span className="absolute top-6 right-6 font-display text-sm text-steel/50">0{i + 1}</span>
                                <div className="w-12 h-12 mb-8 flex items-center justify-center rounded-sm border border-gold/30 text-gold bg-gold/5 transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
                                    <span className="material-symbols-outlined text-2xl">{w.icon}</span>
                                </div>
                                <h3 className="font-display text-lg font-semibold text-ivory uppercase leading-snug mb-3">{w.title}</h3>
                                <p className="text-sm text-steel leading-relaxed">{w.desc}</p>
                            </div>
                        </FadeUp>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Leadership() {
    return (
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
                <FadeUp className="lg:col-span-5 relative">
                    <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/40 rounded-sm hidden sm:block" />
                    <div className="group relative rounded-sm overflow-hidden aspect-[4/5] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]">
                        <img
                            src={ceoPhoto}
                            alt="Mr Indronil Mukherjee, Chief Executive Officer"
                            className="w-full h-full object-cover object-[center_66%] transition-transform duration-1000 ease-out group-hover:scale-105"
                        />
                    </div>
                </FadeUp>

                <div className="lg:col-span-7">
                    <FadeUp>
                        <Eyebrow>Leadership</Eyebrow>
                        <p className="font-display text-2xl md:text-4xl text-ivory leading-[1.25] mb-8">
                            &ldquo;Sourcing steel isn't just about buying a commodity —
                            <span className="text-gold"> it's about cutting through complexity.</span>&rdquo;
                        </p>
                    </FadeUp>
                    <FadeUp delay={0.1} className="space-y-4">
                        <p className="text-steel leading-relaxed">
                            From the day we started, our goal has been simple: to understand exactly what the market needs,
                            to keep innovating, and to empower our people to do their very best work. With its wide range of
                            technical specifications, varied origins and unique mill capabilities, steel sourcing can be an
                            incredibly complex process.
                        </p>
                        <p className="text-steel leading-relaxed">
                            That's where we come in. Whether you need strategic sourcing, flexible financing or a seamless
                            supply chain, we are here to provide reliable, efficient solutions for every project.
                        </p>
                    </FadeUp>
                    <FadeUp delay={0.2} className="mt-10 pt-6 border-t border-outline-variant flex items-center gap-4">
                        <span className="h-10 w-px bg-gold" />
                        <div>
                            <span className="block font-display text-lg font-semibold text-ivory">Mr Indronil Mukherjee</span>
                            <span className="block text-xs uppercase tracking-[0.2em] text-gold mt-0.5">Chief Executive Officer</span>
                        </div>
                    </FadeUp>
                </div>
            </div>
        </section>
    )
}

function ClosingCta() {
    return (
        <section className="px-6 md:px-12 pb-24 lg:pb-32">
            <FadeUp className="relative max-w-6xl mx-auto overflow-hidden rounded-sm bg-[#0e0e0e] px-8 py-14 md:px-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div
                    className="absolute -right-24 -top-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ background: DARK_GOLD }}
                />
                <div className="relative">
                    <Eyebrow dark>Work with us</Eyebrow>
                    <h2 className="font-display text-2xl md:text-4xl font-semibold text-white uppercase leading-tight max-w-xl">
                        Let's source the steel your next project needs
                    </h2>
                </div>
                <Link
                    to="/contact"
                    className="relative shrink-0 inline-flex items-center gap-3 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:gap-5"
                    style={{ background: DARK_GOLD }}
                >
                    Get in touch
                    <span aria-hidden="true">&rarr;</span>
                </Link>
            </FadeUp>
        </section>
    )
}


// ── Main About Page ──────────────────────────────────────────────────────────

const About = () => {
    useEffect(() => {
        document.documentElement.classList.add('light')
    }, [])

    return (
        <div className="bg-bg text-on-surface font-body min-h-screen antialiased">
            <Hero />
            <Profile />
            <Inspection />
            <Journey />
            <Mission />
            <ValueCreation />
            <WhyUs />
            <Leadership />
            <ClosingCta />
        </div>
    )
}

export default About
