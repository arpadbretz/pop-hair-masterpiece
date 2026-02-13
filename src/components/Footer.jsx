import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TikTokIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const bookingLink = "https://b998424.alteg.io/company/624179/personal/menu?o=";

const Footer = () => {
    return (
        <footer id="footer" className="bg-black text-white pt-32 pb-12 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
                <h2 className="text-[40vw] font-serif italic text-white leading-none absolute -left-[20%] -top-[10%]">POP</h2>
            </div>

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-20 mb-32">
                    <div className="lg:col-span-8">
                        <h3 className="text-5xl md:text-[8vw] font-serif italic leading-[0.85] mb-12 text-white">
                            Találjuk meg az Ön<br /><span className="text-gold-gradient">valódi énjét.</span>
                        </h3>
                        <div className="flex flex-wrap gap-12 md:gap-24">
                            <div className="space-y-4">
                                <p className="text-xs uppercase font-bold tracking-[0.4em] text-gray-500">Hívjon Minket</p>
                                <a href="tel:06305901766" className="text-3xl font-serif text-luxury-gold hover:text-white transition-colors">06 30 590 1766</a>
                            </div>
                            <div className="space-y-4">
                                <p className="text-xs uppercase font-bold tracking-[0.4em] text-gray-500">Találkozzunk</p>
                                <p className="text-3xl font-serif text-luxury-gold">Budapest, Alkotás u. 39 c, 1023</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col justify-end gap-16">
                        <div className="space-y-6">
                            <p className="text-xs uppercase font-bold tracking-[0.4em] text-gray-500">Kövessen Minket</p>
                            <div className="flex gap-10">
                                <a href="https://www.instagram.com/pophair_szalon/" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold transition-colors transform hover:scale-110 duration-300">
                                    <Instagram size={28} />
                                </a>
                                <a href="https://www.facebook.com/pophairszalon" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold transition-colors transform hover:scale-110 duration-300">
                                    <Facebook size={28} />
                                </a>
                                <a href="#" className="hover:text-luxury-gold transition-colors transform hover:scale-110 duration-300">
                                    <TikTokIcon size={28} />
                                </a>
                            </div>
                        </div>
                        <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="w-full">
                            <button className="w-full py-8 bg-luxury-gold text-black text-[12px] uppercase font-bold tracking-[0.6em] hover:bg-white transition-all transform hover:-translate-y-2 shadow-2xl">
                                Időpontfoglalás
                            </button>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-white/5">
                    <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Oldalak</p>
                        <div className="flex flex-col gap-2">
                            <Link to="/" className="text-sm hover:text-luxury-gold transition-colors">Főoldal</Link>
                            <Link to="/rolunk" className="text-sm hover:text-luxury-gold transition-colors">Rólunk</Link>
                            <Link to="/szolgaltatasok" className="text-sm hover:text-luxury-gold transition-colors">Szolgáltatások</Link>
                            <Link to="/galeria" className="text-sm hover:text-luxury-gold transition-colors">Galéria</Link>
                            <Link to="/kapcsolat" className="text-sm hover:text-luxury-gold transition-colors">Kapcsolat</Link>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Szolgáltatások</p>
                        <div className="flex flex-col gap-2 text-sm text-gray-400">
                            <span>Elrontott hajak javítása</span>
                            <span>Mesterfodrászat</span>
                            <span>Balayage Ritual</span>
                            <span>Kevin Murphy Rituálé</span>
                        </div>
                    </div>
                    <div className="col-span-2 space-y-4">
                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Hírlevél</p>
                        <div className="flex border-b border-white/20 pb-2">
                            <input type="email" placeholder="E-mail címe" className="bg-transparent border-none outline-none text-sm w-full" />
                            <ArrowUpRight size={20} className="text-luxury-gold" />
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-gray-500">
                    <p className="text-[8px] uppercase tracking-[0.6em]">© 2026 POP HAIR SALON • MINDEN JOG FENNTARTVA • PROMETHEUS DIGITAL</p>
                    <div className="flex gap-12">
                        {["Szabályzat", "Karrier", "Sajtó"].map(item => (
                            <span key={item} className="text-[9px] uppercase font-bold tracking-widest hover:text-white transition-colors cursor-pointer">{item}</span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
