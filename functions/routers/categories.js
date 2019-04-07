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

const Category = sequenlize.import('../models/categories.js');

module.exports = server => {
    server.get('/categories', async (req, res, next) => {
        const categories = await Category.findAll();
        res.send(categories);
        next();
    });
}