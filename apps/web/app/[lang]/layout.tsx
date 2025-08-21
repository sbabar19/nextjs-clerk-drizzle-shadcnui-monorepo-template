import { Geist, Geist_Mono } from "next/font/google"

import { getLocale, isLocaleRTL } from "@/locale/helpers"
import LocaleProvider from "@/providers/locale-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { Locale } from "@/types/locale"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@workspace/ui/components/sonner"
import "@workspace/ui/globals.css"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}>) {
  const { lang } = await params
  const locale = await getLocale(lang)
  return (
    <ClerkProvider>
      <html
        dir={isLocaleRTL(lang) ? "rtl" : "ltr"}
        lang={lang}
        suppressHydrationWarning
      >
        <body
          className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
        >
          <LocaleProvider locale={locale}>
            <ThemeProvider>{children}</ThemeProvider>
            <Toaster />
          </LocaleProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
