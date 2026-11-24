import { Link } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard'
import { products } from '../data/products'
import { useWishlist } from '../hooks/useWishlist'

export default function Wishlist() {
  const { ids } = useWishlist()
  const saved = products.filter((product) => ids.includes(product.id))

  if (saved.length === 0) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl md:text-5xl">Your wishlist is empty</h1>
        <p className="mt-4 max-w-sm text-sm text-obsidian/70">
          Tap the heart on any piece you love and it will wait for you here.
        </p>
        <Link
          to="/shop"
          className="mt-8 bg-obsidian px-8 py-4 text-xs tracking-[0.3em] text-ivory transition hover:bg-olive"
        >
          START SHOPPING
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <p className="text-xs tracking-[0.4em] text-obsidian/60">
        {saved.length} {saved.length === 1 ? 'PIECE' : 'PIECES'} SAVED
      </p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">Your Wishlist</h1>

      <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-5 lg:grid-cols-4">
        {saved.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}