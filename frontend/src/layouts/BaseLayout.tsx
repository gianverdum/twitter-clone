// src/layouts/BaseLayout.tsx
import type { ReactNode } from 'react'
import { useAuth } from "@/auth/useAuth"
import UserMenu from '@/components/UserMenu'


type Props = {
  children: ReactNode
}

export default function BaseLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="p-4 shadow bg-white flex justify-between items-center">
        <h1 className="text-xl font-semibold">Twitter Clone</h1>
        <UserMenu />
      </header>

      <main className="p-4 max-w-4xl mx-auto">{children}</main>
    </div>
  )
}

function UserAvatar() {
  const { user } = useAuth()

  if (!user) return null

  const initial = user.name.charAt(0).toUpperCase()

  return (
    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
      {initial}
    </div>
  )
}
