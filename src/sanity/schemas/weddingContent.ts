import { defineField, defineType } from "sanity";

export const weddingContent = defineType({
  name: "weddingContent",
  title: "Esküvő oldal tartalom",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero felső mini-szöveg",
      type: "string",
      initialValue: "A Nagy Nap Művészete",
    }),
    defineField({
      name: "heroTitleLine1",
      title: "Hero főcím – 1. sor",
      type: "string",
      initialValue: "Esküvői",
    }),
    defineField({
      name: "heroTitleLine2",
      title: "Hero főcím – 2. sor (arany)",
      type: "string",
      initialValue: "Design.",
    }),
    defineField({
      name: "heroQuote",
      title: "Hero idézet",
      type: "text",
      rows: 3,
      initialValue:
        "Hiszünk abban, hogy a menyasszonyi frizura nem csupán egy viselet, hanem a személyiség és az alkalom harmonikus kivetülése.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero háttérkép",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "expertiseBody",
      title: "Szakértelem szöveg",
      type: "array",
      of: [{ type: "block", styles: [{ title: "Normál", value: "normal" }] }],
    }),
    defineField({
      name: "expertiseImageLeft",
      title: "Szakértelem bal kép",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "expertiseImageRight",
      title: "Szakértelem jobb kép",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "yearsLabel",
      title: "Év statisztika",
      type: "string",
      initialValue: "20+",
    }),
    defineField({
      name: "weddingsLabel",
      title: "Esküvő szám statisztika",
      type: "string",
      initialValue: "100+",
    }),
    defineField({
      name: "lookbookImages",
      title: "Lookbook képek (4 db)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt szöveg",
              type: "string",
            }),
          ],
        },
      ],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "ctaTitleLine1",
      title: "CTA cím – 1. sor",
      type: "string",
      initialValue: "Legyen a stílus az Ön",
    }),
    defineField({
      name: "ctaTitleLine2",
      title: "CTA cím – 2. sor (arany)",
      type: "string",
      initialValue: "legszebb ékszere.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Esküvő oldal" }),
  },
});
