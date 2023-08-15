import "@/styles/globals.css"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ClerkProvider, currentUser } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/react"
import { NextIntlClientProvider } from "next-intl"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Write Support",
    "Write Assistant",
    "Write Support ADHD",
    "Write correction dysorthograpy",
    "Write correction dyslexia",
  ],
  authors: [
    {
      name: "faultyled",
      url: "https://github.com/giacomogaglione",
    },
  ],
  creator: "faultyled",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@faultyled",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
  const user = await currentUser()
  // Show a 404 error if the user requests an unknown locale

  return (
    <ClerkProvider>
      <html lang={locale} suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Analytics />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader user={user} />
                <div className="mx-auto flex-1">{children}</div>
                <Toaster />
                <Footer />
              </div>
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
