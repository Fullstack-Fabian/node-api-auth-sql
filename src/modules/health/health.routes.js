const express = require('express');
const { pool } = require('../../config/db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const r = await pool.query('SELECT 1 AS ok');
    return res.status(200).json({ status: 'ok', db: r.rows[0].ok === 1 ? 'up' : 'down' });
  } catch (err) {
    return res.status(500).json({ status: 'degraded', db: 'down' });
  }
});

module.exports = router;
