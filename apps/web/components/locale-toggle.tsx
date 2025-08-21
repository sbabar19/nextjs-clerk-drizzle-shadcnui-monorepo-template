"use client"

import { useLocale } from "@/hooks/use-locale"
import { Locale } from "@/types/locale"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Languages } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useCallback } from "react"

export function LocaleToggle() {
  const { lang } = useParams<{ lang: Locale }>()
  const { locale } = useLocale()
  const router = useRouter()

  const onLocaleChange = useCallback(
    (newLang: Locale) => {
      const newPath = window.location.pathname.replace(
        `/${lang}`,
        `/${newLang}`,
      )

      router.push(newPath)
    },
    [lang, router],
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="cursor-pointer hover:bg-transparent hover:text-gray-300 focus:bg-transparent active:bg-transparent"
          variant="ghost"
          size="icon"
        >
          <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">{locale.locale.title}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onLocaleChange("en")}>
          {locale.locale.options.en}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onLocaleChange("zh_TW")}>
          {locale.locale.options.zh_TW}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onLocaleChange("zh_CN")}>
          {locale.locale.options.zh_CN}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onLocaleChange("ur")}>
          {locale.locale.options.ur}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
