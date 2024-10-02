// app/layout.tsx
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { StakingProvider } from '@/context/StakingContext'
import { Toaster } from '@/components/ui/toaster'

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Crypto Staking Platform',
  description: 'Stake your crypto and earn rewards',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gray-50`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <StakingProvider>
            <div className="min-h-screen flex flex-col">
              {children}
            </div>
            <Toaster />
          </StakingProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}