import Hero from '../components/home/Hero'
import CollectionGrid from '../components/home/CollectionGrid'
import ProductSection from '../components/home/ProductSection'
import BrandPhilosophy from '../components/home/BrandPhilosophy'
import Newsletter from '../components/home/Newsletter'
import { products } from '../data/products'

const newArrivals = products.filter((p) => p.isNew).slice(0, 4)
const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4)

export default function Home() {
  return (
    <>
      <Hero />
      <ProductSection
        eyebrow="JUST LANDED"
        title="New Arrivals"
        products={newArrivals}
        linkTo="/new-arrivals"
      />
      <CollectionGrid />
      <ProductSection
        eyebrow="CUSTOMER FAVOURITES"
        title="Best Sellers"
        products={bestSellers}
        linkTo="/shop"
      />
      <BrandPhilosophy />
      <Newsletter />
    </>
  )
}