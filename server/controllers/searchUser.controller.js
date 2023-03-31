const pool = require("../config/db.config");
const path = require("path");
const { getUsersByIdData } = require("./user.contoller");

const updateQuery = `
  SELECT * FROM "user"
  WHERE username=$1 age=$2;
`;
/*
======================== to search with the birthdate
SELECT * FROM users  
WHERE birthdate > (NOW() - INTERVAL '18 years')
======================== to search users using distance
SELECT * FROM users 
WHERE ST_Distance_Sphere(
  ST_MakePoint(users.lng, users.lat),
  ST_MakePoint(:user_lng, :user_lat)
) <= 1000;
======================== to search using interests
SELECT * FROM users 
WHERE 'programming' = ANY (users.interests);
*/


function patchImagessById(values) {
    return new Promise((resolve, reject) => {
        pool.query(updateQuery, values, (err, res) => {
            if (err || !res.rowCount) {
                reject(err);
            }
            if (res) {
                getUsersByIdData(id)
                    .then((user) => resolve(user))
                    .catch((e) => console.log(e));
            }
        });
    });
}


const searchUser = (req, res) => {
    console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    // const {distance , age, username, interests} = req.body
    // console.log(distance , age, username, interests);
    // res.status(400).json({ error: "Error searching user" });

    // patchImagessById(id, [])
    //     .then((user) => {
    //         delete user.password;
    //         res.status(200).json(user);
    //     })
    //     .catch((e) => {
    //     });
};

module.exports = {
    searchUser
};
