const express = require("express");
const {
  getUsers,
  getUsersById,
  patchUser,
} = require("../controllers/user.contoller");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  patchImages,
  upload,
} = require("../controllers/uploadImages.controller");
const { searchUser } = require("../controllers/searchUser.controller");
const JWT_SECRET = process.env.JWT_SECRET;
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).send("Unauthorized request");
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    req['user_id'] = decoded.id;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send("heheh");
  }
}
router.get("/", verifyToken, getUsers);
router.get("/search", verifyToken, searchUser);
router.get("/:id", getUsersById);
router.patch("/:id", patchUser);
router.patch(
  "/pictures/:id",
  upload,
  patchImages
);
// router.post('/:id', loginView);
module.exports = router;
