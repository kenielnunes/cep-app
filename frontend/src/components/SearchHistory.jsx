"use client";

import { History, Trash2, Clock, MapPin } from "lucide-react";
import Card from "./shared/Card";

export default function SearchHistory({ history, onClear, onSelect }) {
  if (history.length === 0) {
    return (
      <Card className="h-full">
        <div
          style={{
            background:
              "linear-gradient(to right, rgba(129, 140, 248, 0.2), rgba(238, 242, 255, 1))",
          }}
          className="p-4 pb-4"
        >
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <History className="h-5 w-5" />
            Histórico de Consultas
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center h-64 p-6">
          <div
            className="p-4 rounded-full mb-4"
            style={{ backgroundColor: "rgba(238, 242, 255, 0.5)" }}
          >
            <Clock className="h-8 w-8" />
          </div>
          <p className="text-center" style={{ color: "#6B7280" }}>
            Nenhuma consulta realizada
          </p>
          <p className="text-center text-sm mt-2" style={{ color: "#9CA3AF" }}>
            As consultas realizadas aparecerão aqui
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="card h-full">
      <div className="p-4 pb-4">
        <h2 className="text-lg bg-primary font-semibold flex items-center gap-2 text-primary">
          <History className="h-5 w-5" />
          Histórico de Consultas
        </h2>
      </div>
      <div className="p-6">
        <div className="h-[350px] overflow-auto pr-4">
          <ul className="space-y-3">
            {history.map((item, index) => (
              <li
                key={index}
                className="relative bg-black hover:border-[#818CF8] p-4 rounded-lg border-2 border-transparent cursor-pointer shadow-sm group"
                style={{ backgroundColor: "#ffffff", transition: "all 0.3s" }}
                onClick={() => onSelect(item.cep)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">{item.cep}</span>
                </div>
                <div className="text-sm ml-6" style={{ color: "#4B5563" }}>
                  {item.logradouro}
                </div>
                <div className="text-xs ml-6 mt-1" style={{ color: "#6B7280" }}>
                  {item.localidade}/{item.uf}
                </div>
                <div
                  className="absolute left-0 top-0 h-full w-1 rounded-l-lg"
                  style={{
                    backgroundColor: "#818CF8",
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                  ref={(el) => {
                    if (el) {
                      el.parentElement.addEventListener("mouseover", () => {
                        el.style.opacity = 1;
                      });
                      el.parentElement.addEventListener("mouseout", () => {
                        el.style.opacity = 0;
                      });
                    }
                  }}
                ></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="px-6 pt-4 pb-6 border-t"
        style={{ borderColor: "#F3F4F6" }}
      >
        <button className="btn-secondary w-full" onClick={onClear}>
          <span className="flex items-center justify-center gap-2">
            <Trash2 className="h-4 w-4" />
            Limpar histórico
          </span>
        </button>
      </div>
    </Card>
  );
}
