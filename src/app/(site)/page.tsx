import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  homeContentQuery,
  reviewsQuery,
  galleryImagesQuery,
} from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import type {
  HomeContent,
  Review,
  GalleryImage,
} from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import { HeroSection } from "@/components/home/HeroSection";
import { ReviewSlider } from "@/components/ReviewSlider";
import { PerspectiveReveal } from "@/components/Common";

const FALLBACK_HOME: HomeContent = {
  heroEyebrow: "Budai Szalon • Alapítva 2004",
  heroTitleLine1: "A szépség mint",
  heroTitleLine2: "mestermű.",
  heroSubtitle:
    "Húsz év szakértelem Budán, a stílus és az önazonosság találkozásánál. Nálunk a hajformázás nem csupán szolgáltatás, hanem egyénre szabott alkotás.",
  heroVideoMp4: "/videos/hero.mp4",
  heroVideoWebm: "/videos/hero.webm",
  kmTitle: "Murphy.",
  yearsExperience: "20+",
  reviewBadgeCount: "500+",
};

export default async function HomePage() {
  const [home, reviews, gallery, settings] = await Promise.all([
    sanityFetch<HomeContent | null>({
      query: homeContentQuery,
      tags: ["homeContent"],
    }).catch(() => null),
    sanityFetch<Review[]>({ query: reviewsQuery, tags: ["review"] }).catch(
      () => []
    ),
    sanityFetch<GalleryImage[]>({
      query: galleryImagesQuery,
      tags: ["galleryImage"],
    }).catch(() => []),
    getSiteSettings(),
  ]);

  const h = home ?? FALLBACK_HOME;

  const ctaImages = {
    work: gallery.find((g) => g.category === "work"),
    wedding: gallery.find((g) => g.category === "wedding"),
    salon: gallery.find((g) => g.category === "salon"),
  };

  return (
    <>
      <HeroSection
        bookingUrl={settings.bookingUrl}
        eyebrow={h.heroEyebrow ?? FALLBACK_HOME.heroEyebrow!}
        titleLine1={h.heroTitleLine1 ?? FALLBACK_HOME.heroTitleLine1}
        titleLine2={h.heroTitleLine2 ?? FALLBACK_HOME.heroTitleLine2}
        subtitle={h.heroSubtitle ?? FALLBACK_HOME.heroSubtitle!}
        videoMp4={h.heroVideoMp4 ?? "/videos/hero.mp4"}
        videoWebm={h.heroVideoWebm ?? "/videos/hero.webm"}
        posterUrl={
          h.heroVideoPoster
            ? urlForImage(h.heroVideoPoster).url()
            : "/videos/hero-poster.jpg"
        }
      />

      {reviews.length > 0 && (
        <ReviewSlider
          reviews={reviews}
          googleRating={settings.googleRating}
          reviewCount={settings.reviewCount}
        />
      )}

      <section className="py-32 md:py-64 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-luxury-gold/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="relative group">
              <div className="aspect-[4/5] overflow-hidden p-3 border border-white/10 relative">
                {h.kmImage ? (
                  <Image
                    src={urlForImage(h.kmImage).width(800).url()}
                    alt="Kevin Murphy Ritual"
                    width={800}
                    height={1000}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-[2000ms] scale-105 group-hover:scale-100"
                  />
                ) : (
                  <div className="w-full h-full bg-luxury-gold/10 flex items-center justify-center text-gold-champagne/40 text-xs uppercase tracking-widest">
                    Kép a CMS-ből
                  </div>
                )}
                <div className="absolute inset-0 border border-luxury-gold/30 scale-95 group-hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="absolute -bottom-12 -right-12 bg-luxury-gold px-12 py-8 hidden md:block group-hover:-translate-x-4 group-hover:-translate-y-4 transition-transform duration-700 shadow-2xl">
                <p className="text-black font-serif italic text-3xl tracking-tighter leading-none">
                  The Gold <br />
                  Standard.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <PerspectiveReveal>
                <span className="text-luxury-gold text-[10px] uppercase font-bold tracking-[0.6em] mb-8 block">
                  Exkluzív Partnerség
                </span>
                <h2 className="text-6xl md:text-[8vw] font-serif italic leading-[0.9] text-white tracking-tighter mb-12">
                  Kevin <br />
                  <span className="text-gold-gradient">
                    {h.kmTitle ?? FALLBACK_HOME.kmTitle}
                  </span>
                </h2>
                <div className="space-y-8 text-xl font-light text-gray-400 leading-relaxed max-w-xl">
                  <p>
                    Kizárólag a legmagasabb minőségű, környezettudatos és
                    innovatív Kevin Murphy termékekkel dolgozunk. Nálunk minden
                    hajmosás egy rituálé, minden kezelés egy befektetés az Ön
                    szépségébe.
                  </p>
                  <p>
                    Saját fejlesztésű rituáléinkkal és balayage specialistáinkkal
                    a haj egészségét és a modern esztétikát ötvözzük.
                  </p>
                </div>
              </PerspectiveReveal>

              <Link
                href="/rolunk"
                className="inline-flex items-center gap-6 text-gold-champagne hover:text-white transition-all group pt-8"
              >
                <span className="text-[11px] uppercase font-bold tracking-[0.5em] border-b border-gold-champagne/30 hover:border-white pb-2">
                  A Szalon Filozófiája
                </span>
                <div className="w-12 h-12 rounded-full border border-gold-champagne flex items-center justify-center group-hover:bg-white group-hover:border-white group-hover:text-black transition-all">
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 md:py-64 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase font-bold tracking-[0.6em] text-gold-champagne block mb-6">
              SZOLGÁLTATÁSOK
            </span>
            <h2 className="text-5xl md:text-[8vw] font-serif italic leading-none">
              Fedezze fel
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Mesterfodrászat",
                href: "/szolgaltatasok",
                desc: "Egyénre szabott stílusépítés",
                gallery: ctaImages.work,
              },
              {
                title: "Esküvői Design",
                href: "/eskuvo",
                desc: "Unikális alkalmi hajköltemények",
                gallery: ctaImages.wedding,
              },
              {
                title: "Lookbook",
                href: "/galeria",
                desc: "Inspiráció és munkáink",
                gallery: ctaImages.salon,
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative aspect-[3/4] overflow-hidden flex flex-col justify-end p-12 bg-black"
              >
                {item.gallery?.image ? (
                  <Image
                    src={urlForImage(item.gallery.image).width(800).url()}
                    alt={item.gallery.image.alt ?? item.title}
                    width={800}
                    height={1000}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-[2000ms]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-black via-luxury-gold/10 to-black" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-4">
                  <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-luxury-gold-light mb-4 block">
                    {item.desc}
                  </span>
                  <h3 className="text-4xl font-serif italic text-white mb-8 group-hover:text-gold-champagne transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-white">
                      Megtekintés
                    </span>
                    <div className="w-0 group-hover:w-12 h-[1px] bg-white transition-all duration-700" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-off-white border-y border-luxury-gold/10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif italic mb-6 leading-tight">
              Minden hajszál egy{" "}
              <span className="text-luxury-gold">új történet</span> kezdete.
            </h2>
            <p className="text-gray-500 font-light text-lg uppercase tracking-wide leading-relaxed">
              Elrontott hajak professzionális helyrehozása és tudatos
              stílustanácsadás Budán.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="p-10 border border-luxury-gold/30 rounded-full flex flex-col items-center justify-center text-center hover:border-luxury-gold transition-colors duration-500">
              <span className="text-3xl font-serif italic text-luxury-gold mb-1">
                {h.yearsExperience ?? FALLBACK_HOME.yearsExperience}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                Év tapasztalat
              </span>
            </div>
            <div className="p-10 border border-luxury-gold/30 rounded-full flex flex-col items-center justify-center text-center hover:border-luxury-gold transition-colors duration-500">
              <span className="text-3xl font-serif italic text-luxury-gold mb-1">
                {h.reviewBadgeCount ?? FALLBACK_HOME.reviewBadgeCount}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                Értékelés
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
