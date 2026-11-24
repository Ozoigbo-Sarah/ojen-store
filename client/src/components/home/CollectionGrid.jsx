import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { collections } from '../../data/collections'

export default function CollectionGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div className="mb-10 md:mb-14">
        <p className="text-xs tracking-[0.4em] text-obsidian/60">THE COLLECTIONS</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">Shop by Collection</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {collections.map((item, index) => {
          // The first card is wide on every screen; the last is wide on larger screens
          const wide =
            index === 0
              ? 'col-span-2'
              : index === collections.length - 1
                ? 'md:col-span-2'
                : ''

          return (
            <Link
              key={item.slug}
              to={`/collections/${item.slug}`}
              className={`group relative block h-72 overflow-hidden bg-obsidian md:h-96 ${wide}`}
            >
              <img
                src={item.image}
                alt={`OJÉN ${item.name} collection`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-obsidian/80 via-obsidian/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-ivory md:p-6">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl">{item.name}</h3>
                  <p className="mt-1 hidden max-w-xs text-xs text-ivory/70 sm:block">
                    {item.tagline}
                  </p>
                </div>
                <ArrowUpRight
                  size={22}
                  className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold"
                />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}