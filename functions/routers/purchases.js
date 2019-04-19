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
                console.log(rsp);
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
        console.log(req.body);
        try {
            const purchaseDetail = await PurchaseDetail.create(req.body).then(async (rsp) => {

                let stk = await stockController.stockUpdate(req.body, 'purchase');

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

            // Clear stock before delete

            const purchaseDetail = await PurchaseDetail.count({
                raw: true,
                where: {
                    purchaseId: req.params.id,
                }
            }).then(async (_purchaseDetails) => {
                if (_purchaseDetails > 0) {
                    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!! Bill have product detail should be remove item one by one !!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                    res.send({ status: 'error' });
                    next();
                } else {

                    const purchase = await Purchase.destroy({
                        where: {
                            id: req.params.id,
                            approved: 0,
                        }
                    }).then(async (rsp) => {
                        if (rsp === 1) {
                            res.send({ status: 'success' });
                            next();
                        } else if (rsp === 0) {
                            res.send({ status: 'error' });
                            next();
                        }

                    }).catch(err => {
                        console.log(err);
                        res.send({ status: 'error' });
                        next();
                    });
                }
            });
        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
            next();
        }
    });

    server.delete('/purchasedetails/:id', async (req, res, next) => {
        try {
            // Clear stock before delete
            const purchaseDetailByPk = await PurchaseDetail.findByPk(req.params.id).then(async (_purchase_rsp) => {
                console.log(_purchase_rsp.dataValues);
                let c = await stockController.stockUpdate(_purchase_rsp.dataValues, 'purchase-rev');
                const purchaseDetail = await PurchaseDetail.destroy({
                    where: {
                        id: req.params.id,
                    }
                }).then(async (rsp) => {
                    res.send({ status: 'success' });
                    next();
                }).catch(err => {
                    console.log(err);
                    res.send({ status: 'error' });
                    next();
                });
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