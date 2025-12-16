const express = require('express');
const { registerHandler } = require('./auth.controller');

const router = express.Router();

router.post('/register', (req, res, next) => {
  Promise.resolve(registerHandler(req, res)).catch(next);
});

module.exports = router;
