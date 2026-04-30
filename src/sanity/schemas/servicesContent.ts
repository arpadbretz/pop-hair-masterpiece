import { defineField, defineType } from "sanity";

export const servicesContent = defineType({
  name: "servicesContent",
  title: "Szolgáltatások oldal tartalom",
  type: "document",
  fields: [
    defineField({
      name: "repairImage",
      title: "Hajjavítás szekció kép",
      description: "A 'Mesteri Hajjavítás' szakasz bal oldali képe.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "actionImage",
      title: "Akció banner kép",
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
  ],
  preview: {
    prepare: () => ({ title: "Szolgáltatások oldal" }),
  },
});
