import "server-only"

import { Locale } from "@/types/locale"

const dictionaries = {
  en: () => import("@/locale/en.json").then((module) => module.default),
  zh_TW: () => import("@/locale/zh_TW.json").then((module) => module.default),
  zh_CN: () => import("@/locale/zh_CN.json").then((module) => module.default),
  ur: () => import("@/locale/ur.json").then((module) => module.default),
}

export const getLocale = async (locale: Locale) => {
  return dictionaries[locale]()
}

export const isLocaleRTL = (locale: Locale) => {
  return locale === "ur"
}
