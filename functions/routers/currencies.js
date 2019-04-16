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

const Currency = sequenlize.import('../models/currencies.js');

module.exports = server => {
    server.get('/currencies', async (req, res, next) => {
        try {
            const curr = await Currency.findAll();
            res.send(curr);
            next();
        } catch (err) {
            console.log(err);
            // res.send({ status: 'error' });
            // next();
        }
    });
}