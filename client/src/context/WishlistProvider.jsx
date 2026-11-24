import { useEffect, useState } from 'react'
import { WishlistContext } from './wishlistContext'

const STORAGE_KEY = 'ojen-wishlist'

function loadWishlist() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(loadWishlist)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // storage unavailable: the wishlist still works for this visit
    }
  }, [ids])

  const toggleWishlist = (productId) => {
    setIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    )
  }

  const isWished = (productId) => ids.includes(productId)

  const value = { ids, toggleWishlist, isWished, count: ids.length }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}