import Link from "next/link";
import { ArrowUpRight, Instagram, Facebook, MapPin, Phone } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { directionsUrl, MAPS_PLACE_URL, type HomeData } from "@/lib/home-data";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { ReviewsFade } from "./ReviewsFade";
import { BOOKING_INVITE, telHref } from "./contact";

function Ornament() {
  return (
    <div className="mb-6 flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-10 bg-luxury-gold/60" />
      <span className="h-1.5 w-1.5 rotate-45 bg-luxury-gold" />
      <span className="h-px w-10 bg-luxury-gold/60" />
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-black">{children}</h2>
  );
}

const btnDark =
  "inline-flex items-center justify-center gap-2 bg-black px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:bg-luxury-gold hover:text-black";
const btnLine =
  "inline-flex items-center gap-2 border-b border-black/30 pb-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-black transition-colors hover:border-luxury-gold hover:text-luxury-gold";

/** A — Klasszikus: centred, symmetric, hairline ornaments, lots of air. */
export function VariantA({ data }: { data: HomeData }) {
  const { settings, about, services, gallery, km, wedding, reviews } = data;

  return (
    <>
      <HeroSection {...data.hero} />

      {/* Rólunk */}
      <section className="bg-white px-6 py-24 md:py-36">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Ornament />
          <Heading>Rólunk</Heading>
          {about.quote && (
            <p className="mt-10 font-serif text-2xl md:text-3xl font-light italic leading-snug text-black">
              „{about.quote}”
            </p>
          )}
          {about.body[0] && (
            <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-relaxed text-gray-600">{about.body[0]}</p>
          )}
          <Link href="/rolunk" className={`${btnLine} mt-10`}>
            Ismerj meg minket
          </Link>
        </Reveal>
        <div className="mx-auto mt-20 grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          {[gallery[0], about.image, gallery[1]].map((img, k) => (
            <Reveal key={k} delay={k * 0.12} className={`aspect-[3/4] overflow-hidden ${k === 1 ? "md:-mt-10" : "md:mt-6"} ${k === 2 ? "hidden md:block" : ""}`}>
              <Photo img={img} width={720} ratio={4 / 3} sizes="(max-width: 768px) 33vw, 380px" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Miért válassz minket? */}
      {about.why.length > 0 && (
        <section className="bg-off-white px-6 py-24 md:py-32">
          <Reveal className="mx-auto max-w-5xl text-center">
            <Ornament />
            <Heading>Miért válassz minket?</Heading>
            <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:gap-x-12 md:gap-y-12 lg:grid-cols-3">
              {about.why.map((item, k) => (
                <li key={k} className="flex flex-col items-center">
                  <span className="font-serif text-3xl font-light text-luxury-gold">{String(k + 1).padStart(2, "0")}</span>
                  <span className="mt-3 h-px w-8 bg-black/15" />
                  <p className="mt-4 max-w-[16rem] text-[15px] leading-relaxed text-gray-700">{item}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}

      {/* Szolgáltatásaink */}
      <section className="bg-white px-6 py-24 md:py-32">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Ornament />
          <Heading>Szolgáltatásaink</Heading>
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
            <a href={settings.bookingUrl} target="_blank" rel="noopener noreferrer" className={btnDark}>
              Időpontfoglalás
            </a>
            <Link href="/szolgaltatasok" className={btnLine}>
              Részletek
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Munkáink */}
      {gallery.length > 0 && (
        <section className="bg-off-white px-6 py-24 md:py-32">
          <Reveal className="text-center">
            <Ornament />
            <Heading>Munkáink</Heading>
          </Reveal>
          <div className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {gallery.slice(2, 10).map((img, k) => (
              <Reveal key={k} delay={(k % 4) * 0.08} className="group aspect-[4/5] overflow-hidden">
                <Photo
                  img={img}
                  width={600}
                  ratio={5 / 4}
                  sizes="(max-width: 768px) 50vw, 290px"
                  className="transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/galeria" className={btnLine}>
              Teljes galéria
            </Link>
          </div>
        </section>
      )}

      {/* Szakmai szemlélet — Kevin Murphy */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal className="aspect-[3/4] overflow-hidden">
            <Photo img={km.image} width={900} ratio={4 / 3} sizes="(max-width: 768px) 100vw, 560px" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mb-6 flex items-center gap-3" aria-hidden>
              <span className="h-px w-10 bg-luxury-gold/60" />
              <span className="h-1.5 w-1.5 rotate-45 bg-luxury-gold" />
            </div>
            <Heading>Szakmai szemlélet</Heading>
            <p className="mt-3 font-serif text-2xl italic text-luxury-gold">Kevin Murphy</p>
            <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-gray-600">
              {km.body.map((p, k) => (
                <p key={k}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Esküvői frizurák */}
      <section className="bg-off-white px-6 py-24 md:py-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Ornament />
          <Heading>{wedding.title}</Heading>
          {wedding.quote && (
            <p className="mt-8 font-serif text-2xl md:text-3xl font-light italic leading-snug text-gray-800">„{wedding.quote}”</p>
          )}
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          {wedding.images.slice(0, 3).map((img, k) => (
            <Reveal key={k} delay={k * 0.12} className={`aspect-[2/3] overflow-hidden ${k === 2 ? "hidden md:block" : ""}`}>
              <Photo img={img} width={640} ratio={3 / 2} sizes="(max-width: 768px) 33vw, 320px" />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/eskuvo" className={btnLine}>
            Esküvői frizurák
          </Link>
        </div>
      </section>

      {/* Vélemények */}
      {reviews.length > 0 && (
        <section className="bg-white px-6 py-24 md:py-32">
          <Reveal className="text-center">
            <Ornament />
            <Heading>Vélemények</Heading>
            {settings.googleRating && (
              <a
                href={MAPS_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-luxury-gold"
              >
                <span className="font-serif text-xl text-black">{settings.googleRating.toString().replace(".", ",")}</span>
                <span className="text-luxury-gold">★★★★★</span>
                <span>· {settings.reviewCount} értékelés a Google-ön</span>
                <ArrowUpRight size={14} />
              </a>
            )}
          </Reveal>
          <div className="mt-16">
            <ReviewsFade reviews={reviews} />
          </div>
        </section>
      )}

      {/* Időpontfoglalás */}
      <section className="bg-off-white px-6 py-24 md:py-32">
        <Reveal className="mx-auto max-w-5xl text-center">
          <Ornament />
          <Heading>Időpontfoglalás</Heading>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-gray-600">{BOOKING_INVITE}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={settings.bookingUrl} target="_blank" rel="noopener noreferrer" className={btnDark}>
              Online időpontfoglalás
            </a>
            <a
              href={telHref(settings.phone)}
              className="inline-flex items-center gap-2 border border-black/20 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-black hover:border-luxury-gold hover:text-luxury-gold"
            >
              <Phone size={14} /> {settings.phone}
            </a>
          </div>
          <div className="mt-16 grid gap-10 border-t border-black/10 pt-14 text-center md:grid-cols-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-luxury-gold">Cím</p>
              <p className="mt-4 font-serif text-xl text-black">{settings.address}</p>
              <a
                href={directionsUrl(settings.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-luxury-gold"
              >
                <MapPin size={14} /> Útvonaltervezés
              </a>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-luxury-gold">Nyitvatartás</p>
              <dl className="mt-4 space-y-1.5 text-[15px] text-gray-700">
                {settings.openingHours.map((h) => (
                  <div key={h.label} className="flex justify-center gap-3">
                    <dt>{h.label}</dt>
                    <dd className="text-black">{h.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-luxury-gold">Kövess minket</p>
              <div className="mt-4 flex justify-center gap-5 text-black">
                {settings.instagramUrl && (
                  <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-luxury-gold">
                    <Instagram size={22} strokeWidth={1.5} />
                  </a>
                )}
                {settings.facebookUrl && (
                  <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-luxury-gold">
                    <Facebook size={22} strokeWidth={1.5} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
