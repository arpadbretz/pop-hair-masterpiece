import { defineField, defineType } from "sanity";

export const pricingItem = defineType({
  name: "pricingItem",
  title: "Árlista tétel",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Név",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Ár (HUF)",
      type: "string",
      description: "Pl. '22.500' vagy '42.000-től'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Leírás",
      type: "string",
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
    select: { title: "name", subtitle: "price" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? `${subtitle} HUF` : undefined,
    }),
  },
});
