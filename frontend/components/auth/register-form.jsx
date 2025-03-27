"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

export function RegisterForm({ onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false)
  const { register: registerUser } = useAuth()
  const router = useRouter()

  const schema = z.object({
    username: z
      .string()
      .min(1, { message: "Campo obrigatório!" })
      .min(3, { message: "Seu nome de usuário deve ter no mínimo 3 caracteres!" }),
    email: z.string().min(1, { message: "Campo obrigatório!" }).email({message: 'Email inválido!'}),
    password: z
      .string()
      .min(1, { message: "Campo obrigatório!" })
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres!" }),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submitFormRegisterUser = (data) => {
    console.log('data', data)
    // registra
    toast.promise(registerUser(data), {
      loading: "Cadastrando...",
      success: "Cadastrado com sucesso!",
      error: (error) => {
        console.log("error", error);
        return error?.response?.data?.message || "Erro";
      },
    });
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-cep-light dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-cep-accent/10 to-cep-primary/10 pb-6">
        <CardTitle className="text-2xl font-bold text-center text-cep-primary">Criar conta</CardTitle>
        <CardDescription className="text-center text-gray-600 dark:text-gray-400">
          Cadastre-se para acessar todas as funcionalidades
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(submitFormRegisterUser)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
              Nome completo
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                {...register('username')}
                id="name"
                type="text"
                placeholder="Seu nome completo"
                className={`pl-10 border-2 ${
                  errors.username ? 'border-red-500' : 'border-cep-light'
                } focus:border-cep-primary transition-all duration-300`}
              />
            </div>
            {errors.username && (
                <span className="text-sm text-red-500 mt-1">{errors.username.message}</span>
              )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="seu@email.com"
                className={`pl-10 border-2 ${
                  errors.email ? 'border-red-500' : 'border-cep-light'
                } focus:border-cep-primary transition-all duration-300`}
              />
            </div>
            {errors.email && (
                <span className="text-sm text-red-500 mt-1">{errors.email.message}</span>
              )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                {...register('password')}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`pl-10 border-2 ${
                  errors.password ? 'border-red-500' : 'border-cep-light'
                } focus:border-cep-primary transition-all duration-300`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cep-primary transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
                <span className="text-sm text-red-500 mt-1">{errors.password.message}</span>
              )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Criando conta...
                </>
              ) : (
                "Criar conta"
              )}
            </span>
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center pb-6">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Já possui conta?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-cep-primary hover:text-cep-primary/80 font-semibold transition-colors"
          >
            Fazer Login
          </button>
        </div>
      </CardFooter>
    </Card>
  )
}

