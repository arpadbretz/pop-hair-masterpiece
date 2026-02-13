import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { SectionTitle } from '../components/Common';
import { Play, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Bulk import logic with new descriptive JPG names
import img_eskuvo_hero from '../assets/eskuvo-hero.jpg';
import img_eskuvo_mood_1 from '../assets/eskuvo-mood-1.jpg';
import img_eskuvo_munkank_1 from '../assets/eskuvo-munkank-1.jpg';
import img_eskuvo_munkank_2 from '../assets/eskuvo-munkank-2.jpg';
import img_eskuvo_munkank_3 from '../assets/eskuvo-munkank-3.jpg';
import img_eskuvo_munkank_4 from '../assets/eskuvo-munkank-4.jpg';
import img_eskuvo_munkank_5 from '../assets/eskuvo-munkank-5.jpg';
import img_eskuvo_munkank_6 from '../assets/eskuvo-munkank-6.jpg';
import img_eskuvo_boldogsag from '../assets/eskuvo-boldogsag.jpg';
import img_eskuvo_vibe_1 from '../assets/eskuvo-vibe-1.jpg';
import img_eskuvo_vibe_2 from '../assets/eskuvo-vibe-2.jpg';
import img_eskuvo_vibe_3 from '../assets/eskuvo-vibe-3.jpg';
import img_eskuvo_vibe_4 from '../assets/eskuvo-vibe-4.jpg';
import img_eskuvo_vibe_5 from '../assets/eskuvo-vibe-5.jpg';
import img_eskuvo_vibe_6 from '../assets/eskuvo-vibe-6.jpg';
import img_eskuvo_vibe_7 from '../assets/eskuvo-vibe-7.jpg';
import img_eskuvo_vibe_8 from '../assets/eskuvo-vibe-8.jpg';
import img_eskuvo_vibe_9 from '../assets/eskuvo-vibe-9.jpg';
import img_eskuvo_vibe_10 from '../assets/eskuvo-vibe-10.jpg';
import img_eskuvo_vibe_11 from '../assets/eskuvo-vibe-11.jpg';
import img_eskuvo_vibe_12 from '../assets/eskuvo-vibe-12.jpg';
import img_eskuvo_vibe_13 from '../assets/eskuvo-vibe-13.jpg';
import img_eskuvo_vibe_14 from '../assets/eskuvo-vibe-14.jpg';
import img_eskuvo_vibe_15 from '../assets/eskuvo-vibe-15.jpg';
import img_eskuvo_vibe_16 from '../assets/eskuvo-vibe-16.jpg';
import img_eskuvo_vibe_17 from '../assets/eskuvo-vibe-17.jpg';
import img_eskuvo_vibe_18 from '../assets/eskuvo-vibe-18.jpg';

import img_balayage_1 from '../assets/balayage-munkank-1.jpg';
import img_balayage_2 from '../assets/balayage-munkank-2.jpg';
import img_balayage_3 from '../assets/balayage-munkank-3.jpg';
import img_balayage_blonde from '../assets/balayage-blonde.jpg';
import img_balayage_warm from '../assets/balayage-warm.jpg';
import img_stilus_1 from '../assets/stilus-munkank-1.jpg';
import img_stilus_2 from '../assets/stilus-munkank-2.jpg';
import img_szalon_munka_1 from '../assets/szalon-munka-1.jpg';
import img_szalon_belso_1 from '../assets/szalon-belso-1.jpg';
import img_szalon_belso_2 from '../assets/szalon-belso-2.jpg';
import img_szalon_belso_3 from '../assets/szalon-belso-3.jpg';
import img_hajhosszabbitas_1 from '../assets/hajhosszabbitas-1.jpg';
import img_hajhosszabbitas_detail from '../assets/hajhosszabbitas-detail.jpg';
import img_editorial_1 from '../assets/editorial-munkank-1.jpg';
import img_editorial_2 from '../assets/editorial-munkank-2.jpg';
import img_km_1 from '../assets/kevin-murphy-termek-1.jpg';
import img_km_2 from '../assets/kevin-murphy-termek-2.jpg';
import img_km_details from '../assets/kevin-murphy-details-1.jpg';
import img_modern_haj from '../assets/modern-haj-1.jpg';
import videoSrc from '../assets/szilvi 2.mov';

const categories = [
    { id: 'all', name: 'Összes' },
    { id: 'work', name: 'Referenciák' },
    { id: 'video', name: 'Videók' },
    { id: 'salon', name: 'A Szalon' },
    { id: 'wedding', name: 'Esküvői Világ' }
];

const galleryData = [
    { id: 0, cat: 'video', img: img_szalon_munka_1, video: videoSrc, title: 'Pop Hair Atmoszféra', size: 'large', isVideo: true },
    { id: 1, cat: 'wedding', img: img_eskuvo_hero, title: 'Menyasszonyi Frizura Design', size: 'large' },
    { id: 2, cat: 'work', img: img_balayage_1, title: 'Mesteri Balayage', size: 'small' },
    { id: 3, cat: 'salon', img: img_szalon_belso_1, title: 'Enteriőr Részlet', size: 'small' },
    { id: 4, cat: 'wedding', img: img_eskuvo_mood_1, title: 'Esküvői Mood', size: 'small' },
    { id: 5, cat: 'work', img: img_editorial_1, title: 'Editorial Hajszobrászat', size: 'large' },
    { id: 6, cat: 'salon', img: img_szalon_munka_1, title: 'Alkotási Folyamat', size: 'small' },
    { id: 7, cat: 'work', img: img_hajhosszabbitas_1, title: 'Láthatatlan Illesztés', size: 'small' },
    { id: 8, cat: 'wedding', img: img_eskuvo_munkank_1, title: 'Esküvői Elegancia', size: 'small' },
    { id: 9, cat: 'work', img: img_balayage_2, title: 'Natural Sunkissed', size: 'large' },
    { id: 10, cat: 'salon', img: img_szalon_belso_2, title: 'Minimalista Luxus', size: 'small' },
    { id: 11, cat: 'work', img: img_balayage_blonde, title: 'Ice Blonde Balayage', size: 'small' },
    { id: 12, cat: 'wedding', img: img_eskuvo_vibe_1, title: 'Esküvői Pillanat', size: 'small' },
    { id: 13, cat: 'work', img: img_stilus_1, title: 'Modern Formavilág', size: 'small' },
    { id: 14, cat: 'wedding', img: img_eskuvo_vibe_13, title: 'Esküvői Részletek', size: 'small' },
    { id: 15, cat: 'salon', img: img_szalon_belso_3, title: 'Szalon Részlet', size: 'small' },
    { id: 16, cat: 'work', img: img_balayage_warm, title: 'Meleg Tónusú Árnyalás', size: 'small' },
    { id: 17, cat: 'wedding', img: img_eskuvo_munkank_3, title: 'Romantikus Hullámok', size: 'large' },
    { id: 18, cat: 'salon', img: img_km_1, title: 'Kevin Murphy Kényeztetés', size: 'small' },
    { id: 19, cat: 'work', img: img_hajhosszabbitas_detail, title: 'Precíziós Technika', size: 'small' },
    { id: 20, cat: 'salon', img: img_km_details, title: 'Prémium Hatóanyagok', size: 'small' },
    { id: 21, cat: 'wedding', img: img_eskuvo_vibe_2, title: 'Esküvői Előkészületek', size: 'small' },
    { id: 22, cat: 'work', img: img_modern_haj, title: 'Trendszínek 2024', size: 'small' },
    { id: 23, cat: 'wedding', img: img_eskuvo_vibe_3, title: 'Boldog Menyasszony', size: 'small' },
    { id: 24, cat: 'wedding', img: img_eskuvo_vibe_4, title: 'Hajszobrászat', size: 'small' },
    { id: 25, cat: 'wedding', img: img_eskuvo_vibe_14, title: 'A Mi Munkánk', size: 'small' },
    { id: 26, cat: 'wedding', img: img_eskuvo_vibe_15, title: 'Esküvői Varázs', size: 'large' },
    { id: 27, cat: 'wedding', img: img_eskuvo_vibe_16, title: 'Elegancia', size: 'small' },
    { id: 28, cat: 'wedding', img: img_eskuvo_vibe_17, title: 'Esküvői Portré', size: 'small' },
    { id: 29, cat: 'wedding', img: img_eskuvo_vibe_18, title: 'Részletek', size: 'small' },
    { id: 30, cat: 'wedding', img: img_eskuvo_vibe_11, title: 'Örök Emlék', size: 'small' },
];

const Gallery = () => {
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const cat = searchParams.get('cat');
        if (cat && categories.find(c => c.id === cat)) {
            setActiveTab(cat);
        }
    }, [searchParams]);

    const filteredData = activeTab === 'all'
        ? galleryData
        : galleryData.filter(item => item.cat === activeTab);

    const openLightbox = (item, index) => {
        setSelectedItem(item);
        setCurrentIndex(index);
        // Prevent scroll when lightbox is open
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedItem(null);
        document.body.style.overflow = 'unset';
    };

    const nextItem = () => {
        const nextIdx = (currentIndex + 1) % filteredData.length;
        setSelectedItem(filteredData[nextIdx]);
        setCurrentIndex(nextIdx);
    };

    const prevItem = () => {
        const prevIdx = (currentIndex - 1 + filteredData.length) % filteredData.length;
        setSelectedItem(filteredData[prevIdx]);
        setCurrentIndex(prevIdx);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="page-transition-wrapper pt-48 pb-32 bg-white"
            >
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
                        <div>
                            <span className="text-luxury-gold text-[10px] uppercase font-bold tracking-[0.5em] mb-4 block">Vizuális Napló</span>
                            <h2 className="text-6xl md:text-8xl font-serif italic text-black tracking-tighter">
                                Munkáink & <br /><span className="text-gold-gradient">Inspiráció.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-8 md:gap-16 border-b border-black/5 pb-8 mb-20 overflow-x-auto no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`relative text-[10px] uppercase font-bold tracking-[0.4em] transition-all duration-500 whitespace-nowrap ${activeTab === cat.id ? 'text-black' : 'text-gray-400 hover:text-black'}`}
                            >
                                {cat.name}
                                {activeTab === cat.id && (
                                    <motion.div
                                        layoutId="activeTabUnderline"
                                        className="absolute -bottom-8 left-0 w-full h-[2px] bg-luxury-gold"
                                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredData.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    onClick={() => openLightbox(item, index)}
                                    className={`group relative overflow-hidden bg-off-white border border-luxury-gold/5 cursor-pointer ${item.size === 'large' ? 'md:row-span-2' : ''}`}
                                >
                                    <img
                                        src={item.img}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[1500ms]"
                                        alt={item.title}
                                        loading="lazy"
                                    />

                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center backdrop-blur-[2px]">
                                        <div className="w-16 h-16 rounded-full border border-white flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                            {item.isVideo ? <Play size={24} fill="white" className="text-white ml-1" /> : <ZoomIn size={24} className="text-white" />}
                                        </div>
                                        <span className="mt-6 text-[10px] uppercase font-bold tracking-[0.5em] text-white">{item.title}</span>
                                    </div>

                                    <div className="absolute top-8 left-8">
                                        <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-[8px] uppercase tracking-widest text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                            {categories.find(c => c.id === item.cat)?.name}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.div>

            {/* Lightbox Overlay - MOVED OUTSIDE of transition wrapper to ensure viewport alignment */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4 md:px-20 py-20"
                        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
                        onClick={closeLightbox}
                    >
                        <button
                            className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors z-[1001]"
                            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                        >
                            <X size={40} />
                        </button>

                        <button
                            className="absolute left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors hidden md:block z-[1001]"
                            onClick={(e) => { e.stopPropagation(); prevItem(); }}
                        >
                            <ChevronLeft size={60} />
                        </button>

                        <button
                            className="absolute right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors hidden md:block z-[1001]"
                            onClick={(e) => { e.stopPropagation(); nextItem(); }}
                        >
                            <ChevronRight size={60} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full h-full max-w-5xl flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                {selectedItem.isVideo ? (
                                    <video
                                        src={selectedItem.video}
                                        controls
                                        autoPlay
                                        className="max-w-full max-h-[80vh] shadow-2xl border border-white/10"
                                    />
                                ) : (
                                    <img
                                        src={selectedItem.img}
                                        alt={selectedItem.title}
                                        className="max-w-full max-h-[80vh] object-contain shadow-2xl border border-white/10"
                                    />
                                )}
                            </div>
                            <div className="mt-8 text-center text-white shrink-0">
                                <span className="text-[10px] uppercase tracking-[0.5em] text-luxury-gold mb-2 block font-bold">{selectedItem.cat}</span>
                                <h3 className="text-3xl font-serif italic">{selectedItem.title}</h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Gallery;
