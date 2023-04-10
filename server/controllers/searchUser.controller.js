const pool = require("../config/db.config");
const path = require("path");
const { getUsersByIdData } = require("./user.contoller");

function searchUsersBySomethings(query, values) {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      if (res) {
        resolve(res.rows)
      }
    });
  });
}

const searchUser = (req, res) => {
  getUsersByIdData(req.user_id)
    .then((user) => {
      const { distance, min_age, max_age, interests } = req.body;
      let query = 'SELECT * FROM "user" WHERE '
      let values = []
      if (distance) {
        query += `6371 * 2 * ASIN(SQRT(
          POWER(SIN((latitude - $1) * pi()/180 / 2), 2) +
          COS(latitude * pi()/180) *
          COS($1 * pi()/180) *
          POWER(SIN((longitude - $2) * pi()/180 / 2), 2))) <= $3 `
        values.push(user.latitude)
        values.push(user.longitude)
        values.push(distance)
      }
      if (min_age) {
        if (values.length == 0)
          query += `(DATE_PART('year', NOW()) - DATE_PART('year', birthday)) >= $1`
        else
          query += `AND (DATE_PART('year', NOW()) - DATE_PART('year', birthday)) >= $4 `
        values.push(min_age)
      }
      if (interests) {
        if (values.length === 0) {
          query += ` ARRAY[$1] <@ "user".interests;`
        }
        else if (values.length === 1) {
          query += ` AND ARRAY[$2] <@ "user".interests;`
        }
        else if (values.length > 1) {
          query += ` AND ARRAY[$5] <@ "user".interests;`
        }
        values.push(interests)
      }
      searchUsersBySomethings(query, values)
        .then((user) => {
          //   delete user.password;
          res.status(200).json(user);
        })
        .catch((e) => {
          res.status(400).json({ error: "Error searching user" });
        });
    })
    .catch(e => console.log(e))
};

module.exports = {
  searchUser,
};
