"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authUser } from "@/services/api/auth/auth-user";

// Criando o contexto de autenticação
const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  console.log("user", user);
  const { push } = useRouter();

  // Função de login
  const login = async (email, password) => {
    // Chamar o serviço de autenticação
    const { auth } = await authUser(email, password);

    // Armazenar o token JWT
    localStorage.setItem("cep-finder-token", auth.token);

    // Atualizar o estado com os dados do usuário
    setUser(auth.user);

    push("/");

    return auth.user;
  };

  // Função de logout
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Verificar se o usuário está autenticado
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
