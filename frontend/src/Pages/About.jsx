import React, { useEffect } from 'react'
import heroBg from '../assets/about/hero_bg.jpg'
import buildingDetail from '../assets/about/building_detail.jpg'
import ahmedCeo from '../assets/about/ahmed_ceo.jpg'

const About = () => {
    // Use IntersectionObserver for scroll-reveal animations
    useEffect(() => {
        const reveals = document.querySelectorAll('.reveal')
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active')
                    }
                })
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        )

        reveals.forEach((el) => observer.observe(el))

        return () => {
            reveals.forEach((el) => observer.unobserve(el))
        }
    }, [])

    const whyUsPillars = [
        {
            title: 'Integrity & Honesty',
            desc: 'The key pillars of our success are the values that guide us to be upfront and honest in all our transactions that helps us build trust and relationships.',
            icon: 'gavel'
        },
        {
            title: 'Consistent & Timely Delivery',
            desc: 'We understand the cost of delays sometimes can be immeasurable. That is why on time delivery is our single most focus once we sign the dotted line.',
            icon: 'schedule'
        },
        {
            title: 'Financial Strength & Resources',
            desc: 'Backed by financially strong credentials, we are fully equipped to take order sizes from small to large, from across the world.',
            icon: 'account_balance'
        },
        {
            title: 'Product Knowledge & Expertise',
            desc: 'With a passionate team of experts on board who bring in a vast experience of product know-how and the domain expertise to better understand your requirement and deliver as per your satisfaction.',
            icon: 'workspace_premium'
        }
    ]

    const competencies = [
        { title: 'For Steel Producers', desc: 'Metaled Trade provides low cost marketing and financial services to secure customers in export markets.' },
        { title: 'For Steel Buyers', desc: 'Metaled Trade provides a reliable and flexible sourcing channel with financial support.' },
        { title: 'Value Additions', desc: 'We provide safe handling of products, inspection, securing delivery, insurance, and a single platform for sourcing multiple products.' }
    ]

    return (
        <div className="bg-[#131313] text-on-surface font-body-md min-h-screen antialiased selection:bg-tertiary-container selection:text-on-tertiary-container">

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-[#131313] z-10"></div>
                    <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-[10s] scale-105"
                        style={{
                            backgroundImage: `url(${heroBg})`,
                            backgroundAttachment: 'fixed'
                        }}
                    ></div>
                </div>

                <div className="relative z-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
                    <div className="max-w-4xl reveal">
                        <span className="inline-block font-label-md text-label-md text-tertiary mb-3 uppercase tracking-[0.25em] bg-tertiary/10 px-3 py-1 border border-tertiary/20">
                            Dubai, UAE
                        </span>
                        <h1 className="font-display-lg text-4xl sm:text-5xl md:text-7xl font-extrabold text-primary mb-6 leading-[1.1] tracking-tight uppercase">
                            Gateway to Reliable <br />
                            <span className="text-tertiary text-transparent bg-clip-text bg-gradient-to-r from-tertiary via-[#ffe088] to-tertiary">Steel Sourcing</span>
                        </h1>
                        <div className="w-32 h-[3px] bg-tertiary mb-8 shadow-[0_0_15px_rgba(255,216,98,0.5)]"></div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#131313] to-transparent z-10"></div>
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
                            Metaled Trade is a Steel Trading Company based in Dubai, UAE. We are specialists in steel trading, right from production to delivery of material. Our main focus is the Middle East, South East Asia & Africa markets.
                        </p>
                        <p className="font-body-md text-base text-on-surface-variant/80 leading-relaxed font-light">
                            We supply from all major steel producing Hubs such as India, Vietnam, A1 Chinese Mills and reputed Local mills in GCC to cater to our esteemed customers. We provide customized financial and distribution options to our customers. Metaled Trade have a strong network of experienced partners and expert employees who enable us to nurture and develop solutions for supplying steel from world class mills.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section (Stunning Accent Boxed) */}
            <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
                <div className="reveal bg-gradient-to-r from-tertiary/5 via-amber-500/10 to-tertiary/5 border border-tertiary/25 p-8 md:p-12 relative overflow-hidden">
                    {/* Inner brackets decorative styling */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-tertiary/40"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-tertiary/40"></div>

                    <div className="max-w-3xl mx-auto text-center">
                        <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest block mb-3">Our Mission</span>
                        <h3 className="font-display-lg text-2xl md:text-3xl font-bold text-primary mb-6 uppercase tracking-wide">
                            Commitment to Consistency
                        </h3>
                        <p className="font-body-lg text-lg sm:text-xl text-tertiary-fixed leading-relaxed font-light italic">
                            "To provide our steel customers, products that are as per industry standards, competitively priced and delivered consistently on time."
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Competency Section */}
            <section className="py-unit-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
                <div className="text-center mb-16 reveal">
                    <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest block mb-2">Value Creation</span>
                    <h2 className="font-display-lg text-3xl md:text-4xl font-extrabold text-primary uppercase">Core Competency</h2>
                    <div className="w-16 h-[2px] bg-tertiary mx-auto mt-4"></div>
                    <p className="font-body-md text-base text-on-surface-variant max-w-3xl mx-auto mt-6 leading-relaxed font-light">
                        Our strength lies in our focus. We believe in concentrating on products, which we have full knowledge and expertise of. As we enlarge our activities and scope of service, we remain committed to give the best in class products and solutions which facilitate trade between stakeholders.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                    {competencies.map((comp, idx) => (
                        <div key={idx} className="reveal bg-gradient-to-br from-[#1b1c1c] to-[#131313] p-8 border border-outline-variant/40 machined-edge hover:border-tertiary/30 transition-all duration-300 shadow-md">
                            <span className="font-label-sm text-label-sm text-tertiary mb-4 block">0{idx + 1}.</span>
                            <h3 className="font-display-lg text-xl font-bold text-primary mb-4 uppercase tracking-wide">{comp.title}</h3>
                            <p className="font-body-md text-sm text-on-surface-variant/80 leading-relaxed font-light">{comp.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Us Section */}
            <section className="py-unit-xl bg-[#0e0e0e] border-y border-outline-variant/35 relative">
                <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
                    <div className="text-center mb-16 reveal">
                        <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest block mb-2">Competitive Edge</span>
                        <h2 className="font-display-lg text-3xl sm:text-4xl font-bold text-primary uppercase">Why Choose Us?</h2>
                        <div className="w-16 h-[2px] bg-tertiary mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                        {whyUsPillars.map((pillar, idx) => (
                            <div key={idx} className="reveal bg-[#131313]/50 p-8 border border-outline-variant/20 hover:border-tertiary/20 transition-all duration-300 flex gap-6 items-start">
                                <div className="w-12 h-12 bg-tertiary/10 border border-tertiary/20 flex items-center justify-center text-tertiary shrink-0">
                                    <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-display-lg text-lg font-bold text-primary uppercase mb-2">{pillar.title}</h3>
                                    <p className="font-body-md text-sm text-on-surface-variant/80 leading-relaxed font-light">{pillar.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Single Leader Section */}
            <section className="py-unit-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
                <div className="text-center mb-16 reveal">
                    <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest block mb-2">Governance</span>
                    <h2 className="font-display-lg text-3xl sm:text-4xl font-bold text-primary uppercase">Leadership</h2>
                    <div className="w-16 h-[2px] bg-tertiary mx-auto mt-4"></div>
                </div>

                {/* Premium Single Executive Split Layout */}
                <div className="reveal bg-gradient-to-br from-[#1b1c1c] to-[#0e0e0e] border border-outline-variant/40 p-8 md:p-12 flex flex-col lg:flex-row gap-unit-xl items-center shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-12 -left-12 w-64 h-64 bg-tertiary/5 rounded-full blur-[100px] pointer-events-none"></div>

                    {/* Leader Portrait */}
                    <div className="w-full lg:w-2/5 shrink-0 max-w-[380px] aspect-[3/4] overflow-hidden border border-outline-variant/40 shadow-lg relative">
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-all duration-500 z-10"></div>
                        <img
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                            alt="Ahmed Al-Maktoum Portrait"
                            src={ahmedCeo}
                        />
                    </div>

                    {/* Leader Description & Quote */}
                    <div className="w-full lg:w-3/5">
                        <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest font-semibold block mb-1">
                            Chief Executive Officer
                        </span>
                        <h3 className="font-display-lg text-3xl sm:text-4xl font-bold text-primary uppercase mb-4 tracking-wide group-hover:text-tertiary transition-colors duration-300">
                            Ahmed Al-Maktoum
                        </h3>
                        <div className="w-12 h-[2px] bg-tertiary mb-6"></div>

                        <p className="font-body-lg text-lg text-on-surface leading-relaxed font-light mb-6">
                            Ahmed Al-Maktoum heads Metaled Trade's global commodities desks, overseeing relationships with elite smelting mills and organizing deep-sea logistics channels across the GCC, Africa, and Southeast Asia.
                        </p>
                        <p className="font-body-md text-sm text-on-surface-variant/80 leading-relaxed font-light mb-8">
                            Under his direction, the company has expanded its GCC footprint, partnering with A1 mills and local GCC smelting plants to secure stable, high-volume material flow for critical commercial and transit infrastructure developments.
                        </p>

                        {/* Quote decoration */}
                        <div className="relative border-l border-tertiary/50 pl-6 py-2 bg-tertiary/5">
                            <p className="font-body-md text-base text-tertiary-fixed font-light italic">
                                "Our single most focus once we sign the dotted line is consistent, timely execution. Delays in raw material sourcing carry immeasurable structural cost to our clients."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default About