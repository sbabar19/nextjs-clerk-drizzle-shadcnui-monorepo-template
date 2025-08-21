import { UserAuthForm } from "@/app/[lang]/(auth)/sign-in/components/user-auth-form"
import { AuthContainer } from "@/components/auth/auth-container"
import { getLocale } from "@/locale/helpers"
import { Locale } from "@/types/locale"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params
  const locale = await getLocale(lang)

  return {
    title: locale.auth.signIn.title,
    description: locale.auth.signIn.description,
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
      description={locale.auth.signIn.description}
      title={locale.auth.signIn.title}
    >
      <UserAuthForm />
    </AuthContainer>
  )
}
