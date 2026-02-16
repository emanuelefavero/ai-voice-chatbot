import { Header } from '@/components/layout/header'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { metadata as appMetadata } from '@/config/metadata'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  ...appMetadata,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'bg-background text-foreground', // Colors
          'font-sans antialiased', // Font styles
          'mx-auto w-full max-w-screen-2xl', // Center content and limit max width
          'max-3xs:origin-top-center max-3xs:min-w-67.5 max-3xs:transform-[scale(calc(100vw/320))]', // Scale down on very small screens
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className='mx-auto flex max-w-3xl flex-col items-center justify-center space-y-4 px-4 py-8'>
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
