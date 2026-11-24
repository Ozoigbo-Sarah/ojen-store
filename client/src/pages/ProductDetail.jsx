import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, Minus, Plus, Truck, RotateCcw, ShieldCheck } from 'lucide-react'
import ProductCard from '../components/ui/ProductCard'
import { products } from '../data/products'
import { collections } from '../data/collections'
import { formatPrice } from '../utils/formatPrice'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'

// PLACEHOLDER measurements: replace with your real size chart
const sizeGuide = [
  { size: 'S', chest: '36 to 38', waist: '30 to 32' },
  { size: 'M', chest: '38 to 40', waist: '32 to 34' },
  { size: 'L', chest: '40 to 42', waist: '34 to 36' },
  { size: 'XL', chest: '42 to 44', waist: '36 to 38' },
  { size: 'XXL', chest: '44 to 46', waist: '38 to 40' },
]

function ProductView({ product }) {
  const { addItem } = useCart()
  const { isWished, toggleWishlist } = useWishlist()
  const wished = isWished(product.id)
  const [added, setAdded] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : '')
  const [colour, setColour] = useState(product.colours[0])
  const [quantity, setQuantity] = useState(1)
  const [showGuide, setShowGuide] = useState(false)
  const [message, setMessage] = useState('')

  const collection = collections.find((c) => c.slug === product.collection)

  const related = [
    ...products.filter((p) => p.collection === product.collection && p.id !== product.id),
    ...products.filter((p) => p.collection !== product.collection && p.id !== product.id),
  ].slice(0, 4)

  const handleAddToCart = () => {
    if (!size) {
      setMessage('Please select a size.')
      setAdded(false)
      return
    }
    addItem(product, { size, colour: colour.name, quantity })
    setMessage('Added to your cart.')
    setAdded(true)
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs tracking-[0.15em] text-obsidian/60">
          <Link to="/shop" className="hover:text-obsidian">SHOP</Link>
          <span className="mx-2">/</span>
          <Link to={`/shop?collection=${product.collection}`} className="hover:text-obsidian">
            {collection?.name.toUpperCase()}
          </Link>
        </nav>

        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="aspect-4/5 overflow-hidden bg-obsidian/5">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View photo ${i + 1}`}
                    className={`aspect-4/5 w-20 overflow-hidden border-2 ${
                      i === activeImage ? 'border-obsidian' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="md:sticky md:top-24 md:self-start">
            <p className="text-[10px] uppercase tracking-[0.3em] text-obsidian/50">
              OJÉN {product.collection}
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-xl">{formatPrice(product.price)}</p>
            <p className="mt-6 text-sm leading-relaxed text-obsidian/70">
              {product.description}
            </p>

            {/* Colour */}
            <div className="mt-8">
              <p className="text-xs tracking-[0.2em]">
                COLOUR: <span className="text-obsidian/60">{colour.name.toUpperCase()}</span>
              </p>
              <div className="mt-3 flex gap-3">
                {product.colours.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColour(c)}
                    aria-label={c.name}
                    className={`h-10 w-10 rounded-full border-2 p-0.5 ${
                      c.name === colour.name ? 'border-obsidian' : 'border-transparent'
                    }`}
                  >
                    <span
                      className="block h-full w-full rounded-full border border-obsidian/20"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="text-xs tracking-[0.2em]">SIZE</p>
                {product.sizes.length > 1 && (
                  <button
                    onClick={() => setShowGuide(!showGuide)}
                    className="text-xs tracking-[0.15em] underline"
                  >
                    {showGuide ? 'HIDE SIZE GUIDE' : 'SIZE GUIDE'}
                  </button>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSize(s)
                      setMessage('')
                    }}
                    className={`min-w-12 border px-4 py-3 text-xs tracking-[0.1em] transition ${
                      size === s
                        ? 'border-obsidian bg-obsidian text-ivory'
                        : 'border-obsidian/20 hover:border-obsidian'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {showGuide && (
                <table className="mt-4 w-full border border-obsidian/10 text-left text-xs">
                  <thead className="bg-obsidian/5">
                    <tr>
                      <th className="p-3 font-semibold">Size</th>
                      <th className="p-3 font-semibold">Chest (in)</th>
                      <th className="p-3 font-semibold">Waist (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeGuide.map((row) => (
                      <tr key={row.size} className="border-t border-obsidian/10">
                        <td className="p-3">{row.size}</td>
                        <td className="p-3">{row.chest}</td>
                        <td className="p-3">{row.waist}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <p className="text-xs tracking-[0.2em]">QUANTITY</p>
              <div className="mt-3 inline-flex items-center border border-obsidian/20">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="p-4 hover:text-gold"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  aria-label="Increase quantity"
                  className="p-4 hover:text-gold"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-obsidian py-4 text-xs tracking-[0.3em] text-ivory transition hover:bg-olive"
              >
                ADD TO CART
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={wished}
                className="border border-obsidian/20 px-5 transition hover:border-obsidian"
              >
                <Heart size={20} fill={wished ? 'currentColor' : 'none'} />
              </button>
            </div>
            <p role="status" className="mt-3 min-h-5 text-xs text-obsidian/70">
              {message}{' '}
              {added && message && (
                <Link to="/cart" className="underline">
                  View cart
                </Link>
              )}
            </p>

            {/* Delivery info (PLACEHOLDER policy text) */}
            <ul className="mt-6 space-y-4 border-t border-obsidian/10 pt-6 text-xs leading-relaxed text-obsidian/70">
              <li className="flex gap-3">
                <Truck size={18} className="shrink-0" />
                Lagos: 1 to 3 working days. Nationwide: 3 to 7 working days. International: 7 to 14 working days.
              </li>
              <li className="flex gap-3">
                <RotateCcw size={18} className="shrink-0" />
                Easy returns within 7 days of delivery on unworn items with tags.
              </li>
              <li className="flex gap-3">
                <ShieldCheck size={18} className="shrink-0" />
                Secure checkout and quality-checked before dispatch.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related products */}
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
        <h2 className="mb-10 font-display text-3xl md:text-4xl">You May Also Like</h2>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-5 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  )
}

export default function ProductDetail() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl">Product not found</h1>
        <Link to="/shop" className="mt-6 text-xs tracking-[0.3em] underline">
          BACK TO SHOP
        </Link>
      </section>
    )
  }

  // "key" makes React reset the page choices when you open a different product
  return <ProductView key={product.slug} product={product} />
}