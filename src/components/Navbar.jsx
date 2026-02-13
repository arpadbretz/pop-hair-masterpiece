import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X, Instagram, Facebook } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import logoImg from '../assets/logo.png';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const location = useLocation();

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    // Pages with dark hero sections where white text is needed at the top
    const isDarkHeroPage = location.pathname === '/' || location.pathname === '/eskuvo';

    // Logic: 
    // - If scrolled, background is white -> text must be black.
    // - If not scrolled and not on a dark hero page -> text must be black (white background).
    // - If not scrolled and on a dark hero page -> text must be white.
    const navTextColor = (isScrolled || !isDarkHeroPage) ? "text-black" : "text-white";

    const navItems = [
        { name: 'Főoldal', path: '/' },
        { name: 'Rólunk', path: '/rolunk' },
        { name: 'Szolgáltatások', path: '/szolgaltatasok' },
        { name: 'Galéria', path: '/galeria' },
        { name: 'Esküvő', path: '/eskuvo' },
        { name: 'Kapcsolat', path: '/kapcsolat' },
    ];

    const bookingLink = "https://b998424.alteg.io/company/624179/personal/menu?o=";

    return (
        <>
            <motion.nav
                className={cn(
                    "fixed top-0 left-0 w-full z-50 transition-all duration-700 px-6 md:px-12 py-6 md:py-10 flex items-center justify-between",
                    isScrolled ? "bg-white/95 backdrop-blur-2xl py-4 shadow-sm border-b border-black/[0.03]" : "bg-transparent"
                )}
            >
                <Link to="/" className="flex items-center gap-6 group cursor-pointer transition-transform hover:scale-105 duration-500">
                    <img src={logoImg} alt="POP HAIR Logo" className={cn("h-20 w-auto object-contain transition-all duration-500", !isScrolled && isDarkHeroPage ? "brightness-0 invert" : "brightness-0")} />
                    <div className="flex flex-col">
                        <h1 className={cn(
                            "text-xl md:text-2xl font-serif tracking-[0.4em] font-black italic leading-none mb-1 transition-colors duration-500",
                            navTextColor
                        )}>POP HAIR</h1>
                        <span className="text-[7px] uppercase tracking-[0.5em] text-luxury-gold font-bold">Budai Mesterszalon</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-14">
                    <div className="flex items-center gap-10">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={cn(
                                    "text-[10px] uppercase font-bold tracking-[0.4em] transition-all relative group overflow-hidden py-2",
                                    location.pathname === item.path
                                        ? "text-luxury-gold"
                                        : `${navTextColor} hover:text-luxury-gold`
                                )}
                            >
                                <span className="block transition-transform duration-500 group-hover:-translate-y-full">{item.name}</span>
                                <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full text-luxury-gold">{item.name}</span>
                                {location.pathname === item.path && (
                                    <motion.div
                                        layoutId="navUnderline"
                                        className="absolute bottom-0 left-0 w-full h-[1px] bg-luxury-gold"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    <a
                        href={bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-10 py-4 group overflow-hidden border border-black/10 transition-colors bg-luxury-gold text-black font-bold uppercase tracking-[0.4em] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-shadow text-[10px]"
                    >
                        Időpontfoglalás
                    </a>
                </div>

                <button
                    className={cn(
                        "lg:hidden p-2 transition-colors duration-500",
                        navTextColor
                    )}
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Menu size={28} />
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white flex flex-col"
                    >
                        <div className="p-8 flex justify-between items-center border-b border-black/5">
                            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4">
                                <img src={logoImg} alt="Logo" className="w-12 h-12 object-contain brightness-0" />
                                <span className="text-2xl font-serif italic font-black text-black">POP HAIR</span>
                            </Link>
                            <button
                                className="p-2 text-black"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <X size={32} />
                            </button>
                        </div>

                        <div className="flex flex-col grow p-12 justify-center gap-8">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "text-5xl font-serif italic transition-all",
                                            location.pathname === item.path ? "text-luxury-gold" : "text-black"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <a
                                href={bookingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 py-6 bg-luxury-gold text-black text-[12px] uppercase font-bold tracking-[0.5em] shadow-xl text-center"
                            >
                                Időpontfoglalás
                            </a>
                        </div>

                        <div className="p-12 border-t border-black/5 space-y-8">
                            <div className="flex gap-12">
                                <a href="https://www.instagram.com/pophair_szalon/" target="_blank" rel="noopener noreferrer">
                                    <Instagram size={28} className="text-gray-400 hover:text-black transition-colors" />
                                </a>
                                <a href="https://www.facebook.com/pophairszalon" target="_blank" rel="noopener noreferrer">
                                    <Facebook size={28} className="text-gray-400 hover:text-black transition-colors" />
                                </a>
                            </div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400">Budapest, Alkotás u. 39 c, 1023</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
