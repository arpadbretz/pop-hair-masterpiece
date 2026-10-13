import { defineField, defineType } from "sanity";

export const servicesContent = defineType({
  name: "servicesContent",
  title: "Szolgáltatások oldal tartalom",
  type: "document",
  fields: [
    defineField({
      name: "repairImage",
      title: "Hajhosszabbítás szekció képe",
      description: "A „Hajhosszabbítás és hajkereskedelem” szakasz képe.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "actionImage",
      title: "Alsó banner képe",
      description: "Az oldal alján található sötét banner háttér képe.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "actionTitleLine1",
      title: "Banner cím – 1. sor",
      type: "string",
      initialValue: "Precizitás abban,",
    }),
    defineField({
      name: "actionTitleLine2",
      title: "Banner cím – 2. sor (arany)",
      type: "string",
      initialValue: "amit csinálunk.",
    }),
    defineField({
      name: "actionSubtitle",
      title: "Banner alszöveg",
      type: "string",
      initialValue: "Budai Mesterszalon • Mesterfodrász vágás",
    }),
    defineField({
      name: "introBody",
      title: "Bevezető szöveg (a szolgáltatás-lista FELETT)",
      description: "Több bekezdés is lehet — üres sorral válaszd el őket.",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "closingBody",
      title: "Záró szöveg (a szolgáltatás-lista UTÁN)",
      description: "Több bekezdés is lehet — üres sorral válaszd el őket.",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "hairExtensionsTitle",
      title: "Hajhosszabbítás szekció címe",
      type: "string",
      initialValue: "Hajhosszabbítás és hajkereskedelem",
    }),
    defineField({
      name: "hairExtensionsBody",
      title: "Hajhosszabbítás szekció szövege",
      description: "Több bekezdés is lehet — üres sorral válaszd el őket.",
      type: "text",
      rows: 8,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Szolgáltatások oldal" }),
  },
});
