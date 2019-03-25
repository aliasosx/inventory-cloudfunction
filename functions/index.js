const functions = require('firebase-functions');
const express = require('express');
const jwt = require('express-jwt');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');
const config = require('./config/config');


server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());
// protect by JWT
server.use(jwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth', '/register', '/authverify', '/uploads'] }));
// Router
require('./routers/routers')(server);
require('./routers/users')(server);
require('./routers/products')(server);
require('./routers/stocks')(server);
require('./routers/cashloads')(server);
require('./routers/orders')(server);
require('./routers/kitchens')(server);
require('./routers/roles')(server);
require('./routers/administratives')(server);


// Initialize api
exports.api = functions.https.onRequest(server);
