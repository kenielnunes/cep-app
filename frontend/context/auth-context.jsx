"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authUser } from "@/services/api/auth/auth-user";
import jwt from 'jsonwebtoken'
import { registerUser } from "@/services/api/user/register-user";

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

  useEffect(() => {
    const token = localStorage.getItem("cep-finder-token");

    const userData = jwt.decode(token)

    console.log('userData -> ', userData);

    setUser(userData);
  }, [])

  // Função de logout
  const logout = () => {
    localStorage.removeItem("cep-finder-token");
    setUser(null);
  };

  // Verificar se o usuário está autenticado
  const isAuthenticated = !!user;

  const register = (data) => {
    const { user } = registerUser(data.username, data.email, data.password)

    return user
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
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
