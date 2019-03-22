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
                userId } = req.body;
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
                userId
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
}
