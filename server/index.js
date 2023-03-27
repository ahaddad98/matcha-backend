require("dotenv").config() 
const express = require('express');
const app = express();
const pool = require('./config/db.config');
//engine to use embeded js 
app.use(express.static('upload'));
app.use(express.json())
// app.set('view engine', 'ejs');
app.use('/', require('./routes/login'));
app.use('/users', require('./routes/user'));
app.use(require('./routes/error'));
const PORT = process.env.NODE_DOCKER_PORT ||  4000;
app.listen(PORT, console.log("Server don start for port: " + PORT))
/*
SELECT *
FROM users
WHERE acos(sin(:lat)*sin(radians(latitude)) + cos(:lat)*cos(radians(latitude))*cos(radians(longitude)-:lng)) * 6371 <= 1;
*/
