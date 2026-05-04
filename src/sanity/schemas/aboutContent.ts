import { defineField, defineType } from "sanity";

export const aboutContent = defineType({
  name: "aboutContent",
  title: "Rólunk oldal tartalom",
  type: "document",
  fields: [
    defineField({
      name: "philosophyTitleLine1",
      title: "Filozófia cím – 1. sor",
      type: "string",
      initialValue: "Tudatos",
    }),
    defineField({
      name: "philosophyTitleLine2",
      title: "Filozófia cím – 2. sor (arany)",
      type: "string",
      initialValue: "Stílusépítés.",
    }),
    defineField({
      name: "philosophyQuote",
      title: "Kiemelt idézet",
      type: "text",
      rows: 3,
      initialValue:
        "A Pop Hair Salon nem csupán egy szalon, hanem egy tér, ahol a magas szintű szakmai tudás és a személyre szabott figyelem találkozik.",
    }),
    defineField({
      name: "philosophyBody",
      title: "Filozófia szöveg",
      description: "Több bekezdés is lehet — üres sorral válaszd el őket.",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "philosophyImage",
      title: "Filozófia kép",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "kmFilozofiaBody",
      title: "Kevin Murphy filozófia szöveg",
      description: "Több bekezdés is lehet — üres sorral válaszd el őket.",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "kmFilozofiaImage",
      title: "Kevin Murphy filozófia kép",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "closingQuote",
      title: "Záró idézet",
      type: "text",
      rows: 3,
      initialValue:
        "A kifogástalan minőség és az igényekre szabott szakmai döntések teszik igazán maradandóvá a frizurát.",
    }),
    defineField({
      name: "closingQuoteAuthor",
      title: "Idézet szerzője",
      type: "string",
      initialValue: "Bacsik Szilvia",
    }),
    defineField({
      name: "whyChooseUsTitle",
      title: "„Miért válassz minket?\" – cím",
      type: "string",
      initialValue: "Miért válassz minket?",
    }),
    defineField({
      name: "whyChooseUsItems",
      title: "„Miért válassz minket?\" – pontok",
      description: "Rövid, listázott érvek (pl. „több mint 20 év szakmai tapasztalat\").",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Rólunk oldal" }),
  },
});
