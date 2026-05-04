import { defineField, defineType } from "sanity";

export const homeContent = defineType({
  name: "homeContent",
  title: "Főoldal tartalom",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero felső mini-szöveg",
      type: "string",
      initialValue: "Budai Szalon • Alapítva 2004",
    }),
    defineField({
      name: "heroTitleLine1",
      title: "Hero főcím – 1. sor",
      type: "string",
      initialValue: "A szépség mint",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroTitleLine2",
      title: "Hero főcím – 2. sor (arany)",
      type: "string",
      initialValue: "mestermű.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero alszöveg",
      type: "text",
      rows: 3,
      initialValue:
        "Húsz év szakértelem Budán, a stílus és az önazonosság találkozásánál. Nálunk a hajformázás nem csupán szolgáltatás, hanem egyénre szabott alkotás.",
    }),
    defineField({
      name: "heroVideoMp4",
      title: "Hero videó (MP4)",
      description: "URL — pl. /videos/hero.mp4",
      type: "string",
      initialValue: "/videos/hero.mp4",
    }),
    defineField({
      name: "heroVideoWebm",
      title: "Hero videó (WebM)",
      type: "string",
      initialValue: "/videos/hero.webm",
    }),
    defineField({
      name: "heroVideoPoster",
      title: "Hero videó poszter (kép)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "kmTitle",
      title: "Kevin Murphy szekció címe",
      type: "string",
      initialValue: "Kevin Murphy.",
    }),
    defineField({
      name: "kmDescription",
      title: "Kevin Murphy szekció szövege",
      description: "Több bekezdés is lehet — üres sorral válaszd el őket.",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "kmImage",
      title: "Kevin Murphy szekció kép",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "yearsExperience",
      title: "Évek tapasztalat (statisztika)",
      type: "string",
      initialValue: "20+",
    }),
    defineField({
      name: "reviewBadgeCount",
      title: "Értékelések száma (statisztika)",
      type: "string",
      initialValue: "500+",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Főoldal tartalom" }),
  },
});
