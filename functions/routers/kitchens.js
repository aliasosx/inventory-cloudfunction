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

const Kitchen = sequenlize.import('../models/kitchens.js');

module.exports = server => {
    server.get('/kitchens', async (req, res, next) => {
        const kitchens = await Kitchen.findAll({
            where: {
                enabled: 1
            }
        });
        res.send(kitchens);
        next();
    });
}