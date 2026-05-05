"use client";

import { motion } from "framer-motion";
import { Calendar, Sparkles, Camera, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { WeddingProcessStep } from "@/sanity/lib/types";

const ICON_MAP: Record<string, LucideIcon> = {
  calendar: Calendar,
  sparkles: Sparkles,
  camera: Camera,
  heart: Heart,
};

export function WeddingProcessCard({
  step,
  index,
}: {
  step: WeddingProcessStep;
  index: number;
}) {
  const Icon = step.icon ? ICON_MAP[step.icon] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="bg-off-white p-12 hover:bg-black hover:text-white transition-all duration-700 group border border-luxury-gold/10"
    >
      {Icon && (
        <div className="w-16 h-16 rounded-full border border-luxury-gold/30 flex items-center justify-center mb-8 group-hover:border-white transition-colors">
          <Icon
            size={24}
            className="text-luxury-gold group-hover:text-white transition-colors"
          />
        </div>
      )}
      <h3 className="text-3xl font-serif italic mb-6">{step.title}</h3>
      <p className="text-gray-600 font-light leading-relaxed group-hover:text-gray-700 transition-colors">
        {step.description}
      </p>
    </motion.div>
  );
}
