import { useState } from "react";
import { SearchForm } from "./components/SearchForm";
import ResultsDisplay from "./components/ResultsDisplay";
import SearchHistory from "./components/SearchHistory";
import ErrorMessage from "./components/ErrorMessage";
import { MapPin } from "lucide-react";

export function App() {
  const [cepData, setCepData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const searchCep = async (cep) => {
    setIsLoading(true);
    setError(null);

    try {
      // Remove any non-numeric characters
      const cleanCep = cep.replace(/\D/g, "");

      // Validate CEP format (8 digits)
      if (cleanCep.length !== 8) {
        throw new Error("CEP inválido. O CEP deve conter 8 dígitos.");
      }

      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        throw new Error("CEP não encontrado.");
      }

      setCepData(data);

      // Add to search history if not already present
      if (!searchHistory.some((item) => item.cep === data.cep)) {
        setSearchHistory((prev) => [data, ...prev]);
      }
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
            <MapPin className="h-12 w-12 text-primary" />
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent/30"></span>
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-dark bg-clip-text text-black mb-2">
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

export default App;
