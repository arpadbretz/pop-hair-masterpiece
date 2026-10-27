import Link from "next/link";
import { ArrowRight, ArrowUpRight, Instagram, Facebook, MapPin, Phone, Star } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { directionsUrl, MAPS_PLACE_URL, type HomeData } from "@/lib/home-data";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { ReviewsMarquee } from "./ReviewsMarquee";
import { BOOKING_INVITE, telHref } from "./contact";

function SectionHead({
  no,
  title,
  href,
  linkLabel,
  aside,
}: {
  no: string;
  title: string;
  href?: string;
  linkLabel?: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-black pb-5">
      <div className="flex items-baseline gap-4 md:gap-6">
        <span className="text-[11px] font-semibold tracking-[0.3em] text-luxury-gold">{no}</span>
        <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-black">{title}</h2>
      </div>
      {aside}
      {href && linkLabel && (
        <Link
          href={href}
          className="group hidden sm:inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-black hover:text-luxury-gold"
        >
          {linkLabel}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

/** Diamond-and-hairlines ornament of the classic layout (used by the services section). */
function Ornament() {
  return (
    <div className="mb-6 flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-10 bg-luxury-gold/60" />
      <span className="h-1.5 w-1.5 rotate-45 bg-luxury-gold" />
      <span className="h-px w-10 bg-luxury-gold/60" />
    </div>
  );
}

const btnSolid =
  "inline-flex items-center justify-center gap-2 bg-black px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-luxury-gold hover:text-black";
const btnOutline =
  "inline-flex items-center justify-center gap-2 border border-black px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-black transition-colors hover:bg-black hover:text-white";
const btnDarkClassic =
  "inline-flex items-center justify-center gap-2 bg-black px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:bg-luxury-gold hover:text-black";
const btnLine =
  "inline-flex items-center gap-2 border-b border-black/30 pb-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-black transition-colors hover:border-luxury-gold hover:text-luxury-gold";

/** Home page: the modern, numbered layout Szilvi picked (variant B), with
 * reviews moved up right after the hero and the services list taken from
 * the classic layout (variant A). */
export function HomePage({ data }: { data: HomeData }) {
  const { settings, about, services, gallery, km, wedding, reviews } = data;
  const wrap = "mx-auto max-w-7xl px-6 md:px-10";

  return (
    <>
      <HeroSection {...data.hero} />

      {/* 01 Vélemények — marquee */}
      {reviews.length > 0 && (
        <section className="bg-off-white py-20 md:py-28">
          <div className={wrap}>
            <SectionHead
              no="01"
              title="Vélemények"
              aside={
                settings.googleRating ? (
                  <a
                    href={MAPS_PLACE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-black hover:text-luxury-gold"
                  >
                    <span className="font-serif text-5xl font-light">{settings.googleRating.toString().replace(".", ",")}</span>
                    <span className="flex flex-col">
                      <span className="flex gap-0.5 text-luxury-gold">
                        {Array.from({ length: 5 }).map((_, k) => (
                          <Star key={k} size={13} fill="currentColor" strokeWidth={0} />
                        ))}
                      </span>
                      <span className="mt-1 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-gray-600">
                        {settings.reviewCount} Google-értékelés <ArrowUpRight size={12} />
                      </span>
                    </span>
                  </a>
                ) : undefined
              }
            />
          </div>
          <div className="mt-12">
            <ReviewsMarquee reviews={reviews} />
          </div>
        </section>
      )}

      {/* 02 Rólunk */}
      <section className="bg-white py-24 md:py-32">
        <div className={wrap}>
          <SectionHead no="02" title="Rólunk" href="/rolunk" linkLabel="Ismerj meg minket" />
          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5 lg:pt-6">
              {about.quote && (
                <p className="font-serif text-3xl md:text-4xl font-light leading-tight text-black">{about.quote}</p>
              )}
              <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-gray-600">
                {about.body.slice(0, 2).map((p, k) => (
                  <p key={k}>{p}</p>
                ))}
              </div>
              <Link href="/rolunk" className={`${btnOutline} mt-10 sm:hidden`}>
                Ismerj meg minket
              </Link>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 lg:col-span-7">
              <Reveal className="aspect-[3/4] overflow-hidden">
                <Photo img={about.image} width={800} ratio={4 / 3} sizes="(max-width: 1024px) 50vw, 400px" />
              </Reveal>
              <Reveal delay={0.15} className="mt-16 aspect-[3/4] overflow-hidden md:mt-24">
                <Photo img={gallery[0]} width={800} ratio={4 / 3} sizes="(max-width: 1024px) 50vw, 400px" />
              </Reveal>
            </div>
          </div>

          {about.why.length > 0 && (
            <Reveal className="mt-24">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-black">Miért válassz minket?</p>
              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
                {about.why.map((item, k) => (
                  <li key={k} className="border-t border-black/15 pt-5">
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-luxury-gold">{String(k + 1).padStart(2, "0")}</span>
                    <p className="mt-3 text-[15px] leading-snug text-gray-800">{item}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      {/* Szolgáltatásaink — the classic, menu-like list */}
      <section className="bg-off-white px-6 py-24 md:py-32">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Ornament />
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-black">Szolgáltatásaink</h2>
          {services.intro && (
            <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-gray-600">{services.intro}</p>
          )}
          <ul className="mt-14 grid gap-x-16 text-left sm:grid-cols-2">
            {services.items.map((s, k) => (
              <li key={s._id} className="flex items-baseline gap-5 border-b border-black/10 py-5">
                <span className="w-6 font-serif text-base text-luxury-gold">{String(k + 1).padStart(2, "0")}</span>
                <span className="font-serif text-2xl font-light text-black">{s.name}</span>
              </li>
            ))}
          </ul>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-8">
            <a href={settings.bookingUrl} target="_blank" rel="noopener noreferrer" className={btnDarkClassic}>
              Időpontfoglalás
            </a>
            <Link href="/szolgaltatasok" className={btnLine}>
              Részletek
            </Link>
          </div>
        </Reveal>
      </section>

      {/* 03 Munkáink — full-bleed swipe strip */}
      {gallery.length > 0 && (
        <section className="bg-white py-24 md:py-32">
          <div className={wrap}>
            <SectionHead no="03" title="Munkáink" href="/galeria" linkLabel="Teljes galéria" />
          </div>
          <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 no-scrollbar md:px-10">
            {gallery.slice(1, 11).map((img, k) => (
              <div key={k} className="aspect-[3/4] w-[70vw] shrink-0 snap-start overflow-hidden sm:w-[42vw] lg:w-[23vw]">
                <Photo img={img} width={700} ratio={4 / 3} sizes="(max-width: 640px) 70vw, (max-width: 1024px) 42vw, 23vw" />
              </div>
            ))}
          </div>
          <p className={`${wrap} mt-6 text-[11px] uppercase tracking-[0.25em] text-gray-500`}>Húzd oldalra a képeket →</p>
        </section>
      )}

      {/* 04 Szakmai szemlélet — the salon's product brand. Split with a photo
          once one is uploaded in the Studio, text-only until then. */}
      {km.body.length > 0 &&
        (km.image ? (
          <section className="grid bg-off-white lg:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:min-h-[44rem]">
              <Photo img={km.image} width={1000} ratio={5 / 4} sizes="(max-width: 1024px) 100vw, 50vw" className="absolute inset-0" />
            </div>
            <Reveal className="flex flex-col justify-center px-6 py-20 md:px-16 lg:px-20">
              <span className="text-[11px] font-semibold tracking-[0.3em] text-luxury-gold">04</span>
              <h2 className="mt-4 font-serif text-4xl md:text-6xl font-light tracking-tight text-black">Szakmai szemlélet</h2>
              {km.title && <p className="mt-2 font-serif text-3xl md:text-4xl italic text-luxury-gold">{km.title}</p>}
              <div className="mt-10 max-w-lg space-y-5 border-t border-black/15 pt-8 text-[17px] leading-relaxed text-gray-700">
                {km.body.map((p, k) => (
                  <p key={k}>{p}</p>
                ))}
              </div>
            </Reveal>
          </section>
        ) : (
          <section className="bg-off-white py-24 md:py-32">
            <div className={wrap}>
              <SectionHead no="04" title="Szakmai szemlélet" />
              <Reveal className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
                {km.title && (
                  <p className="font-serif text-4xl md:text-6xl italic leading-tight text-luxury-gold lg:col-span-5">{km.title}</p>
                )}
                <div className="space-y-5 text-[17px] leading-relaxed text-gray-700 lg:col-span-7">
                  {km.body.map((p, k) => (
                    <p key={k}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        ))}

      {/* 05 Esküvői frizurák — bento */}
      <section className="bg-white py-24 md:py-32">
        <div className={wrap}>
          <SectionHead no="05" title={wedding.title} href="/eskuvo" linkLabel="Esküvői oldal" />
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-2">
            <Reveal className="relative col-span-2 aspect-[3/4] overflow-hidden lg:row-span-2 lg:aspect-auto">
              <Photo img={wedding.images[0]} width={1000} ratio={4 / 3} sizes="(max-width: 1024px) 100vw, 50vw" className="absolute inset-0" />
            </Reveal>
            <Reveal delay={0.1} className="col-span-2 flex flex-col justify-between bg-soft-black p-8 text-white md:p-10">
              {wedding.quote && (
                <p className="font-serif text-3xl md:text-4xl font-light italic leading-tight">„{wedding.quote}”</p>
              )}
              <Link
                href="/eskuvo"
                className="group mt-10 inline-flex items-center gap-2 self-start text-[11px] font-semibold uppercase tracking-[0.25em] text-luxury-gold hover:text-white"
              >
                {wedding.title}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
            {wedding.images.slice(1, 3).map((img, k) => (
              <Reveal key={k} delay={0.15 + k * 0.1} className="aspect-[3/4] overflow-hidden">
                <Photo img={img} width={600} ratio={4 / 3} sizes="(max-width: 1024px) 50vw, 25vw" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 Időpontfoglalás */}
      <section className="bg-off-white py-24 md:py-32">
        <div className={`${wrap} grid gap-16 lg:grid-cols-2`}>
          <Reveal>
            <span className="text-[11px] font-semibold tracking-[0.3em] text-luxury-gold">06</span>
            <h2 className="mt-4 font-serif text-5xl md:text-7xl font-light leading-none tracking-tight text-black">Időpontfoglalás</h2>
            <p className="mt-8 max-w-md text-[17px] leading-relaxed text-gray-600">{BOOKING_INVITE}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={settings.bookingUrl} target="_blank" rel="noopener noreferrer" className={btnSolid}>
                Online időpontfoglalás
              </a>
              <a href={telHref(settings.phone)} className={btnOutline}>
                <Phone size={14} /> Hívás
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="divide-y divide-black/10 border-y border-black/10">
              <div className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-3 sm:gap-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-500">Cím</dt>
                <dd className="sm:col-span-2">
                  <p className="text-black">{settings.address}</p>
                  <a
                    href={directionsUrl(settings.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-sm text-luxury-gold hover:text-black"
                  >
                    <MapPin size={14} /> Útvonaltervezés
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-3 sm:gap-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-500">Nyitvatartás</dt>
                <dd className="sm:col-span-2 space-y-1.5">
                  {settings.openingHours.map((h) => (
                    <div key={h.label} className="flex justify-between gap-4 text-[15px]">
                      <span className="text-gray-600">{h.label}</span>
                      <span className="text-black">{h.hours}</span>
                    </div>
                  ))}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-3 sm:gap-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-500">Telefon</dt>
                <dd className="sm:col-span-2">
                  <a href={telHref(settings.phone)} className="text-black hover:text-luxury-gold">
                    {settings.phone}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-3 sm:gap-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-500">Közösség</dt>
                <dd className="sm:col-span-2 flex gap-5 text-black">
                  {settings.instagramUrl && (
                    <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-luxury-gold">
                      <Instagram size={20} strokeWidth={1.5} />
                    </a>
                  )}
                  {settings.facebookUrl && (
                    <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-luxury-gold">
                      <Facebook size={20} strokeWidth={1.5} />
                    </a>
                  )}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
