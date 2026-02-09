import { Header } from '@/components/layout/header'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { metadata as appMetadata } from '@/config/metadata'
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
      <body className={`bg-background font-sans text-foreground antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
