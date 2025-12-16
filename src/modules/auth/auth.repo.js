const { pool } = require('../../config/db');

async function findUserByEmail(email) {
  const r = await pool.query('SELECT id, email, password_hash, role, created_at FROM users WHERE email=$1', [email]);
  return r.rows[0] || null;
}

async function createUser({ id, email, passwordHash, role }) {
  const r = await pool.query(
    'INSERT INTO users (id, email, password_hash, role) VALUES ($1,$2,$3,$4) RETURNING id, email, role, created_at',
    [id, email, passwordHash, role]
  );
  return r.rows[0];
}

module.exports = { findUserByEmail, createUser };
