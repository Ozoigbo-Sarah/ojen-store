import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard'
import { products } from '../data/products'
import { collections } from '../data/collections'

const priceRanges = [
  { value: 'all', label: 'All prices', test: () => true },
  { value: 'under-50', label: 'Under ₦50,000', test: (p) => p < 50000 },
  { value: '50-100', label: '₦50,000 to ₦100,000', test: (p) => p >= 50000 && p <= 100000 },
  { value: 'over-100', label: 'Over ₦100,000', test: (p) => p > 100000 },
]

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' },
]

const selectStyle =
  'border border-obsidian/20 bg-transparent px-4 py-3 text-xs tracking-[0.1em] focus:border-obsidian focus:outline-none'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCollection = searchParams.get('collection') || 'all'
  const [price, setPrice] = useState('all')
  const [sort, setSort] = useState('featured')

  const setCollection = (slug) => {
    if (slug === 'all') setSearchParams({})
    else setSearchParams({ collection: slug })
  }

  const resetFilters = () => {
    setSearchParams({})
    setPrice('all')
    setSort('featured')
  }

  const visible = useMemo(() => {
    const range = priceRanges.find((r) => r.value === price)
    const list = products.filter(
      (p) =>
        (activeCollection === 'all' || p.collection === activeCollection) &&
        range.test(p.price),
    )
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [activeCollection, price, sort])

  const chipStyle = (active) =>
    `shrink-0 px-5 py-2.5 text-xs tracking-[0.2em] transition ${
      active
        ? 'bg-obsidian text-ivory'
        : 'border border-obsidian/20 hover:border-obsidian'
    }`

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <div className="mb-10">
        <p className="text-xs tracking-[0.4em] text-obsidian/60">ALL PRODUCTS</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">Shop All</h1>
      </div>

      {/* Collection chips (scroll sideways on phones) */}
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
        <button
          onClick={() => setCollection('all')}
          className={chipStyle(activeCollection === 'all')}
        >
          ALL
        </button>
        {collections.map((c) => (
          <button
            key={c.slug}
            onClick={() => setCollection(c.slug)}
            className={chipStyle(activeCollection === c.slug)}
          >
            {c.name.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Price, sort and count */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-obsidian/10 py-4">
        <p className="text-xs tracking-[0.2em] text-obsidian/60">
          {visible.length} {visible.length === 1 ? 'PIECE' : 'PIECES'}
        </p>
        <div className="flex flex-wrap gap-3">
          <label className="sr-only" htmlFor="price-filter">Filter by price</label>
          <select
            id="price-filter"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={selectStyle}
          >
            {priceRanges.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>

          <label className="sr-only" htmlFor="sort-by">Sort products</label>
          <select
            id="sort-by"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={selectStyle}
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Product grid */}
      {visible.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-5 lg:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="font-display text-3xl">No pieces match your filters.</p>
          <button
            onClick={resetFilters}
            className="mt-6 border border-obsidian px-8 py-3 text-xs tracking-[0.3em] transition hover:bg-obsidian hover:text-ivory"
          >
            CLEAR FILTERS
          </button>
        </div>
      )}
    </section>
  )
}