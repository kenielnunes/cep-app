import { MapPin, Home, Building, Map, Navigation, Hash } from "lucide-react";
import Card from "./shared/Card";

export default function ResultsDisplay({ data }) {
  return (
    <Card className="relative">
      <div
        style={{ background: "linear-gradient(to right, #6366F1, #4F46E5)" }}
        className="p-4 pb-4"
      >
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          CEP {data.cep}
        </h2>
      </div>
      <div className="p-6">
        <div className="grid gap-5">
          <div className="flex items-start gap-3">
            <div
              style={{ backgroundColor: "#EEF2FF" }}
              className="p-2 rounded-lg"
            >
              <Home className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm" style={{ color: "#6B7280" }}>
                Logradouro
              </p>
              <p className="font-medium text-lg">
                {data.logradouro || "Não informado"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              style={{ backgroundColor: "#EEF2FF" }}
              className="p-2 rounded-lg"
            >
              <Building className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm" style={{ color: "#6B7280" }}>
                Bairro
              </p>
              <p className="font-medium text-lg">
                {data.bairro || "Não informado"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              style={{ backgroundColor: "#EEF2FF" }}
              className="p-2 rounded-lg"
            >
              <Map className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm" style={{ color: "#6B7280" }}>
                Cidade / UF
              </p>
              <p className="font-medium text-lg">
                {data.localidade || "Não informado"} /{" "}
                {data.uf || "Não informado"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            {data.complemento && (
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: "rgba(238, 242, 255, 0.5)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Hash className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Complemento</span>
                </div>
                <p style={{ color: "#4B5563" }}>{data.complemento}</p>
              </div>
            )}

            <div
              className="p-3 rounded-lg"
              style={{ backgroundColor: "rgba(238, 242, 255, 0.5)" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Navigation className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">IBGE</span>
              </div>
              <p style={{ color: "#4B5563" }}>{data.ibge || "Não informado"}</p>
            </div>
          </div>
        </div>
      </div>
      <span
        className="absolute -top-10 -right-10 w-20 h-20 rounded-full"
        style={{ backgroundColor: "rgba(129, 140, 248, 0.1)" }}
      ></span>
    </Card>
  );
}
