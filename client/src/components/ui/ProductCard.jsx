import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { formatPrice } from '../../utils/formatPrice'
import { useWishlist } from '../../hooks/useWishlist'

export default function ProductCard({ product }) {
  const { isWished, toggleWishlist } = useWishlist()
  const wished = isWished(product.id)

  return (
    <div className="group relative">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-4/5 overflow-hidden bg-obsidian/5">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.isNew && (
            <span className="absolute left-3 top-3 bg-obsidian px-3 py-1 text-[10px] tracking-[0.25em] text-ivory">
              NEW
            </span>
          )}
        </div>

        <div className="mt-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-obsidian/50">
            OJÉN {product.collection}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold leading-tight">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-obsidian/70">{formatPrice(product.price)}</p>
        </div>
      </Link>

      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-pressed={wished}
        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 text-obsidian transition hover:bg-ivory"
      >
        <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
      </button>
    </div>
  )
}