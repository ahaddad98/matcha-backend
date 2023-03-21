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
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    sexual_preferences VARCHAR(50),
    biography TEXT,
    interests TEXT[],
    profile_picture VARCHAR(255),
    picture_1 VARCHAR(255),
    picture_2 VARCHAR(255),
    picture_3 VARCHAR(255),
    picture_4 VARCHAR(255)
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