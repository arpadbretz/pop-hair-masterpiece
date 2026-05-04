"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";

export function FloatingBookingButton({ bookingUrl }: { bookingUrl: string }) {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsVisible(latest > 400);
    });
  }, [scrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 group"
          aria-label="Időpontfoglalás"
        >
          <span className="absolute inset-0 rounded-full bg-luxury-gold/40 animate-ping pointer-events-none" />
          <span
            className="relative flex items-center gap-3 bg-luxury-gold text-black px-5 py-4 md:px-7 md:py-5 rounded-full shadow-[0_8px_30px_rgba(212,175,55,0.55)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.8)] transition-all duration-500 group-hover:scale-105"
          >
            <Calendar size={18} strokeWidth={2.2} />
            <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-[0.4em] whitespace-nowrap">
              Időpontfoglalás
            </span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
