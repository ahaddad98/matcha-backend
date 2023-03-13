//js
const express = require('express');
const {registerView} = require('../controllers/register.controller');
const {loginView} = require('../controllers/login.controller');
const router = express.Router();
router.post('/register', registerView);
router.post('/login', loginView);
module.exports = router;