import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { api } from "@/api/api"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/auth/useAuth"

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post("/users", { name, email, password })
      await login(email, password)
      navigate("/")
    } catch (error: any) {
      const messages = error?.response?.data?.message

      if (Array.isArray(messages)) {
        setError(messages.join("\n"))
      } else {
        setError("Erro ao criar conta")
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Criar Conta</h2>

        <Input
        type="text"
        placeholder="Nome"
        name="name"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <Input
        type="email"
        placeholder="Email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input
        type="password"
        placeholder="Senha"
        name="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full">
          Registrar
        </Button>
      </form>
    </div>
  )
}