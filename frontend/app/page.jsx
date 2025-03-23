"use client";

import { useState } from "react";
import SearchForm from "@/components/search-form";
import ResultsDisplay from "@/components/results-display";
import SearchHistory from "@/components/search-history";
import ErrorMessage from "@/components/error-message";
import { MapPin } from "lucide-react";

export default function Home() {
  const [cepData, setCepData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const searchCep = async (cep) => {
    setIsLoading(true);
    setError(null);

    try {
      // aqui busca
    } catch (err) {
      setError(err.message);
      setCepData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
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

        <div>
          <SearchHistory
            history={searchHistory}
            onClear={clearHistory}
            onSelect={searchCep}
          />
        </div>
      </div>
    </main>
  );
}
