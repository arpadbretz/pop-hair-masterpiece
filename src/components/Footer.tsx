import Link from "next/link";
import { Instagram, Facebook, ArrowUpRight } from "lucide-react";

const TikTokIcon = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

interface FooterProps {
  bookingUrl: string;
  phone: string;
  address: string;
  instagramUrl?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
}

export function Footer({
  bookingUrl,
  phone,
  address,
  instagramUrl,
  facebookUrl,
  tiktokUrl,
}: FooterProps) {
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <footer
      id="footer"
      className="bg-black text-white pt-32 pb-12 overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <h2 className="text-[40vw] font-serif italic text-white leading-none absolute -left-[20%] -top-[10%]">
          POP
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-8">
            <h3 className="text-5xl md:text-[8vw] font-serif italic leading-[0.85] mb-12 text-white">
              Találjuk meg az Ön
              <br />
              <span className="text-gold-gradient">valódi énjét.</span>
            </h3>
            <div className="flex flex-wrap gap-12 md:gap-24">
              <div className="space-y-4">
                <p className="text-xs uppercase font-bold tracking-[0.4em] text-gray-500">
                  Hívjon Minket
                </p>
                <a
                  href={phoneHref}
                  className="text-3xl font-serif text-luxury-gold hover:text-white transition-colors"
                >
                  {phone}
                </a>
              </div>
              <div className="space-y-4">
                <p className="text-xs uppercase font-bold tracking-[0.4em] text-gray-500">
                  Találkozzunk
                </p>
                <p className="text-3xl font-serif text-luxury-gold">{address}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end gap-16">
            <div className="space-y-6">
              <p className="text-xs uppercase font-bold tracking-[0.4em] text-gray-500">
                Kövessen Minket
              </p>
              <div className="flex gap-10">
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="hover:text-luxury-gold transition-colors transform hover:scale-110 duration-300"
                  >
                    <Instagram size={28} />
                  </a>
                )}
                {facebookUrl && (
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="hover:text-luxury-gold transition-colors transform hover:scale-110 duration-300"
                  >
                    <Facebook size={28} />
                  </a>
                )}
                {tiktokUrl && (
                  <a
                    href={tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="hover:text-luxury-gold transition-colors transform hover:scale-110 duration-300"
                  >
                    <TikTokIcon size={28} />
                  </a>
                )}
              </div>
            </div>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="w-full">
              <button className="w-full py-8 bg-luxury-gold text-black text-[12px] uppercase font-bold tracking-[0.6em] hover:bg-white transition-all transform hover:-translate-y-2 shadow-2xl">
                Időpontfoglalás
              </button>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-white/5">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
              Oldalak
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm hover:text-luxury-gold transition-colors"
              >
                Főoldal
              </Link>
              <Link
                href="/rolunk"
                className="text-sm hover:text-luxury-gold transition-colors"
              >
                Rólunk
              </Link>
              <Link
                href="/szolgaltatasok"
                className="text-sm hover:text-luxury-gold transition-colors"
              >
                Szolgáltatások
              </Link>
              <Link
                href="/galeria"
                className="text-sm hover:text-luxury-gold transition-colors"
              >
                Galéria
              </Link>
              <Link
                href="/kapcsolat"
                className="text-sm hover:text-luxury-gold transition-colors"
              >
                Kapcsolat
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
              Szolgáltatások
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <span>Elrontott hajak javítása</span>
              <span>Mesterfodrászat</span>
              <span>Balayage Ritual</span>
              <span>Kevin Murphy Rituálé</span>
            </div>
          </div>
          <div className="col-span-2 space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
              Hírlevél
            </p>
            <div className="flex border-b border-white/20 pb-2">
              <input
                type="email"
                placeholder="E-mail címe"
                aria-label="E-mail cím a hírlevélhez"
                className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-gray-500"
              />
              <ArrowUpRight size={20} className="text-luxury-gold" />
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-gray-500">
          <p className="text-[8px] uppercase tracking-[0.6em]">
            © {new Date().getFullYear()} POP HAIR SALON • MINDEN JOG FENNTARTVA •
            PROMETHEUS DIGITAL
          </p>
        </div>
      </div>
    </footer>
  );
}
