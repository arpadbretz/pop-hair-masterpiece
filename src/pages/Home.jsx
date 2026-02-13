import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Instagram, Facebook, ArrowRight, Play, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewSlider from '../components/ReviewSlider';
import { SectionTitle, PerspectiveReveal } from '../components/Common';

// Assets - Renamed and exclusive JPGs
import kmImg from '../assets/kevin-murphy-termek-1.jpg';
import work1 from '../assets/balayage-munkank-1.jpg';
import work2 from '../assets/eskuvo-munkank-1.jpg';
import work3 from '../assets/szalon-belso-1.jpg';
import videoSrc from '../assets/szilvi 2.mov';

const bookingLink = "https://b998424.alteg.io/company/624179/personal/menu?o=";

const Home = () => {
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 800], [0, 300]);
    const yImage = useSpring(useTransform(scrollY, [0, 800], [0, -150]), { stiffness: 100, damping: 30 });
    const scale = useTransform(scrollY, [0, 1000], [1, 1.3]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="page-transition-wrapper bg-white"
        >
            {/* Hero Section - Video Background Style */}
            <section className="relative h-screen md:h-[110vh] w-full flex items-center justify-center bg-black overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-60 scale-105"
                    >
                        <source src={videoSrc} type="video/quicktime" />
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                </div>

                <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-12"
                    >
                        <div className="flex flex-col items-center gap-6 mb-8">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: 100 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="h-[1px] bg-luxury-gold"
                            />
                            <span className="text-[11px] uppercase tracking-[1em] text-luxury-gold font-bold block">Budai Szalon • Alapítva 2004</span>
                        </div>
                        <h1 className="text-6xl md:text-[10vw] font-serif italic leading-[0.8] text-white tracking-tighter mb-8 drop-shadow-2xl">
                            A szépség mint<br />
                            <span className="text-gold-gradient">mestermű.</span>
                        </h1>

                        <p className="text-xl md:text-2xl font-light text-white/80 max-w-2xl mx-auto leading-relaxed italic drop-shadow-lg">
                            Húsz év szakértelem Budán, a stílus és az önazonosság találkozásánál. Nálunk a hajformázás nem csupán szolgáltatás, hanem egyénre szabott alkotás.
                        </p>

                        <div className="flex flex-wrap justify-center gap-12 pt-8">
                            <a
                                href={bookingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-6"
                            >
                                <div className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center transition-all duration-700 bg-white/5 backdrop-blur-md group-hover:bg-luxury-gold group-hover:border-luxury-gold group-hover:text-black group-hover:scale-110">
                                    <ArrowUpRight size={32} className="text-white group-hover:text-black transition-transform duration-500 group-hover:rotate-45" />
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[12px] uppercase font-bold tracking-[0.5em] text-white drop-shadow-md">Időpontfoglalás</span>
                                    <span className="text-[9px] text-luxury-gold uppercase tracking-widest mt-2 font-bold">Konzultáció kérése</span>
                                </div>
                            </a>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-16 left-10">
                    <div className="w-28 h-28 rounded-full border border-white/20 backdrop-blur-sm flex items-center justify-center animate-spin-slow text-center p-3">
                        <span className="text-[8px] text-white/50 uppercase tracking-tighter leading-tight font-bold">KEVIN MURPHY • BUDA • 20 ÉV • PRÉMIUM •</span>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
                >
                    <span className="text-[9px] uppercase tracking-[0.8em] text-white rotate-180 [writing-mode:vertical-lr]">Scroll</span>
                    <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
                </motion.div>
            </section>

            {/* Social Proof - Review Slider */}
            <ReviewSlider />

            {/* Kevin Murphy Brand Section */}
            <section className="py-64 bg-black text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[50%] h-full bg-luxury-gold/10 blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid lg:grid-cols-2 gap-32 items-center">
                        <div className="relative group">
                            <div className="aspect-[4/5] overflow-hidden p-3 border border-white/10 relative">
                                <img
                                    src={kmImg}
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-[2000ms] scale-105 group-hover:scale-100"
                                    alt="Kevin Murphy Ritual"
                                />
                                <div className="absolute inset-0 border border-luxury-gold/30 scale-95 group-hover:scale-105 transition-transform duration-1000" />
                            </div>
                            <div className="absolute -bottom-12 -right-12 bg-luxury-gold px-12 py-8 hidden md:block group-hover:-translate-x-4 group-hover:-translate-y-4 transition-transform duration-700 shadow-2xl">
                                <p className="text-black font-serif italic text-3xl tracking-tighter leading-none">The Gold <br /> Standard.</p>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <PerspectiveReveal>
                                <span className="text-luxury-gold text-[10px] uppercase font-bold tracking-[0.6em] mb-8 block font-black">Exkluzív Partnerség</span>
                                <h2 className="text-6xl md:text-[8vw] font-serif italic leading-[0.9] text-white tracking-tighter mb-12">
                                    Kevin <br />
                                    <span className="text-gold-gradient">Murphy.</span>
                                </h2>
                                <div className="space-y-8 text-xl font-light text-gray-400 leading-relaxed max-w-xl">
                                    <p>Kizárólag a legmagasabb minőségű, környezettudatos és innovatív Kevin Murphy termékekkel dolgozunk. Nálunk minden hajmosás egy rituálé, minden kezelés egy befektetés az Ön szépségébe.</p>
                                    <p>Saját fejlesztésű rituáléinkkal és balayage specialistáinkkal a haj egészségét és a modern esztétikát ötvözzük.</p>
                                </div>
                            </PerspectiveReveal>

                            <Link to="/rolunk" className="inline-flex items-center gap-6 text-gold-champagne hover:text-white transition-all group pt-8">
                                <span className="text-[11px] uppercase font-bold tracking-[0.5em] border-b border-gold-champagne/30 hover:border-white pb-2">A Szalon Filozófiája</span>
                                <div className="w-12 h-12 rounded-full border border-gold-champagne flex items-center justify-center group-hover:bg-white group-hover:border-white group-hover:text-black transition-all">
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action - Sections Grid */}
            <section className="py-64 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-8">
                    <SectionTitle title="Fedezze fel" subtitle="SZOLGÁLTATÁSOK" align="center" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24">
                        {[
                            { title: "Mesterfodrászat", path: "/szolgaltatasok", img: work1, desc: "Egyénre szabott stílusépítés" },
                            { title: "Esküvői Design", path: "/eskuvo", img: work2, desc: "Unikális alkalmi hajköltemények" },
                            { title: "Lookbook", path: "/galeria", img: work3, desc: "Inspiráció és munkáink" }
                        ].map((item, i) => (
                            <Link key={i} to={item.path} className="group relative aspect-[3/4] overflow-hidden flex flex-col justify-end p-12 bg-black">
                                <img
                                    src={item.img}
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-[2000ms]"
                                    alt={item.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                                <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-4">
                                    <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-luxury-gold-light mb-4 block">{item.desc}</span>
                                    <h3 className="text-4xl font-serif italic text-white mb-8 group-hover:text-gold-champagne transition-colors">{item.title}</h3>
                                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-white">Megtekintés</span>
                                        <div className="w-8 h-[1px] bg-white w-0 group-hover:w-12 transition-all duration-700" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expertise Banner */}
            <section className="py-32 bg-off-white border-y border-luxury-gold/10">
                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-16">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-serif italic mb-6 leading-tight">Minden hajszál egy <span className="text-luxury-gold">új történet</span> kezdete.</h2>
                        <p className="text-gray-500 font-light text-lg uppercase tracking-wide leading-relaxed">Elrontott hajak professzionális helyrehozása és tudatos stílustanácsadás Budán.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="p-10 border border-luxury-gold/30 rounded-full flex flex-col items-center justify-center text-center group hover:border-luxury-gold transition-colors duration-500">
                            <span className="text-3xl font-serif italic text-luxury-gold mb-1">20+</span>
                            <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Év tapasztalat</span>
                        </div>
                        <div className="p-10 border border-luxury-gold/30 rounded-full flex flex-col items-center justify-center text-center group hover:border-luxury-gold transition-colors duration-500">
                            <span className="text-3xl font-serif italic text-luxury-gold mb-1">500+</span>
                            <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Értékelés</span>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
