// src/layouts/BaseLayout.tsx
import { useAuth } from '@/auth/useAuth'
import UserMenu from '@/components/UserMenu'
import TopMenu from '@/components/ui/TopMenu'
import type { ReactNode } from 'react'
import { Link, useLocation } from "react-router-dom"


type Props = {
  children: ReactNode
}

export default function BaseLayout({ children }: Props) {
  const { pathname } = useLocation()
  const { user } = useAuth()
  
  const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password']
  const isPublicPage = publicRoutes.includes(pathname)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="p-4 shadow bg-white flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">🐦</span>
          Twitter Clone
        </Link>
        <UserMenu />
      </header>

      {!isPublicPage && user && <TopMenu />}

      <main className="p-4 max-w-4xl mx-auto flex-1 w-full overflow-y-auto">
        {children}
      </main>

      <footer className="p-4 mt-8 text-center text-sm text-gray-500 border-t">
        &copy; {new Date().getFullYear()} Twitter Clone. All rights reserved.
      </footer>
    </div>
  )
}
