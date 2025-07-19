const { Pool } = require('pg');

const pool = new Pool({
  user: 'neurosord_user',
  host: 'localhost',
  database: 'neurosordb',
  password: 'Sayabag',
  port: 5432,
});

module.exports = pool;
