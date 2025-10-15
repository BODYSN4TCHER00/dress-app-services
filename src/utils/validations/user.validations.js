import { body } from "express-validator";

export const registerValidation = [
  body("first_name").notEmpty().withMessage("El nombre es obligatorio"),
  body("last_name1").notEmpty().withMessage("El primer apellido es obligatorio"),
  body("email").isEmail().withMessage("Email inválido"),
  body("password").isLength({ min: 6 }).withMessage("Contraseña mínima de 6 caracteres"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Email inválido"),
  body("password").notEmpty().withMessage("Contraseña requerida"),
];
