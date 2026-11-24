import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | success | error

  const handleSubmit = (e) => {
    e.preventDefault()
    const valid = /^\S+@\S+\.\S+$/.test(email)
    if (!valid) {
      setStatus('error')
      return
    }
    // PLACEHOLDER: the email is not saved anywhere yet.
    // We connect this to the database in Phase 6 (Backend).
    setStatus('success')
    setEmail('')
  }

  return (
    <section className="bg-olive text-ivory">
      <div className="mx-auto max-w-3xl px-5 py-16 text-center md:px-8 md:py-24">
        <p className="text-xs tracking-[0.4em] text-gold">THE OJÉN LIST</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">
          Stay Beyond the Ordinary
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ivory/70">
          Be the first to hear about new collections, private releases and
          style stories.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setStatus('idle')
            }}
            placeholder="Your email address"
            className="flex-1 border border-ivory/30 bg-transparent px-5 py-4 text-sm text-ivory placeholder:text-ivory/50 focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gold px-8 py-4 text-xs tracking-[0.3em] text-obsidian transition hover:bg-ivory"
          >
            SUBSCRIBE
          </button>
        </form>

        <p role="status" className="mt-4 h-5 text-xs text-ivory/80">
          {status === 'success' && 'Thank you. You are on the list.'}
          {status === 'error' && 'Please enter a valid email address.'}
        </p>
      </div>
    </section>
  )
}