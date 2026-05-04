import type { SiteSettings } from "./types";

// Fallback values used when Sanity returns null (no document yet).
export const SITE_SETTINGS_FALLBACK: SiteSettings = {
  siteName: "Pop Hair Salon",
  tagline: "Budai Mesterszalon",
  phone: "06 30 590 1766",
  email: "hello@pophair.hu",
  address: "Budapest, Alkotás u. 39 c, 1023",
  bookingUrl: "https://b998424.alteg.io/company/624179/personal/menu?o=",
  openingHours: [
    { label: "Hétfő - Péntek", hours: "08:00 - 20:00" },
    { label: "Szombat", hours: "09:00 - 15:00" },
  ],
  instagramUrl: "https://www.instagram.com/pophair_szalon/",
  facebookUrl: "https://www.facebook.com/pophairszalon",
  googleRating: 4.9,
  reviewCount: 500,
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.53177614!2d19.0229986!3d47.4912222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741de7ba1a0c4f7%3A0x7d8383e3e0689b9e!2zQnVkYXBlc3QsIEFsa290w6FzIHUuIDM5LCAxMTIz!5e0!3m2!1sen!2shu!4v1700000000000!5m2!1sen!2shu",
};
