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

const stockController = require('../controllers/stockController');

const Purchase = sequenlize.import('../models/purchases.js');
const PurchaseDetail = sequenlize.import('../models/purchaseDetails.js');

module.exports = server => {
    server.post('/purchases', async (req, res, next) => {
        try {
            const purchase = await Purchase.create(req.body).then(async (rsp) => {
                res.send(rsp);
                next();
            }).catch((err) => {
                console.log(err);
                res.send({ status: 'error' });
                next();
            });
        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
            next();
        }
    });
    server.post('/purchasedetails', async (req, res, next) => {
        try {
            const purchaseDetail = await PurchaseDetail.create(req.body).then(async (rsp) => {
                res.send(rsp);
                next();
            }).catch(err => {
                console.log(err);
                res.send({ status: 'error' });
                next();
            });
        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
            next();
        }
    });
}