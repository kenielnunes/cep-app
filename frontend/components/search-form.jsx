"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function SearchForm({ onSearch }) {
  const schema = z.object({
    cep: z
      .string()
      .min(1, { message: "Campo obrigatório!" })
      .refine((value) => /^\d{5}-?\d{3}$/.test(value), {
        message: "Cep inválido!",
      }),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5, 8);
    }
    setValue("cep", value);
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
        <form onSubmit={handleSubmit((data) => {
          onSearch(data)
          reset()
        })} className="space-y-2">
          <div className="relative flex items-center">
            <MapPin className="absolute left-3 text-cep-primary h-5 w-5" />
            <Input
              type="text"
              {...register("cep")}
              placeholder="Digite o CEP (ex: 01001-000)"
              className="pl-10 pr-4 py-3 rounded-lg border-2 border-cep-light focus:border-cep-primary focus:ring-2 focus:ring-cep-accent/20 transition-all duration-300"
              maxLength={9}
              onChange={handleCepChange}
            />
          </div>
          {errors?.cep && (
            <p className="text-sm text-destructive">{errors?.cep?.message}</p>
          )}
          <Button
            type="submit"
            disabled={isSubmitting || watch("cep")?.length < 9}
            className="relative w-full text-white shadow-md focus:ring-4"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
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
      </CardContent>
    </Card>
  );
}
