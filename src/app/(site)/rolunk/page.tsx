import Image from "next/image";
import { Heart, History, Award, Check } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  aboutContentQuery,
  teamMembersQuery,
} from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import type { AboutContent, TeamMember } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import { SectionTitle, PerspectiveReveal } from "@/components/Common";
import { TeamCard } from "@/components/about/TeamCard";
import { splitParagraphs } from "@/lib/paragraphs";

export const metadata = {
  title: "Rólunk",
  description:
    "Pop Hair Salon csapata és filozófiája — Bacsik Szilvia és csapata, a budai mesterszalon mögött.",
};

const FALLBACK_ABOUT: AboutContent = {
  philosophyTitleLine1: "Rólunk.",
  philosophyTitleLine2: "",
  philosophyQuote:
    "A Pop Hair Salon egy olyan szalon, ahol a vendég valódi figyelmet kap.",
  closingQuote: "Szeretettel várlak a Pop Hair Salonban!",
  closingQuoteAuthor: "Bacsik Szilvia",
};

export default async function AboutPage() {
  const [about, team, settings] = await Promise.all([
    sanityFetch<AboutContent | null>({
      query: aboutContentQuery,
      tags: ["aboutContent"],
    }).catch(() => null),
    sanityFetch<TeamMember[]>({
      query: teamMembersQuery,
      tags: ["teamMember"],
    }).catch(() => []),
    getSiteSettings(),
  ]);

  const a = about ?? FALLBACK_ABOUT;

  return (
    <div className="pt-32 bg-white">
      <section className="py-32 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 lg:gap-32 items-center">
            <div className="space-y-12">
              <div className="flex items-center gap-6">
                <div className="w-16 h-[1px] bg-luxury-gold" />
                <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-luxury-gold">
                  Rólunk
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-serif italic text-black leading-tight tracking-tighter">
                <span className="text-gold-gradient">
                  {a.philosophyTitleLine1 ?? FALLBACK_ABOUT.philosophyTitleLine1}
                </span>
                {a.philosophyTitleLine2 && (
                  <>
                    <br />
                    <span className="text-gold-gradient">
                      {a.philosophyTitleLine2}
                    </span>
                  </>
                )}
              </h1>
              {(a.philosophyQuote ?? FALLBACK_ABOUT.philosophyQuote) && (
                <div className="space-y-8 text-2xl font-light text-gray-500 leading-relaxed italic border-l border-luxury-gold/20 pl-10">
                  <p>
                    &ldquo;{a.philosophyQuote ?? FALLBACK_ABOUT.philosophyQuote}
                    &rdquo;
                  </p>
                </div>
              )}
              <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed max-w-xl">
                {splitParagraphs(a.philosophyBody).length > 0 ? (
                  splitParagraphs(a.philosophyBody).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))
                ) : (
                  <>
                    <p>
                      Nálunk nem futószalag-szolgáltatás zajlik. Minden vendéget
                      egyéniségként kezelünk, és minden frizura mögött átgondolt
                      szakmai döntés áll.
                    </p>
                    <p>
                      Célunk, hogy mindenki magabiztosan, önazonosan és
                      elégedetten távozzon tőlünk.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[3/4] overflow-hidden p-2 border border-luxury-gold/10">
                {a.philosophyImage ? (
                  <Image
                    src={urlForImage(a.philosophyImage).width(800).url()}
                    alt="Salon Atmosphere"
                    width={800}
                    height={1066}
                    className="w-full h-full object-cover brightness-95 group-hover:brightness-105 transition-all duration-[2000ms]"
                  />
                ) : (
                  <div className="w-full h-full bg-off-white flex items-center justify-center text-gray-300 text-xs uppercase tracking-widest">
                    Kép a CMS-ből
                  </div>
                )}
              </div>
              <div className="absolute -bottom-16 -left-16 bg-black text-white p-12 hidden xl:block border border-luxury-gold/20 shadow-2xl">
                <div className="space-y-8">
                  <div className="flex gap-6 items-center">
                    <History size={24} className="text-luxury-gold" />
                    <div>
                      <p className="text-2xl font-serif italic">20+ Év</p>
                      <p className="text-[9px] uppercase tracking-widest text-gray-400">
                        Tapasztalat
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-center">
                    <Award size={24} className="text-luxury-gold" />
                    <div>
                      <p className="text-2xl font-serif italic">KM Specialist</p>
                      <p className="text-[9px] uppercase tracking-widest text-gray-400">
                        Minősítés
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {team.length > 0 && (
        <section className="py-32 md:py-64 bg-off-white relative">
          <div className="max-w-7xl mx-auto px-8">
            <SectionTitle title="Csapatunk" subtitle="MUNKATÁRSAK" align="center" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-24 lg:gap-32">
              {team.map((member, i) => (
                <TeamCard key={member._id} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-32 md:py-64 bg-white relative overflow-hidden text-black">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <SectionTitle title="Szakmai szemlélet" subtitle="SZAKMAI HÁTTÉR" />
              <div className="space-y-8 text-xl font-light text-gray-500 leading-relaxed">
                {splitParagraphs(a.kmFilozofiaBody).length > 0 ? (
                  splitParagraphs(a.kmFilozofiaBody).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))
                ) : (
                  <p>
                    A szalonban kizárólag Kevin Murphy professzionális
                    termékekkel dolgozunk.
                  </p>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden border border-luxury-gold/20 p-2">
                {a.kmFilozofiaImage ? (
                  <Image
                    src={urlForImage(a.kmFilozofiaImage).width(1000).url()}
                    alt="Kevin Murphy Products"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-off-white" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {a.whyChooseUsItems && a.whyChooseUsItems.length > 0 && (
        <section className="py-32 md:py-48 bg-off-white">
          <div className="max-w-5xl mx-auto px-8">
            <SectionTitle
              title={a.whyChooseUsTitle ?? "Miért válassz minket?"}
              subtitle="ELŐNYÖK"
              align="center"
            />
            <ul className="grid md:grid-cols-2 gap-x-16 gap-y-8 max-w-3xl mx-auto">
              {a.whyChooseUsItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-5 border-b border-black/5 pb-6"
                >
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-luxury-gold/10">
                    <Check size={16} className="text-luxury-gold" />
                  </span>
                  <span className="text-lg font-light text-gray-700 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {(a.closingQuote ?? FALLBACK_ABOUT.closingQuote) && (
        <section className="py-32 md:py-48 bg-black text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <h2 className="text-[30vw] font-serif italic leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
              POP HAIR
            </h2>
          </div>
          <div className="max-w-4xl mx-auto px-8 relative z-10">
            <PerspectiveReveal>
              <h3 className="text-4xl md:text-7xl font-serif italic leading-tight mb-16">
                &ldquo;
                {a.closingQuote ?? FALLBACK_ABOUT.closingQuote}
                &rdquo;
              </h3>
            </PerspectiveReveal>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-luxury-gold" />
              <span className="text-[10px] uppercase font-bold tracking-[0.5em]">
                {a.closingQuoteAuthor ?? FALLBACK_ABOUT.closingQuoteAuthor}
              </span>
              <div className="w-12 h-[1px] bg-luxury-gold" />
            </div>
          </div>
        </section>
      )}

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center text-center">
          <Heart className="text-luxury-gold mb-8 animate-pulse" size={32} />
          <h2 className="text-4xl md:text-6xl font-serif italic mb-12">
            Szeretettel várlak{" "}
            <span className="text-luxury-gold">a Pop Hair Salonban!</span>
          </h2>
          <a
            href={settings.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-16 py-6 bg-luxury-gold text-black text-[12px] uppercase font-bold tracking-[0.5em] shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-shadow"
          >
            Időpontfoglalás
          </a>
        </div>
      </section>
    </div>
  );
}
