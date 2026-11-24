import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[calc(100svh-4rem)] items-end bg-obsidian bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero.png')" }}
    >
      {/* Dark overlay keeps text readable over any photo */}
      <div className="absolute inset-0 bg-linear-to-t from-obsidian/90 via-obsidian/40 to-obsidian/30" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
        <p className="animate-fade-up text-xs tracking-[0.4em] text-gold motion-reduce:animate-none">
          NEW SEASON
        </p>

        <h1
          className="animate-fade-up mt-4 font-display text-7xl font-semibold tracking-[0.25em] text-ivory motion-reduce:animate-none sm:text-8xl lg:text-9xl"
          style={{ animationDelay: '150ms' }}
        >
          OJÉN
        </h1>

        <p
          className="animate-fade-up mt-4 text-xs tracking-[0.4em] text-ivory/90 motion-reduce:animate-none md:text-sm"
          style={{ animationDelay: '300ms' }}
        >
          BEYOND THE ORDINARY.
        </p>

        <p
          className="animate-fade-up mt-6 max-w-md text-sm leading-relaxed text-ivory/70 motion-reduce:animate-none"
          style={{ animationDelay: '450ms' }}
        >
          Discover the Collection. Premium contemporary menswear rooted in
          African heritage and made for the modern man.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-wrap gap-4 motion-reduce:animate-none"
          style={{ animationDelay: '600ms' }}
        >
          <Link
            to="/shop"
            className="bg-gold px-8 py-4 text-xs tracking-[0.3em] text-obsidian transition hover:bg-ivory"
          >
            SHOP NOW
          </Link>
          <Link
            to="/collections"
            className="border border-ivory/60 px-8 py-4 text-xs tracking-[0.3em] text-ivory transition hover:border-gold hover:text-gold"
          >
            EXPLORE COLLECTIONS
          </Link>
        </div>
      </div>
    </section>
  )
}