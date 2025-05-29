import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import { useState } from "react";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await api.post("/users", data);
      await login(data.email, data.password);
      navigate("/");
    } catch (error: any) {
      const messages = error?.response?.data?.message;
      setApiError(Array.isArray(messages) ? messages.join("\n") : "Erro ao criar conta");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Create an account</h2>

        <Input
          type="text"
          placeholder="Name"
          autoComplete="name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <Input
          type="email"
          placeholder="Email"
          autoComplete="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <Input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

        <Button type="submit" className="w-full">Sign up</Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}