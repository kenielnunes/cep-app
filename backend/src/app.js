import express from 'express'
import cors from 'cors'
import { sequelize } from './config/database.js' 
import { userRouter } from './routes/user.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { cepRouter } from './routes/cep.routes.js';
import { cepHistoryRouter} from './routes/cep-history.routes.js'
import { rateLimiter } from './middlewares/rate-limiter.middleware.js';
import { errorHandler } from './exceptions/error-handler.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/user', rateLimiter(1),  userRouter);
app.use('/auth', rateLimiter(1), authRouter);
app.use('/cep', rateLimiter(1, 100), cepRouter);
app.use('/cep-history', rateLimiter(1), cepHistoryRouter);

// Middleware global de tratamento de erros
app.use(errorHandler);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("conectado ao db");
    await sequelize.sync({ alter: true });
    console.log("db sync");
  } catch (error) {
    console.error("erro ao conectar ao db -> ", error);
    process.exit(1);
  }
};

export { app, connectDB };
