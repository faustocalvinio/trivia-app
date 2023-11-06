import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trivia Game',
  description: 'Just a simple game using TheTriviaApi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-white dark:bg-black flex flex-col min-h-screen justify-center items-center`}>{children}</body>   
    </html>
  )
}
