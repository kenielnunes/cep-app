import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function ErrorMessage({ message }) {
  return (
    <Alert variant="destructive" className="border-2 border-destructive/20 bg-destructive/10">
      <AlertCircle className="h-5 w-5 text-destructive" />
      <AlertTitle className="text-destructive font-medium">Erro na consulta</AlertTitle>
      <AlertDescription className="text-destructive/90">{message}</AlertDescription>
    </Alert>
  )
}

