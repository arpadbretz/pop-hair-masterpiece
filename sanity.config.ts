"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { huHULocale } from "@sanity/locale-hu-hu";

import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes, singletonTypes } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";

// Not offered in the global "+" menu: singletons, and the wedding-steps type
// whose section was removed from /eskuvo.
const notCreatable = new Set([...singletonTypes, "weddingProcessStep"]);

export default defineConfig({
  name: "default",
  title: "Pop Hair Salon",

  basePath: "/studio",
  projectId,
  dataset,

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !notCreatable.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action !== "duplicate" &&
              action !== "unpublish" &&
              action !== "delete"
          )
        : input,
  },

  plugins: [
    structureTool({ structure, title: "Tartalom" }),
    huHULocale(),
  ],
});
