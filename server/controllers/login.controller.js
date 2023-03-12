//For Register Page
const pool = require("../config/db.config");

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
const registerView = (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;

  const values = [first_name, last_name, username, email, password];
  createUser(values).then(user => {
    console.log('User created:', user);
    // Send the user data as a response to the client
    res.status(201).json(user);
  })
  .catch(err => {
    console.error('Error creating user:', err);
    // Send an error response to the client
    res.status(500).json({ error: 'Error creating user' });
  });
};

const loginView = (req, res) => {
  return res.send("login");
};
module.exports = {
  registerView,
  loginView,
};
