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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")
    if (token && userData && userData !== "undefined") {
      try {
        setUser(JSON.parse(userData))
      } catch {
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
}, [])

  const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password })
    console.log("🔐 Login response:", response.data)

    const data = response.data as { access_token: { access_token: string }; user: User }
    const token = data.access_token.access_token
    const user = data.user

    console.log("✅ Parsed token:", token)
    console.log("👤 User info:", user)
    
    localStorage.setItem("token", token)
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
      {!isLoading && children}
    </AuthContext.Provider>
  )
}
