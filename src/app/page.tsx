export default function Home() {
  return (
    <main className="flex flex-grow items-center justify-center px-8 py-32">
      <div className="max-w-2xl text-center space-y-10">
        <span className="text-[10px] uppercase font-bold tracking-[0.6em] text-luxury-gold block">
          Pop Hair Salon
        </span>
        <h1 className="text-5xl md:text-7xl font-serif italic leading-[0.9]">
          Új honlap <span className="text-gold-gradient">épül.</span>
        </h1>
        <p className="text-gray-500 leading-relaxed font-light">
          Next.js + Sanity CMS migráció folyamatban. Visszatérünk hamarosan a
          teljes szépségünkben.
        </p>
        <div className="pt-4">
          <a
            href="https://b998424.alteg.io/company/624179/personal/menu?o="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-5 bg-luxury-gold text-black text-[10px] uppercase font-bold tracking-[0.5em] shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-shadow"
          >
            Időpontfoglalás
          </a>
        </div>
      </div>
    </main>
  );
}
