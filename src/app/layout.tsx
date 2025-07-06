import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LumiCrypto - AI-Powered Crypto Insights',
  description: 'Analyze tokens, DeFi projects, and wallets instantly with AI risk scoring.',
  keywords: 'crypto, cryptocurrency, AI, analysis, DeFi, tokens, blockchain',
  authors: [{ name: 'LumiCrypto Team' }],
  creator: 'LumiCrypto',
  publisher: 'LumiCrypto',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#7c3aed',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 