import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { servicesQuery, servicesContentQuery } from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import type { Service, ServicesContent } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import { SectionTitle } from "@/components/Common";
import { ServiceRow } from "@/components/services/ServiceRow";
import { splitParagraphs } from "@/lib/paragraphs";

export const metadata = {
  title: "Szolgáltatások",
  description:
    "Női és férfi hajvágás, festés, balayage, hajhosszabbítás, alkalmi és menyasszonyi frizurák Budán.",
};

const FALLBACK_CONTENT: ServicesContent = {
  actionTitleLine1: "Precizitás abban,",
  actionTitleLine2: "amit csinálunk.",
  actionSubtitle: "Budai Mesterszalon • Mesterfodrász vágás",
};

export default async function ServicesPage() {
  const [services, content, settings] = await Promise.all([
    sanityFetch<Service[]>({
      query: servicesQuery,
      tags: ["service"],
    }).catch(() => [] as Service[]),
    sanityFetch<ServicesContent | null>({
      query: servicesContentQuery,
      tags: ["servicesContent"],
    }).catch(() => null),
    getSiteSettings(),
  ]);

  const c = content ?? FALLBACK_CONTENT;
  const introParagraphs = splitParagraphs(c.introBody);
  const closingParagraphs = splitParagraphs(c.closingBody);
  const hairExtensionParagraphs = splitParagraphs(c.hairExtensionsBody);

  return (
    <div className="pt-48 pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <SectionTitle
          title="Szolgáltatásaink"
          subtitle="SZAKÉRTELEM"
          align="center"
        />

        {introParagraphs.length > 0 && (
          <div className="max-w-3xl mx-auto -mt-12 mb-20 space-y-6 text-center">
            {introParagraphs.map((p, i) => (
              <p
                key={i}
                className="text-xl font-light text-gray-500 leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>
        )}

        {services.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-12">
            {services.map((service, i) => (
              <ServiceRow
                key={service._id}
                service={service}
                index={i}
                bookingUrl={settings.bookingUrl}
              />
            ))}
          </div>
        )}

        {closingParagraphs.length > 0 && (
          <div className="max-w-3xl mx-auto mt-24 space-y-6 text-center">
            {closingParagraphs.map((p, i) => (
              <p
                key={i}
                className="text-lg font-light text-gray-500 leading-relaxed italic"
              >
                {p}
              </p>
            ))}
          </div>
        )}

        {hairExtensionParagraphs.length > 0 && (
          <div className="mt-32 md:mt-48 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative aspect-[4/5] overflow-hidden group shadow-2xl bg-off-white">
              {c.repairImage ? (
                <Image
                  src={urlForImage(c.repairImage).width(1000).url()}
                  alt={c.hairExtensionsTitle ?? "Hajhosszabbítás"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 via-transparent to-luxury-gold/5" />
              )}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
            </div>
            <div className="space-y-10">
              <SectionTitle
                title={c.hairExtensionsTitle ?? "Hajhosszabbítás és hajkereskedelem"}
                subtitle="KIEMELT TERÜLET"
              />
              <div className="space-y-6 text-lg font-light text-gray-500 leading-relaxed">
                {hairExtensionParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-32 md:mt-48 bg-off-white p-2">
          <div className="relative h-[600px] overflow-hidden">
            {c.actionImage ? (
              <Image
                src={urlForImage(c.actionImage).width(2000).url()}
                alt={c.actionSubtitle ?? "Pop Hair Salon"}
                fill
                sizes="100vw"
                className="object-cover brightness-50"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-black via-luxury-gold/5 to-black" />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
              <h3 className="text-white text-5xl md:text-7xl font-serif italic mb-8">
                {c.actionTitleLine1 ?? FALLBACK_CONTENT.actionTitleLine1} <br />
                <span className="text-luxury-gold">
                  {c.actionTitleLine2 ?? FALLBACK_CONTENT.actionTitleLine2}
                </span>
              </h3>
              <p className="text-white/60 text-[10px] uppercase font-bold tracking-[0.5em]">
                {c.actionSubtitle ?? FALLBACK_CONTENT.actionSubtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
