import { sanityFetch } from "@/sanity/lib/fetch";
import { pricingItemsQuery } from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import type { PricingItem } from "@/sanity/lib/types";
import { SectionTitle } from "@/components/Common";
import { PricingRow } from "@/components/pricing/PricingRow";

export const metadata = {
  title: "Áraink",
  description: "Pop Hair Salon szolgáltatások árlistája — Budai mesterszalon.",
};

// Fallback only kicks in if Sanity is unreachable. Mirrors Szilvi's service
// list with "Egyéni kalkuláció" placeholders.
const FALLBACK_PRICING: PricingItem[] = [
  { _id: "p1", name: "női hajvágás", price: "Egyéni kalkuláció" },
  { _id: "p2", name: "férfi hajvágás és barber szolgáltatások", price: "Egyéni kalkuláció" },
  { _id: "p3", name: "hajfestés", price: "Egyéni kalkuláció" },
  { _id: "p4", name: "balayage technikák", price: "Egyéni kalkuláció" },
  { _id: "p5", name: "hajhosszabbítás (nano kapszula)", price: "Egyéni kalkuláció" },
  { _id: "p6", name: "professzionális hajápolás", price: "Egyéni kalkuláció" },
  { _id: "p7", name: "alkalmi frizurák", price: "Egyéni kalkuláció" },
  { _id: "p8", name: "menyasszonyi frizurák", price: "Egyéni kalkuláció" },
];

export default async function PricingPage() {
  const [items, settings] = await Promise.all([
    sanityFetch<PricingItem[]>({
      query: pricingItemsQuery,
      tags: ["pricingItem"],
    }).catch(() => [] as PricingItem[]),
    getSiteSettings(),
  ]);

  const list = items.length > 0 ? items : FALLBACK_PRICING;

  return (
    <div className="pt-48 pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <SectionTitle title="A Befektetés" subtitle="ÁRAINK" align="center" />

        <div className="grid lg:grid-cols-2 gap-x-32 gap-y-16 mt-20">
          {list.map((item, i) => (
            <PricingRow key={item._id} item={item} index={i} />
          ))}
        </div>

        <div className="mt-32 p-12 lg:p-16 bg-off-white text-center border border-luxury-gold/10">
          <p className="text-lg font-light text-gray-700 mb-8 italic">
            Az árak tájékoztató jellegűek, a pontos összeg a haj hosszától és
            sűrűségétől függően változhat. Személyes konzultáció során pontos
            árajánlatot adunk.
          </p>
          <a
            href={settings.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-5 bg-black text-white text-[10px] uppercase font-bold tracking-[0.5em] hover:bg-luxury-gold hover:text-black transition-all"
          >
            Időpontot foglalok
          </a>
        </div>
      </div>
    </div>
  );
}
