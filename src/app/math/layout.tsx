import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next gRPC',
  description: 'Next gRPC website',
}

export default function MathLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen flex-col gap-8 items-center p-12 sm:p-16 md:p-24">
      <h1 className="text-2xl">
        Math Service
      </h1>
      { children }
    </main>
  )
}
