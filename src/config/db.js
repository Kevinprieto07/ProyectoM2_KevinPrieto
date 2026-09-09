const { Pool } = require('pg');
const { databaseUrl } = require('./envs');

const isLocal = databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1');

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

module.exports = pool;
