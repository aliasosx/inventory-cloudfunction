/* Requirment libs */
const Sequelize = require('sequelize');

const bcrypt = require('bcrypt');
const config = require('../config/config');
const auth = require('../auth/auth');
const sequenlize = require('../config/db');
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken');
const errors = require('restify-error');
/* End Requirment libs */

const Supplier = sequenlize.import('../models/suppliers.js');

module.exports = server => {
    server.get('/suppliers', async (req, res, next) => {
        const suppliers = await Supplier.findAll();
        res.send(suppliers);
        next();
    });
}