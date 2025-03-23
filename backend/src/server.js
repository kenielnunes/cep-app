import { app, connectDB } from "./app.js"
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});