const pool = require("../config/db.config");
const { getUsersByIdData } = require("./user.contoller");


const addLikersQuery = `
    INSERT INTO user_likes (user_id_liked, user_id_liker) VALUES ($2,$1);
`
// RETURNING id
const addMatchQuery = `
    INSERT INTO user_matches (user_id, matched_user_id) VALUES ($1, $2);
`
const getMyMatchsQuery = `
    SELECT * FROM user_matches WHERE user_id = $1;
`
const getLikedQuery = `
    SELECT user_id_liker FROM user_likes WHERE user_id_liked = $1;
`
const getLikersQeury = `
    SELECT user_id_liked FROM user_likes WHERE user_id_liker = $1;
`


function addMatches(values) {
  return new Promise((resolve, reject) => {
    pool.query(addMatchQuery, values, (err, res) => {
      if (err) {
        reject(err);
      }
      if (res) {
        resolve(res)
      }
    });
  });
}

function getMatches(values) {
  return new Promise((resolve, reject) => {
    pool.query(getMyMatchsQuery, values, (err, res) => {
      if (err) {
        reject(err);
      }
      if (res) {
        resolve(res)
      }
    });
  });
}


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

const getLikers = (req, res) => {
  console.log(req.user_id);
  getmyLikers([req.user_id]).then(user => {
    res.status(200).json(user);
  })
    .catch((e) => {
      res.status(400).json(e.detail)
    })
};
const getMyMachts = (req, res) => {
  console.log(req.user_id);
  getMatches([req.user_id]).then(user => {
    res.status(200).json(user.rows);
  })
    .catch((e) => {
      res.status(400).json(e.detail)
    })
};
const getLikeds = (req, res) => {
  getmyLikeds([req.user_id]).then(user => {
    res.status(200).json(user);
  })
    .catch((e) => {
      res.status(400).json(e.detail)
    })
};

const postLikes = (req, res) => {
  const { user_id_liker, user_id_liked } = req.body;
  getmyLikeds([req.user_id]).then(likeds => {
    var ismatch = likeds.find(liker => liker.user_id_liker === user_id_liked);
    if (!ismatch) {
      addLikes([user_id_liker, user_id_liked]).then(user => {
        res.status(200).json({status: 200, isMactch: false});
      })
        .catch((e) => {
          res.status(400).json(e.detail)
        })
    }
    else {
      addLikes([user_id_liker, user_id_liked]).then(user => {
      })
        .catch((e) => {
          res.status(400).json(e.detail)
        })
      addMatches([user_id_liker, user_id_liked]).then((user) => {
        res.status(200).json({user, ismatch: true});
      }).catch((e) => {
          res.status(400).json(e.detail)
      })
      addMatches([user_id_liked, user_id_liker]).then((user) => {
        res.status(200).json({user, ismatch: true});
      }).catch((e) => {
          res.status(400).json(e.detail)
      })
    }
  })
};

module.exports = {
  postLikes,
  getLikeds,
  getLikers,
  getMyMachts,
};
