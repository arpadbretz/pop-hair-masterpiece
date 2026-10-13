"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import type { Review } from "@/sanity/lib/types";

/** Scroll-snap carousel that advances itself every few seconds (1 card on
 * mobile, 3 on desktop) and stops once the visitor takes over. */
export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [userTookOver, setUserTookOver] = useState(false);

  useEffect(() => {
    if (userTookOver) return;
    const t = setInterval(() => {
      const el = track.current;
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      const step = card ? card.offsetWidth + 24 : el.clientWidth;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + step, behavior: "smooth" });
    }, 5000);
    return () => clearInterval(t);
  }, [userTookOver]);

  const onScroll = () => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    setActive(Math.round(el.scrollLeft / (card.offsetWidth + 24)));
  };

  if (!reviews.length) return null;

  return (
    <div>
      <div
        ref={track}
        onScroll={onScroll}
        onPointerDown={() => setUserTookOver(true)}
        onWheel={() => setUserTookOver(true)}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2"
      >
        {reviews.map((r) => (
          <figure
            key={r._id}
            className="snap-start shrink-0 basis-[86%] sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)] rounded-[1.75rem] bg-white p-8 md:p-10 shadow-[0_20px_50px_-30px_rgba(120,90,40,0.35)] flex flex-col"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-luxury-gold/15 font-serif text-xl text-luxury-gold">
                {r.name[0]}
              </span>
              <div>
                <figcaption className="text-sm font-semibold text-black">{r.name}</figcaption>
                <div className="mt-0.5 flex items-center gap-1.5 text-luxury-gold">
                  {Array.from({ length: r.rating }).map((_, k) => (
                    <Star key={k} size={12} fill="currentColor" strokeWidth={0} />
                  ))}
                  <span className="ml-1 text-[11px] text-gray-500">{r.platform}</span>
                </div>
              </div>
            </div>
            <blockquote className="mt-6 font-serif text-xl leading-snug text-gray-800 whitespace-pre-line">
              {r.text}
            </blockquote>
          </figure>
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-2">
        {reviews.map((r, k) => (
          <button
            key={r._id}
            type="button"
            aria-label={`${k + 1}. vélemény`}
            onClick={() => {
              setUserTookOver(true);
              const el = track.current;
              const card = el?.firstElementChild as HTMLElement | null;
              if (el && card) el.scrollTo({ left: k * (card.offsetWidth + 24), behavior: "smooth" });
            }}
            className={`h-2 rounded-full transition-all duration-500 ${k === active ? "w-7 bg-luxury-gold" : "w-2 bg-luxury-gold/30"}`}
          />
        ))}
      </div>
    </div>
  );
}
