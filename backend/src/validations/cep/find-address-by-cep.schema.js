import { z } from 'zod';

export const FindAddressByCepSchema = z.object({
  cep: z
    .string()
    .nonempty('CEP é obrigatório')
    .regex(/^\d{5}-\d{3}$/, 'CEP deve estar no formato 12345-678'),
});


