"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {  Lock} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";

export function LoginForm({ onSwitchToRegister }) {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const schema = z.object({
    email: z
      .string()
      .min(1, { message: "Email é obrigatório" })
      .email({ message: "Email inválido" }),
    password: z
      .string()
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
      .min(1, { message: "Senha é obrigatória" }),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const auth = async (data) => {
    try {
      console.log("data", data);

      toast.promise(login(data.email, data.password), {
        loading: "Autenticando...",
        success: "Autenticado com sucesso!",
        error: (error) => {
          console.log("error", error);
          return error?.response?.data?.message || "Erro";
        },
      });
      
    } catch (error) {
      throw error;
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl border-cep-light dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-cep-primary/10 to-cep-accent/10 pb-6">
        <CardTitle className="text-2xl font-bold text-center text-cep-primary">
          Bem-vindo de volta
        </CardTitle>
        <CardDescription className="text-center text-gray-600 dark:text-gray-400">
          Faça login para acessar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(auth)} className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          {...field}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 "
                        />
                        {/* <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cep-primary transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button> */}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={form.isSubmitting}
              className="relative w-full"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {form.isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </span>
              <span className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Não tem uma conta?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-cep-primary hover:text-cep-dark font-medium transition-colors"
          >
            Cadastre-se
          </button>
        </p>
      </CardFooter>
    </Card>
  );
}
