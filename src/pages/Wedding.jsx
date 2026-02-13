import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle, PerspectiveReveal } from '../components/Common';
import { Heart, Camera, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Assets - Renamed and exclusive JPGs
import weddingHero from '../assets/eskuvo-munkank-2.jpg'; // High resolution hero
import weddingWork1 from '../assets/eskuvo-munkank-3.jpg';
import weddingWork2 from '../assets/eskuvo-munkank-5.jpg';
import weddingWork3 from '../assets/eskuvo-boldogsag.jpg';
import weddingWork4 from '../assets/eskuvo-tanuk.jpg';

const bookingLink = "https://b998424.alteg.io/company/624179/personal/menu?o=";

const Wedding = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-transition-wrapper pt-32 bg-white"
        >
            {/* Editorial Hero */}
            <section className="h-[90vh] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0">
                    <img
                        src={weddingHero}
                        className="w-full h-full object-cover brightness-75 opacity-90"
                        alt="Wedding Mood"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white" />
                </div>

                <div className="relative z-10 text-center px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <span className="text-[11px] uppercase font-bold tracking-[1.2em] text-white drop-shadow-lg mb-12 block">A Nagy Nap Művészete</span>
                        <h1 className="text-7xl md:text-[12vw] font-serif italic text-white drop-shadow-2xl leading-none tracking-tighter">
                            Esküvői <br />
                            <span className="text-luxury-gold">Design.</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto italic leading-relaxed pt-8 drop-shadow-md">
                            "Hiszünk abban, hogy a menyasszonyi frizura nem csupán egy viselet, hanem a személyiség és az alkalom harmonikus kivetülése."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Expertise & Experience */}
            <section className="py-48 px-8 bg-off-white border-y border-luxury-gold/10 relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
                    <div className="order-2 lg:order-1 space-y-12">
                        <PerspectiveReveal>
                            <span className="text-luxury-gold text-[10px] uppercase font-bold tracking-[0.5em] mb-8 block font-black">Több mint egy évtized</span>
                            <h2 className="text-5xl md:text-7xl font-serif italic text-black leading-[0.9] mb-12">Páratlan <br />Szakértelem.</h2>
                            <div className="space-y-8 text-lg text-gray-500 font-light leading-relaxed">
                                <p>Bacsik Szilvia több mint egy évtizede aktív szereplője a divat világának. Rendszeres résztvevője fashion weekeknek, fotózásoknak és forgatásoknak, ami a menyasszonyi frizurák tervezésében is visszaköszön.</p>
                                <p>Kiemelt szakterülete az esküvői hajkészítés, ahol a precizitás, az elegancia és az egyéniség harmonikus egysége áll a középpontban. Minden alkotása az ügyfél egyéniségéhez igazodik, legyen szó klasszikus kontyról vagy modern, bohém stílusról.</p>
                            </div>
                        </PerspectiveReveal>

                        <div className="flex gap-16 pt-8 border-t border-black/5">
                            <div className="space-y-2">
                                <p className="text-4xl font-serif italic text-luxury-gold">20+</p>
                                <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Év tapasztalat</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-4xl font-serif italic text-luxury-gold">100+</p>
                                <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Boldog Menyasszony</p>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 grid grid-cols-2 gap-6 group">
                        <div className="aspect-[3/4] overflow-hidden translate-y-12 group-hover:translate-y-0 transition-transform duration-1000 shadow-2xl">
                            <img src={weddingWork1} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" alt="Wedding Detail" />
                        </div>
                        <div className="aspect-[3/4] overflow-hidden group-hover:translate-y-12 transition-transform duration-1000 shadow-2xl">
                            <img src={weddingWork2} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" alt="Wedding Detail" />
                        </div>
                    </div>
                </div>
            </section>

            {/* The Process */}
            <section className="py-64 bg-white">
                <div className="max-w-7xl mx-auto px-8">
                    <SectionTitle title="A Nagy Nap" subtitle="FOLYAMAT" align="center" />

                    <div className="grid md:grid-cols-3 gap-12 lg:gap-24">
                        {[
                            { icon: <Calendar />, title: "Konzultáció", desc: "Személyes megbeszélés, ahol feltérképezzük az Ön stílusát, az esküvői ruha jellegét és az alkalom hangulatát." },
                            { icon: <Sparkles />, title: "A Próba", desc: "Egy nyugodt, alapos folyamat, ahol kísérletezünk és finomhangoljuk a frizurát, amíg az tökéletesen tükrözi az Ön elképzeléseit." },
                            { icon: <Camera />, title: "A Helyszínen", desc: "Igény szerint a szalonban vagy külső helyszínen készítjük el a frizurát, biztosítva a feszültségmentes, luxus hangulatot." }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="bg-off-white p-12 hover:bg-black hover:text-white transition-all duration-700 group border border-luxury-gold/10"
                            >
                                <div className="w-16 h-16 rounded-full border border-luxury-gold/30 flex items-center justify-center mb-8 group-hover:border-white transition-colors">
                                    {React.cloneElement(step.icon, { size: 24, className: "text-luxury-gold group-hover:text-white transition-colors" })}
                                </div>
                                <h3 className="text-3xl font-serif italic mb-6">{step.title}</h3>
                                <p className="text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lookbook Grid */}
            <section className="py-48 px-8 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-24">
                        <div className="space-y-4">
                            <span className="text-gold-champagne text-[11px] uppercase tracking-[0.5em] block font-black">Inspiráció</span>
                            <h2 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter">Wedding <span className="text-gold-gradient">Lookbook.</span></h2>
                        </div>
                        <Link to="/galeria?cat=wedding" className="hidden md:flex items-center gap-4 text-white hover:text-gold-champagne transition-all group">
                            <span className="text-[10px] uppercase font-bold tracking-[0.4em]">Teljes Katalógus</span>
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            weddingWork1, weddingWork2, weddingWork3, weddingWork4
                        ].map((img, i) => (
                            <div key={i} className="aspect-[3/4] overflow-hidden group border border-white/5 shadow-2xl p-1">
                                <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt="Wedding work" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-48 bg-white overflow-hidden text-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl mx-auto px-8"
                >
                    <Heart className="text-luxury-gold mx-auto mb-12" size={40} fill="#D4AF37" />
                    <h2 className="text-5xl md:text-8xl font-serif italic text-black leading-tight mb-16 tracking-tighter">
                        Legyen a stílus az Ön <br /><span className="text-gold-gradient">legszebb ékszere.</span>
                    </h2>
                    <a
                        href={bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-16 py-6 bg-luxury-gold text-black text-[11px] uppercase font-bold tracking-[0.6em] shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-shadow text-center inline-block"
                    >
                        Időpontfoglalás
                    </a>
                </motion.div>
            </section>
        </motion.div>
    );
};

export default Wedding;
