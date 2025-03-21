const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "api on" });
});

app.listen(PORT, () => {
  console.log(`server rodando na porta: ${PORT}`);
});
