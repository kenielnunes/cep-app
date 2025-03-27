import { z } from "zod";

export const AuthUserSchema = z.object({
  email: z.string().min(1, 'Informe o email.').email("E-mail inválido"),
  password: z.string().min(1, 'Informe a senha.'),
});