import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard'
import { products } from '../data/products'
import { collections } from '../data/collections'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' },
]

export default function CollectionPage() {
  const { slug } = useParams()
  const [sort, setSort] = useState('featured')

  const collection = collections.find((c) => c.slug === slug)

  const items = useMemo(() => {
    const list = products.filter((p) => p.collection === slug)
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [slug, sort])

  if (!collection) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl">Collection not found</h1>
        <Link to="/collections" className="mt-6 text-xs tracking-[0.3em] underline">
          VIEW ALL COLLECTIONS
        </Link>
      </section>
    )
  }

  const otherCollections = collections.filter((c) => c.slug !== slug)

  return (
    <>
      {/* Banner */}
      <section
        className="relative flex min-h-[360px] items-end bg-obsidian bg-cover bg-center md:min-h-[480px]"
        style={{ backgroundImage: `url('${collection.image}')` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-obsidian/90 via-obsidian/40 to-obsidian/30" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-10 md:px-8 md:pb-14">
          <p className="animate-fade-up text-xs tracking-[0.4em] text-gold motion-reduce:animate-none">
            THE COLLECTION
          </p>
          <h1
            className="animate-fade-up mt-3 font-display text-6xl font-semibold tracking-[0.15em] text-ivory motion-reduce:animate-none md:text-8xl"
            style={{ animationDelay: '150ms' }}
          >
            {collection.name.toUpperCase()}
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-xl text-sm leading-relaxed text-ivory/80 motion-reduce:animate-none"
            style={{ animationDelay: '300ms' }}
          >
            {collection.description}
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="mb-10 flex items-center justify-between gap-4 border-b border-obsidian/10 pb-4">
          <p className="text-xs tracking-[0.2em] text-obsidian/60">
            {items.length} {items.length === 1 ? 'PIECE' : 'PIECES'}
          </p>
          <div>
            <label className="sr-only" htmlFor="collection-sort">Sort products</label>
            <select
              id="collection-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-obsidian/20 bg-transparent px-4 py-3 text-xs tracking-[0.1em] focus:border-obsidian focus:outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-5 lg:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center font-display text-3xl">
            New pieces arriving soon.
          </p>
        )}
      </section>

      {/* Other collections */}
      <section className="border-t border-obsidian/10">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
          <p className="text-xs tracking-[0.4em] text-obsidian/60">EXPLORE MORE</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {otherCollections.map((c) => (
              <Link
                key={c.slug}
                to={`/collections/${c.slug}`}
                className="border border-obsidian/20 px-5 py-2.5 text-xs tracking-[0.2em] transition hover:border-obsidian"
              >
                {c.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}