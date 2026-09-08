const { Pool } = require('pg');
const { databaseUrl } = require('./envs');

const pool = new Pool({
  connectionString: databaseUrl,
});

module.exports = pool;
