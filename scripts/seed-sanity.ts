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
    phone: "+36 30 5901766",
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
    heroEyebrow: "",
    heroTitleLine1: "A szépség,",
    heroTitleLine2: "ami önazonos.",
    heroSubtitle:
      "Több mint húsz év szakmai tapasztalatával a Pop Hair Salon egy olyan hely Budán, ahol a hajformázás nem futószalag-szolgáltatás, hanem figyelmes, személyre szabott munka.\n\nSzámunkra minden vendég egyedi. Hiszünk abban, hogy egy jól elkészített frizura nemcsak szép, hanem viselőjéhez illik, természetes és hosszú távon is működik.\n\nA Pop Hair Salonban a szakmai precizitás, a minőségi termékek és a nyugodt, igényes környezet találkozik.",
    heroVideoMp4: "/videos/hero.mp4",
    heroVideoWebm: "/videos/hero.webm",
    kmTitle: "Murphy.",
    kmDescription:
      "A szalonban kizárólag Kevin Murphy professzionális termékekkel dolgozunk. Bacsik Szilvia Kevin Murphy Session Stylist minősítéssel rendelkezik, amely a márka mély szakmai ismeretét és magas szintű használatát jelenti.\n\nA termékek alapos ismeretének köszönhetően minden vendég számára személyre szabott hajápolási és styling javaslatot tudunk adni. Hiszünk abban, hogy a szép frizura alapja az egészséges haj.",
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
    philosophyTitleLine1: "Rólunk.",
    philosophyTitleLine2: "",
    philosophyQuote:
      "A Pop Hair Salon egy olyan szalon, ahol a vendég valódi figyelmet kap.",
    philosophyBody:
      "Fontos számunkra, hogy minden frizura mögött átgondolt szakmai munka álljon. Nem dolgozunk kapkodva vagy sablonok alapján – minden vendég haját, stílusát és igényeit külön figyelembe vesszük.\n\nSzámunkra a fodrászat egyszerre szakma és felelősség: a haj egészsége, a természetes megjelenés és a vendég elégedettsége mindig első helyen áll.\n\nCélunk, hogy vendégeink magabiztosan és jól érezzék magukat a frizurájukkal – nemcsak a szalonból kilépve, hanem a hétköznapokban is.",
    philosophyImage: philosophy,
    kmFilozofiaBody:
      "A fodrászat egy folyamatosan fejlődő szakma, ezért számunkra fontos a folyamatos tanulás és szakmai fejlődés.\n\nRendszeresen veszünk részt szakmai továbbképzéseken és tréningeken, hogy vendégeink számára a legmodernebb technikákat és megoldásokat tudjuk biztosítani.\n\nA szalonban kizárólag Kevin Murphy professzionális termékekkel dolgozunk. Bacsik Szilvia Kevin Murphy Session Stylist minősítéssel rendelkezik, amely a márka mély szakmai ismeretét és magas szintű használatát jelenti.\n\nA termékek alapos ismeretének köszönhetően minden vendég számára személyre szabott hajápolási és styling javaslatot tudunk adni.\n\nHiszünk abban, hogy a szép frizura alapja az egészséges haj.",
    kmFilozofiaImage: km,
    closingQuote: "Szeretettel várlak a Pop Hair Salonban!",
    closingQuoteAuthor: "Bacsik Szilvia",
    whyChooseUsTitle: "Miért válassz minket?",
    whyChooseUsItems: [
      "több mint 20 év szakmai tapasztalat",
      "személyre szabott frizurák",
      "folyamatos szakmai továbbképzések",
      "Kevin Murphy Session Stylist szakmai háttér",
      "professzionális hajápolási tanácsadás",
      "prémium szalon környezet",
    ],
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
    heroEyebrow: "",
    heroTitleLine1: "Esküvői",
    heroTitleLine2: "frizurák.",
    heroQuote: "Az esküvő egy különleges nap, ahol minden részlet számít.",
    heroImage: hero,
    expertiseBody:
      "A Pop Hair Salonban nagy hangsúlyt fektetünk a menyasszonyi frizurák elkészítésére, ahol a cél mindig az, hogy a frizura tökéletesen illeszkedjen a menyasszony stílusához és az esküvő hangulatához.\n\nA szolgáltatás tartalmazhat: próba frizurát, menyasszonyi frizura készítését, alkalmi frizurákat a vendégek számára.\n\nMinden esetben személyes konzultáció során tervezzük meg a frizurát.",
    expertiseImageLeft: left,
    expertiseImageRight: right,
    yearsLabel: "20+",
    weddingsLabel: "100+",
    lookbookImages: lookbook,
    ctaTitleLine1: "Szeretettel várunk",
    ctaTitleLine2: "a Pop Hair Salonban.",
  });
}

