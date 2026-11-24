import { Link } from 'react-router-dom'

export default function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label="OJÉN home"
      className={`font-display text-2xl font-semibold tracking-[0.35em] ${className}`}
    >
      OJÉN
    </Link>
  )
}