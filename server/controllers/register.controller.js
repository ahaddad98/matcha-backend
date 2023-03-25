const pool = require("../config/db.config");
const bcrypt = require("bcrypt")

const insertUserQuery = `
  INSERT INTO "user" (first_name, last_name, username, email, password)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id, first_name, last_name, username, email;
  `;
function createUser(values) {
  return new Promise((resolve, reject) => {
    pool.query(insertUserQuery, values, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log(`User with id ${res.rows[0].id} inserted successfully`);
        resolve(res.rows[0]);
      }
    });
  });
}
const hashpass = async (password) => {
  return await bcrypt.hash(password, 10)
} 
const registerView = (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;
  hashpass(password).then((pass)=>{
    const values = [first_name, last_name, username, email, pass];
    createUser(values).then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.error('Error creating user:', err);
      res.status(500).json({ error: err.detail });
    });
  })
};

module.exports = {
  registerView,
};
