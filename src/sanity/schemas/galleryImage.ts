import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Galéria kép",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Cím",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Kép",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt szöveg",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Kategória",
      type: "string",
      options: {
        list: [
          { title: "Referenciák", value: "work" },
          { title: "A Szalon", value: "salon" },
          { title: "Esküvői Világ", value: "wedding" },
          { title: "Videó", value: "video" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "size",
      title: "Méret a rácsban",
      type: "string",
      options: {
        list: [
          { title: "Normál", value: "small" },
          { title: "Kiemelt (nagy)", value: "large" },
        ],
        layout: "radio",
      },
      initialValue: "small",
    }),
    defineField({
      name: "videoUrl",
      title: "Videó URL (opcionális)",
      description:
        "Ha kitöltöd, ez a kép videóként nyílik meg a lightbox-ban. A 'Kategória' is legyen 'Videó'.",
      type: "url",
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
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
