"use client"

import { LocaleContext } from "@/providers/locale-provider"
import { useParams } from "next/navigation"
import { useContext } from "react"

export function useLocale() {
  const locale = useContext(LocaleContext)
  const params = useParams()
  const lang = params.lang as string

  if (locale === null) {
    throw new Error("useLocale hook must be used within LocaleProvider")
  }

  return { locale, lang }
}
