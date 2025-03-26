import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Home, Building, Map, Navigation, Hash } from "lucide-react";

export default function ResultsDisplay({ data }) {
  return (
    <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-cep-light dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl relative">
      <CardHeader className="bg-gradient-to-r from-cep-primary to-cep-secondary pb-4">
        <CardTitle className="text-white flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          CEP {data.zipCode}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-5">
          <div className="flex items-start gap-3">
            <div className="bg-cep-light dark:bg-gray-700 p-2 rounded-lg">
              <Home className="h-5 w-5 text-cep-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Logradouro
              </p>
              <p className="font-medium text-lg">
                {data.street || "Não informado"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-cep-light dark:bg-gray-700 p-2 rounded-lg">
              <Building className="h-5 w-5 text-cep-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Bairro</p>
              <p className="font-medium text-lg">
                {data.neighborhood || "Não informado"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-cep-light dark:bg-gray-700 p-2 rounded-lg">
              <Map className="h-5 w-5 text-cep-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Cidade / UF
              </p>
              <p className="font-medium text-lg">
                {data.city || "Não informado"} / {data.state || "Não informado"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            {data.complement && (
              <div className="p-3 bg-cep-light/50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Hash className="h-4 w-4 text-cep-primary" />
                  <span className="text-sm font-medium">Complemento</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {data.complement}
                </p>
              </div>
            )}

            <div className="p-3 bg-cep-light/50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Navigation className="h-4 w-4 text-cep-primary" />
                <span className="text-sm font-medium">IBGE</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {data.ibgeCode || "Não informado"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <span className="absolute -top-10 -right-10 w-20 h-20 bg-cep-accent/10 rounded-full"></span>
    </Card>
  );
}
