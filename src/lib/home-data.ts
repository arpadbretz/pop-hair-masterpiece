import { groq } from "next-sanity";
import type { Image } from "sanity";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  homeContentQuery,
  aboutContentQuery,
  weddingContentQuery,
  servicesContentQuery,
  servicesQuery,
  reviewsQuery,
} from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import { urlForImage } from "@/sanity/lib/image";
import { splitParagraphs } from "@/lib/paragraphs";
import type {
  AboutContent,
  HomeContent,
  Review,
  Service,
  ServicesContent,
  SiteSettings,
  WeddingContent,
} from "@/sanity/lib/types";

export type SizedImage = { image: Image; alt: string; w: number; h: number };

// The homepage previews draw from the salon's own work + wedding photos.
// The master-exam certificate lives in the gallery but isn't "work".
const homeGalleryQuery = groq`
  *[_type == "galleryImage" && category in ["work", "wedding"] && _id != "gal-modern-haj"]
    | order(order asc) {
      _id,
      title,
      image,
      "w": image.asset->metadata.dimensions.width,
      "h": image.asset->metadata.dimensions.height
    }
`;

const weddingImagesQuery = groq`
  *[_type == "weddingContent"][0] {
    "hero": { "image": heroImage, "w": heroImage.asset->metadata.dimensions.width, "h": heroImage.asset->metadata.dimensions.height },
    "lookbook": lookbookImages[] { "image": @, "alt": alt, "w": asset->metadata.dimensions.width, "h": asset->metadata.dimensions.height }
  }
`;

type GalleryRow = { _id: string; title: string; image: Image & { alt?: string }; w: number; h: number };
type WeddingImagesRow = {
  hero?: { image?: Image; w?: number; h?: number };
  lookbook?: { image: Image; alt?: string; w: number; h: number }[];
};

export const MAPS_PLACE_URL = "https://maps.google.com/?cid=12856288100331488411";

export function directionsUrl(address: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `Pop hair salon by Bacsik Szilvia, ${address}`
  )}`;
}

/** Crop helper for server components. */
export function imgUrl(image: Image, w: number, h?: number) {
  const b = urlForImage(image).width(w).auto("format").quality(80);
  return (h ? b.height(h).fit("crop") : b).url();
}

export type HomeData = {
  settings: SiteSettings;
  hero: {
    bookingUrl: string;
    eyebrow?: string;
    titleLine1: string;
    titleLine2: string;
    subtitle?: string;
    videoMp4: string;
    videoWebm?: string;
    posterUrl?: string;
    badge?: string;
  };
  about: { quote?: string; body: string[]; image?: SizedImage; why: string[] };
  services: { intro?: string; items: Service[] };
  gallery: SizedImage[];
  /** The salon's product brand section ("Szakmai szemlélet"). */
  km: { title?: string; body: string[]; image?: SizedImage };
  wedding: { title: string; quote?: string; images: SizedImage[] };
  reviews: Review[];
};

export async function getHomeData(): Promise<HomeData> {
  const [home, about, wedding, servicesContent, services, reviews, galleryRows, weddingImgs, settings] =
    await Promise.all([
      sanityFetch<HomeContent | null>({ query: homeContentQuery, tags: ["homeContent"] }).catch(() => null),
      sanityFetch<AboutContent | null>({ query: aboutContentQuery, tags: ["aboutContent"] }).catch(() => null),
      sanityFetch<WeddingContent | null>({ query: weddingContentQuery, tags: ["weddingContent"] }).catch(() => null),
      sanityFetch<ServicesContent | null>({ query: servicesContentQuery, tags: ["servicesContent"] }).catch(() => null),
      sanityFetch<Service[]>({ query: servicesQuery, tags: ["service"] }).catch(() => [] as Service[]),
      sanityFetch<Review[]>({ query: reviewsQuery, tags: ["review"] }).catch(() => [] as Review[]),
      sanityFetch<GalleryRow[]>({ query: homeGalleryQuery, tags: ["galleryImage"] }).catch(() => [] as GalleryRow[]),
      sanityFetch<WeddingImagesRow | null>({ query: weddingImagesQuery, tags: ["weddingContent"] }).catch(() => null),
      getSiteSettings(),
    ]);

  const sized = (image: Image | undefined, alt: string, w?: number, h?: number): SizedImage | undefined =>
    image && w && h ? { image, alt, w, h } : undefined;

  const aboutImage = about?.philosophyImage as (Image & { asset?: unknown }) | undefined;
  const kmImage = home?.kmImage;
  const brand = home?.kmTitle?.trim();

  const weddingImages = [
    sized(weddingImgs?.hero?.image, "Esküvői frizura", weddingImgs?.hero?.w, weddingImgs?.hero?.h),
    ...(weddingImgs?.lookbook ?? []).map((l) => sized(l.image, l.alt ?? "Esküvői frizura", l.w, l.h)),
  ].filter(Boolean) as SizedImage[];

  return {
    settings,
    hero: {
      bookingUrl: settings.bookingUrl,
      eyebrow: home?.heroEyebrow,
      titleLine1: home?.heroTitleLine1 ?? "A szépség,",
      titleLine2: home?.heroTitleLine2 ?? "ami önazonos.",
      subtitle: home?.heroSubtitle,
      videoMp4: home?.heroVideoMp4 ?? "/videos/hero.mp4",
      videoWebm: home?.heroVideoWebm ?? "/videos/hero.webm",
      posterUrl: home?.heroVideoPoster?.asset ? urlForImage(home.heroVideoPoster).url() : "/videos/hero-poster.jpg",
      badge: [brand, "Buda", "20 év", "Prémium"].filter(Boolean).join(" • ").toUpperCase() + " •",
    },
    about: {
      quote: about?.philosophyQuote,
      body: splitParagraphs(about?.philosophyBody),
      // dimensions aren't queried for singletons; portrait 3:4 is the house crop
      image: aboutImage?.asset ? { image: aboutImage, alt: "Pop Hair Salon", w: 3, h: 4 } : undefined,
      why: about?.whyChooseUsItems ?? [],
    },
    services: {
      intro: splitParagraphs(servicesContent?.introBody)[0],
      items: services,
    },
    // portrait, high-res only: every homepage slot is a portrait frame
    gallery: galleryRows
      .filter((g) => g.w >= 1000 && g.h > g.w)
      .map((g) => ({ image: g.image, alt: g.image.alt ?? g.title, w: g.w, h: g.h })),
    km: {
      title: brand,
      body: splitParagraphs(home?.kmDescription),
      image: kmImage?.asset ? { image: kmImage, alt: brand ? `${brand} termékek` : "Termékek", w: 3, h: 4 } : undefined,
    },
    wedding: {
      title: [wedding?.heroTitleLine1, wedding?.heroTitleLine2].filter(Boolean).join(" ").replace(/\.$/, "") || "Esküvői frizurák",
      quote: wedding?.heroQuote,
      images: weddingImages,
    },
    reviews,
  };
}
