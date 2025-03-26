import "./globals.css";
import { Outfit } from "next/font/google";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { LayoutQueryProvider } from "@/components/layout/query-provider";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "sonner";

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
        <LayoutQueryProvider>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </LayoutQueryProvider>
      </body>
    </html>
  );
}


