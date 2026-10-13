import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Főoldal-variációk",
  robots: { index: false, follow: false },
};

const VARIANTS = [
  {
    id: "a",
    letter: "A",
    name: "Klasszikus",
    text: "Középre rendezett, nyugodt elrendezés vékony arany díszvonalakkal és sok levegővel. Visszafogott, időtálló elegancia.",
    traits: ["szimmetrikus szekciók", "étlapszerű szolgáltatáslista", "áttűnő vélemény-idézet"],
  },
  {
    id: "b",
    letter: "B",
    name: "Modern",
    text: "Rácsos, számozott szekciók, nagy fotók és oldalra húzható galéria — a Kevin Murphy oldalak letisztult, magazinszerű stílusában.",
    traits: ["számozott szekciók", "húzható képsor", "gördülő vélemény-szalag"],
  },
  {
    id: "c",
    letter: "C",
    name: "Meleg butik",
    text: "Lágy, homokszínű hátterek, boltíves és kerek képkeretek, lekerekített kártyák. Személyes, barátságos hangulat.",
    traits: ["boltíves képkeretek", "mozaikszerű galéria", "kártyás vélemények"],
  },
];

export default function VariantsHub() {
  return (
    <div className="bg-off-white px-6 pb-32 pt-44 md:pt-52">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-luxury-gold">Pop Hair Salon</p>
          <h1 className="mt-5 font-serif text-5xl md:text-6xl font-light tracking-tight text-black">Főoldal-variációk</h1>
          <p className="mt-6 text-[17px] leading-relaxed text-gray-600">
            Három különböző elrendezés ugyanazzal a tartalommal, színekkel és betűtípusokkal. A videós nyitókép
            mindhárom változatban azonos — a különbség a lenti szekciók felépítésében van. Érdemes telefonon is
            megnézni őket, és nyugodtan jelezd azt is, ha az egyes változatokból más-más részletek tetszenek.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {VARIANTS.map((v) => (
            <Link
              key={v.id}
              href={`/variaciok/${v.id}`}
              className="group flex flex-col rounded-3xl bg-white p-8 shadow-[0_24px_60px_-40px_rgba(120,90,40,0.5)] transition duration-500 hover:-translate-y-1"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-luxury-gold/15 font-serif text-3xl text-luxury-gold">
                {v.letter}
              </span>
              <h2 className="mt-6 font-serif text-3xl text-black">{v.name}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-gray-600">{v.text}</p>
              <ul className="mt-6 space-y-2 border-t border-black/10 pt-6 text-sm text-gray-700">
                {v.traits.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-luxury-gold" />
                    {t}
                  </li>
                ))}
              </ul>
              <span className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-black group-hover:text-luxury-gold">
                Megnézem <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
