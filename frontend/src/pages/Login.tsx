import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/auth/useAuth"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate("/") // redireciona para home após login
    } catch (error: any) {
      const message = error?.response?.data?.message

      if (typeof message === "string") {
        setError(message)
      } else if (Array.isArray(message)) {
        setError(message.join("\n"))
      } else {
        setError("Erro ao fazer login")
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full">
          Entrar
        </Button>
        <p className="text-center text-sm text-gray-600">
          Não tem uma conta?{" "}
          <a
            href="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Cadastre-se
          </a>
        </p>

      </form>
    </div>
  )
}