async function seedTeam() {
  console.log("→ Team");
  // Wipe any previously-seeded team docs so re-runs don't leave behind
  // members that are no longer on Szilvi's roster.
  const existingIds = await client.fetch<string[]>(
    '*[_type == "teamMember"]._id'
  );
  if (existingIds.length > 0) {
    console.log(`  cleaning ${existingIds.length} existing team docs`);
    const tx = client.transaction();
    existingIds.forEach((id) => tx.delete(id));
    await tx.commit();
  }

  type Member = {
    _id: string;
    name: string;
    role: string;
    speciality?: string;
    bio: string;
    file?: string;
    order: number;
  };
  const members: Member[] = [
    {
      _id: "team-szilvi",
      name: "Bacsik Szilvia",
      role: "Mesterfodrász & a Pop Hair Salon alapítója",
      speciality: "Kevin Murphy Session Stylist",
      bio: "Bacsik Szilvia vagyok, mesterfodrász és a Pop Hair Salon alapítója.\n\nTöbb mint húsz éve dolgozom fodrászként, ez idő alatt számos fotózáson, divatbemutatón és szakmai projekten vettem részt. A divatvilág inspirációi és a mindennapi vendégmunka egyaránt formálták azt a szemléletet, amellyel ma dolgozom.\n\nSzámomra a fodrászat elsősorban bizalom. Fontos, hogy a vendég jól érezze magát, meghallgatva és megértve érezze magát, és olyan frizurával távozzon, amely valóban illik hozzá.\n\nA munkám során különösen fontosnak tartom a haj egészségének megőrzését, ezért a szalonban a Kevin Murphy professzionális termékeit használjuk.\n\nA Pop Hair Salon létrehozásakor az volt a célom, hogy egy nyugodt, igényes környezetet teremtsünk, ahol a szakmai minőség és az emberi figyelem egyaránt jelen van.\n\nSzeretettel várlak a Pop Hair Salonban!",
      file: "eskuvo-munkank-1.jpg",
      order: 1,
    },
    {
      _id: "team-dani",
      name: "Dani",
      role: "Fodrász",
      bio: "Bemutatkozó szöveg hamarosan.",
      file: "balayage-munkank-2.jpg",
      order: 2,
    },
    {
      _id: "team-adam",
      name: "Ádám",
      role: "Fodrász",
      bio: "Bemutatkozó szöveg hamarosan.",
      order: 3,
    },
    {
      _id: "team-izabella",
      name: "Izabella",
      role: "Fodrász",
      bio: "Bemutatkozó szöveg hamarosan.",
      order: 4,
    },
    {
      _id: "team-judit",
      name: "Judit",
      role: "Fodrász",
      bio: "Bemutatkozó szöveg hamarosan.",
      order: 5,
    },
  ];
  for (const m of members) {
    const img = m.file ? await uploadAsset(m.file) : null;
    const doc: Record<string, unknown> = {
      _id: m._id,
      _type: "teamMember",
      name: m.name,
      role: m.role,
      bio: m.bio,
      order: m.order,
    };
    if (m.speciality) doc.speciality = m.speciality;
    if (img) doc.image = { ...img, alt: m.name };
    await client.createOrReplace(doc as never);
  }
}

