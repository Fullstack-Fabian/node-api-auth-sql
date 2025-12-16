const bcrypt = require('bcrypt');
const { randomUUID } = require('crypto');
const { findUserByEmail, createUser } = require('./auth.repo');

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

async function register({ email, password }) {
  const e = normalizeEmail(email);
  const p = String(password || '');

  if (!e || !e.includes('@')) {
    const err = new Error('Invalid email');
    err.status = 400;
    throw err;
  }
  if (p.length < 8) {
    const err = new Error('Password must be at least 8 characters');
    err.status = 400;
    throw err;
  }

  const existing = await findUserByEmail(e);
  if (existing) {
    const err = new Error('Email already registered');
    err.status = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(p, 12);
  return createUser({ id: randomUUID(), email: e, passwordHash, role: 'user' });
}

module.exports = { register };
