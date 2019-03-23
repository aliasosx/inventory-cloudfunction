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

const Role = sequenlize.import('../models/roles.js');

module.exports = server => {
    server.get('/roles', async (req, res, next) => {
        const roles = await Role.findAll({
            where: {
                enabled: 1
            }
        });
        res.send(roles);
        next();
    });
}