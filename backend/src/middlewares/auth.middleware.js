
import dotenv from "dotenv";
import { User } from "../domain/models/user";
import jwt from 'jsonwebtoken'
dotenv.config();

module.exports = async (req, res, next) => {
  try {
    // Obter o token do header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Não autorizado'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('decoded', decoded);
    
    
    next();
  } catch (error) {
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