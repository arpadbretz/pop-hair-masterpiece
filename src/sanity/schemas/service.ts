import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Szolgáltatás",
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
      title: "Ár (opcionális)",
      type: "string",
      description:
        "Pl. '28.000 HUF-tól', '22.500 HUF', vagy 'Egyéni kalkuláció'. Üresen hagyva nem jelenik meg ár a kártyán.",
    }),
    defineField({
      name: "description",
      title: "Leírás (opcionális)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      title: "Ikon",
      type: "string",
      options: {
        list: [
          { title: "Olló (vágás)", value: "scissors" },
          { title: "Csillag (rituálé)", value: "sparkles" },
          { title: "Visszanyíl (javítás)", value: "refresh" },
          { title: "Szív (regenerálás)", value: "heart" },
          { title: "Festék (szín)", value: "palette" },
        ],
        layout: "dropdown",
      },
      initialValue: "scissors",
    }),
    defineField({
      name: "highlight",
      title: "Kiemelt szolgáltatás",
      description: "Sötét háttérrel, hangsúlyosan jelenik meg.",
      type: "boolean",
      initialValue: false,
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
  },
});
