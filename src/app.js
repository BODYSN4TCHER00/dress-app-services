import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Seguridad básica y parsing
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rutas
app.use("/api/auth/users", userRoutes);

// Manejo global de errores
app.use(errorHandler);

export default app;
