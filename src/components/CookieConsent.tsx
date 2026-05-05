"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "pop-hair-cookie-consent";

type ConsentValue = "accepted" | "declined";

function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "declined" ? v : null;
}

function writeConsent(v: ConsentValue) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, v);
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    if (stored === null) {
      // Show after a short delay to avoid jank during initial paint.
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const handle = (v: ConsentValue) => {
    writeConsent(v);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Süti tájékoztató"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:max-w-md z-[60] bg-black text-white border border-luxury-gold/40 shadow-2xl p-6 md:p-8"
        >
          <p className="text-[10px] uppercase font-bold tracking-[0.5em] text-luxury-gold mb-4">
            Süti tájékoztató
          </p>
          <p className="text-sm text-white/80 leading-relaxed mb-6">
            Weboldalunk csak a működéshez szükséges sütiket használja.
            A térkép-beágyazás (Google Maps) harmadik fél sütiket helyezhet
            el — ezeket csak az elfogadásod után töltjük be. Részletek az{" "}
            <Link
              href="/adatvedelem"
              className="text-luxury-gold underline underline-offset-4 hover:text-white"
            >
              adatvédelmi tájékoztatóban
            </Link>
            .
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => handle("accepted")}
              className="px-6 py-3 bg-luxury-gold text-black text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-white transition-colors"
            >
              Elfogadom
            </button>
            <button
              type="button"
              onClick={() => handle("declined")}
              className="px-6 py-3 border border-white/30 text-white text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-white/10 transition-colors"
            >
              Csak a szükségeseket
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
