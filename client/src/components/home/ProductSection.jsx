import { Link } from 'react-router-dom'
import ProductCard from '../ui/ProductCard'

export default function ProductSection({
  eyebrow,
  title,
  products,
  linkTo,
  linkLabel = 'View all',
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div className="mb-10 flex items-end justify-between gap-4 md:mb-14">
        <div>
          <p className="text-xs tracking-[0.4em] text-obsidian/60">{eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">{title}</h2>
        </div>
        <Link
          to={linkTo}
          className="shrink-0 border-b border-obsidian pb-1 text-xs tracking-[0.25em] transition hover:border-gold hover:text-obsidian/60"
        >
          {linkLabel.toUpperCase()}
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-5 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}