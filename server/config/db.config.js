const { Client } = require('pg');

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
};
const pool = new Client(dbConfig);
pool.connect().then(()=>{console.log("succes");}).catch((error)=>{console.log(error);})


module.exports = pool;