import type { StructureBuilder, StructureResolver } from "sanity/structure";

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
      orderedList(S, "service", "Szolgáltatások"),
      orderedList(S, "teamMember", "Csapat"),
      orderedList(S, "galleryImage", "Galéria"),
      orderedList(S, "review", "Vélemények"),
      S.documentTypeListItem("blogPost")
        .title("Blog")
        .child(
          S.documentTypeList("blogPost")
            .title("Blog")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
    ]);

// Lists show items in the same order as the website ("Sorrend" field).
function orderedList(S: StructureBuilder, type: string, title: string) {
  return S.documentTypeListItem(type)
    .title(title)
    .child(
      S.documentTypeList(type)
        .title(title)
        .defaultOrdering([{ field: "order", direction: "asc" }])
    );
}
