"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, Instagram, Facebook } from "lucide-react";
import { cn } from "@/lib/cn";

const navItems = [
  { name: "Főoldal", path: "/" },
  { name: "Rólunk", path: "/rolunk" },
  { name: "Szolgáltatások", path: "/szolgaltatasok" },
  { name: "Galéria", path: "/galeria" },
  { name: "Esküvő", path: "/eskuvo" },
  { name: "Kapcsolat", path: "/kapcsolat" },
];

interface NavbarProps {
  bookingUrl: string;
  instagramUrl?: string;
  facebookUrl?: string;
  address?: string;
}

export function Navbar({
  bookingUrl,
  instagramUrl,
  facebookUrl,
  address,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const isDarkHeroPage = pathname === "/" || pathname === "/eskuvo";
  const navTextColor =
    isScrolled || !isDarkHeroPage ? "text-black" : "text-white";

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-700 px-6 md:px-12 py-6 md:py-10 flex items-center justify-between",
          isScrolled
            ? "bg-white/95 backdrop-blur-2xl py-4 shadow-sm border-b border-black/[0.03]"
            : "bg-transparent"
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-6 group cursor-pointer transition-transform hover:scale-105 duration-500"
        >
          <Image
            src="/images/logo.png"
            alt="POP HAIR Logo"
            width={80}
            height={80}
            priority
            className={cn(
              "h-20 w-auto object-contain transition-all duration-500",
              !isScrolled && isDarkHeroPage
                ? "brightness-0 invert"
                : "brightness-0"
            )}
          />
          <div className="flex flex-col">
            <h1
              className={cn(
                "text-xl md:text-2xl font-serif tracking-[0.4em] font-black italic leading-none mb-1 transition-colors duration-500",
                navTextColor
              )}
            >
              POP HAIR
            </h1>
            <span className="text-[7px] uppercase tracking-[0.5em] text-luxury-gold font-bold">
              Budai Mesterszalon
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-14">
          <div className="flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  "text-[10px] uppercase font-bold tracking-[0.4em] transition-all relative group overflow-hidden py-2",
                  pathname === item.path
                    ? "text-luxury-gold"
                    : `${navTextColor} hover:text-luxury-gold`
                )}
              >
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                  {item.name}
                </span>
                <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full text-luxury-gold">
                  {item.name}
                </span>
                {pathname === item.path && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-luxury-gold"
                  />
                )}
              </Link>
            ))}
          </div>

          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-10 py-4 group overflow-hidden border border-black/10 transition-colors bg-luxury-gold text-black font-bold uppercase tracking-[0.4em] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-shadow text-[10px]"
          >
            Időpontfoglalás
          </a>
        </div>

        <button
          aria-label="Menü megnyitása"
          className={cn(
            "lg:hidden p-2 transition-colors duration-500",
            navTextColor
          )}
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b border-black/5">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-4"
              >
                <Image
                  src="/images/logo.png"
                  alt="POP HAIR"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain brightness-0"
                />
                <span className="text-2xl font-serif italic font-black text-black">
                  POP HAIR
                </span>
              </Link>
              <button
                aria-label="Menü bezárása"
                className="p-2 text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col grow p-12 justify-center gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-5xl font-serif italic transition-all",
                      pathname === item.path ? "text-luxury-gold" : "text-black"
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 py-6 bg-luxury-gold text-black text-[12px] uppercase font-bold tracking-[0.5em] shadow-xl text-center"
              >
                Időpontfoglalás
              </a>
            </div>

            <div className="p-12 border-t border-black/5 space-y-8">
              <div className="flex gap-12">
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <Instagram
                      size={28}
                      className="text-gray-400 hover:text-black transition-colors"
                    />
                  </a>
                )}
                {facebookUrl && (
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <Facebook
                      size={28}
                      className="text-gray-400 hover:text-black transition-colors"
                    />
                  </a>
                )}
              </div>
              {address && (
                <p className="text-[10px] uppercase tracking-widest text-gray-400">
                  {address}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
