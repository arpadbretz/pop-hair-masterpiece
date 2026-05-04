import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  weddingContentQuery,
  weddingProcessStepsQuery,
} from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import type {
  WeddingContent,
  WeddingProcessStep,
} from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import { SectionTitle, PerspectiveReveal } from "@/components/Common";
import { WeddingProcessCard } from "@/components/wedding/WeddingProcessCard";
import { splitParagraphs } from "@/lib/paragraphs";

export const metadata = {
  title: "Esküvői Design",
  description:
    "Menyasszonyi frizurák és esküvői hajdíszek Bacsik Szilvia és csapatának kezei között.",
};

const FALLBACK_WEDDING: WeddingContent = {
  heroEyebrow: "A Nagy Nap Művészete",
  heroTitleLine1: "Esküvői",
  heroTitleLine2: "Design.",
  heroQuote:
    "Hiszünk abban, hogy a menyasszonyi frizura nem csupán egy viselet, hanem a személyiség és az alkalom harmonikus kivetülése.",
  yearsLabel: "20+",
  weddingsLabel: "100+",
  ctaTitleLine1: "Legyen a stílus az Ön",
  ctaTitleLine2: "legszebb ékszere.",
};

const FALLBACK_STEPS: WeddingProcessStep[] = [
  {
    _id: "f1",
    title: "Konzultáció",
    description:
      "Személyes megbeszélés, ahol feltérképezzük az Ön stílusát, az esküvői ruha jellegét és az alkalom hangulatát.",
    icon: "calendar",
  },
  {
    _id: "f2",
    title: "A Próba",
    description:
      "Egy nyugodt, alapos folyamat, ahol kísérletezünk és finomhangoljuk a frizurát, amíg az tökéletesen tükrözi az Ön elképzeléseit.",
    icon: "sparkles",
  },
  {
    _id: "f3",
    title: "A Helyszínen",
    description:
      "Igény szerint a szalonban vagy külső helyszínen készítjük el a frizurát, biztosítva a feszültségmentes, luxus hangulatot.",
    icon: "camera",
  },
];

