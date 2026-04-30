import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Vélemény",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Vendég neve",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: ["Google", "Facebook", "Instagram", "Egyéb"],
        layout: "radio",
      },
      initialValue: "Google",
    }),
    defineField({
      name: "text",
      title: "Vélemény szövege",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "rating",
      title: "Csillagok",
      type: "number",
      initialValue: 5,
      validation: (r) => r.required().min(1).max(5).integer(),
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
    select: { title: "name", subtitle: "platform" },
  },
});
