"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Play, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  _id: string;
  title: string;
  category: "work" | "salon" | "wedding" | "video";
  size: "small" | "large";
  videoUrl?: string;
  alt: string;
  thumbnailUrl: string;
  fullUrl: string;
}

const CATEGORIES = [
  { id: "all", name: "Összes" },
  { id: "work", name: "Referenciák" },
  { id: "video", name: "Videók" },
  { id: "salon", name: "A Szalon" },
  { id: "wedding", name: "Esküvői Világ" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

export function GalleryClient({ items }: { items: GalleryItem[] }) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<CategoryId>("all");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat && CATEGORIES.find((c) => c.id === cat)) {
      setActiveTab(cat as CategoryId);
    }
  }, [searchParams]);

  const filtered =
    activeTab === "all" ? items : items.filter((i) => i.category === activeTab);

  const open = (idx: number) => {
    setSelectedIdx(idx);
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    setSelectedIdx(null);
    document.body.style.overflow = "";
  };
  const next = () =>
    setSelectedIdx((i) =>
      i === null ? null : (i + 1) % filtered.length
    );
  const prev = () =>
    setSelectedIdx((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length
    );

  const selected =
    selectedIdx !== null ? filtered[selectedIdx] : null;

  // Keyboard nav
  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected]);

  return (
    <>
      <div className="flex flex-wrap gap-8 md:gap-16 border-b border-black/5 pb-8 mb-20 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`relative text-[10px] uppercase font-bold tracking-[0.4em] transition-all duration-500 whitespace-nowrap ${
              activeTab === cat.id
                ? "text-black"
                : "text-gray-600 hover:text-black"
            }`}
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
          {filtered.map((item, idx) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => open(idx)}
              className={`group relative overflow-hidden bg-off-white border border-luxury-gold/5 cursor-pointer ${
                item.size === "large" ? "md:row-span-2" : ""
              }`}
            >
              <Image
                src={item.thumbnailUrl}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-all duration-[1500ms]"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center backdrop-blur-[2px]">
                <div className="w-16 h-16 rounded-full border border-white flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                  {item.videoUrl ? (
                    <Play size={24} fill="white" className="text-white ml-1" />
                  ) : (
                    <ZoomIn size={24} className="text-white" />
                  )}
                </div>
                <span className="mt-6 text-[10px] uppercase font-bold tracking-[0.5em] text-white">
                  {item.title}
                </span>
              </div>
              <div className="absolute top-8 left-8">
                <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-[8px] uppercase tracking-widest text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {CATEGORIES.find((c) => c.id === item.category)?.name}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4 md:px-20 py-20"
            onClick={close}
          >
            <button
              aria-label="Bezárás"
              className="absolute top-10 right-10 text-white/85 hover:text-white transition-colors z-[1001]"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
            >
              <X size={40} />
            </button>
            <button
              aria-label="Előző"
              className="absolute left-10 top-1/2 -translate-y-1/2 text-white/85 hover:text-white transition-colors hidden md:block z-[1001]"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <ChevronLeft size={60} />
            </button>
            <button
              aria-label="Következő"
              className="absolute right-10 top-1/2 -translate-y-1/2 text-white/85 hover:text-white transition-colors hidden md:block z-[1001]"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
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
                {selected.videoUrl ? (
                  <video
                    src={selected.videoUrl}
                    controls
                    autoPlay
                    className="max-w-full max-h-[80vh] shadow-2xl border border-white/10"
                  />
                ) : (
                  <Image
                    src={selected.fullUrl}
                    alt={selected.alt}
                    width={1800}
                    height={2400}
                    className="max-w-full max-h-[80vh] w-auto h-auto object-contain shadow-2xl border border-white/10"
                  />
                )}
              </div>
              <div className="mt-8 text-center text-white shrink-0">
                <span className="text-[10px] uppercase tracking-[0.5em] text-luxury-gold mb-2 block font-bold">
                  {CATEGORIES.find((c) => c.id === selected.category)?.name}
                </span>
                <h3 className="text-3xl font-serif italic">{selected.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
