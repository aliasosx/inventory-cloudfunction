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

const Product = sequenlize.import('../models/products.js');
const Stock = sequenlize.import('../models/stocks.js');
const StockTracking = sequenlize.import('../models/stocktrackings.js')

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
            let odr = await updateStock(req.body);
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
            // Check Cancel Order
            console.log(req.body);
            if (req.body.status === 'canceled') {
                console.log('Cancel Order process');
                const order = await Order.update(req.body, {
                    where: {
                        orderId: req.params.id
                    }
                });
                // get Order Details

                const orderDetails = await OrderDetail.findAll({
                    raw: true,
                    where: {
                        orderId: req.params.id
                    },
                }).then(async (odrs) => {
                    console.log(odrs);
                    odrs.forEach(async (odr) => {
                        console.log(odr);
                        odr.quantity = parseInt(odr.quantity) * (-1);
                        let c = await updateStock(odr);
                    });
                });

                res.send({ status: 'success' });
                next();
            } else {
                const order = await Order.update(req.body, {
                    where: {
                        orderId: req.params.id
                    }
                });
                res.send({ status: 'success' });
                next();
            }

        } catch (err) {
            console.log(err.message);
            res.send({ status: 'error' });
            next();
        }
    });
    // Stock update 
    async function updateStock(order) {
        // console.log(order);
        let title = '';
        if (order.quantity < 0) {
            title = 'Reversal';
        } else {
            title = 'Update';
        }
        const product = await Product.findAll({
            raw: true,
            limit: 1,
            where: {
                foodId: order.foodId
            }
        }).then(async (rsp_product) => {
            console.log(rsp_product);
            if (rsp_product[0].id) {
                // Get Current stock by Product Id
                const stockAtCurrent = await Stock.findAll({
                    raw: true,
                    limit: 1,
                    where: {
                        productId: rsp_product[0].id
                    }
                }).then(async (rsp_stock) => {
                    console.log(rsp_stock);
                    if (rsp_stock[0].id) {
                        const stock = await Stock.update({
                            previous_quantity: rsp_stock[0].current_quantity,
                            used_quantity: order.quantity,
                            current_quantity: rsp_stock[0].current_quantity - order.quantity,
                            remarks: title + ' stock sale order with refno ' + order.orderId,
                            userId: order.userId
                        }, {
                                where: {
                                    id: rsp_stock[0].id
                                }
                            }).then(async (rsp_stock_update) => {
                                console.log('################## Stock updated id ' + rsp_stock[0].id + ' ##################');
                                const latest_stock = await Stock.findByPk(rsp_stock[0].id, {
                                    raw: true
                                });
                                let c = await stockTrackingUpdate(latest_stock);
                            });
                    }
                });
            } else {
                console.log('################## Food not existing on Product salable ##################');
                return;
            }
        });
    }

    // stock tracking update 
    async function stockTrackingUpdate(stock) {
        console.log(stock);
        const stockTracking = await StockTracking.create({
            stockId: stock.id,
            sourceId: 2,
            previous_quantity: stock.previous_quantity,
            used_quantity: stock.used_quantity,
            current_quantity: stock.current_quantity,
            remarks: stock.remarks,
            userId: stock.userId
        }, {
                raw: true
            }).then(async (rsp) => {
                // console.log(rsp);
                console.log('################## Stock tracking created with id ' + rsp.id + ' ##################');
                let a = await updateProductCurrentQuantity(stock);
            });
    }

    // update product at current use

    async function updateProductCurrentQuantity(stock) {
        const product = await Product.update({
            currentQuantity: stock.current_quantity
        }, {
                where: {
                    id: stock.productId
                }
            }).then(async (rsp_product) => {
                console.log('################## Product current quantity has been updated with id ' + stock.productId + ' ##################');
            });
    }

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
