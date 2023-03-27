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

function patchImagessById(id, values) {
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

const patchImages = (req, res) => {
  const { id } = req.params;
  getUsersByIdData(id).then((user) => {
    const { profile_picture, pictures } = req.files;
    const profilePicturePath = profile_picture
      ? path.join(__dirname, profile_picture[0].filename)
      : user.profile_picture;
    const picturePaths = pictures
      ? pictures.map((pic) => path.join(__dirname, pic.filename))
      : null;
    patchImagessById(id, [picturePaths, id])
      .then((user) => {
        delete user.password;
        res.status(200).json(user);
      })
      .catch((e) => {
        console.log(e);
        res.status(400).json({ error: "Error searching user" });
      });
  });
};

module.exports = {
  patchImages,
  upload,
};
