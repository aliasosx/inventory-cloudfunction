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

const Unit = sequenlize.import('../models/units.js');

module.exports = server => {
    server.get('/units', async (req, res, next) => {
        try {
            const units = await Unit.findAll();
            res.send(units);
            next();
        } catch (err) {
            console.log(err);
        }
    });
    server.get('/units/:id', async (req, res, next) => {
        try {
            const units = await Unit.findByPk(req.params.id);
            res.send(units);
            next();
        } catch (err) {
            console.log(err);
        }
    });
}
