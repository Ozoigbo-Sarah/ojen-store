import { Link } from 'react-router-dom'

const pillars = [
  {
    title: 'Heritage',
    text: 'Rooted in African culture and craftsmanship, expressed in a modern way.',
  },
  {
    title: 'Craft',
    text: 'Premium fabrics and careful detail in every stitch and finish.',
  },
  {
    title: 'Individuality',
    text: 'Clothing for men who stand out without trying too hard.',
  },
]

export default function BrandPhilosophy() {
  return (
    <section className="bg-obsidian text-ivory">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs tracking-[0.4em] text-gold">THE OJÉN PHILOSOPHY</p>
          <h2 className="mt-4 font-display text-5xl md:text-7xl">
            Beyond the Ordinary.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-ivory/70 md:text-base">
            OJÉN is built on a simple belief: a man should dress with
            confidence, individuality and intention. We draw from African
            heritage, contemporary streetwear and international minimalism to
            create clothing that carries you from the boardroom to the street
            without losing who you are.
          </p>
        </div>

        <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 md:mt-20 md:grid-cols-3 md:gap-12">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="text-center md:text-left">
              <h3 className="font-display text-2xl text-gold">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/60">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/about"
            className="inline-block border border-gold px-8 py-4 text-xs tracking-[0.3em] text-gold transition hover:bg-gold hover:text-obsidian"
          >
            OUR STORY
          </Link>
        </div>
      </div>
    </section>
  )
}