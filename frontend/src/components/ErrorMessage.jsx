import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ message }) {
  return (
    <div
      className="border-2 rounded-lg p-4"
      style={{
        borderColor: "rgba(239, 68, 68, 0.2)",
        backgroundColor: "rgba(239, 68, 68, 0.05)",
      }}
    >
      <div className="flex items-start gap-3">
        <AlertCircle
          className="h-5 w-5 mt-0.5"
          style={{ color: "rgb(239, 68, 68)" }}
        />
        <div>
          <h3 className="font-medium" style={{ color: "rgb(239, 68, 68)" }}>
            Erro na consulta
          </h3>
          <p style={{ color: "rgba(239, 68, 68, 0.9)" }}>{message}</p>
        </div>
      </div>
    </div>
  );
}
