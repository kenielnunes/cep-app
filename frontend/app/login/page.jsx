"use client";

import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { push } = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const switchToLogin = () => setIsLogin(true);
  const switchToRegister = () => setIsLogin(false);

  const handleContinueWithoutLogin = () => {
    push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-cep-light/30">
      <div className="w-full max-w-md mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <MapPin className="h-12 w-12 text-cep-primary" />
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-cep-accent/30"></span>
          </div>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cep-primary to-cep-dark bg-clip-text text-transparent">
          Localizador de CEP
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Acesse sua conta para gerenciar seus endereços favoritos
        </p>
      </div>

      {isLogin ? (
        <div className="w-full max-w-md">
          <LoginForm onSwitchToRegister={switchToRegister} />
        </div>
      ) : (
        <div className="w-full max-w-md">
          <RegisterForm onSwitchToLogin={switchToLogin} />
        </div>
      )}

      <div className="mt-6 w-full max-w-md">
        <Button
          onClick={handleContinueWithoutLogin}
          variant="outline"
          className="w-full bg-white/80 hover:bg-white text-gray-600 hover:text-cep-primary border-2 border-gray-200 hover:border-cep-light transition-all duration-300"
        >
          <span>Continuar sem login</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <p className="text-center text-xs text-gray-500 mt-2">
          Você pode usar o localizador de CEP sem criar uma conta
        </p>
      </div>

      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Localizador de CEP. Todos os direitos
        reservados.
      </p>
    </div>
  );
}
