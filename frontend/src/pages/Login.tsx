import { useForm } from "react-hook-form";
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/auth/useAuth"
import { useNavigate } from "react-router-dom"

type LoginFormInputs = {
  email: string;
  password: string;
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const {register, handleSubmit, formState: { errors}} = useForm<LoginFormInputs>()
  const [apiError, setApiError] = useState("")

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password)
      navigate("/feed")
    } catch (error: any) {
      const message = error?.response?.data?.message

      if (typeof message === "string") {
        setApiError(message)
      } else if (Array.isArray(message)) {
        setApiError(message.join("\n"))
      } else {
        setApiError("Error logging in")
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <Input
          type="email"
          autoComplete="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <Input
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

        <Button type="submit" className="w-full">
          Sign in
        </Button>
        <p className="text-center text-sm text-gray-600">
          Didn't have an account?{" "}
          <a
            href="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </a>
        </p>

      </form>
    </div>
  )
}