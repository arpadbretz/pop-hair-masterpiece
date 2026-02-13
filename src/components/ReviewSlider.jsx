import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
    { name: "Kovács Adél", platform: "Google", text: "A POP Hair az a hely, ahol végre azt kaptam, amit megálmodtam: természetes eleganciát és professzionális gondoskodást." },
    { name: "Szalai Márk", platform: "Facebook", text: "A Kevin Murphy rituálék minősége egyszerűen más dimenzió. Nem találtam hasonlót egész Európában, a textúra és a tartósság egyedülálló." },
    { name: "Nagy Júlia", platform: "Google", text: "Budapest legprofibb szalonja. Szilvi kezei között minden látogatás egy rituálé, amiből feltöltődve távozom." },
    { name: "Tóth Petra", platform: "Google", text: "Zseniális balayage technika, végre valaki érti, mit jelent a természetes szőke. Csak ajánlani tudom!" },
    { name: "Kiss Bence", platform: "Facebook", text: "Profi hozzáállás, elit környezet. A stílustanácsadás különösen tetszett, bátran ajánlom mindenkinek." },
    { name: "Molnár Anna", platform: "Google", text: "Húsz év szakértelem látszik minden mozdulaton. Az elrontott hajamat mentették meg, örökké hálás leszek." },
];

const ReviewCard = ({ review }) => (
    <div className="min-w-[450px] mx-8 p-12 bg-white border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-between group hover:border-luxury-gold/30 transition-all duration-700 relative overflow-hidden">
        {/* Decorative Subtle Gold Corner */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-gold/[0.03] rounded-bl-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-1000" />

        <div>
            <div className="flex justify-between items-center mb-10">
                <div className="flex gap-1.5">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#D4AF37" className="text-luxury-gold" />
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">{review.platform}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                </div>
            </div>
            <p className="text-2xl font-serif italic text-black leading-relaxed mb-12">"{review.text}"</p>
        </div>

        <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-black text-luxury-gold flex items-center justify-center font-serif italic text-lg border border-luxury-gold/30 group-hover:bg-luxury-gold group-hover:text-black transition-colors duration-500">
                {review.name[0]}
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black mb-1">{review.name}</span>
                <span className="text-[8px] uppercase tracking-widest text-gray-400">Ellenőrzött Vendég</span>
            </div>
        </div>
    </div>
);

const ReviewSlider = () => {
    return (
        <div className="py-32 bg-white overflow-hidden border-y border-luxury-gold/10">
            <div className="max-w-7xl mx-auto px-8 mb-20 flex flex-col md:flex-row justify-between items-end gap-12">
                <div className="space-y-4">
                    <span className="text-[11px] uppercase font-bold tracking-[0.6em] text-luxury-gold block">Elégedettség</span>
                    <h2 className="text-5xl md:text-7xl font-serif italic text-black leading-tight">Mindenki a <br /><span className="text-gold-gradient">tökéletest keresi.</span></h2>
                </div>
                <div className="flex items-center gap-8 bg-black/5 p-8 rounded-full border border-black/5 group hover:border-luxury-gold/30 transition-all duration-700">
                    <div className="text-right">
                        <div className="flex gap-1 mb-1 justify-end">
                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#D4AF37" className="text-luxury-gold" />)}
                        </div>
                        <p className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold">500+ Google Vélemény</p>
                    </div>
                    <div className="w-[1px] h-12 bg-black/10" />
                    <span className="text-5xl font-serif italic text-black">4.9</span>
                </div>
            </div>

            <div className="relative flex overflow-hidden">
                {/* Gradients for smooth edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

                <motion.div
                    animate={{ x: [0, -2900] }}
                    transition={{
                        duration: 50,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex whitespace-nowrap"
                >
                    {reviews.map((review, i) => (
                        <ReviewCard key={i} review={review} />
                    ))}
                    {/* Duplicate for seamless scroll */}
                    {reviews.map((review, i) => (
                        <ReviewCard key={`dup1-${i}`} review={review} />
                    ))}
                    {reviews.map((review, i) => (
                        <ReviewCard key={`dup2-${i}`} review={review} />
                    ))}
                </motion.div>
            </div>

            {/* Logos/Trust Indicators */}
            <div className="max-w-7xl mx-auto px-8 mt-24 flex flex-wrap justify-between items-center opacity-40 gap-12">
                {["FACEBOOK", "MAPS", "INSTAGRAM", "TIKTOK"].map((brand) => (
                    <span key={brand} className="text-xs font-bold tracking-[0.5em]">{brand}</span>
                ))}
            </div>
        </div>
    );
};

export default ReviewSlider;
