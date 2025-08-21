"use client"

import { useLocale } from "@/hooks/use-locale"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@workspace/ui/components/input-otp"

export function VerifyOTP({
  code,
  setCode,
}: {
  code: string
  setCode: CallableFunction
}) {
  const { locale } = useLocale()

  return (
    <div className="grid gap-1">
      <InputOTP
        maxLength={6}
        onChange={(v) => {
          setCode(v)
        }}
        value={code}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-primary text-xs font-light">
        {locale.auth.signUp.form.verifyOTP}
      </div>
    </div>
  )
}
