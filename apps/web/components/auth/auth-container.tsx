"use client"

import { LocaleToggle } from "@/components/locale-toggle"
import { ThemeToggle } from "@/components/theme-toggle"
import { LucideProps, Wallet } from "lucide-react"
import type { ReactNode } from "react"

interface AuthContainerProps {
  title: string
  description?: string
  children: ReactNode
}

function AuthTitleLogo(props: LucideProps) {
  return <Wallet className="invert-100 h-28 w-28" {...props} />
}

export function AuthContainer(props: AuthContainerProps) {
  const { title, children, description } = props

  return (
    <div className="container relative grid h-screen flex-col items-center md:justify-center lg:max-w-none lg:grid-cols-[576px_1fr] lg:px-0">
      <div className="bg-primary relative hidden h-full w-[576px] flex-col justify-center p-10 lg:flex dark:border-r">
        <div className="relative z-20 flex items-center self-center text-lg font-medium">
          <AuthTitleLogo />
        </div>
      </div>
      <div className="relative grid h-full items-center">
        <div className="absolute right-4 top-4 flex gap-4">
          <LocaleToggle />
          <ThemeToggle />
        </div>
        <div className="p-4 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            </div>
            {children}
          </div>
          {description ? (
            <div className="bottom-0 lg:absolute lg:w-[calc(100%-4rem)]">
              <div className="mx-auto sm:w-[350px]">
                <div className="text-very-muted py-4 text-center text-xs sm:w-[350px] sm:text-center">
                  {description}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
