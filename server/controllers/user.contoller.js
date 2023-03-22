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

function getUsersByIdData(id) {
  return new Promise((resolve, reject) => {
    pool.query(getUsersByIdQuery, [id], (err, res) => {
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

const deleteUserQuery = `
  DELETE FROM "user"
  WHERE id=$1
`
// let newPictures = false;
var oldGender = false;
var sexualPreferences = true;
var biography_ = false;
var interests_ = false;

const updateUserQuery = (gender, sexual_preferences, biography, interests) => {
  var set = sexual_preferences ? 'sexual_preferences=$3,' : ''
  set += gender ? 'gender=$2,' : ''
  set += biography ? 'biography=$4,' : ''
  set += interests ? 'interests=$5,' : ''
  set = set.slice(0, -1)
  return `
  UPDATE "user"
  SET 
   ${set}
  WHERE id=$1;
  `;
}

function patchUsersById(id, query, values) {
  return new Promise((resolve, reject) => {
    console.log(values);
    console.log(query);
    pool.query(query, values,(err, res) => {
      console.log(err, res);
      if (err) {
        reject(err)
      }
      if (res) {
        resolve(res)
      }
    })
  })
}

const patchUser = (req, res) => {
  const id = req.params.id;
  const requestBody = req.body;
  let query = 'UPDATE "user" SET';

  const values = [];

  if (requestBody.hasOwnProperty('gender')) {
    query += ' gender = $1,';
    values.push(requestBody.gender);
  }

  if (requestBody.hasOwnProperty('sexual_preferences')) {
    query += ' sexual_preferences = $2,';
    values.push(requestBody.sexual_preferences);
  }

  if (requestBody.hasOwnProperty('biography')) {
    query += ' biography = $3,';
    values.push(requestBody.biography);
  }

  if (requestBody.hasOwnProperty('interests')) {
    const interests = requestBody.interests;
    if (!Array.isArray(interests)) {
      console.log('Interests is not an array:', interests);
      return res.status(400).json({ error: 'Invalid interests' });
    }
    query += ' interests = $4,';
    values.push(interests);
  }

  // Remove trailing comma from query
  query = query.slice(0, -1);

  query += ' WHERE id = $5';
  values.push(id)
  patchUsersById(id, query, values).then(user => {
    delete user.password
    res.status(200).json(user)
  }).catch(e => {
    console.log(e);
    res.status(400).json({ error: "Error searching user" });
  })

}

module.exports = {
  getUsers,
  getUsersById,
  patchUser
};
