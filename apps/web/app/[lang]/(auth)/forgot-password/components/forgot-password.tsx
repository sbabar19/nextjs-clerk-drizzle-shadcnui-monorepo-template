"use client"

import { VerifyOTP } from "@/app/[lang]/(auth)/sign-up/components/user-verification"
import { useLocale } from "@/hooks/use-locale"
import { useSignIn } from "@clerk/nextjs"
import { getCleanedEmail } from "@workspace/backend/utils"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { PasswordInput } from "@workspace/ui/components/password-input"
import { Loader2 } from "lucide-react"
import React, { useState } from "react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { isLoaded, signIn, setActive } = useSignIn()
  const { locale } = useLocale()

  if (!isLoaded) {
    return null
  }

  // Send the password reset code to the user's email
  async function create(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then(() => {
        setSuccessfulCreation(true)
        setError("")
      })
      .catch((err) => {
        setError(err.errors[0].longMessage)
      })
    setLoading(false)
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === "needs_second_factor") {
          setError("Contact Support to reset your password")
        } else if (result.status === "complete") {
          // Set the active session to
          // the newly created session (user is now signed in)
          void setActive({ session: result.createdSessionId })
          setError("")
          window.location.href = "/"
        }
      })
      .catch((err) => {
        setError(err.errors[0].longMessage)
      })
    setLoading(false)
  }

  return (
    <form
      onSubmit={(e) => {
        return !successfulCreation ? void create(e) : void reset(e)
      }}
    >
      <div className="grid gap-4">
        {!successfulCreation && (
          <>
            <div className="grid gap-1">
              <Label
                className="ml-2 text-xs font-light text-gray-500"
                htmlFor="email"
              >
                {locale.auth.forgotPassword.form.email.label}
              </Label>
              <Input
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                id="email"
                onChange={(e) => {
                  setEmail(getCleanedEmail(e.target.value))
                }}
                placeholder={locale.auth.forgotPassword.form.email.placeholder}
                type="email"
                value={email}
              />
            </div>

            <Button
              disabled={loading || !email}
              type="submit"
              variant="secondary"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {locale.auth.forgotPassword.form.sendCode}
            </Button>

            {error ? (
              <div className="text-destructive text-xs">{error}</div>
            ) : null}
          </>
        )}

        {successfulCreation ? (
          <>
            <div className="grid gap-1">
              <Label
                className="ml-2 text-xs font-light text-gray-500"
                htmlFor="email"
              >
                {locale.auth.forgotPassword.form.password.label}
              </Label>
              <PasswordInput
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                placeholder={
                  locale.auth.forgotPassword.form.password.placeholder
                }
                value={password}
              />
            </div>

            <div className="grid gap-1">
              <Label
                className="text-primary-light ml-2 text-xs font-bold"
                htmlFor="email"
              >
                {locale.auth.forgotPassword.form.otp}
              </Label>
              <VerifyOTP code={code} setCode={setCode} />
            </div>

            <Button
              disabled={loading || !code || !password}
              type="submit"
              variant="secondary"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {locale.auth.forgotPassword.form.resetPassword}
            </Button>

            {error ? (
              <div className="text-destructive text-xs">{error}</div>
            ) : null}
          </>
        ) : null}
      </div>
    </form>
  )
}
