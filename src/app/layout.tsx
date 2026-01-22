import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Smart Restaurantes - Guia de Restaurantes Brasil',
  description: 'Descubra os melhores restaurantes de São Paulo, Campos do Jordão e região. Filtre por cidade, tipo de comida, bairro e estilo.',
  keywords: ['restaurantes', 'São Paulo', 'gastronomia', 'comida', 'guia'],
  authors: [{ name: 'Smart Restaurantes' }],
  openGraph: {
    title: 'Smart Restaurantes - Guia de Restaurantes Brasil',
    description: 'Descubra os melhores restaurantes de São Paulo e região',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
