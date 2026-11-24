// PLACEHOLDER values: replace with your real delivery pricing later
export const FREE_DELIVERY_THRESHOLD = 150000
export const DELIVERY_FEE = 3500

export function getDeliveryFee(subtotal) {
  if (subtotal === 0) return 0
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
}