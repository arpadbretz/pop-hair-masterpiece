"use client";

import { motion } from "framer-motion";
import { Scissors, Sparkles, RefreshCcw, Heart, Palette } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Service } from "@/sanity/lib/types";
import { cn } from "@/lib/cn";

const ICON_MAP: Record<string, LucideIcon> = {
  scissors: Scissors,
  sparkles: Sparkles,
  refresh: RefreshCcw,
  heart: Heart,
  palette: Palette,
};

export function ServiceRow({
  service,
  index,
  bookingUrl,
}: {
  service: Service;
  index: number;
  bookingUrl: string;
}) {
  const Icon = service.icon ? ICON_MAP[service.icon] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "p-12 border transition-all duration-700 flex flex-col md:flex-row md:items-center justify-between gap-8 group",
        service.highlight
          ? "bg-black text-white border-luxury-gold/50 shadow-2xl scale-105"
          : "bg-off-white border-black/5 hover:border-luxury-gold/30"
      )}
    >
      <div className="flex items-start gap-8">
        {Icon && (
          <div
            className={cn(
              "w-16 h-16 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110",
              service.highlight
                ? "border-luxury-gold bg-luxury-gold/10"
                : "border-black/10 bg-white"
            )}
          >
            <Icon className="text-luxury-gold" size={24} />
          </div>
        )}
        <div>
          <div className="flex items-center gap-4 mb-2 flex-wrap">
            <h3
              className={cn(
                "text-3xl font-serif italic",
                service.highlight ? "text-luxury-gold" : "text-black"
              )}
            >
              {service.name}
            </h3>
            {service.highlight && (
              <span className="bg-luxury-gold text-black text-[8px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                Kiemelt
              </span>
            )}
          </div>
          {service.description && (
            <p
              className={cn(
                "text-sm font-light leading-relaxed max-w-md",
                service.highlight ? "text-gray-300" : "text-gray-500"
              )}
            >
              {service.description}
            </p>
          )}
        </div>
      </div>
      <div className="text-right">
        {service.price && (
          <span
            className={cn(
              "text-2xl font-serif italic block mb-2",
              service.highlight ? "text-white" : "text-black"
            )}
          >
            {service.price}
          </span>
        )}
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-[10px] uppercase font-bold tracking-[0.3em] pb-1 border-b transition-colors inline-block",
            service.highlight
              ? "text-luxury-gold border-luxury-gold hover:text-white hover:border-white"
              : "text-black border-black hover:text-luxury-gold hover:border-luxury-gold"
          )}
        >
          Foglalás
        </a>
      </div>
    </motion.div>
  );
}
