"use client"

import { useLocale } from "@/hooks/use-locale"
import { useSignIn } from "@clerk/nextjs"
import { getCleanedEmail, sleep } from "@workspace/backend/utils"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { PasswordInput } from "@workspace/ui/components/password-input"
import { toast } from "@workspace/ui/components/sonner"
import { cn } from "@workspace/ui/lib/utils"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import type { MouseEvent } from "react"
import { useState } from "react"

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [password, setPassword] = useState("")
  const { isLoaded, signIn, setActive } = useSignIn()
  const [emailAddress, setEmailAddress] = useState("")
  const { locale } = useLocale()

  // start the sign In process.
  async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (!isLoaded) {
      return
    }
    setIsLoading(true)
    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId })
        await sleep(100)
        window.location.href = "/"
      } else {
        /*Investigate why the sign-in hasn't completed */
        toast.error(locale.auth.signIn.form.error.unknown)
      }
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      toast.error(
        // @ts-expect-error key error
        err?.errors[0]?.longMessage || locale.auth.signIn.form.error.unknown,
      )
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label
              className="ml-2 text-xs font-light text-gray-500"
              htmlFor="email"
            >
              {locale.auth.signIn.form.email.label}
            </Label>
            <Input
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              id="email"
              onChange={(e) => {
                setEmailAddress(getCleanedEmail(e.target.value))
              }}
              placeholder={locale.auth.signIn.form.email.placeholder}
              type="email"
              value={emailAddress}
            />
          </div>
          <div className="grid gap-2">
            <Label
              className="ml-2 text-xs font-light text-gray-500"
              htmlFor="password"
            >
              {locale.auth.signIn.form.password.label}
            </Label>
            <PasswordInput
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              id="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              placeholder={locale.auth.signIn.form.password.placeholder}
              value={password}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  className="text-xs font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="terms"
                >
                  {locale.auth.signIn.form.rememberMe}
                </label>
              </div>
            </div>
            <div className="text-xs font-light">
              <Link href={"/forgot-password"}>
                {locale.auth.signIn.form.forgotPassword}
              </Link>
            </div>
          </div>
          <Button
            className="my-8"
            disabled={isLoading || !emailAddress || !password}
            onClick={(e) => {
              void handleSubmit(e)
            }}
            variant="secondary"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {locale.auth.signIn.form.signIn}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background text-muted-foreground px-2">
                {locale.auth.signIn.form.or}
              </span>
            </div>
          </div>
          <div className="text-very-muted text-center text-xs">
            {locale.auth.signIn.form.noAccount}{" "}
            <Link className="text-primary font-semibold" href={"/sign-up"}>
              {locale.auth.signIn.form.signUp}
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
