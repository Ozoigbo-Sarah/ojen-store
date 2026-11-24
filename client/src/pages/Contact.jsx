import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Plus } from 'lucide-react'

// PLACEHOLDER details: replace with your real business information
const details = [
  { icon: Mail, label: 'Email', value: 'hello@your-domain.com' },
  { icon: Phone, label: 'Phone / WhatsApp', value: '+234 000 000 0000' },
  { icon: MapPin, label: 'Studio', value: 'Your studio address here' },
  { icon: Clock, label: 'Hours', value: 'Monday to Saturday, 9am to 6pm' },
]

// PLACEHOLDER social links: replace "#" with your real profiles
const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'X', href: '#' },
]

// PLACEHOLDER policies: replace with your real policies
const faqs = [
  {
    q: 'How long does delivery take?',
    a: 'Lagos orders arrive in 1 to 3 working days. Nationwide delivery takes 3 to 7 working days, and international orders take 7 to 14 working days.',
  },
  {
    q: 'Do you deliver internationally?',
    a: 'Yes. OJÉN ships worldwide. Delivery cost and time are shown at checkout.',
  },
  {
    q: 'How do I choose my size?',
    a: 'Every product page has a size guide. If you are between sizes or need advice, send us a message and we will help.',
  },
  {
    q: 'What is your returns policy?',
    a: 'You can return unworn items with their tags within 7 days of delivery.',
  },
  {
    q: 'Which payment methods do you accept?',
    a: 'Secure online payment through Paystack or Flutterwave, which will be available at launch.',
  },
  {
    q: 'How can I track my order?',
    a: 'Once your order is dispatched, you will receive tracking details by email, and you can also see your order status in your account.',
  },
]

const subjects = [
  'Order enquiry',
  'Sizing help',
  'Returns and exchanges',
  'Collaboration',
  'Something else',
]

const fieldStyle =
  'w-full border border-obsidian/20 bg-transparent px-4 py-4 text-sm focus:border-obsidian focus:outline-none'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: subjects[0], message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Please enter a valid email address.'
    if (form.message.trim().length < 10) newErrors.message = 'Please write at least 10 characters.'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    // PLACEHOLDER: the message is not sent anywhere yet.
    // We connect this to the backend in Phase 6.
    setSent(true)
    setForm({ name: '', email: '', subject: subjects[0], message: '' })
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <p className="text-xs tracking-[0.4em] text-obsidian/60">GET IN TOUCH</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">Contact Us</h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-obsidian/70">
          Questions about an order, sizing or a collaboration? We would love to hear from you.
        </p>

        <div className="mt-14 grid gap-14 lg:grid-cols-5">
          {/* Support details */}
          <div className="lg:col-span-2">
            <ul className="space-y-6">
              {details.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex gap-4">
                  <Icon size={20} className="mt-0.5 shrink-0 text-obsidian/60" />
                  <div>
                    <p className="text-xs tracking-[0.25em] text-obsidian/60">
                      {label.toUpperCase()}
                    </p>
                    <p className="mt-1 text-sm">{value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-obsidian/10 pt-6">
              <p className="text-xs tracking-[0.25em] text-obsidian/60">FOLLOW OJÉN</p>
              <ul className="mt-4 flex gap-6">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="text-xs tracking-[0.25em] transition hover:text-gold"
                    >
                      {s.label.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="bg-obsidian/5 p-8 text-center md:p-12">
                <h2 className="font-display text-3xl md:text-4xl">Thank you for reaching out.</h2>
                <p className="mt-4 text-sm text-obsidian/70">
                  Your message has been received.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 border border-obsidian px-8 py-3 text-xs tracking-[0.3em] transition hover:bg-obsidian hover:text-ivory"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-xs tracking-[0.2em]">NAME</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`${fieldStyle} mt-2`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-700">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="text-xs tracking-[0.2em]">EMAIL</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`${fieldStyle} mt-2`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="text-xs tracking-[0.2em]">SUBJECT</label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`${fieldStyle} mt-2`}
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="text-xs tracking-[0.2em]">MESSAGE</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    className={`${fieldStyle} mt-2 resize-none`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-700">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-obsidian py-4 text-xs tracking-[0.3em] text-ivory transition hover:bg-olive sm:w-auto sm:px-12"
                >
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-obsidian/10 scroll-mt-20">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <p className="text-xs tracking-[0.4em] text-obsidian/60">GOOD TO KNOW</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>

          <div className="mt-10 border-t border-obsidian/10">
            {faqs.map((item) => (
              <details key={item.q} className="group border-b border-obsidian/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-sm font-medium [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Plus
                    size={18}
                    className="shrink-0 transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <p className="pb-5 pr-8 text-sm leading-relaxed text-obsidian/70">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}