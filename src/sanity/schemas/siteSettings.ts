import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Beállítások",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Szalon neve",
      type: "string",
      initialValue: "Pop Hair Salon",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Szlogen",
      type: "string",
      initialValue: "Budai Mesterszalon",
    }),
    defineField({
      name: "phone",
      title: "Telefonszám",
      type: "string",
      initialValue: "06 30 590 1766",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "email",
      title: "E-mail cím",
      type: "string",
      initialValue: "hello@pophair.hu",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "address",
      title: "Cím",
      type: "string",
      initialValue: "Budapest, Alkotás u. 39 c, 1023",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "googleMapsEmbedUrl",
      title: "Google Maps embed URL",
      description: "A teljes iframe src URL.",
      type: "url",
    }),
    defineField({
      name: "bookingUrl",
      title: "Időpontfoglalás URL",
      type: "url",
      initialValue: "https://b998424.alteg.io/company/624179/personal/menu?o=",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "openingHours",
      title: "Nyitvatartás",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Címke",
              type: "string",
              description: "Pl. 'Hétfő - Péntek'",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "hours",
              title: "Idő",
              type: "string",
              description: "Pl. '08:00 - 20:00' vagy 'Zárva'",
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "hours" },
          },
        },
      ],
      initialValue: [
        { label: "Hétfő - Péntek", hours: "08:00 - 20:00" },
        { label: "Szombat", hours: "09:00 - 15:00" },
      ],
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram",
      type: "url",
      initialValue: "https://www.instagram.com/pophair_szalon/",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook",
      type: "url",
      initialValue: "https://www.facebook.com/pophairszalon",
    }),
    defineField({
      name: "tiktokUrl",
      title: "TikTok",
      type: "url",
    }),
    defineField({
      name: "googleRating",
      title: "Google átlagos értékelés",
      type: "number",
      initialValue: 4.9,
      validation: (r) => r.min(0).max(5),
    }),
    defineField({
      name: "reviewCount",
      title: "Vélemények száma",
      type: "number",
      initialValue: 500,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Beállítások" }),
  },
});
