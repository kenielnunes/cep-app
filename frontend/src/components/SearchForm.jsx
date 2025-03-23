import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "./shared/Button";

export function SearchForm({ onSearch, isLoading }) {
  const [cep, setCep] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cep.trim()) {
      onSearch(cep);
    }
  };

  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 5) {
      value = value.substring(0, 5) + "-" + value.substring(5, 8);
    }

    if (value.length <= 9) {
      setCep(value);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-cep-light overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="bg-gradient-to-r from-cep-primary/10 to-cep-accent/10 p-4 pb-4">
        <h2 className="text-lg font-semibold bg-primary text-cep-primary flex items-center gap-2">
          <Search className="h-5 w-5" />
          Consultar Endereço
        </h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex items-center">
            <MapPin className="absolute left-3 text-cep-primary h-5 w-5" />
            <input
              type="text"
              value={cep}
              onChange={handleChange}
              placeholder="Digite o CEP (ex: 01001-000)"
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-cep-light focus:border-cep-primary focus:ring-2 focus:ring-cep-accent/20 transition-all duration-300 outline-none"
              maxLength={9}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || cep.length < 8}
            className="w-full"
          >
            <span className="flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Buscando endereço...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Buscar Endereço
                </>
              )}
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}
