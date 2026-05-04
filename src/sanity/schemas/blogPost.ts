import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog poszt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Cím",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL-rész)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publikálás dátuma",
      type: "datetime",
      validation: (r) => r.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "category",
      title: "Kategória",
      type: "string",
      options: {
        list: [
          { title: "Stílustippek", value: "tips" },
          { title: "Esküvő", value: "wedding" },
          { title: "Hajápolás", value: "care" },
          { title: "Trendek", value: "trends" },
          { title: "Szalon élet", value: "salon" },
          { title: "Vlog (videó)", value: "vlog" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "coverImage",
      title: "Borítókép",
      description: "A listában és a poszt tetején jelenik meg.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt szöveg",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Kivonat",
      description: "Rövid összefoglaló a lista nézetben (kb. 1-2 mondat).",
      type: "text",
      rows: 3,
      validation: (r) => r.max(280),
    }),
    defineField({
      name: "videoUrl",
      title: "Videó URL (opcionális – Vlog poszthoz)",
      description:
        "YouTube vagy Vimeo URL. Ha kitöltöd, a poszt tetején lejátszható videó jelenik meg.",
      type: "url",
    }),
    defineField({
      name: "body",
      title: "Tartalom",
      description:
        "A poszt teljes szövege. Új bekezdésekhez Enter, formázáshoz a tetején lévő gombok.",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normál", value: "normal" },
            { title: "Nagy cím (H2)", value: "h2" },
            { title: "Alcím (H3)", value: "h3" },
            { title: "Idézet", value: "blockquote" },
          ],
          lists: [
            { title: "Felsorolás", value: "bullet" },
            { title: "Számozott lista", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Félkövér", value: "strong" },
              { title: "Dőlt", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (r) => r.required(),
                  }),
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt szöveg",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Képaláírás",
              type: "string",
            }),
          ],
        },
      ],
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: "Legújabb először",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "publishedAt",
      media: "coverImage",
      category: "category",
    },
    prepare({ title, date, media, category }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString("hu-HU", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Még nincs dátum";
      return {
        title: title ?? "Cím nélkül",
        subtitle: category ? `${category} • ${formattedDate}` : formattedDate,
        media,
      };
    },
  },
});