async function seedServices() {
  console.log("→ Services");
  // Wipe any previously-seeded service docs so re-runs match the current
  // catalogue (Szilvi's list).
  const existingIds = await client.fetch<string[]>('*[_type == "service"]._id');
  if (existingIds.length > 0) {
    console.log(`  cleaning ${existingIds.length} existing service docs`);
    const tx = client.transaction();
    existingIds.forEach((id) => tx.delete(id));
    await tx.commit();
  }

  // Verbatim Szilvi service list — names only, no fabricated descriptions
  // and no prices (Szilvi will fill prices in Studio later).
  const list = [
    { _id: "svc-women", name: "női hajvágás", icon: "scissors", order: 1 },
    {
      _id: "svc-men",
      name: "férfi hajvágás és barber szolgáltatások",
      icon: "scissors",
      order: 2,
    },
    { _id: "svc-color", name: "hajfestés", icon: "palette", order: 3 },
    {
      _id: "svc-balayage",
      name: "balayage technikák",
      icon: "sparkles",
      order: 4,
    },
    {
      _id: "svc-extension",
      name: "hajhosszabbítás (nano kapszula)",
      icon: "sparkles",
      order: 5,
    },
    {
      _id: "svc-care",
      name: "professzionális hajápolás",
      icon: "heart",
      order: 6,
    },
    {
      _id: "svc-occasion",
      name: "alkalmi frizurák",
      icon: "sparkles",
      order: 7,
    },
    {
      _id: "svc-bridal",
      name: "menyasszonyi frizurák",
      icon: "sparkles",
      order: 8,
    },
  ];
  for (const s of list) {
    await client.createOrReplace({ _type: "service", ...s });
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
    { id: "video-atmosphere", file: "szalon-munka-1.jpg", title: "Szalon atmoszféra", category: "video", size: "large", videoUrl: "/videos/hero.mp4" },
    { id: "eskuvo-hero", file: "eskuvo-hero.jpg", title: "Menyasszonyi frizura", category: "wedding", size: "large" },
    { id: "balayage-1", file: "balayage-munkank-1.jpg", title: "Balayage", category: "work" },
    { id: "salon-belso-1", file: "szalon-belso-1.jpg", title: "Szalon enteriőr", category: "salon" },
    { id: "eskuvo-mood-1", file: "eskuvo-mood-1.jpg", title: "Esküvői hangulat", category: "wedding" },
    { id: "editorial-1", file: "editorial-munkank-1.jpg", title: "Editorial fotózás", category: "work", size: "large" },
    { id: "szalon-munka-1", file: "szalon-munka-1.jpg", title: "Munka közben", category: "salon" },
    { id: "hajhosszabbitas-1", file: "hajhosszabbitas-1.jpg", title: "Hajhosszabbítás", category: "work" },
    { id: "eskuvo-munkank-1", file: "eskuvo-munkank-1.jpg", title: "Esküvői frizura", category: "wedding" },
    { id: "balayage-2", file: "balayage-munkank-2.jpg", title: "Balayage", category: "work", size: "large" },
    { id: "szalon-belso-2", file: "szalon-belso-2.jpg", title: "Szalon enteriőr", category: "salon" },
    { id: "balayage-blonde", file: "balayage-blonde.jpg", title: "Szőke balayage", category: "work" },
    { id: "eskuvo-vibe-1", file: "eskuvo-vibe-1.jpg", title: "Esküvői pillanat", category: "wedding" },
    { id: "stilus-1", file: "stilus-munkank-1.jpg", title: "Stílus", category: "work" },
    { id: "eskuvo-vibe-13", file: "eskuvo-vibe-13.jpg", title: "Esküvői részlet", category: "wedding" },
    { id: "szalon-belso-3", file: "szalon-belso-3.jpg", title: "Szalon részlet", category: "salon" },
    { id: "balayage-warm", file: "balayage-warm.jpg", title: "Meleg tónusú balayage", category: "work" },
    { id: "eskuvo-munkank-3", file: "eskuvo-munkank-3.jpg", title: "Esküvői frizura", category: "wedding", size: "large" },
    { id: "km-termek-1", file: "kevin-murphy-termek-1.jpg", title: "Kevin Murphy termékek", category: "salon" },
    { id: "hajhosszabbitas-detail", file: "hajhosszabbitas-detail.jpg", title: "Hajhosszabbítás", category: "work" },
    { id: "km-details-1", file: "kevin-murphy-details-1.jpg", title: "Kevin Murphy termékek", category: "salon" },
    { id: "eskuvo-vibe-2", file: "eskuvo-vibe-2.jpg", title: "Esküvői előkészület", category: "wedding" },
    { id: "modern-haj", file: "modern-haj-1.jpg", title: "Hajszín", category: "work" },
    { id: "eskuvo-vibe-3", file: "eskuvo-vibe-3.jpg", title: "Esküvői pillanat", category: "wedding" },
    { id: "eskuvo-vibe-4", file: "eskuvo-vibe-4.jpg", title: "Esküvői frizura", category: "wedding" },
    { id: "eskuvo-vibe-14", file: "eskuvo-vibe-14.jpg", title: "Esküvői munka", category: "wedding" },
    { id: "eskuvo-vibe-15", file: "eskuvo-vibe-15.jpg", title: "Esküvő", category: "wedding", size: "large" },
    { id: "eskuvo-vibe-16", file: "eskuvo-vibe-16.jpg", title: "Esküvő", category: "wedding" },
    { id: "eskuvo-vibe-17", file: "eskuvo-vibe-17.jpg", title: "Esküvői portré", category: "wedding" },
    { id: "eskuvo-vibe-18", file: "eskuvo-vibe-18.jpg", title: "Esküvői részlet", category: "wedding" },
    { id: "eskuvo-vibe-11", file: "eskuvo-vibe-11.jpg", title: "Esküvő", category: "wedding" },
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
  const repair = await uploadAsset("hajhosszabbitas-1.jpg");
  const action = await uploadAsset("szalon-munka-1.jpg");
  await client.createOrReplace({
    _id: "servicesContent",
    _type: "servicesContent",
    repairImage: repair,
    actionImage: action,
    actionTitleLine1: "Szeretettel várunk",
    actionTitleLine2: "a Pop Hair Salonban.",
    actionSubtitle: "Budapest • Pop Hair Salon",
    introBody:
      "Szalonunkban a modern fodrászati technikák és a személyre szabott megoldások állnak a középpontban.\n\nSzolgáltatásaink között megtalálható:",
    closingBody:
      "Minden szolgáltatás során figyelembe vesszük a haj állapotát, a vendég stílusát és az egyéni igényeket.\n\nA női és férfi frizurák esetében egyaránt fontos számunkra a precíz kivitelezés, a személyre szabott tanácsadás és a természetes, jól viselhető végeredmény.",
    hairExtensionsTitle: "Hajhosszabbítás és hajkereskedelem",
    hairExtensionsBody:
      "A Pop Hair Salonban kiemelt terület a professzionális hajhosszabbítás.\n\nVendégeink számára különböző technikákat kínálunk, amelyek lehetővé teszik a haj hosszának és dúsításának természetes megjelenésű növelését.\n\nFontos számunkra, hogy a hajhosszabbítás harmonikusan illeszkedjen a természetes hajhoz, kényelmesen viselhető legyen, és hosszú távon is megőrizze minőségét.\n\nSzalonunkban minőségi póthajakkal dolgozunk, és vendégeink számára hajkereskedelmi lehetőséget is biztosítunk.\n\nMinden hajhosszabbítás előtt személyes konzultáció során segítünk kiválasztani a megfelelő technikát és hajtípust.",
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
  if (should("reviews")) await seedReviews();
  if (should("weddingProcess")) await seedWeddingProcess();
  if (should("gallery")) await seedGallery();
  console.log("\n✓ Done. Visit /studio to review and refine.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
