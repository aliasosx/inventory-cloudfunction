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
    server.get('/purchasesDetailByPurchaseId/:id', async (req, res, next) => {
        try {
            let sql = 'select pd.id as pid, pd.purchaseId, p.product_name,pd.price,pd.quantity, pd.remarks,pd.total from purchaseDetails pd , products p where pd.productId = p.id and pd.purchaseId = ' + req.params.id
            const purchaseDetail = await sequenlize.query(sql, { type: sequelize.QueryTypes.SELECT }).then(async (rsp) => {
                console.log(rsp);
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
    server.put('/purchases/:id', async (req, res, next) => {
        try {
            const purchase = await Purchase.update(req.body, {
                where: {
                    id: req.params.id
                }
            }).then((rsp) => {
                res.send({ status: 'success' });
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

    server.delete('/purchases/:id', async (req, res, next) => {
        try {
            const purchaseDetail = await Purchase.destroy({
                where: {
                    id: req.params.id
                }
            }).then(async (rsp) => {
                res.send({ status: 'success' });
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

    server.delete('/purchasedetails/:id', async (req, res, next) => {
        try {
            const purchaseDetail = await PurchaseDetail.destroy({
                where: {
                    id: req.params.id
                }
            }).then(async (rsp) => {
                res.send({ status: 'success' });
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

    server.get('/billingAmountCheck/:id', async (req, res, next) => {
        try {
            const purchase = await Purchase.findByPk(req.params.id, {
                limit: 1
            });
            res.send(purchase);
            next();
        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
            next();
        }
    });
    server.get('/overBillingAmountCheck/:id', async (req, res, next) => {
        try {
            let sql = 'select sum(total) as BillTotal from purchaseDetails where purchaseId=' + req.params.id;
            const purchase = await sequenlize.query(sql, { type: sequelize.QueryTypes.SELECT });
            console.log(purchase);
            if (purchase) {
                res.send(purchase);
                next();
            } else {
                res.send(0);
                next();
            }

        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
            next();
        }
    });

    server.get('/purchasesDisplay', async (req, res, next) => {
        try {
            let sql = 'select ps.id as pid,ps.billDate,ps.approveNameBy, ps.billAmount,ps.billNo,sp.supplier_name,us.username,approveBy,approvedDate,approved from purchases ps , suppliers sp , users us where  ps.userId  = us.id and ps.supplierId = sp.id';
            const purchase = await sequenlize.query(sql, { type: sequelize.QueryTypes.SELECT });
            res.send(purchase);
            next();
        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
            next();
        }
    });
}