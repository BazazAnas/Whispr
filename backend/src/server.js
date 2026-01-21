import express from "express";
import env from "dotenv";
import authRoutes from "./routes/auth.route.js"

env.config();

const app = express();
const PORT = process.env.PORT;

app.use("/api/auth/", authRoutes);

app.listen(PORT, () => { console.log(`server is running on ${PORT}`)});