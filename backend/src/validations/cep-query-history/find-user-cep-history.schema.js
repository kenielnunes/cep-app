import { z } from 'zod';

export const FindUserCepHistorySchema = z.object({
  userId: z.string().uuid({
    message: 'ID do usuário inválido'
  }),
});