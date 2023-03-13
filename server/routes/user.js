const express = require('express');
const {getUsers, getUsersById} = require('../controllers/user.contoller')
const router = express.Router();
router.get('/', getUsers);
router.get('/:id', getUsersById);
// router.post('/:id', loginView);
module.exports = router;