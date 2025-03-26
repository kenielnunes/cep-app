import { z } from 'zod';

export const CreateCepHistorySchema = z.object({
  userId: z.string().uuid({
    message: 'ID do usuário inválido'
  }),
  cep: z.string()
    .min(8, {
      message: 'CEP deve ter 8 dígitos'
    })
    .max(8, {
      message: 'CEP deve ter 8 dígitos'  
    })
    .regex(/^\d+$/, {
      message: 'CEP deve conter apenas números'
    })
});
