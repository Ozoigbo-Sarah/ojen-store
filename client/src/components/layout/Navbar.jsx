import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Search, Heart, ShoppingBag, User } from 'lucide-react'
import Logo from '../ui/Logo'
import { useCart } from '../../hooks/useCart'

const links = [
  { label: 'Shop', to: '/shop' },
  { label: 'New Arrivals', to: '/new-arrivals' },
  { label: 'Collections', to: '/collections' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const iconStyle = 'p-2 transition hover:text-gold'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()

  const linkStyle = ({ isActive }) =>
    `text-xs uppercase tracking-[0.25em] transition hover:text-gold ${
      isActive ? 'text-gold' : ''
    }`

  return (
    <header className="sticky top-0 z-50 bg-obsidian text-ivory">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Hamburger (phones and tablets only) */}
        <button
          className="-ml-2 p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Logo className="text-ivory" />

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={linkStyle}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="-mr-2 flex items-center">
          <Link to="/search" className={iconStyle} aria-label="Search">
            <Search size={20} />
          </Link>
          <Link to="/wishlist" className={`${iconStyle} hidden md:inline-flex`} aria-label="Wishlist">
            <Heart size={20} />
          </Link>
          <Link to="/account" className={`${iconStyle} hidden md:inline-flex`} aria-label="Account">
            <User size={20} />
          </Link>
          <Link
            to="/cart"
            className={`${iconStyle} relative`}
            aria-label={`Cart, ${itemCount} items`}
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-obsidian">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobile menu (slides open) */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col border-t border-white/10 px-5 pb-6 pt-2">
            {[...links,
              { label: 'Wishlist', to: '/wishlist' },
              { label: 'Account', to: '/account' },
            ].map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-4 text-sm uppercase tracking-[0.25em] ${
                      isActive ? 'text-gold' : ''
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}