import { AuthContainer } from "@/components/auth/auth-container"
import { getLocale } from "@/locale/helpers"
import { Locale } from "@/types/locale"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import ForgotPasswordPage from "./components/forgot-password"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params
  const locale = await getLocale(lang)

  return {
    title: locale.auth.forgotPassword.title,
    description: locale.auth.forgotPassword.description,
  }
}

export default async function Page({ params }: PageProps) {
  const { userId: clerkId } = await auth()
  if (clerkId) {
    redirect("/")
  }

  const { lang } = await params
  const locale = await getLocale(lang)

  return (
    <AuthContainer
      description={locale.auth.forgotPassword.description}
      title={locale.auth.forgotPassword.title}
    >
      <ForgotPasswordPage />
    </AuthContainer>
  )
}
