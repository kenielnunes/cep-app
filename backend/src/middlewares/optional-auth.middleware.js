import jwt from 'jsonwebtoken'
import { env } from "../config/env.config.js";

export const optionalAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null; // Se não houver token, req.user é null e seguimos
      return next();
    }

    // Pega o token e tenta verificar
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET);
      req.user = decoded; // Adiciona dados do usuário autenticado
    } catch (error) {
      req.user = null; // Se o token for inválido, o usuário continua como null
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Erro de autenticação' });
  }
};
