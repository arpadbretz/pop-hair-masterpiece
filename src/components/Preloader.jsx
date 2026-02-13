import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ finishLoading }) => {
    useEffect(() => {
        const timer = setTimeout(finishLoading, 2500);
        return () => clearTimeout(timer);
    }, [finishLoading]);

    return (
        <motion.div
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center text-white"
        >
            <div className="overflow-hidden">
                <motion.h1
                    initial={{ y: 200 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-8xl font-serif italic text-gold-champagne"
                >
                    POP HAIR SALON
                </motion.h1>
            </div>
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="w-48 h-[1px] bg-gold-champagne mt-8 origin-left shadow-[0_0_10px_rgba(229,211,179,0.5)]"
            />
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-[10px] uppercase tracking-[0.5em] mt-4 text-gray-400"
            >
                Az önkifejezés művészete
            </motion.p>
        </motion.div>
    );
};

export default Preloader;
