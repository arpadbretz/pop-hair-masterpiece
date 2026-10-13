"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

const VARIANTS = [
  { id: "a", label: "A", name: "Klasszikus" },
  { id: "b", label: "B", name: "Modern" },
  { id: "c", label: "C", name: "Meleg" },
];

/** Floating A/B/C switcher. Appears once the visitor has scrolled past
 * the hero so it never covers the hero's own booking button. */
export function VariantSwitcher() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Főoldal-variációk"
          initial={{ opacity: 0, y: 16, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 16, x: "-50%" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 z-40 flex items-center gap-1 rounded-full bg-black/85 p-1.5 shadow-2xl ring-1 ring-white/10 backdrop-blur-md"
        >
          <Link
            href="/variaciok"
            className="hidden px-3 text-[10px] uppercase tracking-[0.25em] text-white/70 hover:text-white sm:block"
          >
            Variációk
          </Link>
          {VARIANTS.map((v) => {
            const active = pathname === `/variaciok/${v.id}`;
            return (
              <Link
                key={v.id}
                href={`/variaciok/${v.id}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-xs font-semibold tracking-wide transition-colors",
                  active ? "bg-luxury-gold text-black" : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                {v.label}
                <span className="hidden font-normal md:inline"> · {v.name}</span>
              </Link>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
