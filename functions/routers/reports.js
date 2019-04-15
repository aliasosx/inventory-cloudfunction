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

module.exports = server => {
    server.post('/obsoletetreportsbyfoods', async (req, res, next) => {
        try {
            const sql = "select ot.full_food_name food_name, sum(ot.quantity) as count,sum(fd.cost * ot.quantity) cost, sum(fd.price*ot.quantity) total from letterp.food fd , letterp.orders o , letterp.orderdetails ot where fd.id = ot.foodId and ot.orderId = o.id and o.statusId = 2 and fd.kitchenId = '" + req.body.kitchenId + "' and date(o.order_datetime) between date('" + req.body.dt + "') and date('" + req.body.edt + "')  group by  fd.id order by  count desc ";
            const reports = await sequenlize.query(sql, { type: sequelize.QueryTypes.SELECT });
            res.send(reports);
            next();
        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
            next();
        }
    });
    server.post('/reportsRevByDateRange', async (req, res, next) => {
        try {
            const sql = "select count(*) as count,sum(od.total_cost) as total_cost, sum(od.total_price) as total , (sum(od.total_price) - sum(od.total_cost)) as profit from orders o , orderDetails od where o.orderId = od.orderId and date(orderDateTime) between date('" + req.body.startDt + "') and date('" + req.body.endDt + "') and o.completed = 1 and o.status='completed'";
            const reports = await sequenlize.query(sql, { type: sequelize.QueryTypes.SELECT });

            res.send(reports);
            next();
        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
            next();
        }
    });
    server.post('/reportsRevByUsersByDateRange', async (req, res, next) => {
        try {
            const sql = "select u.username as username,count(*) as count,sum(od.total_cost) as total_cost, sum(od.total_price) as total , (sum(od.total_price) - sum(od.total_cost)) as profit from orders o , orderDetails od, users u where o.orderId = od.orderId and o.userId = u.id and date(orderDateTime) between date('" + req.body.startDt + "') and date('" + req.body.endDt + "') and o.completed = 1 and o.status='completed' group by  u.username";
            const reports = await sequenlize.query(sql, { type: sequelize.QueryTypes.SELECT });

            res.send(reports);
            next();
        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
            next();
        }
    });
    server.post('/reportsRevByKitchenByDateRange', async (req, res, next) => {
        try {
            const sql = "select kt.kitchenName as kitchenName,count(*) as count,sum(od.total_cost) as total_cost, sum(od.total_price) as total , (sum(od.total_price) - sum(od.total_cost)) as profit from orders o , orderDetails od , foods fd , kitchens kt where o.orderId = od.orderId and fd.id = od.foodId and fd.kitchenId = kt.id and date(orderDateTime) between date('" + req.body.startDt + "') and date('" + req.body.endDt + "') and o.completed = 1 and o.status='completed' group by kt.kitchenName";
            const reports = await sequenlize.query(sql, { type: sequelize.QueryTypes.SELECT });

            res.send(reports);
            next();
        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
            next();
        }
    });
    server.post('/reportsRevByFoodTypeByDateRange', async (req, res, next) => {
        try {
            const sql = "select ft.foodTypeName as foodTypeName,count(*) as count,sum(od.total_cost) as total_cost, sum(od.total_price) as total , (sum(od.total_price) - sum(od.total_cost)) as profit from orders o , orderDetails od , foods fd , kitchens kt, foodType ft where o.orderId = od.orderId and fd.id = od.foodId and fd.kitchenId = kt.id and fd.foodTypeId = ft.id and date(orderDateTime) between date('" + req.body.startDt + "') and date('" + req.body.endDt + "') and o.completed = 1 and o.status='completed' group by ft.foodTypeName order by total desc";
            const reports = await sequenlize.query(sql, { type: sequelize.QueryTypes.SELECT });

            res.send(reports);
            next();
        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
            next();
        }
    });
    server.post('/reportsRevByPaymentByDateRange', async (req, res, next) => {
        try {
            const sql = "select o.paymentType as paymentType,count(*) as count,sum(od.total_cost) as total_cost, sum(od.total_price) as total , (sum(od.total_price) - sum(od.total_cost)) as profit from orders o , orderDetails od , foods fd , kitchens kt, foodType ft where o.orderId = od.orderId and fd.id = od.foodId and fd.kitchenId = kt.id and fd.foodTypeId = ft.id and date(orderDateTime) between date('" + req.body.startDt + "') and date('" + req.body.endDt + "') and o.completed = 1 and o.status='completed' group by o.paymentType order by total desc";
            const reports = await sequenlize.query(sql, { type: sequelize.QueryTypes.SELECT });

            res.send(reports);
            next();
        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
            next();
        }
    });
    server.post('/reportsRevByFoodsByDateRange', async (req, res, next) => {
        try {
            const sql = "select fd.food_name as food_name,count(*) as count,sum(od.total_cost) as total_cost, sum(od.total_price) as total , (sum(od.total_price) - sum(od.total_cost)) as profit from orders o , orderDetails od , foods fd , kitchens kt, foodType ft where o.orderId = od.orderId and fd.id = od.foodId and fd.kitchenId = kt.id and fd.foodTypeId = ft.id and date(orderDateTime) between date('" + req.body.startDt + "') and date('" + req.body.endDt + "') and o.completed = 1 and o.status='completed' group by fd.food_name order by total desc";
            const reports = await sequenlize.query(sql, { type: sequelize.QueryTypes.SELECT });

            res.send(reports);
            next();
        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
            next();
        }
    });
}