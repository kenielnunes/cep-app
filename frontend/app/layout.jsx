import "./globals.css";
import { Outfit } from "next/font/google";

// Importando a fonte Outfit do Google Fonts
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata = {
  title: "Localizador de CEP",
  description:
    "Encontre informações detalhadas sobre qualquer endereço no Brasil utilizando o código postal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={outfit.variable}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}

import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "sonner";
