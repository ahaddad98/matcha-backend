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

function patchUsersById(id, query, values) {
  return new Promise((resolve, reject) => {
    pool.query(query, values,(err, res) => {
      if (err  || !res.rowCount) {
        reject(err)
      }
      if (res) {
        getUsersByIdData(id).then(user =>  resolve(user)).catch(e => console.log(e))
      }
    })
  })
}


const patchUser = (req, res) => {
  getUsersByIdData(req.params.id).then(user => {
    const requestBody = req.body;
    let query = 'UPDATE "user" SET';

    const values = [];

    if (requestBody.hasOwnProperty('gender')) {
      query += ' gender = $1,';
      values.push(requestBody.gender);
    }
    else if (!requestBody.hasOwnProperty('gender')) {
      query += ' gender = $1,';
      values.push(user.gender);
    }
    if (requestBody.hasOwnProperty('sexual_preferences')) {
      query += ' sexual_preferences = $2,';
      values.push(requestBody.sexual_preferences);
    }
    else if (!requestBody.hasOwnProperty('sexual_preferences')) {
      query += ' sexual_preferences = $2,';
      values.push(user.sexual_preferences);
    }
    if (requestBody.hasOwnProperty('biography')) {
      query += ' biography = $3,';
      values.push(requestBody.biography);
    }
    else {
      query += ' biography = $3,';
      values.push(user.biography);
    }
    if (requestBody.hasOwnProperty('interests')) {
      const interests = requestBody.interests;
      if (!Array.isArray(interests)) {
        return res.status(400).json({ error: 'Invalid interests' });
      }
      query += ' interests = $4,';
      values.push(interests);
    }
    else {
      const interests = user.interests ? user.interests : [];
      if (!Array.isArray(interests)) {
        return res.status(400).json({ error: 'Invalid interests' });
      }
      query += ' interests = $4,';
      values.push(interests);
    }
    values.push(user.id)
    if (requestBody.hasOwnProperty('first_name')) {
      query += ' first_name = $6,';
      values.push(requestBody.first_name);
    }
    else {
      query += ' first_name = $6,';
      values.push(user.first_name);
    }
    if (requestBody.hasOwnProperty('last_name')) {
      query += ' last_name = $7,';
      values.push(requestBody.last_name);
    }
    else {
      query += ' last_name = $7,';
      values.push(user.last_name);
    }
    if (requestBody.hasOwnProperty('username')) {
      query += ' username = $8,';
      values.push(requestBody.username);
    }
    else {
      query += ' username = $8,';
      values.push(user.username);
    }
    if (requestBody.hasOwnProperty('email')) {
      query += ' email = $9,';
      values.push(requestBody.email);
    }
    else {
      query += ' email = $9,';
      values.push(user.email);
    }
    query = query.slice(0, -1);
    query += ' WHERE id = $5';
    
    patchUsersById(req.params.id, query, values).then(user => {
      delete user.password
      console.log(user);
      res.status(200).json(user)
    }).catch(e => {
      console.log(e);
      res.status(400).json({ error: "Error searching user" });
    })
  })

}

module.exports = {
  getUsers,
  getUsersById,
  patchUser
};
