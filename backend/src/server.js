import express from "express";
import env from "dotenv";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { app, server } from "./lib/socketio.js";

env.config();


const PORT = process.env.PORT;

app.use(express.json({limit:"5mb"}));
app.use(cors({ origin : process.env.CLIENT_URL , credentials: true}))
app.use(cookieParser());

app.use("/api/auth/", authRoutes);
app.use("/api/message/", messageRoutes);

server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
    connectDB();
});