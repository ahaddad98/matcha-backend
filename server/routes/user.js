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
const JWT_SECRET = process.env.JWT_SECRET;
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Unauthorized request");
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
}
router.get("/", getUsers);
router.get("/:id", getUsersById);
router.patch("/:id", patchUser);
router.patch(
  "/pictures/:id",
  upload,
  patchImages
);
// router.post('/:id', loginView);
module.exports = router;
