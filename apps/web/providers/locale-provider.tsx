// dictionary-provider.tsx
"use client"

import { getLocale } from "@/locale/helpers"
import { createContext } from "react"

export type LocaleJSON = Awaited<ReturnType<typeof getLocale>>

export const LocaleContext = createContext<LocaleJSON | null>(null)

export default function LocaleProvider({
  locale,
  children,
}: {
  locale: LocaleJSON
  children: React.ReactNode
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  )
}
