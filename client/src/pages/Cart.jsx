import { Link } from 'react-router-dom'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatPrice'
import { getDeliveryFee, FREE_DELIVERY_THRESHOLD } from '../utils/shipping'

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal } = useCart()
  const delivery = getDeliveryFee(subtotal)
  const total = subtotal + delivery

  if (items.length === 0) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl md:text-5xl">Your cart is empty</h1>
        <p className="mt-4 text-sm text-obsidian/70">
          Discover something beyond the ordinary.
        </p>
        <Link
          to="/shop"
          className="mt-8 bg-obsidian px-8 py-4 text-xs tracking-[0.3em] text-ivory transition hover:bg-olive"
        >
          CONTINUE SHOPPING
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <h1 className="font-display text-5xl md:text-6xl">Your Cart</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-3">
        {/* Items */}
        <ul className="lg:col-span-2">
          {items.map((item) => (
            <li key={item.key} className="flex gap-4 border-b border-obsidian/10 py-6 first:pt-0">
              <Link to={`/product/${item.slug}`} className="w-24 shrink-0 md:w-32">
                <img
                  src={item.image}
                  alt={item.name}
                  className="aspect-4/5 w-full object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link
                      to={`/product/${item.slug}`}
                      className="font-display text-xl font-semibold leading-tight"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs text-obsidian/60">
                      Size: {item.size} | Colour: {item.colour}
                    </p>
                    <p className="mt-1 text-sm text-obsidian/70">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.key)}
                    aria-label={`Remove ${item.name}`}
                    className="h-fit p-1 text-obsidian/60 transition hover:text-obsidian"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="inline-flex items-center border border-obsidian/20">
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="p-3 hover:text-gold"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      aria-label="Increase quantity"
                      className="p-3 hover:text-gold"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="text-sm font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="h-fit bg-obsidian/5 p-6 md:p-8 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl">Order Summary</h2>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-obsidian/70">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-obsidian/70">Delivery (estimate)</dt>
              <dd>{delivery === 0 ? 'Free' : formatPrice(delivery)}</dd>
            </div>
            <div className="flex justify-between border-t border-obsidian/10 pt-4 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>

          {delivery > 0 && (
            <p className="mt-4 text-xs text-obsidian/60">
              Free delivery on orders over {formatPrice(FREE_DELIVERY_THRESHOLD)}.
            </p>
          )}

          <Link
            to="/checkout"
            className="mt-6 block bg-obsidian py-4 text-center text-xs tracking-[0.3em] text-ivory transition hover:bg-olive"
          >
            PROCEED TO CHECKOUT
          </Link>
          <Link
            to="/shop"
            className="mt-3 block py-3 text-center text-xs tracking-[0.3em] underline"
          >
            CONTINUE SHOPPING
          </Link>
        </aside>
      </div>
    </section>
  )
}