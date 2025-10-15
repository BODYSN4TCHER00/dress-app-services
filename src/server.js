import app from "./app.js";
import dotenv from "dotenv";
import pool from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 4000;

pool.connect().then(() => {
  app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
});
