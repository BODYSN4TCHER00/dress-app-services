import express from "express";
import { UserController } from "../controllers/user.controller.js";
import { registerValidation, loginValidation } from "../utils/validations/user.validations.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidation, UserController.register);
router.post("/login", loginValidation, UserController.login);

// Solo admin puede ver todos los usuarios
router.get("/all", authenticateToken, authorizeRoles("admin"), UserController.getAllUsers);

export default router;
