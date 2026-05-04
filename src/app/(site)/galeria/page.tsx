import { Suspense } from "react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { galleryImagesQuery } from "@/sanity/lib/queries";
import type { GalleryImage } from "@/sanity/lib/types";
import { GalleryClient } from "@/components/gallery/GalleryClient";
import { urlForImage } from "@/sanity/lib/image";

export const metadata = {
  title: "Galéria",
  description:
    "Munkáink és inspirációk — referenciák, esküvői világ és szalon enteriőr.",
};

export default async function GalleryPage() {
  const images = await sanityFetch<GalleryImage[]>({
    query: galleryImagesQuery,
    tags: ["galleryImage"],
  }).catch(() => [] as GalleryImage[]);

  // Pre-compute optimized image URLs server-side so the client doesn't load
  // heavyweight @sanity/image-url logic.
  const items = images.map((img) => ({
    _id: img._id,
    title: img.title,
    category: img.category,
    size: img.size ?? "small",
    videoUrl: img.videoUrl,
    alt: img.image.alt ?? img.title,
    thumbnailUrl: urlForImage(img.image).width(900).height(1200).fit("crop").url(),
    fullUrl: urlForImage(img.image).width(1800).url(),
  }));

  return (
    <div className="pt-48 pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
          <div>
            <span className="text-luxury-gold text-[10px] uppercase font-bold tracking-[0.5em] mb-4 block">
              Vizuális Napló
            </span>
            <h1 className="text-6xl md:text-8xl font-serif italic text-black tracking-tighter">
              Munkáink &amp; <br />
              <span className="text-gold-gradient">Inspiráció.</span>
            </h1>
          </div>
        </div>

        {items.length > 0 ? (
          <Suspense fallback={null}>
            <GalleryClient items={items} />
          </Suspense>
        ) : (
          <div className="py-32 text-center text-gray-400 font-light">
            <p className="text-xl">Hamarosan feltöltjük a galériát.</p>
          </div>
        )}
      </div>
    </div>
  );
}
