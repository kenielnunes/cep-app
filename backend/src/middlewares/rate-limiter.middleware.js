import {rateLimit} from 'express-rate-limit'

export const rateLimiter = (durationInMinutes = 1, max = 10) => rateLimit({
  windowMs: durationInMinutes * 60 * 1000, // tempo em milissegundos (padrão 1 min)
  max, // número máximo de requisições permitidas
  message: 'Muitas requisições, tente novamente mais tarde.',
});