//js
const express = require('express');
const router = express.Router();
router.all('*', (req, res) => {
    return res.send("Not Found")
});
module.exports = router;