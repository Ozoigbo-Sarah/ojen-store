import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-6xl">404</h1>
      <p className="mt-4 text-sm text-obsidian/70">This page does not exist.</p>
      <Link to="/" className="mt-8 text-xs tracking-[0.3em] underline">
        BACK HOME
      </Link>
    </section>
  )
}