import type { Image } from "sanity";

export interface SiteSettings {
  siteName: string;
  tagline?: string;
  phone: string;
  email: string;
  address: string;
  googleMapsEmbedUrl?: string;
  bookingUrl: string;
  openingHours: { label: string; hours: string }[];
  instagramUrl?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  googleRating?: number;
  reviewCount?: number;
}

export interface HomeContent {
  heroEyebrow?: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle?: string;
  heroVideoMp4?: string;
  heroVideoWebm?: string;
  heroVideoPoster?: Image;
  kmTitle?: string;
  kmDescription?: string;
  kmImage?: Image;
  yearsExperience?: string;
  reviewBadgeCount?: string;
}

export interface AboutContent {
  philosophyTitleLine1?: string;
  philosophyTitleLine2?: string;
  philosophyQuote?: string;
  philosophyBody?: string;
  philosophyImage?: Image;
  kmFilozofiaBody?: string;
  kmFilozofiaImage?: Image;
  closingQuote?: string;
  closingQuoteAuthor?: string;
  whyChooseUsTitle?: string;
  whyChooseUsItems?: string[];
}

export interface ServicesContent {
  repairImage?: Image;
  actionImage?: Image;
  actionTitleLine1?: string;
  actionTitleLine2?: string;
  actionSubtitle?: string;
  introBody?: string;
  closingBody?: string;
  hairExtensionsTitle?: string;
  hairExtensionsBody?: string;
}

export interface WeddingContent {
  heroEyebrow?: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroQuote?: string;
  heroImage?: Image;
  expertiseBody?: string;
  expertiseImageLeft?: Image;
  expertiseImageRight?: Image;
  yearsLabel?: string;
  weddingsLabel?: string;
  lookbookImages?: (Image & { alt?: string })[];
  ctaTitleLine1?: string;
  ctaTitleLine2?: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  speciality?: string;
  bio: string;
  image?: Image & { alt?: string };
}

export interface Service {
  _id: string;
  name: string;
  price?: string;
  description?: string;
  icon?: string;
  highlight?: boolean;
}

export interface GalleryImage {
  _id: string;
  title: string;
  image: Image & { alt?: string };
  category: "work" | "salon" | "wedding" | "video";
  size?: "small" | "large";
  videoUrl?: string;
}

export interface Review {
  _id: string;
  name: string;
  platform: string;
  text: string;
  rating: number;
}

export interface WeddingProcessStep {
  _id: string;
  title: string;
  description: string;
  icon?: string;
}

export type BlogPostCategory =
  | "tips"
  | "wedding"
  | "care"
  | "trends"
  | "salon"
  | "vlog";

export interface BlogPostListItem {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  category?: BlogPostCategory;
  coverImage?: Image & { alt?: string };
  excerpt?: string;
}

export interface BlogPost extends BlogPostListItem {
  videoUrl?: string;
  body: unknown[];
}
