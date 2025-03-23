import { HttpStatusCode } from "axios";
import jwt from 'jsonwebtoken'
import { env } from "../config/env.config.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Obter o token do header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(HttpStatusCode.Unauthorized).json({
        message: 'Não autorizado!'
      });
    }

    // Pega apenas o valor do token, sem o 'Bearer'
    const token = authHeader.split(' ')[1];

    console.log('token', token);
    console.log('decoded', jwt.decode(token));
    
    
    // Verificar token
    const decoded = jwt.verify(token, env.JWT_SECRET);

    console.log('decoded', decoded);
    
    next();
  } catch (error) {

    console.log('error', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expirado'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Token inválido'
      });
    }
    
    return res.status(500).json({
      error: 'Erro de autenticação'
    });
  }
};