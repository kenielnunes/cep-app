import express from 'express'
import cors from 'cors'
import { sequelize } from './config/database.js' 
import { getCep } from './presentation/controllers/cep.controller.js';
import { createUser } from './presentation/controllers/user.controller.js';
import { loginUser } from './presentation/controllers/auth.controller.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/cep/:cep', getCep);
app.post('/user', createUser);
app.post('/auth', loginUser);

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
