import { notFound } from "next/navigation";
import { getHomeData } from "@/lib/home-data";
import { VariantA } from "@/components/variants/VariantA";
import { VariantB } from "@/components/variants/VariantB";
import { VariantC } from "@/components/variants/VariantC";
import { VariantSwitcher } from "@/components/variants/VariantSwitcher";

const VARIANTS = {
  a: { name: "A — Klasszikus", Component: VariantA },
  b: { name: "B — Modern", Component: VariantB },
  c: { name: "C — Meleg butik", Component: VariantC },
} as const;

type VariantId = keyof typeof VARIANTS;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(VARIANTS).map((variant) => ({ variant }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = VARIANTS[variant as VariantId];
  return {
    title: v ? `Főoldal-variáció ${v.name}` : "Főoldal-variáció",
    robots: { index: false, follow: false },
  };
}

export default async function VariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = VARIANTS[variant as VariantId];
  if (!v) notFound();
  const data = await getHomeData();
  return (
    <>
      <v.Component data={data} />
      <VariantSwitcher />
    </>
  );
}
