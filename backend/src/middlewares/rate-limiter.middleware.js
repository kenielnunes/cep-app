import {rateLimit} from 'express-rate-limit'

export function rateLimiterMiddleware() {
  rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 2, // limita o ip a 10 requisições no tempo determinado
    message: 'Muitas requisições, tente novamente mais tarde.',
  });
} 

