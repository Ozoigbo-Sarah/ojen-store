import ProductCard from '../components/ui/ProductCard'
import { products } from '../data/products'

export default function NewArrivals() {
  const items = products.filter((product) => product.isNew)

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <div className="mb-10">
        <p className="text-xs tracking-[0.4em] text-obsidian/60">JUST LANDED</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">New Arrivals</h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-obsidian/70">
          The latest pieces from OJÉN, fresh from the studio.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-5 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}