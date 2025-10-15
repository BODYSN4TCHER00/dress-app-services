import { UserModel } from "../models/user.model.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { validationResult } from "express-validator";

export const UserController = {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { first_name, last_name1, last_name2, email, password, role } = req.body;

      const existing = await UserModel.findByEmail(email);
      if (existing) return res.status(409).json({ message: "Email ya registrado" });

      const password_hash = await hashPassword(password);
      const newUser = await UserModel.create({
        role,
        first_name,
        last_name1,
        last_name2,
        email,
        password_hash,
      });

      res.status(201).json({ message: "Usuario creado", user: newUser });
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { email, password } = req.body;
      const user = await UserModel.findByEmail(email);
      if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

      const valid = await verifyPassword(password, user.password_hash);
      if (!valid) return res.status(401).json({ message: "Credenciales inválidas" });

      const token = generateToken(user);
      res.json({ message: "Login exitoso", token });
    } catch (err) {
      next(err);
    }
  },

  async getAllUsers(req, res, next) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  },
};
