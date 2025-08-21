"use client"

import { VerifyOTP } from "@/app/[lang]/(auth)/sign-up/components/user-verification"
import { useLocale } from "@/hooks/use-locale"
import { useSignUp } from "@clerk/nextjs"
import { createUser } from "@workspace/backend/users/create-user"
import { getCleanedEmail } from "@workspace/backend/utils"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { PasswordInput } from "@workspace/ui/components/password-input"
import { toast } from "@workspace/ui/components/sonner"
import { cn } from "@workspace/ui/lib/utils"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "nextjs-toploader/app"
import type { MouseEvent } from "react"
import { useState } from "react"

type UserSignUpFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserSignUpForm({ className, ...props }: UserSignUpFormProps) {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [terms, setTerms] = useState(false)
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [pendingVerification, setPendingVerification] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [code, setCode] = useState("")
  const router = useRouter()
  const { locale } = useLocale()

  // start the sign up process.
  async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (!isLoaded) {
      return
    }
    setVerifying(true)
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // send the email.
      await signUp.prepareEmailAddressVerification()

      setVerifying(false)
      // change the UI to our pending section.
      setPendingVerification(true)
    } catch (err) {
      //@ts-expect-error Key error
      const errorCode = err?.errors[0]?.code
      const errorMessage = errorCode
        ? //@ts-expect-error Key error
          err?.errors[0]?.longMessage
        : locale.auth.signUp.form.error.unknown

      setVerifying(false)
      toast.error(errorMessage)
    }
  }

  // This verifies the user using email code that is delivered.
  async function onPressVerify(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (!isLoaded) {
      return
    }
    setVerifying(true)
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
                 or if the user needs to complete more steps.*/
        toast.error(
          JSON.stringify(completeSignUp) ||
            locale.auth.signUp.form.error.unknown,
        )
        // console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (
        completeSignUp.status === "complete" &&
        completeSignUp.createdUserId
      ) {
        await setActive({ session: completeSignUp.createdSessionId })
        const response = await createUser()
        if (response.success) {
          router.push("/")
        } else {
          toast.error(response.msg)
        }
      }
      setVerifying(false)
    } catch (err) {
      //@ts-expect-error Key error
      const errorCode = err?.errors[0]?.code
      const errorMessage = errorCode
        ? //@ts-expect-error Key error
          err?.errors[0]?.longMessage
        : locale.auth.signUp.form.error.unknown

      toast.error(errorMessage)
    }
    setVerifying(false)
  }

  const onTermsChecked = (checked: boolean) => {
    if (checked) {
      setTerms(true)
    } else {
      setTerms(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form>
        <div id="clerk-captcha" />
        {!pendingVerification ? (
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label
                className="ml-2 text-xs font-light text-gray-500"
                htmlFor="email"
              >
                {locale.auth.signUp.form.email.label}
              </Label>
              <Input
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={pendingVerification}
                id="email"
                onChange={(e) => {
                  setEmailAddress(getCleanedEmail(e.target.value))
                }}
                value={emailAddress}
                placeholder={locale.auth.signUp.form.email.placeholder}
                type="email"
              />
            </div>
            <div className="grid gap-1">
              <Label
                className="ml-2 text-xs font-light text-gray-500"
                htmlFor="password"
              >
                {locale.auth.signUp.form.password.label}
              </Label>
              <PasswordInput
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={pendingVerification}
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                placeholder={locale.auth.signUp.form.password.placeholder}
                value={password}
              />
            </div>
            <div className="flex justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" onCheckedChange={onTermsChecked} />
                  <label
                    className="text-xs font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="terms"
                  >
                    {locale.auth.signUp.form.terms}
                    <Link className="underline" href="#" target="_blank">
                      {locale.auth.signUp.form.termsLink}
                    </Link>
                  </label>
                </div>
              </div>
            </div>
            <Button
              disabled={
                pendingVerification || !terms || !emailAddress || !password
              }
              onClick={(e) => {
                void handleSubmit(e)
              }}
              type="button"
              variant="secondary"
            >
              {verifying ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {locale.auth.signUp.form.signUp}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background text-muted-foreground px-2">
                  {locale.auth.signUp.form.or}
                </span>
              </div>
            </div>
            <div className="text-very-muted text-center text-xs">
              {locale.auth.signUp.form.alreadyMember}{" "}
              <Link className="text-primary font-semibold" href="/sign-in">
                {locale.auth.signUp.form.loginHere}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            <Label
              className="text-primary-light ml-2 text-xs font-bold"
              htmlFor="email"
            >
              {locale.auth.signUp.form.verifyEmail}
            </Label>
            <VerifyOTP code={code} setCode={setCode} />
            <div className="self-center text-center">
              <Button
                className="w-full"
                disabled={code.length !== 6}
                onClick={(e) => {
                  void onPressVerify(e)
                }}
                variant="secondary"
              >
                {verifying ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {locale.auth.signUp.form.verify}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
