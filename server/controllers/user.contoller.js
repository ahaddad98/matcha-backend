const pool = require("../config/db.config");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const getUsersQuery = `
    SELECT id,first_name, last_name, username, email
    FROM "user"
`;

function getUsersdata(params) {
  return new Promise((resolve, reject) => {
    pool.query(getUsersQuery, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows);
      }
    });
  });
}

const getUsers = (req, res) => {
  getUsersdata().then((user) => {
    delete user.password
    res.status(200).json(user);
  }).catch((e) => {
    res.status(400).json({ error: "Error geting users" });
  });
};

const getUsersByIdQuery = `
SELECT *
FROM "user"
WHERE id=$1;
`;

function getUsersByIdData (id) {
    return new Promise((resolve, reject) => {
        pool.query(getUsersByIdQuery, [id], (err, res)=>{
            if (err || res.rows.length === 0) {
                reject(err)
            }
            if (res) {
                resolve(res.rows[0])
            }
        })
    })
}

const getUsersById = (req, res) => {
  const id = req.params.id;
  getUsersByIdData(id).then(user => {
    delete user.password
    res.status(200).json(user)
  }).catch(e => {
    res.status(400).json({ error: "Error searching user" });
  })
};
module.exports = {
  getUsers,
  getUsersById,
};
