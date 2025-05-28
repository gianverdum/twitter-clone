// src/layouts/BaseLayout.tsx
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function BaseLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="p-4 shadow bg-white">
        <h1 className="text-xl font-semibold">Twitter Clone</h1>
      </header>
      <main className="p-4 max-w-4xl mx-auto">{children}</main>
    </div>
  )
}
