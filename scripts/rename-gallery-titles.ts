/**
 * Patches every existing galleryImage doc to a plain, descriptive title
 * (overwrites the marketing-style names like "Trendszínek",
 * "Editorial Hajszobrászat", "Pop Hair Atmoszféra" that the original
 * seed put in). Image assets are untouched — only the title field is
 * updated.
 *
 * Run with:
 *   SANITY_AUTH_TOKEN=<editor-token> npx tsx scripts/rename-gallery-titles.ts
 */

import { createClient } from "@sanity/client";

const PROJECT_ID = "17at2d07";
const DATASET = "production";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error("Missing SANITY_AUTH_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

// Doc id → new title. Plain descriptive labels matching the photo's
// subject; Szilvi can edit any of these in Studio later.
const NEW_TITLES: Record<string, string> = {
  "gal-video-atmosphere": "Szalon atmoszféra",
  "gal-eskuvo-hero": "Menyasszonyi frizura",
  "gal-balayage-1": "Balayage",
  "gal-salon-belso-1": "Szalon enteriőr",
  "gal-eskuvo-mood-1": "Esküvői hangulat",
  "gal-editorial-1": "Editorial fotózás",
  "gal-szalon-munka-1": "Munka közben",
  "gal-hajhosszabbitas-1": "Hajhosszabbítás",
  "gal-eskuvo-munkank-1": "Esküvői frizura",
  "gal-balayage-2": "Balayage",
  "gal-szalon-belso-2": "Szalon enteriőr",
  "gal-balayage-blonde": "Szőke balayage",
  "gal-eskuvo-vibe-1": "Esküvői pillanat",
  "gal-stilus-1": "Stílus",
  "gal-eskuvo-vibe-13": "Esküvői részlet",
  "gal-szalon-belso-3": "Szalon részlet",
  "gal-balayage-warm": "Meleg tónusú balayage",
  "gal-eskuvo-munkank-3": "Esküvői frizura",
  "gal-km-termek-1": "Kevin Murphy termékek",
  "gal-hajhosszabbitas-detail": "Hajhosszabbítás",
  "gal-km-details-1": "Kevin Murphy termékek",
  "gal-eskuvo-vibe-2": "Esküvői előkészület",
  "gal-modern-haj": "Hajszín",
  "gal-eskuvo-vibe-3": "Esküvői pillanat",
  "gal-eskuvo-vibe-4": "Esküvői frizura",
  "gal-eskuvo-vibe-14": "Esküvői munka",
  "gal-eskuvo-vibe-15": "Esküvő",
  "gal-eskuvo-vibe-16": "Esküvő",
  "gal-eskuvo-vibe-17": "Esküvői portré",
  "gal-eskuvo-vibe-18": "Esküvői részlet",
  "gal-eskuvo-vibe-11": "Esküvő",
};

async function main() {
  console.log(`Patching gallery titles in ${PROJECT_ID}/${DATASET}…\n`);
  const tx = client.transaction();
  let count = 0;
  for (const [id, title] of Object.entries(NEW_TITLES)) {
    tx.patch(id, (p) => p.set({ title }));
    count += 1;
  }
  const result = await tx.commit();
  console.log(`✓ Patched ${count} gallery docs.`);
  console.log(`Transaction id: ${result.transactionId}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
