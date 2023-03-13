const pool = require("../config/db.config");
const bcrypt = require("bcrypt");
const { use } = require("../routes/login");

const searchUserQuery = `
    SELECT * 
    FROM "user" 
    WHERE username = $1;
`;

function searchUser(values) {
  console.log(values);
  return new Promise((resolve, reject) => {
    pool.query(searchUserQuery, values, (err, res) => {
      if (err || res.rows.length === 0) {
        console.log(`User not found`);
        reject(err);
      } else {
        console.log(`User fouuuuund`);
        resolve(res.rows[0]);
      }
    });
  });
}
const hashpass = async (password) => {
  return await bcrypt.hash(password, 10);
};
const loginView = (req, res) => {
  const { username, password } = req.body;
  searchUser([username])
    .then((user) => {
        bcrypt.compare(password, user.password , (err , resp ) => {
            if (err) {
                
            }
            else if (resp) {
                delete user.password
                res.status(200).json(user);
            }
            else {

            }
        })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error searching user" });
    });
};
module.exports = {
  loginView,
};
