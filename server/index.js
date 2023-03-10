const express = require('express');
const app = express();
//engine to use embeded js 
// app.set('view engine', 'ejs');
app.use('/', require('./routes/login'));
app.use(require('./routes/error'));

const PORT = process.env.NODE_DOCKER_PORT ||  3000;
app.listen(PORT, console.log("Server don start for port: " + PORT))