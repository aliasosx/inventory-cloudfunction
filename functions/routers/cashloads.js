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

const Cashload = sequenlize.import('../models/cashloads.js');

module.exports = server => {
    server.get('/cashloads', async (req, res, next) => {
        try {
            const cashloads = await Cashload.findAll();
            res.send(cashloads);
            next();
        } catch (err) {
            res.send(err.message);
            next();
        }
    });
    // load new Bal
    server.post('/cashloads', async (req, res, next) => {
        const { loadDateTime, initBalance, openAuthorizedBy, loadApproved, eodCashBalance, eodBankBalance, cashBalance, cashInHands, closeBalance, totalSellAmount, close, closeDatetime, closeby, closeAuthorizedBy, closeApproved, note } = req.body;
        try {
            const cashload = Cashload.create({
                loadDateTime, initBalance, openAuthorizedBy, loadApproved, eodCashBalance, eodBankBalance, cashBalance, cashInHands, closeBalance, totalSellAmount, close, closeDatetime, closeby, closeAuthorizedBy, closeApproved, note
            }).then((x) => {
                res.send({ status: 'success' });
                next();
            }).catch((err) => {
                console.log(err.message);
                res.send({ status: 'error' });
                next();
            });
        } catch (err) {
            console.log(err.message);
            res.send({ status: 'error' });
            next();
        }
    });

    // delete cashload
    server.delete('/cashloads/:id', async (req, res, next) => {
        try {
            const cashload = await Cashload.destroy({
                where: {
                    id: req.params.id
                }
            }).then(() => {
                res.send({ status: 'success' });
                next();
            }).catch((err) => {
                res.send({ status: 'error' });
                next();
            });
        } catch (err) {
            console.log(err.message);
            res.send({ status: 'error' });
            next();
        }
    });

}