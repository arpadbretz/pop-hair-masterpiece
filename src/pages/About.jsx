import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle, PerspectiveReveal } from '../components/Common';
import { Instagram, Facebook, ArrowRight, Award, History, Heart, ShieldCheck, Zap } from 'lucide-react';

// Assets - Renamed and exclusive JPGs
import aboutHero from '../assets/stilus-portre-1.jpg'; // Higher resolution portrait
import philImg from '../assets/kevin-murphy-termek-3.jpg';
import team1 from '../assets/eskuvo-munkank-1.jpg'; // Using high quality model shots
import team2 from '../assets/editorial-munkank-2.jpg';
import team3 from '../assets/balayage-munkank-2.jpg';

const bookingLink = "https://b998424.alteg.io/company/624179/personal/menu?o=";

const team = [
    {
        name: "Bacsik Szilvia",
        role: "Tulajdonos & Vezető mesterfodrász",
        bio: "Húsz év szakértelem és a divatvilág iránti szenvedély hívta életre a POP Hair szalont. Szilvia nevét a precizitás és az arányérzék fémjelzi. Kevin Murphy szakértőként hitvallása, hogy a haj egészségét nem alku tárgya. Több mint egy évtizede aktív a Fashion Weekeken és fotózásokon, ahol az esküvői hajszobrászat egyik legelismertebb hazai képviselvevé vált.",
        img: team1,
        speciality: "Esküvői Hajspecialista & Creative Director"
    },
    {
        name: "Szilágyi Gábor",
        role: "Mesterfodrász",
        bio: "Gábor munkáját a tudatosság és a könyörtelen szakmai igényesség jellemzi. Nem hisz a sablonokban: minden arc és karakter egy új kihívás számára. Vendégei a technikai tökéletesség és a nyugodt, professzionális figyelem miatt választják újra és újra. Számára a minőség egy következetes életforma.",
        img: team2,
        speciality: "Precíziós Hajvágás & Formatervezés"
    },
    {
        name: "Csala Dani",
        role: "Fodrászművész",
        bio: "Dani az új generáció energiáját ötvözi a klasszikus alapokkal. Elhivatottsága és friss szemlélete garancia arra, hogy a végeredmény nemcsak trendi, hanem az egyéniséget is tökéletesen tükrözi. Szenvedélye az egyedi stílusok megalkotása és a haj textúrájával való művészi játék.",
        img: team3,
        speciality: "Modern Stílus & Textúra"
    }
];

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-transition-wrapper pt-32 bg-white"
        >
            {/* Intro Philosophy Section */}
            <section className="py-32 px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-24 lg:gap-32 items-center">
                        <div className="space-y-12">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-[1px] bg-luxury-gold" />
                                <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-luxury-gold">Önazonosság</span>
                            </div>
                            <h2 className="text-6xl md:text-8xl font-serif italic text-black leading-tight tracking-tighter">
                                Tudatos <br />
                                <span className="text-gold-gradient">Stílusépítés.</span>
                            </h2>
                            <div className="space-y-8 text-2xl font-light text-gray-500 leading-relaxed italic border-l border-luxury-gold/20 pl-10">
                                <p>"A Pop Hair Salon nem csupán egy szalon, hanem egy tér, ahol a magas szintű szakmai tudás és a személyre szabott figyelem találkozik."</p>
                            </div>
                            <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed max-w-xl">
                                <p>Nálunk nem futószalag-szolgáltatás zajlik. Minden vendéget egyéniségként kezelünk, és minden frizura mögött átgondolt szakmai döntés áll. Csapatunk számára a precizitás, az igényesség és a folyamatos fejlődés alapérték.</p>
                                <p>Célunk, hogy mindenki magabiztosan, önazonosan és elégedetten távozzon tőlünk.</p>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="aspect-[3/4] overflow-hidden p-2 border border-luxury-gold/10">
                                <img
                                    src={aboutHero}
                                    className="w-full h-full object-cover brightness-95 group-hover:brightness-105 transition-all duration-[2000ms]"
                                    alt="Salon Atmosphere"
                                />
                            </div>
                            {/* Floating Stats */}
                            <div className="absolute -bottom-16 -left-16 bg-black text-white p-12 hidden xl:block border border-luxury-gold/20 shadow-2xl">
                                <div className="space-y-8">
                                    <div className="flex gap-6 items-center">
                                        <History size={24} className="text-luxury-gold" />
                                        <div>
                                            <p className="text-2xl font-serif italic">20+ Év</p>
                                            <p className="text-[9px] uppercase tracking-widest text-gray-400">Tapasztalat</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-center">
                                        <Award size={24} className="text-luxury-gold" />
                                        <div>
                                            <p className="text-2xl font-serif italic">KM Specialist</p>
                                            <p className="text-[9px] uppercase tracking-widest text-gray-400">Minősítés</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team - High End Headshots */}
            <section className="py-64 bg-off-white relative">
                <div className="max-w-7xl mx-auto px-8">
                    <SectionTitle title="A Mesterek" subtitle="SZAKMAI ELIT" align="center" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-24 lg:gap-32">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                                className="flex flex-col items-center group text-center"
                            >
                                <div className="relative mb-16">
                                    {/* Circular Headshot Wrapper */}
                                    <div className="w-72 h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10">
                                        <img
                                            src={member.img}
                                            className="w-full h-full object-cover transition-all duration-[1200ms] group-hover:scale-110"
                                            alt={member.name}
                                        />
                                    </div>
                                    {/* Decorative Gold Ring */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute -inset-4 border border-luxury-gold/20 rounded-full border-dashed z-0"
                                    />
                                </div>

                                <span className="text-[10px] uppercase font-bold tracking-[0.6em] text-luxury-gold mb-4 group-hover:text-black transition-colors">{member.role}</span>
                                <h3 className="text-4xl md:text-5xl font-serif italic mb-8 group-hover:text-luxury-gold transition-colors">{member.name}</h3>

                                <div className="space-y-6 max-w-sm px-4">
                                    <p className="text-sm font-light text-gray-400 leading-relaxed group-hover:text-gray-600 transition-colors">{member.bio}</p>
                                    <div className="pt-6 border-t border-black/5 flex flex-col items-center gap-2">
                                        <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-black">{member.speciality}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Kevin Murphy Philosophy Section */}
            <section className="py-64 bg-white relative overflow-hidden text-black">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <SectionTitle title="A Márka Mögött" subtitle="KEVIN MURPHY FILOZÓFIA" />
                            <div className="space-y-8 text-xl font-light text-gray-500 leading-relaxed">
                                <p>A Kevin Murphy nem csupán egy termékcsalád, hanem egy szemléletmód. A bőrápolás technológiájára építve, a legtisztább természetes alapanyagokat ötvözi a tudomány erejével.</p>
                                <p>Fenntarthatóság, környezettudatosság és kompromisszummentes minőség. Ezek azok az értékek, amelyek mentén szalonunkban minden egyes hajszálat kezelünk.</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-8 border border-black/5 bg-off-white">
                                    <ShieldCheck className="text-luxury-gold mb-4" size={32} />
                                    <h4 className="font-serif italic text-xl mb-4">Szigorú Alapanyagok</h4>
                                    <p className="text-sm text-gray-400">Parabén- és szulfátmentes összetevők a haj egészségéért.</p>
                                </div>
                                <div className="p-8 border border-black/5 bg-off-white">
                                    <Zap className="text-luxury-gold mb-4" size={32} />
                                    <h4 className="font-serif italic text-xl mb-4">Azonnali Hatás</h4>
                                    <p className="text-sm text-gray-400">Könnyed, mégis tartós eredmények minden hajtípusra.</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square overflow-hidden border border-luxury-gold/20 p-2">
                                <img src={philImg} className="w-full h-full object-cover" alt="KM Products" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Specialty Callout */}
            <section className="py-48 bg-black text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <h2 className="text-[30vw] font-serif italic leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">POP HAIR</h2>
                </div>
                <div className="max-w-4xl mx-auto px-8 relative z-10">
                    <span className="text-gold-champagne text-[11px] uppercase tracking-[1em] mb-12 block">Vezető Szakértelem</span>
                    <h3 className="text-4xl md:text-7xl font-serif italic leading-tight mb-16">
                        "A kifogástalan minőség és az igényekre szabott szakmai döntések teszik igazán <span className="text-gold-gradient">maradandóvá a frizurát."</span>
                    </h3>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-[1px] bg-luxury-gold" />
                        <span className="text-[10px] uppercase font-bold tracking-[0.5em]">Bacsik Szilvia</span>
                        <div className="w-12 h-[1px] bg-luxury-gold" />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-8 flex flex-col items-center text-center">
                    <Heart className="text-luxury-gold mb-8 animate-pulse" size={32} />
                    <h2 className="text-4xl md:text-6xl font-serif italic mb-12">Készen áll a <span className="text-luxury-gold">változásra?</span></h2>
                    <a
                        href={bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-16 py-6 bg-luxury-gold text-black text-[12px] uppercase font-bold tracking-[0.5em] shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-shadow"
                    >
                        Időpontfoglalás
                    </a>
                </div>
            </section>
        </motion.div>
    );
};

export default About;
