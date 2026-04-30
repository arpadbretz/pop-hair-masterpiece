import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Csapattag",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Név",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Pozíció",
      type: "string",
      description: "Pl. 'Tulajdonos & Vezető mesterfodrász'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "speciality",
      title: "Specialitás",
      type: "string",
      description: "Pl. 'Esküvői Hajspecialista & Creative Director'",
    }),
    defineField({
      name: "bio",
      title: "Életrajz",
      type: "text",
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Portré",
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
      name: "order",
      title: "Sorrend",
      type: "number",
      description: "Kisebb szám előrébb jelenik meg.",
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
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
