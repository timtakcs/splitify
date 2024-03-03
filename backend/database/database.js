const { Pool } = require('pg');
const env = require("dotenv").config({ path: "./keys.env" });

const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    // host: 'host.docker.internal',
    // host: 'db',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

module.exports = pool;