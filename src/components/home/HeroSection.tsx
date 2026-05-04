"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface HeroSectionProps {
  bookingUrl: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  videoMp4: string;
  videoWebm?: string;
  posterUrl?: string;
}

export function HeroSection({
  bookingUrl,
  eyebrow,
  titleLine1,
  titleLine2,
  subtitle,
  videoMp4,
  videoWebm,
  posterUrl,
}: HeroSectionProps) {
  return (
    <section className="relative h-screen md:h-[110vh] w-full flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={posterUrl}
          className="w-full h-full object-cover opacity-60 scale-105"
        >
          {videoWebm && <source src={videoWebm} type="video/webm" />}
          <source src={videoMp4} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-12"
        >
          <div className="flex flex-col items-center gap-6 mb-8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-[1px] bg-luxury-gold"
            />
            <span className="text-[11px] uppercase tracking-[1em] text-luxury-gold font-bold block">
              {eyebrow}
            </span>
          </div>

          <h1 className="text-6xl md:text-[10vw] font-serif italic leading-[0.8] text-white tracking-tighter mb-8 drop-shadow-2xl">
            {titleLine1}
            <br />
            <span className="text-gold-gradient">{titleLine2}</span>
          </h1>

          <p className="text-xl md:text-2xl font-light text-white/80 max-w-2xl mx-auto leading-relaxed italic drop-shadow-lg">
            {subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-12 pt-8">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-6"
            >
              <div className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center transition-all duration-700 bg-white/5 backdrop-blur-md group-hover:bg-luxury-gold group-hover:border-luxury-gold group-hover:text-black group-hover:scale-110">
                <ArrowUpRight
                  size={32}
                  className="text-white group-hover:text-black transition-transform duration-500 group-hover:rotate-45"
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[12px] uppercase font-bold tracking-[0.5em] text-white drop-shadow-md">
                  Időpontfoglalás
                </span>
                <span className="text-[9px] text-luxury-gold uppercase tracking-widest mt-2 font-bold">
                  Konzultáció kérése
                </span>
              </div>
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-16 left-10 hidden md:block">
        <div className="w-28 h-28 rounded-full border border-white/20 backdrop-blur-sm flex items-center justify-center animate-spin-slow text-center p-3">
          <span className="text-[8px] text-white/50 uppercase tracking-tighter leading-tight font-bold">
            KEVIN MURPHY • BUDA • 20 ÉV • PRÉMIUM •
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
      >
        <span className="text-[9px] uppercase tracking-[0.8em] text-white rotate-180 [writing-mode:vertical-lr]">
          Scroll
        </span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}
