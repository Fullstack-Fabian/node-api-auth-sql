require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('../src/config/db');

(async () => {
  const dir = path.join(__dirname, '../db/migrations');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort();
  for (const file of files) {
    const sql = fs.readFileSync(path.join(dir, file), 'utf8');
    console.log(`Running: ${file}`);
    await pool.query(sql);
  }
  console.log('Migrations completed ✅');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
