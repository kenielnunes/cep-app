import { useState } from "react";
import SearchForm from "./components/SearchForm";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const searchCep = async () => {
    setIsLoading(true);

    try {
      // busca cep
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
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
        <SearchForm onSearch={searchCep} isLoading={isLoading} />
      </div>
    </main>
  );
}

export default App;
