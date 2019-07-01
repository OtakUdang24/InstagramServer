// // import
"use strict";
const express = require('express');
const users = require('./routes/users');
const profile = require('./routes/profile');
const home = require('./routes/home');
const bodyParser = require('body-parser');
const config = require('./config');
const expressJWT = require('express-jwt');

const app = express();
const port = 3000

app.use(bodyParser.json());

app.use('/api/v1', users);
app.use('/api/v1', expressJWT({secret: config.secret}), profile);
app.use('/api/v1', expressJWT({secret: config.secret}), home);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))









