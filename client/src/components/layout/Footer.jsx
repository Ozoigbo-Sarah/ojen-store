import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'Shop All', to: '/shop' },
      { label: 'New Arrivals', to: '/new-arrivals' },
      { label: 'Collections', to: '/collections' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'FAQs', to: '/contact#faq' },
      { label: 'Delivery and Returns', to: '/contact#faq' },
    ],
  },
  {
    title: 'OJÉN',
    links: [
      { label: 'About', to: '/about' },
      { label: 'My Account', to: '/account' },
      { label: 'Wishlist', to: '/wishlist' },
    ],
  },
]

// PLACEHOLDER: replace "#" with your real social media links later
const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'X', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-obsidian text-ivory">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Logo className="text-3xl text-ivory" />
            <p className="mt-4 text-xs tracking-[0.35em] text-gold">
              BEYOND THE ORDINARY.
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/60">
              Premium contemporary menswear rooted in African heritage and made
              for the modern man.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-body text-xs font-semibold tracking-[0.3em] text-ivory">
                {column.title.toUpperCase()}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-ivory/60 transition hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex gap-6">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="text-xs tracking-[0.25em] text-ivory/60 transition hover:text-gold"
                >
                  {social.label.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 text-xs text-ivory/50 md:flex-row md:items-center md:gap-6">
            <Link to="/privacy" className="transition hover:text-gold">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition hover:text-gold">
              Terms of Service
            </Link>
            <p>© {new Date().getFullYear()} OJÉN. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}