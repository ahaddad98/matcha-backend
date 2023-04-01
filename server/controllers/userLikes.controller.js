const pool = require("../config/db.config");
const { getUsersByIdData } = require("./user.contoller");


const addLikersQuery = `
    INSERT INTO user_likes (user_id_liked, user_id_liker) VALUES (123, 456);
`
const getLikedQuery = `
    INSERT INTO user_likes (user_id_liked, user_id_liker) VALUES (123, 456);
`
const getLikersQeury = `
    SELECT user_id_liked FROM user_likes WHERE user_id_liker = Y;
`


function getLikes(id, values) {
  return new Promise((resolve, reject) => {
    pool.query(updateQuery, values, (err, res) => {
      if (err) {
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


const postLikes = (req, res) => {
  const { id } = req.params;
  
};

module.exports = {
    postLikes
};
