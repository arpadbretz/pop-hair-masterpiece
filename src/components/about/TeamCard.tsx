"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import { splitParagraphs } from "@/lib/paragraphs";

export function TeamCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.2 }}
      className="flex flex-col items-center group text-center"
    >
      <div className="relative mb-16">
        <div className="w-72 h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10">
          {member.image ? (
            <Image
              src={urlForImage(member.image).width(600).height(600).fit("crop").url()}
              alt={member.image.alt ?? member.name}
              width={600}
              height={600}
              className="w-full h-full object-cover transition-all duration-[1200ms] group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-luxury-gold/15 via-off-white to-luxury-gold/5 flex items-center justify-center">
              <span className="font-serif italic text-7xl text-luxury-gold/70">
                {member.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 border border-luxury-gold/20 rounded-full border-dashed z-0"
        />
      </div>
      <span className="text-[10px] uppercase font-bold tracking-[0.6em] text-luxury-gold mb-4 group-hover:text-black transition-colors">
        {member.role}
      </span>
      <h3 className="text-4xl md:text-5xl font-serif italic mb-8 group-hover:text-luxury-gold transition-colors">
        {member.name}
      </h3>
      <div className="space-y-6 max-w-sm px-4">
        <div className="space-y-4 text-sm font-light text-gray-600 leading-relaxed group-hover:text-gray-600 transition-colors">
          {splitParagraphs(member.bio).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {member.speciality && (
          <div className="pt-6 border-t border-black/5 flex flex-col items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-black">
              {member.speciality}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
