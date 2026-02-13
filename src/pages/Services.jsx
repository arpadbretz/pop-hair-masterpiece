import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../components/Common';
import { Scissors, Sparkles, RefreshCcw, Heart } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Real JPG assets
import serviceDetailImg from '../assets/balayage-munkank-1.jpg';
import serviceActionImg from '../assets/szalon-munka-1.jpg';

const bookingLink = "https://b998424.alteg.io/company/624179/personal/menu?o=";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const services = [
    {
        name: "Elrontott hajak javítása",
        price: "Egyéni kalkuláció",
        desc: "Specialitásunk a másutt elrontott színek és formák professzionális helyrehozása.",
        highlight: true,
        icon: <RefreshCcw className="text-luxury-gold" />
    },
    {
        name: "Mesterfodrász vágás",
        price: "28.000 HUF-tól",
        desc: "Bacsik Szilvia vezetésével, arcformához és karakterhez tervezve.",
        icon: <Scissors className="text-luxury-gold" />
    },
    {
        name: "Balayage Ritual",
        price: "42.000 HUF-tól",
        desc: "Kevin Murphy kényeztetéssel és prémium árnyalással.",
        icon: <Sparkles className="text-luxury-gold" />
    },
    {
        name: "Női hajvágás",
        price: "22.500 HUF",
        desc: "Személyre szabott stílustanácsadással és mosással.",
        icon: <Scissors className="text-luxury-gold" />
    },
    {
        name: "Kevin Murphy rituálé",
        price: "18.500 HUF",
        desc: "Mélytápláló kezelés a haj szerkezetének újjáépítésére.",
        icon: <Heart className="text-luxury-gold" />
    },
];

const Services = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-transition-wrapper pt-48 pb-32 bg-white"
        >
            <div className="max-w-7xl mx-auto px-8">
                <SectionTitle title="Szolgáltatások" subtitle="SZAKÉRTELEM" align="center" />

                <div className="max-w-4xl mx-auto space-y-12">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={cn(
                                "p-12 border transition-all duration-700 flex flex-col md:flex-row md:items-center justify-between gap-8 group",
                                service.highlight
                                    ? "bg-black text-white border-luxury-gold/50 shadow-2xl scale-105"
                                    : "bg-off-white border-black/5 hover:border-luxury-gold/30"
                            )}
                        >
                            <div className="flex items-start gap-8">
                                <div className={cn(
                                    "w-16 h-16 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110",
                                    service.highlight ? "border-luxury-gold bg-luxury-gold/10" : "border-black/10 bg-white"
                                )}>
                                    {service.icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-4 mb-2">
                                        <h3 className={cn("text-3xl font-serif italic", service.highlight ? "text-luxury-gold" : "text-black")}>
                                            {service.name}
                                        </h3>
                                        {service.highlight && (
                                            <span className="bg-luxury-gold text-black text-[8px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">Kiemelt</span>
                                        )}
                                    </div>
                                    <p className={cn("text-sm font-light leading-relaxed max-w-md", service.highlight ? "text-gray-300" : "text-gray-500")}>
                                        {service.desc}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={cn("text-2xl font-serif italic block mb-2", service.highlight ? "text-white" : "text-black")}>
                                    {service.price}
                                </span>
                                <a
                                    href={bookingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        "text-[10px] uppercase font-bold tracking-[0.3em] pb-1 border-b transition-colors inline-block",
                                        service.highlight
                                            ? "text-luxury-gold border-luxury-gold hover:text-white hover:border-white"
                                            : "text-black border-black hover:text-luxury-gold hover:border-luxury-gold"
                                    )}
                                >
                                    Foglalás
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Real Work Detail Section */}
                <div className="mt-48 grid lg:grid-cols-2 gap-24 items-center">
                    <div className="relative aspect-[4/5] overflow-hidden group shadow-2xl">
                        <img src={serviceDetailImg} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt="Detailed Work" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
                    </div>
                    <div className="space-y-12">
                        <SectionTitle title="Mesteri Hajjavítás" subtitle="SPECIALITÁSUNK" />
                        <p className="text-xl font-light text-gray-500 leading-relaxed italic">
                            Sokan keresnek meg minket elrontott színekkel, foltos balayage-zsal vagy helytelenül vágott formákkal. Számunkra nincs reménytelen eset, csak szakmai kihívás.
                        </p>
                        <div className="space-y-8">
                            <div className="flex gap-8 border-b border-black/5 pb-8">
                                <span className="text-luxury-gold font-serif italic text-3xl">01.</span>
                                <div>
                                    <h4 className="text-xl font-serif italic mb-2">Állapotfelmérés</h4>
                                    <p className="text-sm text-gray-400">Részletes elemzés a haj szerkezetéről és a korábbi kémiai folyamatokról.</p>
                                </div>
                            </div>
                            <div className="flex gap-8 border-b border-black/5 pb-8">
                                <span className="text-luxury-gold font-serif italic text-3xl">02.</span>
                                <div>
                                    <h4 className="text-xl font-serif italic mb-2">Szerkezetépítés</h4>
                                    <p className="text-sm text-gray-400">Mielőtt új színt adnánk, megerősítjük a hajszálakat Kevin Murphy rituálékkal.</p>
                                </div>
                            </div>
                            <div className="flex gap-8">
                                <span className="text-luxury-gold font-serif italic text-3xl">03.</span>
                                <div>
                                    <h4 className="text-xl font-serif italic mb-2">Színkorrekció</h4>
                                    <p className="text-sm text-gray-400">Eltüntetjük a foltokat és visszahozzuk a haj természetes, luxus fényét.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Action Section */}
                <div className="mt-48 bg-off-white p-2">
                    <div className="relative h-[600px] overflow-hidden">
                        <img src={serviceActionImg} className="w-full h-full object-cover brightness-50" alt="Action shot" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                            <h3 className="text-white text-5xl md:text-7xl font-serif italic mb-8">Precizitás abban, <br /><span className="text-luxury-gold">amit csinálunk.</span></h3>
                            <p className="text-white/60 text-[10px] uppercase font-bold tracking-[0.5em]">Budai Mesterszalon • Mesterfodrász vágás</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Services;
