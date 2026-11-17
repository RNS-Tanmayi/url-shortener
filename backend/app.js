import express from "express";
import cors from "cors";
import urlRoutes from "./routes/url.js";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
}));

app.use(express.json());

app.use("/", urlRoutes);

export default app;