export type Locale = "ru" | "en"
export type Currency = "byn" | "rub" | "usd"

export const locales: Locale[] = ["ru", "en"]
export const currencies: Currency[] = ["byn", "rub", "usd"]

export const defaultLocale: Locale = "ru"
export const defaultCurrency: Currency = "byn"

export const currencySymbols: Record<Currency, string> = {
  byn: "Br",
  rub: "₽",
  usd: "$",
}

export const currencyRates: Record<Currency, number> = {
  byn: 1,
  rub: 35, // 1 BYN = ~35 RUB
  usd: 0.31, // 1 BYN = ~0.31 USD
}

export function convertCurrency(amount: number, from: Currency, to: Currency): number {
  if (from === to) return amount
  const inBYN = amount / currencyRates[from]
  return inBYN * currencyRates[to]
}

export function formatCurrency(amount: number, currency: Currency): string {
  return `${Math.round(amount).toLocaleString()} ${currencySymbols[currency]}`
}
