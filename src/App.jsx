import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import {
  Instagram,
  Facebook,
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  ArrowRight,
  Quote,
  Minus,
  Play,
  ArrowUpRight,
  MoveDown
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utilities ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Icons ---
const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// --- Custom Cursor ---

// --- Preloader ---
const Preloader = ({ finishLoading }) => {
  useEffect(() => {
    const timer = setTimeout(finishLoading, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center text-white"
    >
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-8xl font-serif italic"
        >
          POP HAIR SALON
        </motion.h1>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="w-48 h-[1px] bg-gold-champagne mt-8 origin-left"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-[10px] uppercase tracking-[0.5em] mt-4 text-gray-500"
      >
        Az önkifejezés művészete
      </motion.p>
    </motion.div>
  );
};

// --- Sub-components ---

const PerspectiveReveal = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={cn("perspective-1000", className)}>
      <motion.div
        initial={{ opacity: 0, rotateX: 45, y: 100 }}
        animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const SectionTitle = ({ title, subtitle, align = "left" }) => (
  <div className={cn("mb-24 md:mb-40", align === "center" ? "text-center" : "text-left")}>
    <div className={cn("flex items-center gap-6 mb-8", align === "center" ? "justify-center" : "justify-start")}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        className="h-[1px] bg-gold-champagne"
      />
      <span className="text-[10px] uppercase font-bold tracking-[0.6em] text-gold-champagne">{subtitle}</span>
    </div>
    <PerspectiveReveal>
      <h2 className="text-6xl md:text-[10vw] font-serif leading-none italic">
        {title}
      </h2>
    </PerspectiveReveal>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const previous = scrollY.getPrevious();
      if (latest > previous && latest > 150) setHidden(true);
      else setHidden(false);
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-700 px-12 py-8 flex items-center justify-between",
        isScrolled ? "bg-white/95 backdrop-blur-3xl py-6 shadow-sm border-b border-black/[0.03]" : "bg-transparent py-10"
      )}
    >
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white overflow-hidden relative">
          <motion.span
            animate={{ y: [0, -40, 40, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="font-serif italic text-lg"
          >P</motion.span>
        </div>
        <h1 className="text-xl font-serif tracking-[0.4em] font-black italic">POP HAIR</h1>
      </div>

      <div className="hidden lg:flex items-center gap-16">
        {["Rólunk", "Márkáink", "Galéria", "Áraink", "Kapcsolat"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] uppercase font-bold tracking-[0.3em] hover:text-gold-champagne transition-all relative group overflow-hidden">
            <span className="block transition-transform duration-500 group-hover:-translate-y-full">{item}</span>
            <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full text-gold-champagne">{item}</span>
          </a>
        ))}
        <button className="relative px-8 py-3 group overflow-hidden border border-black transition-colors hover:text-white">
          <div className="absolute inset-0 bg-black transition-transform duration-500 -translate-x-full group-hover:translate-x-0" />
          <span className="relative z-10 text-[10px] uppercase font-bold tracking-[0.4em]">Foglalás</span>
        </button>
      </div>

      <button className="lg:hidden p-2"><Menu size={28} /></button>
    </motion.nav>
  );
};

// --- Sections ---

const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 800], [0, 200]);
  const yImage = useTransform(scrollY, [0, 800], [0, -100]);
  const scaleImage = useTransform(scrollY, [0, 800], [1, 1.2]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-[120vh] w-full flex items-center justify-center bg-white overflow-hidden pt-20">
      {/* Background Floating Text */}
      <motion.div
        style={{ y: yText, opacity }}
        className="absolute inset-x-0 top-[20%] flex flex-col items-center justify-center select-none pointer-events-none z-0"
      >
        <h2 className="text-[20vw] font-serif italic text-black/[0.02] whitespace-nowrap leading-none uppercase">Stílus</h2>
        <h2 className="text-[15vw] font-serif italic text-black/[0.02] whitespace-nowrap leading-none -mt-20 uppercase">Alapítva 2004</h2>
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col md:flex-row items-center justify-between gap-20">
        <div className="flex-1 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] uppercase tracking-[0.8em] text-gold-champagne font-bold mb-6 block">Prémium Budai Szalon</span>
            <h1 className="text-6xl md:text-9xl font-serif italic leading-[0.9] text-black">
              A szépség mint<br />mestermű
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="text-lg md:text-2xl font-light text-gray-500 max-w-md leading-relaxed"
          >
            Húsz év szakértelem Budán, a stílus és az önazonosság találkozásánál. Nálunk a hajformázás nem csupán szolgáltatás, hanem egyénre szabott alkotás.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <button className="flex items-center gap-6 group hover-target" data-cursor="FOGLALÁS">
              <div className="w-16 h-16 rounded-full border border-black flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <ArrowUpRight size={24} className="transition-transform duration-500 group-hover:rotate-45" />
              </div>
              <span className="text-[12px] uppercase font-bold tracking-[0.5em] border-b border-black pb-2">Fedezze fel</span>
            </button>
          </motion.div>
        </div>

        <div className="flex-1 relative aspect-[4/5] md:aspect-[3/4] w-full max-w-md group overflow-hidden shadow-[100px_100px_0px_#F9F6F1]">
          <motion.div style={{ scale: scaleImage, y: yImage }} className="h-full w-full">
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop"
              className="h-full w-full object-cover grayscale transition-all duration-[2000ms] group-hover:grayscale-0"
              alt="High fashion hair"
            />
          </motion.div>
          <div className="absolute top-8 right-8 z-20">
            <div className="w-24 h-24 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center animate-spin-slow text-center p-2">
              <span className="text-[7px] text-white uppercase tracking-tighter leading-tight font-bold">PRÉMIUM • LUXUS • BUDA • ALAPÍTVA 2004 •</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 flex flex-col items-center gap-6 opacity-40">
        <span className="text-[9px] uppercase tracking-[0.5em] rotate-90 origin-right translate-x-[50%] mb-12">Görgessen</span>
        <div className="w-[1px] h-20 bg-gradient-to-v from-black to-transparent" />
      </div>
    </section>
  );
};

