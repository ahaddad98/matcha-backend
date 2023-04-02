const pool = require("../config/db.config");
const { getUsersByIdData } = require("./user.contoller");


const addLikersQuery = `
    INSERT INTO user_likes (user_id_liked, user_id_liker) VALUES ($2,$1);
`
const getLikedQuery = `
    SELECT user_id_liker FROM user_likes WHERE user_id_liked = $1;
`
const getLikersQeury = `
    SELECT user_id_liked FROM user_likes WHERE user_id_liker = $1;
`


function addLikes(values) {
  return new Promise((resolve, reject) => {
    pool.query(addLikersQuery, values, (err, res) => {
      if (err) {
        reject(err);
      }
      if (res) {
        resolve(res)
      }
    });
  });
}
function getmyLikers(values) {
  return new Promise((resolve, reject) => {
    pool.query(getLikersQeury, values, (err, res) => {
      if (err) {
        reject(err);
      }
      if (res) {
        resolve(res.rows)
      }
    });
  });
}
function getmyLikeds(values) {
  return new Promise((resolve, reject) => {
    pool.query(getLikedQuery, values, (err, res) => {
      if (err) {
        reject(err);
      }
      if (res) {
        resolve(res.rows)
      }
    });
  });
}


const postLikes = (req, res) => {
  const { user_id_liker, user_id_liked } = req.body;
  addLikes([user_id_liker, user_id_liked]).then(user => {
    res.status(200).json(user);
  })
  .catch ((e) => {
    res.status(400).json(e.detail)
  })
};
const getLikers = (req, res) => {
  // const { user_id_liker, user_id_liked } = req.body;
  console.log(req.user_id);
  getmyLikers([req.user_id]).then(user => {
    res.status(200).json(user);
  })
  .catch ((e) => {
    res.status(400).json(e.detail)
  })
};
const getLikeds = (req, res) => {
  // const { user_id_liker, user_id_liked } = req.body;
  getmyLikeds([req.user_id]).then(user => {
    res.status(200).json(user);
  })
  .catch ((e) => {
    res.status(400).json(e.detail)
  })
};


module.exports = {
    postLikes,
    getLikeds,
    getLikers
};
