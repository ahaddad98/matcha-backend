//js
const express = require('express');
const {registerView, loginView } = require('../controllers/login.controller');
const router = express.Router();
router.post('/register', registerView);
router.post('/login', loginView);
module.exports = router;