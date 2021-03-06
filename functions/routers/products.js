const Sequelize = require('sequelize');

const bcrypt = require('bcrypt');
const config = require('../config/config');
const auth = require('../auth/auth');
const sequenlize = require('../config/db');
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken');
const errors = require('restify-error');

const Product = sequenlize.import('../models/products.js');
const Stock = sequenlize.import('../models/stocks.js');
const StockTracking = sequenlize.import('../models/stocktrackings.js')

module.exports = server => {
    // list all products
    server.get('/products', async (req, res, next) => {
        const products = await Product.findAll();
        res.send(products);
        next();
    });
    // create product
    server.post('/products', async (req, res, next) => {
        // const { product_code, product_name, product_description, cost, price, quantity, currencyId, categoryId, supplierId, unitId, expireDate, userId } = req.body;
        console.log(req.body);
        try {
            const product = await Product.create(req.body);
            console.log(product);
            console.log('product add new completed.')

            const stockCreate = await createStock(product.dataValues);

            res.send({ status: 'success' });
            next();
        } catch (err) {
            console.log(err.message);
            res.send({ status: 'error', message: err.message });
            next();
        }
    });

    // update new stock
    async function createStock(product) {
        try {
            const rand = Math.floor(Math.random() * 1000);
            const refno = pad('000000000000', rand, true);
            stock_refno = refno;

            const stock = await Stock.create({
                stock_refno: stock_refno,
                productId: product.id,
                previous_quantity: 0,
                used_quantity: 0,
                current_quantity: product.currentQuantity,
                minimum_quantity: product.minimum,
                remarks: 'Add new product',
                userId: product.userId
            });
            console.log('Stock add new completed.')
        } catch (err) {
            console.log(err.message);
        }

    }

    // Get Product by ID
    server.get('/product/:id', async (req, res, next) => {
        const product = await Product.findByPk(req.params.id);
        res.send(product);
        next();
    });
    // update product
    server.put('/product/:id', async (req, res, next) => {
        // console.log(req.body);
        try {
            const product = await Product.update(req.body, {
                where: {
                    id: req.params.id,
                }
            }).then(async (rsp) => {
                console.log(rsp);
                console.log('################## Product id ' + req.body.id + ' done! ##################');
                const c = await updateStock(req.body);
                res.send({ status: 'success' });
                next();
            });

        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
        }
    });
    async function updateStock(product) {
        console.log(product);
        const curr_stock = await Stock.findAll({
            limit: 1,
            raw: true,
            where: {
                productId: product.id,
            },
        });
        console.log(curr_stock[0].id);
        const stock = await Stock.update({
            stock_refno: curr_stock[0].stock_refno,
            productId: product.id,
            previous_quantity: curr_stock[0].current_quantity,
            used_quantity: product.currentQuantity - curr_stock[0].current_quantity,
            current_quantity: product.currentQuantity,
            minimum_quantity: product.minimum,
            remarks: 'update stock manual from product page from ' + curr_stock[0].current_quantity + ' to ' + product.currentQuantity,
            userId: product.userId
        }, {
                where: {
                    productId: product.id
                }
            });

        const latest_stock = await Stock.findByPk(curr_stock[0].id, {
            raw: true
        });
        console.log('################## After update ##################');
        console.log(latest_stock)
        let a = await stock_tracking(latest_stock);
        console.log('################## Stock update successfull ! ##################');
    }

    async function stock_tracking(stock) {
        const stockTracking = await StockTracking.create({
            stockId: stock.id,
            sourceId: 3,
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
                // let c = await updateProductCurrentQuantity(stock);
            });

    }

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

    server.get('/productsDisplay', async (req, res, next) => {
        try {
            const products = await sequenlize.query('select p.id as pid, p.barcode,p.foodId, p.photo , u.unit_name,p.product_code, p.product_description, p.product_name,p.cost, p.price,p.quantity,c.currency_name,ct.category_name,s.supplier_name,p.createdAt,us.username, p.minimum, p.currentQuantity, u.unit_name from products p, currencies c , categories ct, suppliers s , units u , users us where p.currencyId = c.id and p.currencyId = c.id and p.categoryId = ct.id and p.supplierId = s.id and p.unitId = u.id and p.userId = us.id', { type: sequelize.QueryTypes.SELECT });
            res.send(products);
            next();
        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
            next();
        }
    });
    server.delete('/product/:id', async (req, res, next) => {
        try {
            const product = await Product.destroy({
                where: {
                    id: req.params.id
                }
            }).then(rs => {
                res.send({ status: 'success' });
                next();
            }).catch(err => {
                res.send({ status: 'error' });
                next();
            });
        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
            next();
        }
    });
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