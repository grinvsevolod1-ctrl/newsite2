"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Locale, type Currency, defaultLocale, defaultCurrency } from "@/lib/i18n"

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  currency: Currency
  setCurrency: (currency: Currency) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [currency, setCurrencyState] = useState<Currency>(defaultCurrency)

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale
    const savedCurrency = localStorage.getItem("currency") as Currency
    if (savedLocale) setLocaleState(savedLocale)
    if (savedCurrency) setCurrencyState(savedCurrency)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
  }

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    localStorage.setItem("currency", newCurrency)
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, currency, setCurrency }}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}
