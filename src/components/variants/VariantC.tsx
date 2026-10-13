import Link from "next/link";
import { Check, Instagram, Facebook, MapPin, Phone, Sparkles, Star, CalendarHeart } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { directionsUrl, MAPS_PLACE_URL, type HomeData } from "@/lib/home-data";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { ServiceIcon } from "./ServiceIcon";
import { BOOKING_INVITE, telHref } from "./contact";

const SAND = "bg-[#f3ebdf]";

function Badge() {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-luxury-gold/25 text-luxury-gold" aria-hidden>
      <Sparkles size={17} strokeWidth={1.5} />
    </span>
  );
}

function Heading({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h2 className={`mt-5 font-serif text-4xl md:text-5xl font-normal tracking-tight text-black ${center ? "text-center" : ""}`}>
      {children}
    </h2>
  );
}

const pillSolid =
  "inline-flex items-center justify-center gap-2 rounded-full bg-luxury-gold px-7 py-3.5 text-sm font-medium text-black shadow-[0_10px_30px_-12px_rgba(200,168,118,0.9)] transition hover:-translate-y-0.5 hover:bg-black hover:text-white";
const pillOutline =
  "inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:-translate-y-0.5 hover:border-luxury-gold";

/** C — Meleg butik: warm sand tints, arches, round frames, soft cards. */
export function VariantC({ data }: { data: HomeData }) {
  const { settings, about, services, gallery, km, wedding, reviews } = data;

  return (
    <>
      <HeroSection {...data.hero} />

      {/* Rólunk + Miért válassz minket */}
      <section className="bg-off-white px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2 md:gap-20">
          <Reveal className="relative mx-auto w-full max-w-md">
            <div className="aspect-[3/4] overflow-hidden rounded-t-full">
              <Photo img={about.image} width={800} ratio={4 / 3} sizes="(max-width: 768px) 90vw, 450px" />
            </div>
            <div className="absolute -bottom-8 -right-4 h-36 w-36 overflow-hidden rounded-full border-[6px] border-off-white md:-right-10 md:h-44 md:w-44">
              <Photo img={gallery[0]} width={360} ratio={1} sizes="176px" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Badge />
            <Heading>Rólunk</Heading>
            {about.quote && (
              <p className="mt-6 font-serif text-2xl md:text-3xl italic leading-snug text-gray-800">{about.quote}</p>
            )}
            {about.body[0] && <p className="mt-6 text-[17px] leading-relaxed text-gray-600">{about.body[0]}</p>}
            <Link href="/rolunk" className={`${pillOutline} mt-9`}>
              Ismerj meg minket
            </Link>
          </Reveal>
        </div>

        {about.why.length > 0 && (
          <Reveal className="mx-auto mt-28 max-w-4xl text-center">
            <h3 className="font-serif text-3xl md:text-4xl text-black">Miért válassz minket?</h3>
            <ul className="mt-10 flex flex-wrap justify-center gap-3">
              {about.why.map((item, k) => (
                <li
                  key={k}
                  className="inline-flex items-center gap-2.5 rounded-full border border-luxury-gold/35 bg-white px-5 py-3 text-[15px] text-gray-800 shadow-[0_8px_24px_-18px_rgba(120,90,40,0.6)]"
                >
                  <Check size={15} className="text-luxury-gold" strokeWidth={2.2} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </section>

      {/* Szolgáltatásaink — soft cards */}
      <section className="bg-white px-6 py-24 md:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge />
          </div>
          <Heading center>Szolgáltatásaink</Heading>
          {services.intro && <p className="mt-6 text-[17px] leading-relaxed text-gray-600">{services.intro}</p>}
        </Reveal>
        <div role="list" className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4">
          {services.items.map((s, k) => (
            <Reveal key={s._id} delay={(k % 4) * 0.06}>
              <div role="listitem" className="flex h-full flex-col items-center rounded-[1.75rem] bg-off-white px-5 py-8 text-center transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(120,90,40,0.55)] md:py-10">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-luxury-gold shadow-sm">
                  <ServiceIcon name={s.icon} size={20} />
                </span>
                <span className="mt-5 font-serif text-xl md:text-2xl leading-tight text-black">{s.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <a href={settings.bookingUrl} target="_blank" rel="noopener noreferrer" className={pillSolid}>
            <CalendarHeart size={16} /> Időpontfoglalás
          </a>
          <Link href="/szolgaltatasok" className={pillOutline}>
            Részletek
          </Link>
        </div>
      </section>

      {/* Munkáink — masonry */}
      {gallery.length > 0 && (
        <section className={`${SAND} px-6 py-24 md:py-32`}>
          <Reveal className="text-center">
            <div className="flex justify-center">
              <Badge />
            </div>
            <Heading center>Munkáink</Heading>
          </Reveal>
          <div className="mx-auto mt-14 max-w-6xl columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
            {gallery.slice(1, 13).map((img, k) => (
              <div key={k} className="break-inside-avoid overflow-hidden rounded-2xl">
                <Photo img={img} width={520} sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 280px" />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/galeria" className={pillOutline}>
              Teljes galéria
            </Link>
          </div>
        </section>
      )}

      {/* Szakmai szemlélet — overlapping frames */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2 md:gap-20">
          <Reveal className="relative mx-auto w-full max-w-md pb-16 md:order-2">
            <div className="aspect-[3/4] w-4/5 overflow-hidden rounded-[2rem]">
              <Photo img={km.image} width={760} ratio={4 / 3} sizes="(max-width: 768px) 72vw, 360px" />
            </div>
            {km.image2 && (
              <div className="absolute bottom-0 right-0 aspect-square w-1/2 overflow-hidden rounded-full border-[6px] border-white shadow-xl">
                <Photo img={km.image2} width={440} ratio={1} sizes="(max-width: 768px) 45vw, 225px" />
              </div>
            )}
          </Reveal>
          <Reveal delay={0.1} className="md:order-1">
            <Badge />
            <Heading>Szakmai szemlélet</Heading>
            <p className="mt-2 font-serif text-2xl md:text-3xl italic text-luxury-gold">Kevin Murphy</p>
            <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-gray-600">
              {km.body.map((p, k) => (
                <p key={k}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Esküvői frizurák — arches */}
      <section className="bg-off-white px-6 py-24 md:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge />
          </div>
          <Heading center>{wedding.title}</Heading>
          {wedding.quote && <p className="mt-6 font-serif text-2xl md:text-3xl italic text-gray-800">{wedding.quote}</p>}
        </Reveal>
        <div className="mx-auto mt-14 flex max-w-5xl items-end justify-center gap-3 md:gap-6">
          {[wedding.images[1], wedding.images[0], wedding.images[2]].map((img, k) => (
            <Reveal
              key={k}
              delay={k * 0.12}
              className={`overflow-hidden rounded-t-full ${k === 1 ? "aspect-[3/4.4] w-[80%] md:w-[40%]" : "hidden aspect-[3/4] w-[30%] md:block"}`}
            >
              <Photo img={img} width={k === 1 ? 700 : 520} ratio={k === 1 ? 4.4 / 3 : 4 / 3} sizes="(max-width: 768px) 40vw, 400px" />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/eskuvo" className={pillOutline}>
            {wedding.title}
          </Link>
        </div>
      </section>

      {/* Vélemények — carousel */}
      {reviews.length > 0 && (
        <section className={`${SAND} px-6 py-24 md:py-32`}>
          <Reveal className="text-center">
            <div className="flex justify-center">
              <Badge />
            </div>
            <Heading center>Vélemények</Heading>
            {settings.googleRating && (
              <a
                href={MAPS_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-sm text-gray-700 shadow-sm hover:text-black"
              >
                <Star size={15} fill="currentColor" strokeWidth={0} className="text-luxury-gold" />
                <span className="font-semibold text-black">{settings.googleRating.toString().replace(".", ",")}</span>
                <span>· {settings.reviewCount} Google-értékelés</span>
              </a>
            )}
          </Reveal>
          <div className="mx-auto mt-14 max-w-6xl">
            <ReviewsCarousel reviews={reviews} />
          </div>
        </section>
      )}

      {/* Időpontfoglalás — big soft card */}
      <section className="bg-white px-6 py-24 md:py-32">
        <Reveal className="mx-auto grid max-w-6xl gap-10 rounded-[2.5rem] bg-off-white p-8 md:p-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <Badge />
            <Heading>Időpontfoglalás</Heading>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-gray-600">{BOOKING_INVITE}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={settings.bookingUrl} target="_blank" rel="noopener noreferrer" className={pillSolid}>
                <CalendarHeart size={16} /> Online időpontfoglalás
              </a>
              <a href={telHref(settings.phone)} className={pillOutline}>
                <Phone size={15} /> {settings.phone}
              </a>
            </div>
          </div>
          <div className="rounded-[1.75rem] bg-white p-7 md:p-9 shadow-[0_24px_60px_-40px_rgba(120,90,40,0.6)]">
            <p className="text-sm font-semibold text-black">Nyitvatartás</p>
            <dl className="mt-4 space-y-2.5">
              {settings.openingHours.map((h) => (
                <div key={h.label} className="flex justify-between gap-4 border-b border-dashed border-black/10 pb-2.5 text-[15px] last:border-0">
                  <dt className="text-gray-600">{h.label}</dt>
                  <dd className="font-medium text-black">{h.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 text-sm font-semibold text-black">Címünk</p>
            <p className="mt-2 text-[15px] text-gray-700">{settings.address}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={directionsUrl(settings.address)} target="_blank" rel="noopener noreferrer" className={pillOutline}>
                <MapPin size={15} /> Útvonaltervezés
              </a>
              {settings.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 hover:border-luxury-gold">
                  <Instagram size={18} strokeWidth={1.6} />
                </a>
              )}
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 hover:border-luxury-gold">
                  <Facebook size={18} strokeWidth={1.6} />
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
