import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import { SectionTitle } from "@/components/Common";

export const metadata = {
  title: "Impresszum",
  description: "A Pop Hair Salon weboldal üzemeltetőjének adatai.",
};

export default async function ImpresszumPage() {
  const settings = await getSiteSettings();

  return (
    <div className="pt-36 md:pt-44 pb-32 bg-white">
      <div className="max-w-3xl mx-auto px-8">
        <SectionTitle title="Impresszum" subtitle="JOGI TÁJÉKOZTATÓ" align="center" />

        <div className="space-y-12 text-gray-700 font-light leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-serif italic text-black">
              A weboldal üzemeltetője
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-6 gap-y-3 text-base">
              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                Név
              </dt>
              <dd>Bacsik Szilvia egyéni vállalkozó</dd>

              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                Tevékenység helye
              </dt>
              <dd>{settings.address}</dd>

              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                Levelezési cím
              </dt>
              <dd className="italic text-gray-500">
                [Megegyezik a tevékenység helyével — vagy adja meg külön]
              </dd>

              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                Adószám
              </dt>
              <dd className="italic text-gray-500">
                [Adószám — kérlek küldd át]
              </dd>

              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                Nyilvántartási szám
              </dt>
              <dd className="italic text-gray-500">
                [Egyéni vállalkozói nyilvántartási szám — kérlek küldd át]
              </dd>

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

          <section className="space-y-4 pt-12 border-t border-black/5">
            <h2 className="text-2xl font-serif italic text-black">
              Tárhelyszolgáltató
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-6 gap-y-3 text-base">
              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                Cégnév
              </dt>
              <dd>Vercel Inc.</dd>

              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                Cím
              </dt>
              <dd>
                340 S Lemon Ave #4133, Walnut, CA 91789, USA
              </dd>

              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                Weboldal
              </dt>
              <dd>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-luxury-gold underline underline-offset-4"
                >
                  vercel.com
                </a>
              </dd>
            </dl>
          </section>

          <section className="space-y-4 pt-12 border-t border-black/5">
            <h2 className="text-2xl font-serif italic text-black">
              Weboldal fejlesztője
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-6 gap-y-3 text-base">
              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                Cégnév
              </dt>
              <dd>Prometheus Digital Kft.</dd>

              <dt className="text-gray-600 uppercase text-xs tracking-widest font-bold pt-1">
                Weboldal
              </dt>
              <dd>
                <a
                  href="https://www.prometheusdigital.hu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-luxury-gold underline underline-offset-4"
                >
                  prometheusdigital.hu
                </a>
              </dd>
            </dl>
          </section>

          <section className="space-y-4 pt-12 border-t border-black/5">
            <h2 className="text-2xl font-serif italic text-black">
              Vonatkozó jogszabályok
            </h2>
            <ul className="list-disc list-inside space-y-2 text-base marker:text-luxury-gold">
              <li>
                Az elektronikus kereskedelmi szolgáltatások, valamint az
                információs társadalommal összefüggő szolgáltatások egyes
                kérdéseiről szóló 2001. évi CVIII. törvény (Ekertv.)
              </li>
              <li>
                Az információs önrendelkezési jogról és az
                információszabadságról szóló 2011. évi CXII. törvény (Infotv.)
              </li>
              <li>
                Az Európai Parlament és a Tanács (EU) 2016/679 rendelete
                (általános adatvédelmi rendelet — GDPR)
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
