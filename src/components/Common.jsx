import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const PerspectiveReveal = ({ children, className }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <div ref={ref} className={cn("perspective-1000", className)}>
            <motion.div
                initial={{ opacity: 0, rotateX: 45, y: 100 }}
                animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export const SectionTitle = ({ title, subtitle, align = "left", light = false }) => (
    <div className={cn("mb-20 md:mb-32", align === "center" ? "text-center" : "text-left")}>
        <div className={cn("flex items-center gap-6 mb-8", align === "center" ? "justify-center" : "justify-start")}>
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                className={cn("h-[1px]", light ? "bg-gold-champagne/30" : "bg-gold-champagne")}
            />
            <span className={cn("text-[10px] uppercase font-bold tracking-[0.6em]", light ? "text-gold-champagne/60" : "text-gold-champagne")}>{subtitle}</span>
        </div>
        <PerspectiveReveal>
            <h2 className={cn("text-5xl md:text-[8vw] font-serif leading-none italic", light ? "text-white" : "text-black")}>
                {title}
            </h2>
        </PerspectiveReveal>
    </div>
);
