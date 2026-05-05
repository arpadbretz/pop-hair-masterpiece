import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import { SectionTitle } from "@/components/Common";

export const metadata = {
  title: "Adatvédelmi tájékoztató",
  description:
    "Adatkezelési tájékoztató a Pop Hair Salon weboldal látogatói számára.",
};

export default async function AdatvedelemPage() {
  const settings = await getSiteSettings();

  return (
    <div className="pt-36 md:pt-44 pb-32 bg-white">
      <div className="max-w-3xl mx-auto px-8">
        <SectionTitle
          title="Adatvédelmi tájékoztató"
          subtitle="GDPR"
          align="center"
        />

        <div className="space-y-12 text-gray-700 font-light leading-relaxed">
          <p className="italic text-gray-500 text-sm">
            Hatályos: {new Date().toLocaleDateString("hu-HU", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif italic text-black">
              1. Bevezető
            </h2>
            <p>
              A Pop Hair Salon weboldal látogatóinak (a továbbiakban:
              „Érintett") személyes adatait az alábbiakban ismertetett módon
              kezeljük. A tájékoztató célja, hogy az Érintett a természetes
              személyeknek a személyes adatok kezelése tekintetében történő
              védelméről szóló 2016/679/EU rendelet (a továbbiakban: „GDPR"),
              valamint az információs önrendelkezési jogról és az
              információszabadságról szóló 2011. évi CXII. törvény
              („Infotv.") alapján megfelelő tájékoztatást kapjon.
            </p>
          </section>

          <section className="space-y-4 pt-8 border-t border-black/5">
            <h2 className="text-2xl font-serif italic text-black">
              2. Adatkezelő
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-6 gap-y-3 text-base">
              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                Név
              </dt>
              <dd>Bacsik Szilvia egyéni vállalkozó</dd>

              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                Cím
              </dt>
              <dd>{settings.address}</dd>

              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                Telefon
              </dt>
              <dd>
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-luxury-gold">
                  {settings.phone}
                </a>
              </dd>

              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                E-mail
              </dt>
              <dd>
                <a href={`mailto:${settings.email}`} className="hover:text-luxury-gold">
                  {settings.email}
                </a>
              </dd>
            </dl>
          </section>

          <section className="space-y-4 pt-8 border-t border-black/5">
            <h2 className="text-2xl font-serif italic text-black">
              3. Kezelt adatok köre, célja, jogalapja
            </h2>

            <h3 className="text-lg font-serif italic text-black mt-6">
              3.1. Kapcsolatfelvétel (telefon, e-mail)
            </h3>
            <ul className="list-disc list-inside space-y-2 marker:text-luxury-gold">
              <li>
                <strong className="text-black">Adatok:</strong> név, telefonszám, e-mail cím, az
                Érintett által önként megadott egyéb adatok.
              </li>
              <li>
                <strong className="text-black">Cél:</strong> kapcsolattartás, időpont-egyeztetés,
                érdeklődésre válaszadás.
              </li>
              <li>
                <strong className="text-black">Jogalap:</strong> az Érintett hozzájárulása
                (GDPR 6. cikk (1) bek. a) pont).
              </li>
              <li>
                <strong className="text-black">Tárolási idő:</strong> a kapcsolatfelvétel
                lezárását követő 1 év, illetve a hozzájárulás visszavonásáig.
              </li>
            </ul>

            <h3 className="text-lg font-serif italic text-black mt-6">
              3.2. Online időpontfoglalás
            </h3>
            <ul className="list-disc list-inside space-y-2 marker:text-luxury-gold">
              <li>
                Az időpontfoglalás külső szolgáltató (Yclients / Alteg.io)
                rendszerében történik. A foglalási adatokat a szolgáltató
                kezeli saját adatvédelmi tájékoztatása szerint.
              </li>
              <li>
                <strong className="text-black">Szolgáltató:</strong> YCLIENTS LLC,{" "}
                <a
                  href="https://www.yclients.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-luxury-gold underline underline-offset-4"
                >
                  yclients.com
                </a>
              </li>
            </ul>

            <h3 className="text-lg font-serif italic text-black mt-6">
              3.3. Sütik (cookies) és látogatói statisztikák
            </h3>
            <p>
              A weboldal csak a működéshez szigorúan szükséges sütiket használ.
              Harmadik fél (pl. Google Maps térkép-beágyazás) saját sütiket
              dobhat a látogató böngészőjébe, amelyekről a Google
              adatvédelmi szabályzata ad bővebb tájékoztatást.
            </p>
            <ul className="list-disc list-inside space-y-2 marker:text-luxury-gold">
              <li>
                <strong className="text-black">Saját sütik:</strong> munkamenet
                fenntartása, beállítások mentése. Tárolási idő: max. 12 hónap.
              </li>
              <li>
                <strong className="text-black">Harmadik fél:</strong> Google
                Maps (térkép) — csak ha az Érintett elfogadja a sütiket.
              </li>
            </ul>
          </section>

          <section className="space-y-4 pt-8 border-t border-black/5">
            <h2 className="text-2xl font-serif italic text-black">
              4. Adatfeldolgozók
            </h2>
            <p>
              Az adatkezelő az alábbi adatfeldolgozók szolgáltatásait veszi
              igénybe:
            </p>
            <ul className="list-disc list-inside space-y-2 marker:text-luxury-gold">
              <li>
                <strong className="text-black">Tárhely / hosting:</strong> Vercel Inc.
                (340 S Lemon Ave #4133, Walnut, CA 91789, USA) — a weboldal
                kiszolgálása.
              </li>
              <li>
                <strong className="text-black">Tartalomkezelő rendszer (CMS):</strong>{" "}
                Sanity.io (Sanity AS, Oslo, Norvégia) — a weboldal szerkesztett
                tartalmainak tárolása.
              </li>
              <li>
                <strong className="text-black">Időpontfoglalás:</strong> YCLIENTS
                LLC — időpontfoglalási rendszer üzemeltetése.
              </li>
              <li>
                <strong className="text-black">Térkép:</strong> Google LLC
                (Mountain View, USA) — térkép-beágyazás a Kapcsolat oldalon.
              </li>
            </ul>
          </section>

          <section className="space-y-4 pt-8 border-t border-black/5">
            <h2 className="text-2xl font-serif italic text-black">
              5. Az Érintett jogai
            </h2>
            <p>Az Érintett a GDPR alapján az alábbi jogokkal élhet:</p>
            <ul className="list-disc list-inside space-y-2 marker:text-luxury-gold">
              <li>
                <strong className="text-black">Hozzáférés:</strong> tájékoztatás
                kérése a kezelt adatokról.
              </li>
              <li>
                <strong className="text-black">Helyesbítés:</strong> pontatlan
                adatok kijavítása.
              </li>
              <li>
                <strong className="text-black">Törlés („elfeledtetés"):</strong>{" "}
                az adatok törlésének kérése.
              </li>
              <li>
                <strong className="text-black">Korlátozás:</strong> az
                adatkezelés korlátozása.
              </li>
              <li>
                <strong className="text-black">Adathordozhatóság:</strong> az
                adatok tagolt, géppel olvasható formában történő átvétele.
              </li>
              <li>
                <strong className="text-black">Tiltakozás:</strong> az
                adatkezelés ellen.
              </li>
              <li>
                <strong className="text-black">Hozzájárulás visszavonása</strong>{" "}
                bármikor.
              </li>
            </ul>
            <p className="pt-4">
              A jogai gyakorlása érdekében az Érintett a 2. pontban megadott
              elérhetőségen veheti fel a kapcsolatot az adatkezelővel.
            </p>
          </section>

          <section className="space-y-4 pt-8 border-t border-black/5">
            <h2 className="text-2xl font-serif italic text-black">
              6. Jogorvoslati lehetőség
            </h2>
            <p>
              Az Érintett panaszával fordulhat a Nemzeti Adatvédelmi és
              Információszabadság Hatósághoz:
            </p>
            <dl className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-x-6 gap-y-2 text-base">
              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                Cím
              </dt>
              <dd>1055 Budapest, Falk Miksa utca 9–11.</dd>

              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                Levél
              </dt>
              <dd>1374 Budapest, Pf.: 603.</dd>

              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                Telefon
              </dt>
              <dd>+36 (1) 391-1400</dd>

              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                Web
              </dt>
              <dd>
                <a
                  href="https://www.naih.hu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-luxury-gold underline underline-offset-4"
                >
                  www.naih.hu
                </a>
              </dd>
            </dl>
            <p className="pt-2">
              Az Érintett bírósághoz is fordulhat — a per a lakóhelye szerinti
              törvényszék előtt is megindítható.
            </p>
          </section>

          <section className="space-y-4 pt-8 border-t border-black/5">
            <h2 className="text-2xl font-serif italic text-black">
              7. A tájékoztató módosítása
            </h2>
            <p>
              Az adatkezelő fenntartja a jogot a jelen tájékoztató
              egyoldalú módosítására. A módosítás a weboldalon történő
              közzététel napján lép hatályba.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
