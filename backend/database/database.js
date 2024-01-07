const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'splitifydb',
    password: 'dev',
    port: 5432,
});

module.exports = pool;