const HorizontalBrands = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-0 h-full">
          {/* Pop Hair Salon Slide */}
          <div className="w-screen h-full flex flex-col lg:flex-row">
            <div className="flex-1 h-full bg-black p-20 flex flex-col justify-center text-white">
              <span className="text-gold-champagne text-xs uppercase tracking-[0.5em] mb-12">01 / KONCEPCIÓ</span>
              <h2 className="text-[12vw] font-serif italic leading-none mb-12">Pop Hair</h2>
              <p className="max-w-md text-xl font-light text-gray-400 mb-12">Szakrális figyelem és kompromisszummentes minőség. Kevin Murphy rituáléinkkal és balayage specialistáinkkal a haj egészségét és a modern esztétikát ötvözzük.</p>
              <button className="w-fit border border-white/20 px-12 py-5 text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-white hover:text-black transition-all">Szolgáltatások felfedezése</button>
            </div>
            <div className="flex-1 h-full relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200&auto=format&fit=crop" className="h-full w-full object-cover grayscale opacity-60" alt="" />
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
            </div>
          </div>

          {/* Loya Slide */}
          <div className="w-screen h-full flex flex-col lg:flex-row bg-[#F9F6F1]">
            <div className="flex-1 h-full relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1200&auto=format&fit=crop" className="h-full w-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#F9F6F1] to-transparent" />
            </div>
            <div className="flex-1 h-full p-20 flex flex-col justify-center text-black">
              <span className="text-[#887050] text-xs uppercase tracking-[0.5em] mb-12">02 / KERESKEDELEM</span>
              <h2 className="text-[12vw] font-serif italic leading-none mb-12 text-[#887050]">Loya</h2>
              <p className="max-w-md text-xl font-light text-gray-600 mb-12">A póthajak új standardja. Kizárólag válogatott, etikus forrásból származó prémium hajak azoknak, akik a láthatatlan tökéletességre törekszenek.</p>
              <button className="w-fit border border-[#887050]/20 px-12 py-5 text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-[#887050] hover:text-white transition-all text-[#887050]">Katalógus böngészése</button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TeamMasterpiece = () => {
  return (
    <section id="galéria" className="py-48 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <SectionTitle title="Mesterek" subtitle="SZAKÉRTELEM" />

        <div className="grid lg:grid-cols-3 gap-32">
          {[
            {
              name: "Bacsik Szilvia",
              role: "Kreatív Igazgató",
              img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&h=1000&auto=format&fit=crop",
              y: 0
            },
            {
              name: "Szilágyi Gábor",
              role: "Mesterfodrász",
              img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=800&h=1000&auto=format&fit=crop",
              y: 100
            },
            {
              name: "Csala Dani",
              role: "Hajművész",
              img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&h=1000&auto=format&fit=crop",
              y: 200
            }
          ].map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: member.y }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.2 }}
              className="relative group cursor-pointer"
            >
              <div className="aspect-[4/6] overflow-hidden mb-12 relative">
                <img src={member.img} className="h-full w-full object-cover grayscale transition-all duration-[1500ms] group-hover:scale-110 group-hover:grayscale-0" alt="" />
                <div className="absolute inset-0 border border-black/10 group-hover:border-gold-champagne/50 transition-colors" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <div className="text-white text-[10px] uppercase font-bold tracking-[0.5em] border border-white/30 px-6 py-3 text-center">Megtekintés</div>
                </div>
              </div>
              <h3 className="text-4xl font-serif italic mb-2">{member.name}</h3>
              <p className="text-gold-champagne text-[10px] uppercase font-bold tracking-[0.4em] mb-4">{member.role}</p>
              <div className="w-12 h-[1px] bg-black/10 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VideoMaskSection = () => {
  return (
    <section className="h-screen w-full relative bg-black flex items-center justify-center overflow-hidden">
      <h2 className="text-[30vw] font-serif font-black italic tracking-tighter text-white opacity-5 select-none absolute">POP</h2>
      <div className="w-full h-full max-w-5xl aspect-video relative group border-hairline border-white/10 p-4">
        <video
          autoPlay muted loop playsInline
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
        >
          <source src="https://player.vimeo.com/external/370331493.sd.mp4?s=339659024f2b9634289895c1a0-43-469a-ae1b-1025a472c99b&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="absolute bottom-12 left-12 flex items-center gap-6">
          <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center animate-pulse">
            <Play fill="white" size={16} className="ml-1" />
          </div>
          <div>
            <p className="text-white text-xs uppercase font-bold tracking-[0.4em]">A színfalak mögött</p>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1 italic">Fashion Week Backstage 2024</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsMaster = () => {
  const [current, setCurrent] = useState(0);
  const data = [
    { name: "Kovács Adél", text: "A POP Hair az a hely, ahol végre azt kaptam, amit megálmodtam: természetes eleganciát és professzionális gondoskodást." },
    { name: "Szalai Márk", text: "A Loya hajak minősége egyszerűen más dimenzió. Nem találtam hasonlót egész Európában, a textúra és a tartósság egyedülálló." },
    { name: "Nagy Júlia", text: "Budapest legprofibb szalonja. Szilvi kezei között minden látogatás egy rituálé, amiből feltöltődve távozom." }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % data.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-64 bg-[#fcfcfc] overflow-hidden relative border-y border-black/[0.03]">
      <div className="absolute inset-0 opacity-[0.02] flex flex-wrap gap-20 pointer-events-none p-20">
        {[...Array(50)].map((_, i) => <Quote key={i} size={80} />)}
      </div>

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 50, skewY: 5 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            exit={{ opacity: 0, y: -50, skewY: -5 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="space-y-16"
          >
            <p className="text-5xl md:text-[8vw] font-serif italic text-black leading-[0.9] tracking-tighter">"{data[current].text}"</p>
            <div className="flex items-center gap-12">
              <div className="w-20 h-20 rounded-full border border-black p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-serif italic text-2xl">
                  {data[current].name[0]}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase font-bold tracking-[0.5em] text-gold-champagne mb-2">Ellenőrzött vélemény</p>
                <p className="text-2xl font-serif italic">{data[current].name}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const FooterElite = () => {
  return (
    <footer id="kapcsolat" className="bg-black text-white pt-64 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        <h2 className="text-[40vw] font-serif italic text-white leading-none absolute -left-[20%] -top-[10%]">POP</h2>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-32 mb-64">
          <div className="lg:col-span-8">
            <PerspectiveReveal>
              <h3 className="text-7xl md:text-[11vw] font-serif italic leading-[0.85] mb-20 text-white">Találjuk meg az Ön<br /><span className="text-gold-champagne">valódi énjét.</span></h3>
            </PerspectiveReveal>
            <div className="flex flex-wrap gap-20">
              <div className="space-y-6">
                <p className="text-xs uppercase font-bold tracking-[0.4em] text-gray-500">Hívjon Minket</p>
                <p className="text-4xl font-serif">+36 30 123 4567</p>
              </div>
              <div className="space-y-6">
                <p className="text-xs uppercase font-bold tracking-[0.4em] text-gray-500">Találkozzunk</p>
                <p className="text-4xl font-serif">1011 Budapest, Iskola utca 16.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end gap-20">
            <div className="space-y-8">
              <p className="text-xs uppercase font-bold tracking-[0.4em] text-gray-500">Közösségi Jelenlét</p>
              <div className="flex gap-12">
                <Instagram size={32} className="hover:text-gold-champagne transition-colors cursor-pointer" />
                <Facebook size={32} className="hover:text-gold-champagne transition-colors cursor-pointer" />
                <TikTokIcon size={32} className="hover:text-gold-champagne transition-colors cursor-pointer" />
              </div>
            </div>
            <button className="w-full py-10 bg-gold-champagne text-black text-[12px] uppercase font-bold tracking-[0.6em] hover:bg-white transition-all transform hover:-translate-y-2 shadow-2xl">Időpontfoglalás</button>
          </div>
        </div>

        <div className="h-[400px] w-full relative grayscale invert mb-32 group border border-white/10 p-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.53232!2d19.01!3d47.49!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDI5JzI0LjAiTiAxOcKwMDAnMzYuMCJF!5e0!3m2!1sen!2shu!4v1620000000000!5m2!1sen!2shu"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy"
          ></iframe>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-gray-500">
          <p className="text-[8px] uppercase tracking-[0.6em]">© 2026 POP HAIR SALON • MINDEN JOG FENNTARTVA • PROMETHEUS DIGITAL</p>
          <div className="flex gap-12">
            {["Szabályzat", "Karrier", "Sajtó"].map(item => (
              <span key={item} className="text-[9px] uppercase font-bold tracking-widest hover:text-white transition-colors cursor-pointer">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- App ---

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-white text-black selection:bg-gold-champagne selection:text-black antialiased bg-grain">
      <AnimatePresence>
        {isLoading && <Preloader finishLoading={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <div className="py-48 px-8 bg-white flex items-center justify-center">
              <PerspectiveReveal className="max-w-4xl text-center">
                <h2 className="text-4xl md:text-7xl font-serif italic text-black mb-12 leading-tight">Minden hajszál egy új történet kezdete. Segítünk, hogy az Öné <span className="text-gold-champagne">felejthetetlen legyen.</span></h2>
                <div className="w-20 h-[1px] bg-black mx-auto" />
              </PerspectiveReveal>
            </div>
            <HorizontalBrands />
            <TeamMasterpiece />
            <VideoMaskSection />
            <TestimonialsMaster />

            {/* Minimal Pricing Grid */}
            <section id="pricing" className="py-48 bg-white">
              <div className="max-w-5xl mx-auto px-8">
                <SectionTitle title="Érték" subtitle="A BEFEKTETÉS" align="center" />
                <div className="grid md:grid-cols-2 gap-x-24 gap-y-16">
                  {[
                    { n: "Női Hajvágás", p: "18.500" },
                    { n: "Balayage", p: "32.000" },
                    { n: "Loya Póthaj", p: "Egyedi" },
                    { n: "Styling", p: "12.000" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-black/10 pb-6 group cursor-pointer">
                      <span className="text-3xl font-serif italic group-hover:text-gold-champagne transition-colors group-hover:pl-4 duration-500">{item.n}</span>
                      <span className="text-sm font-bold tracking-widest">{item.p} HUF</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
          <FooterElite />

          {/* Elite Fixed CTA */}
          <motion.button
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            whileHover={{ scale: 1.05 }}
            className="fixed bottom-12 right-12 z-[100] bg-black text-white px-10 py-5 rounded-full shadow-2xl flex items-center gap-6 group overflow-hidden border border-white/10"
          >
            <div className="w-2 h-2 rounded-full bg-gold-champagne animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-[0.5em] relative z-10">IDŐPONTFOGALÁS</span>
            <div className="absolute inset-0 bg-gold-champagne text-black flex items-center justify-center transition-transform duration-500 translate-y-full group-hover:translate-y-0">
              <span className="text-[10px] uppercase font-bold tracking-[0.5em]">Foglalás</span>
            </div>
          </motion.button>
        </>
      )}
    </div>
  );
}