export default async function WeddingPage() {
  const [wedding, steps, settings] = await Promise.all([
    sanityFetch<WeddingContent | null>({
      query: weddingContentQuery,
      tags: ["weddingContent"],
    }).catch(() => null),
    sanityFetch<WeddingProcessStep[]>({
      query: weddingProcessStepsQuery,
      tags: ["weddingProcessStep"],
    }).catch(() => [] as WeddingProcessStep[]),
    getSiteSettings(),
  ]);

  const w = wedding ?? FALLBACK_WEDDING;
  const stepList = steps.length > 0 ? steps : FALLBACK_STEPS;

  return (
    <div className="bg-white">
      <section className="h-[90vh] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          {w.heroImage ? (
            <Image
              src={urlForImage(w.heroImage).width(1800).url()}
              alt="Esküvői hangulat"
              fill
              priority
              className="object-cover brightness-75 opacity-90"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-black" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white" />
        </div>

        <div className="relative z-10 text-center px-8">
          <span className="text-[11px] uppercase font-bold tracking-[1.2em] text-white drop-shadow-lg mb-12 block">
            {w.heroEyebrow ?? FALLBACK_WEDDING.heroEyebrow}
          </span>
          <h1 className="text-7xl md:text-[12vw] font-serif italic text-white drop-shadow-2xl leading-none tracking-tighter">
            {w.heroTitleLine1 ?? FALLBACK_WEDDING.heroTitleLine1}
            <br />
            <span className="text-luxury-gold">
              {w.heroTitleLine2 ?? FALLBACK_WEDDING.heroTitleLine2}
            </span>
          </h1>
          {(w.heroQuote ?? FALLBACK_WEDDING.heroQuote) && (
            <p className="text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto italic leading-relaxed pt-8 drop-shadow-md">
              &ldquo;{w.heroQuote ?? FALLBACK_WEDDING.heroQuote}&rdquo;
            </p>
          )}
        </div>
      </section>

      <section className="py-32 md:py-48 px-8 bg-off-white border-y border-luxury-gold/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div className="order-2 lg:order-1 space-y-12">
            <PerspectiveReveal>
              <span className="text-luxury-gold text-[10px] uppercase font-bold tracking-[0.5em] mb-8 block">
                Több mint egy évtized
              </span>
              <h2 className="text-5xl md:text-7xl font-serif italic text-black leading-[0.9] mb-12">
                Páratlan <br />
                Szakértelem.
              </h2>
              <div className="space-y-8 text-lg text-gray-500 font-light leading-relaxed">
                {splitParagraphs(w.expertiseBody).length > 0 ? (
                  splitParagraphs(w.expertiseBody).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))
                ) : (
                  <>
                    <p>
                      Bacsik Szilvia több mint egy évtizede aktív szereplője a
                      divat világának. Rendszeres résztvevője fashion weekeknek,
                      fotózásoknak és forgatásoknak, ami a menyasszonyi frizurák
                      tervezésében is visszaköszön.
                    </p>
                    <p>
                      Kiemelt szakterülete az esküvői hajkészítés, ahol a
                      precizitás, az elegancia és az egyéniség harmonikus egysége
                      áll a középpontban.
                    </p>
                  </>
                )}
              </div>
            </PerspectiveReveal>

            <div className="flex gap-16 pt-8 border-t border-black/5">
              <div className="space-y-2">
                <p className="text-4xl font-serif italic text-luxury-gold">
                  {w.yearsLabel ?? FALLBACK_WEDDING.yearsLabel}
                </p>
                <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400">
                  Év tapasztalat
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-serif italic text-luxury-gold">
                  {w.weddingsLabel ?? FALLBACK_WEDDING.weddingsLabel}
                </p>
                <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400">
                  Boldog Menyasszony
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 grid grid-cols-2 gap-6 group">
            {[w.expertiseImageLeft, w.expertiseImageRight].map((img, i) => (
              <div
                key={i}
                className={`aspect-[3/4] overflow-hidden shadow-2xl transition-transform duration-1000 ${
                  i === 0
                    ? "translate-y-12 group-hover:translate-y-0"
                    : "group-hover:translate-y-12"
                }`}
              >
                {img ? (
                  <Image
                    src={urlForImage(img).width(800).url()}
                    alt="Wedding work"
                    width={800}
                    height={1066}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-luxury-gold/10 to-gold-champagne/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 md:py-64 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <SectionTitle title="A Nagy Nap" subtitle="FOLYAMAT" align="center" />
          <div className="grid md:grid-cols-3 gap-12 lg:gap-24">
            {stepList.map((step, i) => (
              <WeddingProcessCard key={step._id} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {w.lookbookImages && w.lookbookImages.length > 0 && (
        <section className="py-32 md:py-48 px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-24 flex-wrap gap-8">
              <div className="space-y-4">
                <span className="text-gold-champagne text-[11px] uppercase tracking-[0.5em] block">
                  Inspiráció
                </span>
                <h2 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter">
                  Wedding{" "}
                  <span className="text-gold-gradient">Lookbook.</span>
                </h2>
              </div>
              <Link
                href="/galeria?cat=wedding"
                className="hidden md:flex items-center gap-4 text-white hover:text-gold-champagne transition-all group"
              >
                <span className="text-[10px] uppercase font-bold tracking-[0.4em]">
                  Teljes Katalógus
                </span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {w.lookbookImages.map((img, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] overflow-hidden border border-white/5 shadow-2xl p-1"
                >
                  <Image
                    src={urlForImage(img).width(700).url()}
                    alt={img.alt ?? "Wedding work"}
                    width={700}
                    height={933}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2000ms]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-32 md:py-48 bg-white overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-8">
          <Heart
            className="text-luxury-gold mx-auto mb-12"
            size={40}
            fill="#D4AF37"
          />
          <h2 className="text-5xl md:text-8xl font-serif italic text-black leading-tight mb-16 tracking-tighter">
            {w.ctaTitleLine1 ?? FALLBACK_WEDDING.ctaTitleLine1} <br />
            <span className="text-gold-gradient">
              {w.ctaTitleLine2 ?? FALLBACK_WEDDING.ctaTitleLine2}
            </span>
          </h2>
          <a
            href={settings.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-16 py-6 bg-luxury-gold text-black text-[11px] uppercase font-bold tracking-[0.6em] shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-shadow inline-block"
          >
            Időpontfoglalás
          </a>
        </div>
      </section>
    </div>
  );
}
