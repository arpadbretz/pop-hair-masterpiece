import { sanityFetch } from "@/sanity/lib/fetch";
import { servicesQuery } from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import type { Service } from "@/sanity/lib/types";
import { SectionTitle } from "@/components/Common";
import { ServiceRow } from "@/components/services/ServiceRow";

export const metadata = {
  title: "Szolgáltatások",
  description:
    "Mesterfodrász vágás, balayage, Kevin Murphy rituálék és elrontott hajak javítása Budán.",
};

const FALLBACK_SERVICES: Service[] = [
  {
    _id: "fallback-1",
    name: "Elrontott hajak javítása",
    price: "Egyéni kalkuláció",
    description:
      "Specialitásunk a másutt elrontott színek és formák professzionális helyrehozása.",
    highlight: true,
    icon: "refresh",
  },
  {
    _id: "fallback-2",
    name: "Mesterfodrász vágás",
    price: "28.000 HUF-tól",
    description: "Bacsik Szilvia vezetésével, arcformához és karakterhez tervezve.",
    icon: "scissors",
  },
  {
    _id: "fallback-3",
    name: "Balayage Ritual",
    price: "42.000 HUF-tól",
    description: "Kevin Murphy kényeztetéssel és prémium árnyalással.",
    icon: "sparkles",
  },
  {
    _id: "fallback-4",
    name: "Női hajvágás",
    price: "22.500 HUF",
    description: "Személyre szabott stílustanácsadással és mosással.",
    icon: "scissors",
  },
  {
    _id: "fallback-5",
    name: "Kevin Murphy rituálé",
    price: "18.500 HUF",
    description: "Mélytápláló kezelés a haj szerkezetének újjáépítésére.",
    icon: "heart",
  },
];

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    sanityFetch<Service[]>({
      query: servicesQuery,
      tags: ["service"],
    }).catch(() => [] as Service[]),
    getSiteSettings(),
  ]);

  const list = services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <div className="pt-48 pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <SectionTitle title="Szolgáltatások" subtitle="SZAKÉRTELEM" align="center" />

        <div className="max-w-4xl mx-auto space-y-12">
          {list.map((service, i) => (
            <ServiceRow
              key={service._id}
              service={service}
              index={i}
              bookingUrl={settings.bookingUrl}
            />
          ))}
        </div>

        <div className="mt-32 md:mt-48 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="aspect-[4/5] overflow-hidden bg-off-white relative">
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 via-transparent to-luxury-gold/5" />
          </div>
          <div className="space-y-12">
            <SectionTitle title="Mesteri Hajjavítás" subtitle="SPECIALITÁSUNK" />
            <p className="text-xl font-light text-gray-500 leading-relaxed italic">
              Sokan keresnek meg minket elrontott színekkel, foltos balayage-zsal
              vagy helytelenül vágott formákkal. Számunkra nincs reménytelen
              eset, csak szakmai kihívás.
            </p>
            <div className="space-y-8">
              {[
                {
                  num: "01.",
                  title: "Állapotfelmérés",
                  desc: "Részletes elemzés a haj szerkezetéről és a korábbi kémiai folyamatokról.",
                },
                {
                  num: "02.",
                  title: "Szerkezetépítés",
                  desc: "Mielőtt új színt adnánk, megerősítjük a hajszálakat Kevin Murphy rituálékkal.",
                },
                {
                  num: "03.",
                  title: "Színkorrekció",
                  desc: "Eltüntetjük a foltokat és visszahozzuk a haj természetes, luxus fényét.",
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="flex gap-8 border-b border-black/5 pb-8 last:border-0"
                >
                  <span className="text-luxury-gold font-serif italic text-3xl">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="text-xl font-serif italic mb-2">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
