import { defineField, defineType } from "sanity";

export const weddingProcessStep = defineType({
  name: "weddingProcessStep",
  title: "Esküvői folyamat lépés",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Cím",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Leírás",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      title: "Ikon",
      type: "string",
      options: {
        list: [
          { title: "Naptár", value: "calendar" },
          { title: "Csillag", value: "sparkles" },
          { title: "Kamera", value: "camera" },
          { title: "Szív", value: "heart" },
        ],
      },
      initialValue: "calendar",
    }),
    defineField({
      name: "order",
      title: "Sorrend",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sorrend",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title" },
  },
});
