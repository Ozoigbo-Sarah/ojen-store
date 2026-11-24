import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search as SearchIcon } from 'lucide-react'
import ProductCard from '../components/ui/ProductCard'
import { products } from '../data/products'

const popular = ['Agbada', 'Adire', 'Hoodie', 'Blazer', 'Polo', 'Bag']

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
    if (terms.length === 0) return []
    return products.filter((product) => {
      const text = `${product.name} ${product.collection} ${product.description}`.toLowerCase()
      return terms.every((term) => text.includes(term))
    })
  }, [query])

  const handleChange = (e) => {
    const value = e.target.value
    setSearchParams(value ? { q: value } : {}, { replace: true })
  }

  const hasQuery = query.trim().length > 0

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <h1 className="font-display text-5xl md:text-6xl">Search</h1>

      <div className="relative mt-8 max-w-2xl">
        <label htmlFor="search-input" className="sr-only">
          Search products
        </label>
        <SearchIcon
          size={20}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-obsidian/50"
        />
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={handleChange}
          autoFocus
          placeholder="Search for agbada, hoodie, blazer..."
          className="w-full border border-obsidian/20 bg-transparent py-4 pl-12 pr-4 text-sm focus:border-obsidian focus:outline-none"
        />
      </div>

      {!hasQuery && (
        <div className="mt-8">
          <p className="text-xs tracking-[0.3em] text-obsidian/60">POPULAR SEARCHES</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {popular.map((term) => (
              <Link
                key={term}
                to={`/search?q=${term.toLowerCase()}`}
                className="border border-obsidian/20 px-5 py-2.5 text-xs tracking-[0.2em] transition hover:border-obsidian"
              >
                {term.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      )}

      {hasQuery && results.length > 0 && (
        <>
          <p className="mt-10 text-xs tracking-[0.2em] text-obsidian/60">
            {results.length} {results.length === 1 ? 'RESULT' : 'RESULTS'} FOR "{query.toUpperCase()}"
          </p>
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-5 lg:grid-cols-4">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}

      {hasQuery && results.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-display text-3xl">No results for "{query}".</p>
          <p className="mt-3 text-sm text-obsidian/70">
            Try a different word, or browse the full collection.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block border border-obsidian px-8 py-3 text-xs tracking-[0.3em] transition hover:bg-obsidian hover:text-ivory"
          >
            SHOP ALL
          </Link>
        </div>
      )}
    </section>
  )
}