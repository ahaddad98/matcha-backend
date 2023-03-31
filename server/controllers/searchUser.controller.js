const pool = require("../config/db.config");
const path = require("path");
const { getUsersByIdData } = require("./user.contoller");

const updateQuery = `
SELECT * FROM users 
WHERE ST_Distance_Sphere(
  ST_MakePoint(users.lng, users.lat),
  ST_MakePoint(:user_lng, :user_lat)
) <= 1000;
`;

/*
======================== to search by username 
SELECT * FROM "user"
WHERE username=$1;
======================== to search with the birthdate
SELECT * FROM users  
WHERE birthdate > (NOW() - INTERVAL '18 years')
======================== to search users using distance
======================== to search using interests
SELECT * FROM users 
WHERE 'programming' = ANY (users.interests);
*/

function searchUsersBySomethings(values) {
  return new Promise((resolve, reject) => {
    pool.query(updateQuery, values, (err, res) => {
      if (err) {
        reject(err);
      }
      if (res) {
        resolve(res.rows)
      }
    });
  });
}

const searchUser = (req, res) => {
  console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", req.body);
  const { distance, age, username, interests , first_name} = req.body;
  searchUsersBySomethings([distance])
    .then((user) => {
    //   delete user.password;
      res.status(200).json(user);
    })
    .catch((e) => {
      res.status(400).json({ error: "Error searching user" });
    });
};

module.exports = {
  searchUser,
};
