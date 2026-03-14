import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import userRoutes from "./routes/user.routes.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use("/api/users", userRoutes)
app.use("/uploads", express.static("uploads"))

// Error handling middleware
app.use((err, _req, res, _next) => {
	const statusCode = err.statusCode || 500
	res.status(statusCode).json({
		error: err.message || "Internal server error"
	})
})


const PORT = process.env.PORT || 3000

const startServer = async () => {
	await connectDB()

	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
	})
}

startServer()