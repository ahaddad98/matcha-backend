const Pool = require("pg").Pool

const pool = new Pool({
    user: DB_USER,
    password :DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
  }) = process.env;
  
  module.exports = pool