import type { SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { teamMember } from "./teamMember";
import { service } from "./service";
import { galleryImage } from "./galleryImage";
import { pricingItem } from "./pricingItem";
import { review } from "./review";
import { weddingProcessStep } from "./weddingProcessStep";
import { homeContent } from "./homeContent";
import { aboutContent } from "./aboutContent";
import { weddingContent } from "./weddingContent";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Singletons (egyedi dokumentumok)
  siteSettings,
  homeContent,
  aboutContent,
  weddingContent,

  // Listák
  teamMember,
  service,
  galleryImage,
  pricingItem,
  review,
  weddingProcessStep,
];

export const singletonTypes = new Set([
  "siteSettings",
  "homeContent",
  "aboutContent",
  "weddingContent",
]);
