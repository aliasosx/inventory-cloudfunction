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

const Stock = sequenlize.import('../models/stocks.js');
const StockTracking = sequenlize.import('../models/stocktrackings.js');
const Product = sequenlize.import('../models/products.js');

module.exports = stockController => {
    function stockUpdate(order) {

    }
}