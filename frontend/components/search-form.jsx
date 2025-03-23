"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin } from "lucide-react";

export default function SearchForm({ onSearch, isLoading }) {
  const [cep, setCep] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cep.trim()) {
      onSearch(cep);
    }
  };

  const handleChange = (e) => {
    // Allow only numbers and format with hyphen
    let value = e.target.value.replace(/\D/g, "");

    // Format with hyphen if length > 5
    if (value.length > 5) {
      value = value.substring(0, 5) + "-" + value.substring(5, 8);
    }

    // Limit to 9 characters (including hyphen)
    if (value.length <= 9) {
      setCep(value);
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-cep-light dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="bg-gradient-to-r from-cep-primary/10 to-cep-accent/10 pb-4">
        <CardTitle className="text-cep-primary flex items-center gap-2">
          <Search className="h-5 w-5" />
          Consultar Endereço
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex items-center">
            <MapPin className="absolute left-3 text-cep-primary h-5 w-5" />
            <Input
              type="text"
              value={cep}
              onChange={handleChange}
              placeholder="Digite o CEP (ex: 01001-000)"
              className="pl-10 pr-4 py-3 rounded-lg border-2 border-cep-light focus:border-cep-primary focus:ring-2 focus:ring-cep-accent/20 transition-all duration-300"
              maxLength={9}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || cep.length < 8}
            className="relative w-full overflow-hidden font-medium rounded-lg px-5 py-3 transition-all duration-300 
                     text-white shadow-md hover:shadow-lg focus:ring-4 focus:ring-cep-accent/50 
                     disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
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
            <span
              className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              style={{
                background: "linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)",
              }}
            ></span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
