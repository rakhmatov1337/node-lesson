import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import { AppDataSource } from "./config/data-source.js";

import { startBot } from "./bot/bot.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// 1. AVVAL DataSource ni ishga tushiramiz (pool yaratiladi, synchronize ishlaydi va h.k.)
// 2. SHUNDAN KEYINGINA HTTP serverni ishga tushiramiz.
await AppDataSource.initialize();
console.log("Postgres TypeORM orqali ulandi");

startBot()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishlamoqda`);
});