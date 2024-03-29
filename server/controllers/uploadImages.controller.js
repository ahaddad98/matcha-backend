const pool = require("../config/db.config");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const multer = require("multer");
const path = require("path");
const { getUsersByIdData } = require("./user.contoller");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Check file type, size, etc.
    // ...
    cb(null, true);
  },
}).fields([
  { name: "profile_picture", maxCount: 1 },
  { name: "pictures", maxCount: 4 },
]);
// const upload = multer({ dest: "upload" , limits: { fileSize: 1024 * 1024 * 10 }});

const updateQuery = `
  INSERT INTO "pictures"
  (user_id, url)
  VALUES ($2, $1);
`;

const updateProfilePicQuery = `
  UPDATE "user" 
  SET profile_picture = $2
  WHERE id=$1; 
`;

function patchImagessById(id, values) {
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
function patchProfilePicsById(id, values) {
  return new Promise((resolve, reject) => {
    // console.log(values);
    pool.query(updateProfilePicQuery, values, (err, res) => {
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

const patchImages = (req, res) => {
  const { id } = req.params;
  getUsersByIdData(id).then((user) => {
    const { profile_picture, pictures } = req.files;
    const profilePicturePath = profile_picture
      ? path.join(profile_picture[0].filename)
      : null;
    const picturePaths = pictures ? pictures.map((pic) => pic.filename) : [];
    let promises = [];
    if (profilePicturePath) {
      promises.push(patchProfilePicsById(id, [id, profilePicturePath]))
    }
    if (picturePaths.length) {
      for (let index = 0; index < picturePaths.length; index++) {
        promises.push(patchImagessById(id, [picturePaths[index], id]));
        // patchImagessById(id, [picturePaths[index], id])
      }
    }
    let userData;

    Promise.all(promises)
      .then((users) => {
        userData = users[0];
        delete userData.password;
      })
      .catch((e) => {
        res.status(400).json({ error: "Error searching user" });
      })
      .finally(() => {
        console.log(userData);
        res.status(200).json(userData);
      });
  });
};

module.exports = {
  patchImages,
  upload,
};
