const pool = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const JWT_SECRET = process.env.JWT_SECRET;

const searchUserQuery = `
SELECT * 
FROM "user" 
WHERE username = $1;
`;

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

const verifyToken = expressJwt.expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
});
function searchUser(values) {
  return new Promise((resolve, reject) => {
    pool.query(searchUserQuery, values, (err, res) => {
      if (err || res.rows.length === 0) {
        reject(err);
      } else {
        resolve(res.rows[0]);
      }
    });
  });
}

const loginView = (req, res) => {
  const { username, password } = req.body;
  searchUser([username])
    .then((user) => {
      bcrypt.compare(password, user.password, (err, resp) => {
        if (err) {
        } else if (resp) {
          delete user.password;
          const accessToken = jwt.sign({ sub: username, id: user.id }, JWT_SECRET, {
            expiresIn: "3h",
          });
          const refreshToken = jwt.sign({ sub: username, id: user.id}, JWT_SECRET, {
            expiresIn: "2w",
          });
          //   const token = generateToken(user);
          res.status(200).json({ user, accessToken, refreshToken });
        } else {
          res.status(404).json({ error: "Password or username not Correct" });
        }
      });
    })
    .catch((err) => {
      res.status(404).json({ error: "User Not Found" });
    });
};
module.exports = {
  loginView,
};
