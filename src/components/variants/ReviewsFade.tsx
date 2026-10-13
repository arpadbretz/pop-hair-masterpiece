"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Review } from "@/sanity/lib/types";

export function ReviewsFade({ reviews }: { reviews: Review[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reviews.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % reviews.length), 7000);
    return () => clearInterval(t);
  }, [paused, reviews.length]);

  if (!reviews.length) return null;
  const r = reviews[i];

  return (
    <div
      className="mx-auto max-w-3xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[16rem] md:min-h-[13rem]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={r._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 flex justify-center gap-1 text-luxury-gold">
              {Array.from({ length: r.rating }).map((_, k) => (
                <Star key={k} size={14} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <blockquote className="font-serif text-2xl md:text-[2rem] font-light italic leading-snug text-black whitespace-pre-line">
              „{r.text}”
            </blockquote>
            <figcaption className="mt-8 text-[11px] uppercase tracking-[0.3em] text-gray-600">
              {r.name} · {r.platform}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-10 flex justify-center gap-2.5">
        {reviews.map((rv, k) => (
          <button
            key={rv._id}
            type="button"
            aria-label={`${k + 1}. vélemény`}
            onClick={() => setI(k)}
            className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-8 bg-luxury-gold" : "w-1.5 bg-black/20 hover:bg-black/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
