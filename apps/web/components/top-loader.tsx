"use client"

import { useTheme } from "next-themes"
import type { NextTopLoaderProps } from "nextjs-toploader"
import NextTopLoader from "nextjs-toploader"

export function TopLoader(props: NextTopLoaderProps) {
  const { theme } = useTheme()
  const defaultProps: NextTopLoaderProps = {
    color: theme === "dark" ? "#ffffff" : "#000000",
  }

  const allProps = { ...defaultProps, ...props }

  return <NextTopLoader {...allProps} />
}
