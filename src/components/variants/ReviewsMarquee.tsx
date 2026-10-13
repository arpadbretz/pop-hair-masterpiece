import { Star } from "lucide-react";
import type { Review } from "@/sanity/lib/types";

function Card({ r }: { r: Review }) {
  return (
    <figure className="h-full w-[20rem] md:w-[26rem] shrink-0 border border-black/10 bg-white p-8 md:p-10 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex gap-0.5 text-luxury-gold">
            {Array.from({ length: r.rating }).map((_, k) => (
              <Star key={k} size={13} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500">{r.platform}</span>
        </div>
        <blockquote className="mt-6 text-[15px] leading-relaxed text-gray-800 whitespace-pre-line">{r.text}</blockquote>
      </div>
      <figcaption className="mt-8 text-[11px] font-semibold uppercase tracking-[0.25em] text-black">{r.name}</figcaption>
    </figure>
  );
}

/** Infinite, auto-scrolling strip. Pauses on hover; static (scrollable) for reduced motion. */
export function ReviewsMarquee({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;
  return (
    <div className="group relative overflow-hidden motion-reduce:overflow-x-auto">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[...reviews, ...reviews].map((r, k) => (
          <div key={`${r._id}-${k}`} className="pr-6" aria-hidden={k >= reviews.length ? true : undefined}>
            <Card r={r} />
          </div>
        ))}
      </div>
    </div>
  );
}
