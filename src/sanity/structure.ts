import type { StructureResolver } from "sanity/structure";

// Explicit menu (Ultra Terra standard): page singletons first, then the
// repeatable lists. Unused types (e.g. weddingProcessStep) stay out of
// the editor's way.
const PAGE_SINGLETONS: Array<{ id: string; type: string; title: string }> = [
  { id: "siteSettings", type: "siteSettings", title: "Alapadatok és elérhetőségek" },
  { id: "homeContent", type: "homeContent", title: "Főoldal" },
  { id: "aboutContent", type: "aboutContent", title: "Rólunk oldal" },
  { id: "servicesContent", type: "servicesContent", title: "Szolgáltatások oldal" },
  { id: "weddingContent", type: "weddingContent", title: "Esküvő oldal" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Tartalom")
    .items([
      ...PAGE_SINGLETONS.map((def) =>
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
      S.documentTypeListItem("service").title("Szolgáltatások"),
      S.documentTypeListItem("teamMember").title("Csapat"),
      S.documentTypeListItem("galleryImage").title("Galéria"),
      S.documentTypeListItem("review").title("Vélemények"),
      S.documentTypeListItem("blogPost").title("Blog"),
    ]);
