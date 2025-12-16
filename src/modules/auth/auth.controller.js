const { register } = require('./auth.service');

async function registerHandler(req, res) {
  const user = await register(req.body || {});
  return res.status(201).json({ user });
}

module.exports = { registerHandler };
