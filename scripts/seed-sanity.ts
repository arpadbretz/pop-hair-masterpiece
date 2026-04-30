/**
 * Seed script — populates the Sanity dataset with the original Pop Hair
 * content (team, services, reviews, gallery, settings) and uploads the
 * legacy JPEG assets stored in /tmp/pop-hair-assets-backup.
 *
 * Run with:
 *
 *   SANITY_AUTH_TOKEN=<editor-token> npx tsx scripts/seed-sanity.ts
 *
 * The token must have "Editor" or "Administrator" rights. Generate one at:
 *   https://www.sanity.io/manage/project/17at2d07/api/tokens
 */

import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";

const PROJECT_ID = "17at2d07";
const DATASET = "production";
const ASSETS_DIR = "/tmp/pop-hair-assets-backup/src/assets";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error(
    "Missing SANITY_AUTH_TOKEN. Generate at https://www.sanity.io/manage/project/" +
      PROJECT_ID +
      "/api/tokens (Editor) and re-run."
  );
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

async function uploadAsset(filename: string, attempt = 1): Promise<
  | {
      _type: "image";
      asset: { _type: "reference"; _ref: string };
    }
  | null
> {
  const fullPath = path.join(ASSETS_DIR, filename);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ! missing asset: ${filename}`);
    return null;
  }
  try {
    const stream = fs.createReadStream(fullPath);
    const asset = await client.assets.upload("image", stream, {
      filename,
      contentType: "image/jpeg",
    });
    return {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };
  } catch (err: unknown) {
    const e = err as { statusCode?: number; message?: string };
    const retriable =
      e.statusCode === 502 || e.statusCode === 503 || e.statusCode === 504;
    if (retriable && attempt < 4) {
      const delayMs = 1000 * 2 ** (attempt - 1);
      console.warn(
        `  ! upload failed (${e.statusCode}) for ${filename}, retrying in ${delayMs}ms (attempt ${attempt + 1}/4)`
      );
      await new Promise((r) => setTimeout(r, delayMs));
      return uploadAsset(filename, attempt + 1);
    }
    throw err;
  }
}

async function seedSiteSettings() {
  console.log("→ Site settings");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "Pop Hair Salon",
    tagline: "Budai Mesterszalon",
    phone: "06 30 590 1766",
    email: "hello@pophair.hu",
    address: "Budapest, Alkotás u. 39 c, 1023",
    bookingUrl: "https://b998424.alteg.io/company/624179/personal/menu?o=",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.53177614!2d19.0229986!3d47.4912222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741de7ba1a0c4f7%3A0x7d8383e3e0689b9e!2zQnVkYXBlc3QsIEFsa290w6FzIHUuIDM5LCAxMTIz!5e0!3m2!1sen!2shu!4v1700000000000!5m2!1sen!2shu",
    openingHours: [
      { _key: "h1", label: "Hétfő - Péntek", hours: "08:00 - 20:00" },
      { _key: "h2", label: "Szombat", hours: "09:00 - 15:00" },
    ],
    instagramUrl: "https://www.instagram.com/pophair_szalon/",
    facebookUrl: "https://www.facebook.com/pophairszalon",
    googleRating: 4.9,
    reviewCount: 500,
  });
}

async function seedHomeContent() {
  console.log("→ Home content");
  const km = await uploadAsset("kevin-murphy-termek-1.jpg");
  await client.createOrReplace({
    _id: "homeContent",
    _type: "homeContent",
    heroEyebrow: "Budai Szalon • Alapítva 2004",
    heroTitleLine1: "A szépség mint",
    heroTitleLine2: "mestermű.",
    heroSubtitle:
      "Húsz év szakértelem Budán, a stílus és az önazonosság találkozásánál. Nálunk a hajformázás nem csupán szolgáltatás, hanem egyénre szabott alkotás.",
    heroVideoMp4: "/videos/hero.mp4",
    heroVideoWebm: "/videos/hero.webm",
    kmTitle: "Murphy.",
    kmImage: km,
    yearsExperience: "20+",
    reviewBadgeCount: "500+",
  });
}

async function seedAboutContent() {
  console.log("→ About content");
  const philosophy = await uploadAsset("stilus-portre-1.jpg");
  const km = await uploadAsset("kevin-murphy-termek-3.jpg");
  await client.createOrReplace({
    _id: "aboutContent",
    _type: "aboutContent",
    philosophyTitleLine1: "Tudatos",
    philosophyTitleLine2: "Stílusépítés.",
    philosophyQuote:
      "A Pop Hair Salon nem csupán egy szalon, hanem egy tér, ahol a magas szintű szakmai tudás és a személyre szabott figyelem találkozik.",
    philosophyImage: philosophy,
    kmFilozofiaImage: km,
    closingQuote:
      "A kifogástalan minőség és az igényekre szabott szakmai döntések teszik igazán maradandóvá a frizurát.",
    closingQuoteAuthor: "Bacsik Szilvia",
  });
}

async function seedWeddingContent() {
  console.log("→ Wedding content");
  const hero = await uploadAsset("eskuvo-munkank-2.jpg");
  const left = await uploadAsset("eskuvo-munkank-3.jpg");
  const right = await uploadAsset("eskuvo-munkank-5.jpg");
  const lookbookFiles = [
    "eskuvo-munkank-3.jpg",
    "eskuvo-munkank-5.jpg",
    "eskuvo-boldogsag.jpg",
    "eskuvo-tanuk.jpg",
  ];
  const lookbook = (
    await Promise.all(lookbookFiles.map((f) => uploadAsset(f)))
  )
    .filter(Boolean)
    .map((img, i) => ({
      ...img!,
      _key: `lb${i}`,
      alt: "Esküvői munka",
    }));

  await client.createOrReplace({
    _id: "weddingContent",
    _type: "weddingContent",
    heroEyebrow: "A Nagy Nap Művészete",
    heroTitleLine1: "Esküvői",
    heroTitleLine2: "Design.",
    heroQuote:
      "Hiszünk abban, hogy a menyasszonyi frizura nem csupán egy viselet, hanem a személyiség és az alkalom harmonikus kivetülése.",
    heroImage: hero,
    expertiseImageLeft: left,
    expertiseImageRight: right,
    yearsLabel: "20+",
    weddingsLabel: "100+",
    lookbookImages: lookbook,
    ctaTitleLine1: "Legyen a stílus az Ön",
    ctaTitleLine2: "legszebb ékszere.",
  });
}

async function seedTeam() {
  console.log("→ Team");
  const members = [
    {
      _id: "team-szilvi",
      name: "Bacsik Szilvia",
      role: "Tulajdonos & Vezető mesterfodrász",
      speciality: "Esküvői Hajspecialista & Creative Director",
      bio: "Húsz év szakértelem és a divatvilág iránti szenvedély hívta életre a POP Hair szalont. Szilvia nevét a precizitás és az arányérzék fémjelzi. Kevin Murphy szakértőként hitvallása, hogy a haj egészsége nem alku tárgya. Több mint egy évtizede aktív a Fashion Weekeken és fotózásokon, ahol az esküvői hajszobrászat egyik legelismertebb hazai képviselőjévé vált.",
      file: "eskuvo-munkank-1.jpg",
      order: 1,
    },
    {
      _id: "team-gabor",
      name: "Szilágyi Gábor",
      role: "Mesterfodrász",
      speciality: "Precíziós Hajvágás & Formatervezés",
      bio: "Gábor munkáját a tudatosság és a könyörtelen szakmai igényesség jellemzi. Nem hisz a sablonokban: minden arc és karakter egy új kihívás számára. Vendégei a technikai tökéletesség és a nyugodt, professzionális figyelem miatt választják újra és újra.",
      file: "editorial-munkank-2.jpg",
      order: 2,
    },
    {
      _id: "team-dani",
      name: "Csala Dani",
      role: "Fodrászművész",
      speciality: "Modern Stílus & Textúra",
      bio: "Dani az új generáció energiáját ötvözi a klasszikus alapokkal. Elhivatottsága és friss szemlélete garancia arra, hogy a végeredmény nemcsak trendi, hanem az egyéniséget is tökéletesen tükrözi. Szenvedélye az egyedi stílusok megalkotása és a haj textúrájával való művészi játék.",
      file: "balayage-munkank-2.jpg",
      order: 3,
    },
  ];
  for (const m of members) {
    const img = await uploadAsset(m.file);
    if (!img) continue;
    await client.createOrReplace({
      _id: m._id,
      _type: "teamMember",
      name: m.name,
      role: m.role,
      speciality: m.speciality,
      bio: m.bio,
      image: { ...img, alt: m.name },
      order: m.order,
    });
  }
}

async function seedServices() {
  console.log("→ Services");
  const list = [
    {
      _id: "svc-rescue",
      name: "Elrontott hajak javítása",
      price: "Egyéni kalkuláció",
      description:
        "Specialitásunk a másutt elrontott színek és formák professzionális helyrehozása.",
      icon: "refresh",
      highlight: true,
      order: 1,
    },
    {
      _id: "svc-master",
      name: "Mesterfodrász vágás",
      price: "28.000 HUF-tól",
      description: "Bacsik Szilvia vezetésével, arcformához és karakterhez tervezve.",
      icon: "scissors",
      order: 2,
    },
    {
      _id: "svc-balayage",
      name: "Balayage Ritual",
      price: "42.000 HUF-tól",
      description: "Kevin Murphy kényeztetéssel és prémium árnyalással.",
      icon: "sparkles",
      order: 3,
    },
    {
      _id: "svc-women",
      name: "Női hajvágás",
      price: "22.500 HUF",
      description: "Személyre szabott stílustanácsadással és mosással.",
      icon: "scissors",
      order: 4,
    },
    {
      _id: "svc-km",
      name: "Kevin Murphy rituálé",
      price: "18.500 HUF",
      description: "Mélytápláló kezelés a haj szerkezetének újjáépítésére.",
      icon: "heart",
      order: 5,
    },
  ];
  for (const s of list) {
    await client.createOrReplace({ _type: "service", ...s });
  }
}

async function seedPricing() {
  console.log("→ Pricing");
  const list = [
    { _id: "pr-female", name: "Női Hajvágás", price: "22.500", description: "Személyre szabott stílustanácsadással és mosással", order: 1 },
    { _id: "pr-master", name: "Mesterfodrász Vágás", price: "28.000", description: "Bacsik Szilvia vezetésével", order: 2 },
    { _id: "pr-bal", name: "Balayage Ritual", price: "42.000-től", description: "Kevin Murphy kényeztetéssel és árnyalással", order: 3 },
    { _id: "pr-color", name: "Teljes Festés", price: "32.000-től", description: "Környezettudatos KM színekkel", order: 4 },
    { _id: "pr-rescue", name: "Hajregenerálás", price: "18.500", description: "Mélytápláló rituálé sérült hajszerkezetre", order: 5 },
    { _id: "pr-male", name: "Férfi Vágás", price: "12.500", description: "Prémium stylinggal", order: 6 },
  ];
  for (const p of list) {
    await client.createOrReplace({ _type: "pricingItem", ...p });
  }
}

async function seedReviews() {
  console.log("→ Reviews");
  const list = [
    { _id: "rv1", name: "Kovács Adél", platform: "Google", text: "A POP Hair az a hely, ahol végre azt kaptam, amit megálmodtam: természetes eleganciát és professzionális gondoskodást.", rating: 5, order: 1 },
    { _id: "rv2", name: "Szalai Márk", platform: "Facebook", text: "A Kevin Murphy rituálék minősége egyszerűen más dimenzió. Nem találtam hasonlót egész Európában.", rating: 5, order: 2 },
    { _id: "rv3", name: "Nagy Júlia", platform: "Google", text: "Budapest legprofibb szalonja. Szilvi kezei között minden látogatás egy rituálé, amiből feltöltődve távozom.", rating: 5, order: 3 },
    { _id: "rv4", name: "Tóth Petra", platform: "Google", text: "Zseniális balayage technika, végre valaki érti, mit jelent a természetes szőke. Csak ajánlani tudom!", rating: 5, order: 4 },
    { _id: "rv5", name: "Kiss Bence", platform: "Facebook", text: "Profi hozzáállás, elit környezet. A stílustanácsadás különösen tetszett, bátran ajánlom mindenkinek.", rating: 5, order: 5 },
    { _id: "rv6", name: "Molnár Anna", platform: "Google", text: "Húsz év szakértelem látszik minden mozdulaton. Az elrontott hajamat mentették meg, örökké hálás leszek.", rating: 5, order: 6 },
  ];
  for (const r of list) {
    await client.createOrReplace({ _type: "review", ...r });
  }
}

async function seedWeddingProcess() {
  console.log("→ Wedding process steps");
  const list = [
    {
      _id: "wps1",
      title: "Konzultáció",
      description:
        "Személyes megbeszélés, ahol feltérképezzük az Ön stílusát, az esküvői ruha jellegét és az alkalom hangulatát.",
      icon: "calendar",
      order: 1,
    },
    {
      _id: "wps2",
      title: "A Próba",
      description:
        "Egy nyugodt, alapos folyamat, ahol kísérletezünk és finomhangoljuk a frizurát, amíg az tökéletesen tükrözi az Ön elképzeléseit.",
      icon: "sparkles",
      order: 2,
    },
    {
      _id: "wps3",
      title: "A Helyszínen",
      description:
        "Igény szerint a szalonban vagy külső helyszínen készítjük el a frizurát, biztosítva a feszültségmentes, luxus hangulatot.",
      icon: "camera",
      order: 3,
    },
  ];
  for (const w of list) {
    await client.createOrReplace({ _type: "weddingProcessStep", ...w });
  }
}

async function seedGallery() {
  console.log("→ Gallery");
  // Wipe any previously-seeded gallery docs so re-runs don't accumulate.
  const existingIds = await client.fetch<string[]>(
    '*[_type == "galleryImage"]._id'
  );
  if (existingIds.length > 0) {
    console.log(`  cleaning ${existingIds.length} existing gallery docs`);
    const tx = client.transaction();
    existingIds.forEach((id) => tx.delete(id));
    await tx.commit();
  }
  // Mirrors the original Gallery.jsx ordering 1:1 (31 items including video).
  const items: {
    id: string;
    file: string;
    title: string;
    category: string;
    size?: string;
    videoUrl?: string;
  }[] = [
    { id: "video-atmosphere", file: "szalon-munka-1.jpg", title: "Pop Hair Atmoszféra", category: "video", size: "large", videoUrl: "/videos/hero.mp4" },
    { id: "eskuvo-hero", file: "eskuvo-hero.jpg", title: "Menyasszonyi Frizura Design", category: "wedding", size: "large" },
    { id: "balayage-1", file: "balayage-munkank-1.jpg", title: "Mesteri Balayage", category: "work" },
    { id: "salon-belso-1", file: "szalon-belso-1.jpg", title: "Enteriőr Részlet", category: "salon" },
    { id: "eskuvo-mood-1", file: "eskuvo-mood-1.jpg", title: "Esküvői Mood", category: "wedding" },
    { id: "editorial-1", file: "editorial-munkank-1.jpg", title: "Editorial Hajszobrászat", category: "work", size: "large" },
    { id: "szalon-munka-1", file: "szalon-munka-1.jpg", title: "Alkotási Folyamat", category: "salon" },
    { id: "hajhosszabbitas-1", file: "hajhosszabbitas-1.jpg", title: "Láthatatlan Illesztés", category: "work" },
    { id: "eskuvo-munkank-1", file: "eskuvo-munkank-1.jpg", title: "Esküvői Elegancia", category: "wedding" },
    { id: "balayage-2", file: "balayage-munkank-2.jpg", title: "Natural Sunkissed", category: "work", size: "large" },
    { id: "szalon-belso-2", file: "szalon-belso-2.jpg", title: "Minimalista Luxus", category: "salon" },
    { id: "balayage-blonde", file: "balayage-blonde.jpg", title: "Ice Blonde Balayage", category: "work" },
    { id: "eskuvo-vibe-1", file: "eskuvo-vibe-1.jpg", title: "Esküvői Pillanat", category: "wedding" },
    { id: "stilus-1", file: "stilus-munkank-1.jpg", title: "Modern Formavilág", category: "work" },
    { id: "eskuvo-vibe-13", file: "eskuvo-vibe-13.jpg", title: "Esküvői Részletek", category: "wedding" },
    { id: "szalon-belso-3", file: "szalon-belso-3.jpg", title: "Szalon Részlet", category: "salon" },
    { id: "balayage-warm", file: "balayage-warm.jpg", title: "Meleg Tónusú Árnyalás", category: "work" },
    { id: "eskuvo-munkank-3", file: "eskuvo-munkank-3.jpg", title: "Romantikus Hullámok", category: "wedding", size: "large" },
    { id: "km-termek-1", file: "kevin-murphy-termek-1.jpg", title: "Kevin Murphy Kényeztetés", category: "salon" },
    { id: "hajhosszabbitas-detail", file: "hajhosszabbitas-detail.jpg", title: "Precíziós Technika", category: "work" },
    { id: "km-details-1", file: "kevin-murphy-details-1.jpg", title: "Prémium Hatóanyagok", category: "salon" },
    { id: "eskuvo-vibe-2", file: "eskuvo-vibe-2.jpg", title: "Esküvői Előkészületek", category: "wedding" },
    { id: "modern-haj", file: "modern-haj-1.jpg", title: "Trendszínek", category: "work" },
    { id: "eskuvo-vibe-3", file: "eskuvo-vibe-3.jpg", title: "Boldog Menyasszony", category: "wedding" },
    { id: "eskuvo-vibe-4", file: "eskuvo-vibe-4.jpg", title: "Hajszobrászat", category: "wedding" },
    { id: "eskuvo-vibe-14", file: "eskuvo-vibe-14.jpg", title: "A Mi Munkánk", category: "wedding" },
    { id: "eskuvo-vibe-15", file: "eskuvo-vibe-15.jpg", title: "Esküvői Varázs", category: "wedding", size: "large" },
    { id: "eskuvo-vibe-16", file: "eskuvo-vibe-16.jpg", title: "Elegancia", category: "wedding" },
    { id: "eskuvo-vibe-17", file: "eskuvo-vibe-17.jpg", title: "Esküvői Portré", category: "wedding" },
    { id: "eskuvo-vibe-18", file: "eskuvo-vibe-18.jpg", title: "Részletek", category: "wedding" },
    { id: "eskuvo-vibe-11", file: "eskuvo-vibe-11.jpg", title: "Örök Emlék", category: "wedding" },
  ];
  let order = 0;
  for (const it of items) {
    const img = await uploadAsset(it.file);
    if (!img) continue;
    order += 1;
    const doc: Record<string, unknown> = {
      _id: `gal-${it.id}`,
      _type: "galleryImage",
      title: it.title,
      image: { ...img, alt: it.title },
      category: it.category,
      size: it.size ?? "small",
      order,
    };
    if (it.videoUrl) doc.videoUrl = it.videoUrl;
    await client.createOrReplace(doc as never);
  }
}

async function seedServicesContent() {
  console.log("→ Services content");
  const repair = await uploadAsset("balayage-munkank-1.jpg");
  const action = await uploadAsset("szalon-munka-1.jpg");
  await client.createOrReplace({
    _id: "servicesContent",
    _type: "servicesContent",
    repairImage: repair,
    actionImage: action,
    actionTitleLine1: "Precizitás abban,",
    actionTitleLine2: "amit csinálunk.",
    actionSubtitle: "Budai Mesterszalon • Mesterfodrász vágás",
  });
}

async function main() {
  console.log(`Seeding Sanity project ${PROJECT_ID} / dataset ${DATASET}\n`);
  const only = process.argv.slice(2);
  const should = (key: string) => only.length === 0 || only.includes(key);

  if (should("siteSettings")) await seedSiteSettings();
  if (should("homeContent")) await seedHomeContent();
  if (should("aboutContent")) await seedAboutContent();
  if (should("weddingContent")) await seedWeddingContent();
  if (should("servicesContent")) await seedServicesContent();
  if (should("team")) await seedTeam();
  if (should("services")) await seedServices();
  if (should("pricing")) await seedPricing();
  if (should("reviews")) await seedReviews();
  if (should("weddingProcess")) await seedWeddingProcess();
  if (should("gallery")) await seedGallery();
  console.log("\n✓ Done. Visit /studio to review and refine.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
