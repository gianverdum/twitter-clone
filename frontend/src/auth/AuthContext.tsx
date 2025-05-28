import { createContext, useState, useEffect } from "react"
import { api } from "@/api/api"
import type { ReactNode } from "react"

type User = {
  id: number
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")
    if (token && userData && userData !== "undefined") {
      try {
        setUser(JSON.parse(userData))
      } catch {
        localStorage.removeItem("user") // limpa se estiver corrompido
      }
    }
}, [])

  const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password })
    const data = response.data as { access_token: string; user: User }
    const { access_token, user } = data
    
    localStorage.setItem("token", access_token)
    localStorage.setItem("user", JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
