"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { History, Trash2, Clock, MapPin } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function SearchHistory({ history, onClear, onSelect }) {
  if (history.length === 0) {
    return (
      <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-cep-light dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl h-full">
        <CardHeader className="bg-gradient-to-r from-cep-accent/20 to-cep-light pb-4">
          <CardTitle className="text-cep-primary flex items-center gap-2">
            <History className="h-5 w-5" />
            Histórico de Consultas
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64">
          <div className="bg-cep-light/50 dark:bg-gray-700/50 p-4 rounded-full mb-4">
            <Clock className="h-8 w-8 text-cep-primary/50" />
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400">Nenhuma consulta realizada</p>
          <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-2">
            As consultas realizadas aparecerão aqui
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-cep-light dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl h-full">
      <CardHeader className="bg-gradient-to-r from-cep-accent/20 to-cep-light pb-4">
        <CardTitle className="text-cep-primary flex items-center gap-2">
          <History className="h-5 w-5" />
          Histórico de Consultas
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ScrollArea className="h-[350px] pr-4">
          <ul className="space-y-3">
            {history.map((item, index) => (
              <li
                key={index}
                className="relative p-4 rounded-lg border-2 border-transparent bg-white dark:bg-gray-800 hover:border-cep-accent transition-all duration-300 cursor-pointer shadow-sm"
                onClick={() => onSelect(item.cep)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-cep-primary" />
                  <span className="font-medium text-cep-primary">{item.cep}</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 ml-6">{item.logradouro}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 ml-6 mt-1">
                  {item.localidade}/{item.uf}
                </div>
                <span className="absolute left-0 top-0 h-full w-1 bg-cep-accent rounded-l-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-4 pb-6">
        <Button
          className="relative w-full overflow-hidden bg-white text-cep-primary border-2 border-cep-light 
                   font-medium rounded-lg px-5 py-2.5 transition-all duration-300 
                   hover:border-cep-accent focus:ring-4 focus:ring-cep-accent/30"
          onClick={onClear}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Trash2 className="h-4 w-4" />
            Limpar histórico
          </span>
          <span
            className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
            style={{
              background: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)",
            }}
          ></span>
        </Button>
      </CardFooter>
    </Card>
  )
}

