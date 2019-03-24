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

const Order = sequenlize.import('../models/orders.js');
const OrderDetail = sequenlize.import('../models/orderDetails.js');

module.exports = server => {
    server.get('/orders', async (req, res, next) => {
        const orders = await Order.findAll();
        res.send(orders);
        next();
    });
    server.post('/orders', async (req, res, next) => {
        try {
            const {
                orderId,
                refno,
                qrRefno,
                invoiceno,
                ticket,
                grandtotal,
                recieved,
                change,
                paymentType,
                orderDateTime,
                orderFinishTime,
                settled,
                completed,
                status,
                userId,
                cashloadId,
                closed
            } = req.body;
            const order = await Order.create({
                orderId,
                refno,
                qrRefno,
                invoiceno,
                ticket,
                grandtotal,
                recieved,
                change,
                paymentType,
                orderDateTime,
                orderFinishTime,
                settled,
                completed,
                status,
                userId,
                cashloadId,
                closed
            });
            res.send(order);
            next();
        } catch (err) {
            console.log(err.message);
            res.send({ status: 'error' });
            next();
        }
    });
    server.post('/orderdetails', async (req, res, next) => {
        try {
            const orderDetail = await OrderDetail.create(
                req.body
            );
            res.send(orderDetail);
            next();
        } catch (err) {
            console.log(err.message);
            res.send({ status: 'error' });
            next();
        }
    });
    server.put('/orders/:id', async (req, res, next) => {
        try {
            const order = await Order.update(req.body, {
                where: {
                    orderId: req.params.id
                }
            });
            res.send({ status: 'success' });
            next();
        } catch (err) {
            console.log(err.message);
            res.send({ status: 'error' });
            next();
        }
    });
    server.get('/unsettled/:id', async (req, res, next) => {
        try {
            const unsettled = await sequenlize.query('select * from orders where userId=' + req.params.id + ' and settled = 0 and date(orderDateTime) = date(now())', { type: sequelize.QueryTypes.SELECT }).then(unsettle => {
                res.send(unsettle);
                next();
            }).catch((err) => {
                console.log(err);
                res.send({ status: 'error' });
                next();
            });
        } catch (err) {
            console.log(err.message);
            res.send({ status: 'error' });
            next();
        }
    });
    server.get('/orderIncomplete/:id', async (req, res, next) => {
        try {
            const incompleteOrder = await Order.findAndCountAll({
                where: {
                    settled: 0,
                    completed: 0,
                    userId: req.params.id
                }
            }).then(result => {
                res.send({ status: result.count });
                next();
            });
        } catch (err) {
            console.log(err.message);
            res.send({ status: 'error' });
            next();
        }
    });
    server.post('/orderEOD/:id', async (req, res, next) => {
        try {
            const orderEOD = await sequenlize.query("select  case paymentType  when 'CASH' then 'CASH'   ELSE 'BANK'  end as PaidType  , count(*) as cnt , sum(grandtotal) as total from orders where cashloadId=" + req.body.cashloadId + " and userId=" + req.params.id + " and settled = 0 and completed = 1 group by  PaidType", { type: sequelize.QueryTypes.SELECT }).then(result => {
                res.send(result);
                next();
            }).catch((err) => {
                console.log(err);
                res.send({ status: 'error' });
                next();
            });
        } catch (err) {
            console.log(err.message);
            res.send({ status: 'error' });
            next();
        }
    });
    server.put('/orderBatchSettle/:cashloadId', async (req, res, next) => {
        try {
            const order = await Order.update(req.body, {
                where: {
                    cashloadId: req.params.cashloadId,
                    settled: 0,
                    status: 'completed',
                }
            }).then(() => {
                res.send({ status: 'success' });
                next();
            }).catch((err) => {
                console.log(err);
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
