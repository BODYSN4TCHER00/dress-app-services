import pool from "../config/db.js";

export const UserModel = {
  async create(userData) {
    const {
      role,
      first_name,
      last_name1,
      last_name2,
      email,
      password_hash,
      phone,
      address,
      ine,
      status,
    } = userData;

    const query = `
      INSERT INTO users (role, first_name, last_name1, last_name2, email, password_hash, phone, address, ine, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING id, email, role, status;
    `;
    const values = [
      role || "client",
      first_name,
      last_name1,
      last_name2,
      email,
      password_hash,
      phone,
      address,
      ine,
      status || "active",
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query("SELECT id, first_name, last_name1, email, role, status FROM users");
    return result.rows;
  },
};
