import type { StructureResolver } from "sanity/structure";
import { singletonTypes } from "./schemas";

const SINGLETON_DEFINITIONS: Array<{
  id: string;
  type: string;
  title: string;
}> = [
  { id: "siteSettings", type: "siteSettings", title: "Beállítások" },
  { id: "homeContent", type: "homeContent", title: "Főoldal" },
  { id: "aboutContent", type: "aboutContent", title: "Rólunk" },
  { id: "servicesContent", type: "servicesContent", title: "Szolgáltatások" },
  { id: "weddingContent", type: "weddingContent", title: "Esküvő" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Pop Hair Salon")
    .items([
      ...SINGLETON_DEFINITIONS.map((def) =>
        S.listItem()
          .title(def.title)
          .id(def.id)
          .child(
            S.document()
              .schemaType(def.type)
              .documentId(def.id)
              .title(def.title)
          )
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() ?? "")
      ),
    ]);
