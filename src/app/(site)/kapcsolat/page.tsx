import { Phone, Mail, MapPin, Instagram, Facebook, Clock } from "lucide-react";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import { SectionTitle } from "@/components/Common";

export const metadata = {
  title: "Kapcsolat",
  description:
    "Hívjon minket vagy látogasson meg személyesen a Pop Hair Salon budai szalonjában.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const phoneHref = `tel:${settings.phone.replace(/\s/g, "")}`;
  const mailHref = `mailto:${settings.email}`;

  return (
    <div className="pt-48 pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <SectionTitle title="Kapcsolat" subtitle="ELÉRHETŐSÉG" align="center" />

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start mt-20">
          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-luxury-gold">
                  <Phone size={20} />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-black">
                    Telefonszám
                  </span>
                </div>
                <a
                  href={phoneHref}
                  className="text-3xl font-serif italic hover:text-luxury-gold transition-colors"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-luxury-gold">
                  <Mail size={20} />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-black">
                    Email
                  </span>
                </div>
                <a
                  href={mailHref}
                  className="text-2xl font-serif italic hover:text-luxury-gold transition-colors"
                >
                  {settings.email}
                </a>
              </div>
            </div>

            <div className="space-y-6 pt-12 border-t border-black/5">
              <div className="flex items-center gap-4 text-luxury-gold">
                <MapPin size={20} />
                <span className="text-[10px] uppercase font-bold tracking-widest text-black">
                  Címünk
                </span>
              </div>
              <p className="text-3xl font-serif italic max-w-md">
                {settings.address}
              </p>
              <p className="text-gray-600 text-sm font-light">
                Szalonunk Budán, könnyen megközelíthető helyen.
              </p>
            </div>

            <div className="space-y-6 pt-12 border-t border-black/5">
              <div className="flex items-center gap-4 text-luxury-gold">
                <Clock size={20} />
                <span className="text-[10px] uppercase font-bold tracking-widest text-black">
                  Nyitvatartás
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-lg font-serif italic">
                {settings.openingHours.map((entry) => (
                  <div key={entry.label}>
                    <p className="text-gray-600 text-xs uppercase not-italic tracking-widest mb-1">
                      {entry.label}
                    </p>
                    <p>{entry.hours}</p>
                  </div>
                ))}
              </div>
            </div>

            {(settings.instagramUrl || settings.facebookUrl) && (
              <div className="flex gap-8 pt-12">
                {settings.instagramUrl && (
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all transform hover:-rotate-12"
                  >
                    <Instagram size={24} />
                  </a>
                )}
                {settings.facebookUrl && (
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all transform hover:-rotate-12"
                  >
                    <Facebook size={24} />
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="space-y-12 bg-off-white p-12 lg:p-16 border border-black/5 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/10 rounded-bl-full pointer-events-none" />
            <h2 className="text-4xl font-serif italic mb-8">
              Foglaljon{" "}
              <span className="text-luxury-gold">időpontot</span>
            </h2>
            <p className="text-gray-700 font-light mb-12">
              Online rendszerünkön keresztül egyszerűen kiválaszthatja a számára
              megfelelő időpontot és mesterfodrászt.
            </p>
            <a
              href={settings.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-8 bg-black text-white text-[11px] uppercase font-bold tracking-[0.5em] hover:bg-luxury-gold hover:text-black transition-all shadow-xl text-center block"
            >
              Ugrás a foglaláshoz
            </a>
            <div className="mt-12 p-8 border border-luxury-gold/20 bg-white">
              <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">
                Fontos tudnivaló
              </p>
              <p className="text-sm font-light leading-relaxed">
                Amennyiben elrontott haj javítására érkezne, kérjük, foglalás
                előtt mindenképp vegye fel velünk a kapcsolatot telefonon egy
                előzetes konzultáció végett!
              </p>
            </div>
          </div>
        </div>
      </div>

      {settings.googleMapsEmbedUrl && (
        <section className="mt-32 lg:mt-48 h-[600px] overflow-hidden relative">
          <iframe
            title="Google Maps"
            src={settings.googleMapsEmbedUrl}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      )}
    </div>
  );
}
