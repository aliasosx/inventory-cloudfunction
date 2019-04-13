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
const StockHistory = sequenlize.import('../models/stocktrackings.js');

module.exports = server => {
    // Load all stocks
    server.get('/stocks', async (req, res, next) => {
        const stocks = await Stock.findAll();
        res.send(stocks);
        next();
    });
    // create stocks
    server.post('/stocks', async (req, res, next) => {
        try {
            const { productId, previous_quantity, used_quantity, current_quantity, minimum_quantity, remarks, userId } = req.body;
            const rand = Math.floor(Math.random() * 1000);
            const refno = pad('000000000000', rand, true);
            stock_refno = refno;

            const stocks = Stock.create({
                productId, previous_quantity, used_quantity, current_quantity, minimum_quantity, remarks, userId, stock_refno
            }).then((x) => {
                updateStockHistory(x);
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

    server.get('/stocksdisplay', async (req, res, next) => {
        const sql = 'select s.id as sid, s.stock_refno as stock_refno , p.product_name as product_name,s.previous_quantity , s.used_quantity, s.current_quantity,s.minimum_quantity, s.remarks, u.username, un.unit_name from stocks s , products p , users u , units un where s.productId = p.id and s.userId = u.id and p.unitId = un.id order by s.current_quantity asc ';
        try {
            const stocks = await sequenlize.query(sql, { type: sequelize.QueryTypes.SELECT });
            res.send(stocks);
            next();
        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
            next();
        }
    });


    async function updateStockHistory(stock) {
        try {
            const stockHistory = await StockHistory.create({
                stockId: stock.id,
                sourceId: 3,
                previous_quantity: stock.previous_quantity,
                used_quantity: stock.used_quantity,
                current_quantity: stock.current_quantity,
                remarks: 'Manual add Quantity',
                userId: stock.userId
            }).then((x) => {
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
    }
    function pad(pad, str, padLeft) {
        if (typeof str === 'undefined')
            return pad;
        if (padLeft) {
            return (pad + str).slice(-pad.length);
        } else {
            return (str + pad).substring(0, pad.length);
        }
    }
}
