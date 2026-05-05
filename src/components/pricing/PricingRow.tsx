"use client";

import { motion } from "framer-motion";
import type { PricingItem } from "@/sanity/lib/types";

export function PricingRow({
  item,
  index,
}: {
  item: PricingItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex justify-between items-end border-b border-black/5 pb-8 group"
    >
      <div className="space-y-2">
        <h3 className="text-3xl font-serif italic group-hover:text-luxury-gold transition-colors">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-xs text-gray-600 uppercase tracking-widest">
            {item.description}
          </p>
        )}
      </div>
      <div className="text-right shrink-0 ml-8">
        <p className="text-xl font-serif italic text-black">{item.price} HUF</p>
      </div>
    </motion.div>
  );
}
