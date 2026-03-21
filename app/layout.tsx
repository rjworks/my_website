import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Caveat, EB_Garamond } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { FONT_THEME } from '@/config/site'
import { siteConfig } from '@/config/site'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-modern' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-handwritten' })
const garamond = EB_Garamond({ subsets: ['latin'], variable: '--font-classic' })

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

const fontVariableMap = {
  handwritten: '--font-handwritten',
  classic: '--font-classic',
  modern: '--font-modern',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const activeFontVar = fontVariableMap[FONT_THEME]

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${caveat.variable} ${garamond.variable} antialiased`}
        style={{ fontFamily: `var(${activeFontVar}), serif` }}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
