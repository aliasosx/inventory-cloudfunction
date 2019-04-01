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
}