"use client";
import { useState } from "react";
import { SearchForm } from "@/components/search-form";
import { ResultsDisplay } from "@/components/results-display";
import { SearchHistory } from "@/components/search-history";
import { ErrorMessage } from "@/components/error-message";
import { MapPin, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { findAddressByCep } from "@/services/api/address/find-address.by-cep";
import { useQuery } from '@tanstack/react-query';
import { findUserHistory } from "@/services/api/history/find-user-history";
import { queryClient } from "@/components/layout/query-provider";

export default function Home() {
  const [cepData, setCepData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();


  const { data: userHistory = [], error: historyError, isLoading: isHistoryLoading } = useQuery({
      queryKey: ['userHistory', user?.id],
      queryFn: async () => {
        const response = await findUserHistory();

        console.log('response -> ', response);
        return response;
      },
      enabled: !!user?.id,
    }
  );

  const searchCep = async ({ cep }) => {
    setIsLoading(true);
    setError(null);

    console.log("cep", cep);

    try {
      const cleanedCep = cep.replace(/\D/g, ''); // Remove qualquer caractere que não seja dígito
      toast.promise(findAddressByCep(cleanedCep), {
        error: (err) => {
          return err.response.data.message;
        },
        loading: "Buscando cep...",
        success: (data) => {
          console.log("data", data);
          setCepData(data);

          // invalida a query do historico para atualizar os dados apenas se estiver logado
          if(isAuthenticated) {
            queryClient.invalidateQueries({queryKey: ['userHistory', user?.id]})
          }

          return "Cep encontrado";
        },
      });
    } catch (err) {
      setError(err.message);
      setCepData(null);
    }
  };

  const clearHistory = () => {
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header com informações do usuário */}
      <div className="flex justify-end mb-6">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium hidden md:inline">
                Olá, {user.username}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="text-gray-500 hover:text-cep-primary"
              aria-label="Sair"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <Button className="bg-cep-primary hover:bg-cep-dark text-white transition-colors">
              <User className="mr-2 h-4 w-4" />
              Entrar
            </Button>
          </Link>
        )}
      </div>

      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <MapPin className="h-12 w-12 text-cep-primary" />
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-cep-accent/30"></span>
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cep-primary to-cep-dark bg-clip-text text-transparent mb-2">
          Localizador de CEP
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Encontre informações detalhadas sobre qualquer endereço no Brasil
          utilizando o código postal
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_1fr] lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <SearchForm onSearch={searchCep} isLoading={isLoading} />

          {error && <ErrorMessage message={error} />}

          {cepData && !error && <ResultsDisplay data={cepData} />}
        </div>

        <div className="space-y-4">
          <SearchHistory
            history={userHistory}
            onClear={clearHistory}
            onSelect={searchCep}
          />
          {historyError && <ErrorMessage message={historyError.message} />}
        </div>
      </div>
    </main>
  );
}
