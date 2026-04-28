import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import { pool } from './config/db.js'

dotenv.config();

const app = express();


app.use(express.json());
app.use("/api/users", userRoutes);

// Global error handler
app.use((err, req, res, next) => {
	res.status(err.statusCode || 500).json({
		message: err.message || "Internal Server Error",
	});
});


const result = await pool.query("SELECT NOW() as now");
if (result)
	console.log("Postgress Connected");
	


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});