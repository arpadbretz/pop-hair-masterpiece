/**
 * One-off content update for the November 2026 brand switch: the salon moves
 * from Kevin Murphy to Philip Martin's products (Szilvi, 2026-10-22).
 *
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=17at2d07 NEXT_PUBLIC_SANITY_DATASET=production \
 *     npx sanity exec scripts/brand-switch-philip-martins.ts --with-user-token
 *
 * Add DRY_RUN=1 to only print the planned changes.
 *
 * - Brand name swapped in Szilvi's texts; the "Kevin Murphy Session Stylist"
 *   credential is removed (it is tied to the old brand and has no new equivalent).
 * - Photos showing Kevin Murphy products or signage are taken off the site:
 *   the two brand-section images are cleared, and two gallery photos are
 *   unpublished (kept as drafts in the Studio, so nothing is lost).
 * Every patch is pinned to the revision read here, so it fails instead of
 * overwriting anything edited in the meantime.
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2024-10-01" });
const DRY_RUN = process.env.DRY_RUN === "1";

const OLD = "Kevin Murphy";
const NEW = "Philip Martin's";
const CREDENTIAL =
  " Bacsik Szilvia Kevin Murphy Session Stylist minősítéssel rendelkezik, amely a márka mély szakmai ismeretét és magas szintű használatát jelenti.";
const OLD_WHY = "Kevin Murphy Session Stylist szakmai háttér";
const NEW_WHY = "Philip Martin's professzionális termékek";
// Kevin Murphy bottles / the KEVIN.MURPHY wall sign.
const UNPUBLISH = ["gal-km-termek-1", "gal-szalon-belso-2"];

type Doc = Record<string, unknown> & { _id: string; _rev: string; _type: string };

function swap(text: unknown, where: string): string {
  if (typeof text !== "string" || !text.includes(OLD)) {
    throw new Error(`${where}: expected text with "${OLD}" — was it edited in the Studio?`);
  }
  const out = text.replace(CREDENTIAL, "").replaceAll(OLD, NEW);
  if (/kevin|murphy/i.test(out)) throw new Error(`${where}: unexpected leftover brand mention`);
  return out;
}

async function main() {
  const ids = ["homeContent", "aboutContent", "team-szilvi", "gal-km-details-1", ...UNPUBLISH];
  const docs = await client.fetch<Doc[]>(`*[_id in $ids]`, { ids });
  const drafts = await client.fetch<string[]>(`*[_id in $ids]._id`, { ids: ids.map((id) => `drafts.${id}`) });
  if (drafts.length) throw new Error(`Open drafts, publish or discard them first: ${drafts.join(", ")}`);
  const byId = Object.fromEntries(docs.map((d) => [d._id, d]));
  for (const id of ids) if (!byId[id]) throw new Error(`Missing document ${id}`);

  const home = byId.homeContent;
  const about = byId.aboutContent;
  const szilvi = byId["team-szilvi"];
  const why = (about.whyChooseUsItems as string[] | undefined) ?? [];
  if (!why.includes(OLD_WHY)) throw new Error(`aboutContent.whyChooseUsItems: "${OLD_WHY}" not found`);

  const tx = client.transaction();
  tx.patch("homeContent", (p) =>
    p
      .ifRevisionId(home._rev)
      .set({ kmTitle: NEW, kmDescription: swap(home.kmDescription, "homeContent.kmDescription") })
      .unset(["kmImage"])
  );
  tx.patch("aboutContent", (p) =>
    p
      .ifRevisionId(about._rev)
      .set({
        kmFilozofiaBody: swap(about.kmFilozofiaBody, "aboutContent.kmFilozofiaBody"),
        whyChooseUsItems: why.map((w) => (w === OLD_WHY ? NEW_WHY : w)),
      })
      .unset(["kmFilozofiaImage"])
  );
  tx.patch("team-szilvi", (p) =>
    p.ifRevisionId(szilvi._rev).set({ bio: swap(szilvi.bio, "team-szilvi.bio") }).unset(["speciality"])
  );
  // A plain photo of the wash basin, only its labels referred to the brand.
  tx.patch("gal-km-details-1", (p) =>
    p.ifRevisionId(byId["gal-km-details-1"]._rev).set({ title: "Hajmosás", "image.alt": "Hajmosás a szalonban" })
  );
  for (const id of UNPUBLISH) {
    const { _rev, _createdAt, _updatedAt, ...rest } = byId[id];
    void _rev;
    void _createdAt;
    void _updatedAt;
    tx.createIfNotExists({ ...rest, _id: `drafts.${id}` });
    tx.delete(id);
  }

  const plan = tx.serialize();
  console.log(JSON.stringify(plan, null, 2));
  if (DRY_RUN) {
    console.log("DRY_RUN — nothing written.");
    return;
  }
  const res = await tx.commit();
  console.log("Committed transaction", res.transactionId);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
