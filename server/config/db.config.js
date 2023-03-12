const { Client } = require('pg');

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
};
const pool = new Client(dbConfig);
pool.connect().then(()=>{}).catch((error)=>{console.log(error);})

const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
`;

pool.query(createUserTableQuery, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log('User table created successfully');
  }
});

module.exports = pool;
  
  
//   module.exports = pool