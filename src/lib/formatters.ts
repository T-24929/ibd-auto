/**
 * Sri Lankan Automotive formatting utilities
 */

/**
 * Normalizes vehicle price.
 * Some records may be entered in thousands (e.g. 38500 meaning 38,500,000 LKR).
 */
export function normalizeLKRPrice(amount: number): number {
  if (!amount || isNaN(amount)) return 0
  // If price is stored in thousands (between 1,000 and 999,999 LKR):
  if (amount > 1000 && amount < 1000000) {
    return amount * 1000
  }
  return amount
}

export function formatLKR(amount: number): string {
  const normalized = normalizeLKRPrice(amount)
  if (normalized === 0) return 'Price on Request'
  const formatted = new Intl.NumberFormat('en-LK', {
    maximumFractionDigits: 0,
  }).format(normalized)
  return `Rs. ${formatted}`
}

export function formatKM(distance: number): string {
  if (!distance && distance !== 0) return '0 km'
  const formatted = new Intl.NumberFormat('en-LK').format(distance)
  return `${formatted} km`
}

export function formatLKRInLakhs(amount: number): string {
  const normalized = normalizeLKRPrice(amount)
  if (normalized === 0) return 'Price on Request'

  const lakhs = normalized / 100000
  if (lakhs >= 100) {
    const millions = normalized / 1000000
    return `${millions.toFixed(1)} Million`
  }
  return `${lakhs.toFixed(1)} Lakhs`
}

export function getWhatsAppUrl(phone: string, message: string): string {
  let clean = phone.replace(/[^0-9]/g, '')
  if (clean.startsWith('0')) {
    clean = '94' + clean.slice(1)
  } else if (!clean.startsWith('94')) {
    clean = '94' + clean
  }
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`
}
