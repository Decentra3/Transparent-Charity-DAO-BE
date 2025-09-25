// src/app.js
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import donateRoutes from "./routes/donateRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import proposalRoutes from "./routes/proposalRoutes.js";
import cors from "cors";
import config from "../config.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { swaggerDocs } from "./config/swagger.js";
const app = express();

//CORS - allow all for testing
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);
// Express 5: avoid literal "*" path; use a permissive regex instead
app.options(/.*/, cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Route
app.use("/api/users", userRoutes);
app.use("/api/donates", donateRoutes);
app.use("/api/proposals", proposalRoutes);
app.use("/api/transactions", transactionRoutes);
// Swagger
swaggerDocs(app);
// Error handler
app.use(errorHandler);

export default app;
