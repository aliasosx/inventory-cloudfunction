const Sequelize = require('sequelize');

const bcrypt = require('bcrypt');
const config = require('../config/config');
const auth = require('../auth/auth');
const sequenlize = require('../config/db');
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken');
const errors = require('restify-error');

const Product = sequenlize.import('../models/products.js');


module.exports = server => {
    // list all products
    server.get('/products', async (req, res, next) => {
        const products = await Product.findAll();
        res.send(products);
        next();
    });
    // create product
    server.post('/product', async (req, res, next) => {
        // const { product_code, product_name, product_description, cost, price, quantity, currencyId, categoryId, supplierId, unitId, expireDate, userId } = req.body;
        try {
            const product = await Product.create(req.body);
            res.send({ status: 'success' });
            next();
        } catch (err) {
            console.log(err.message);
            res.send({ status: 'error', message: err.message });
            next();
        }
    });
    // Get Product by ID
    server.get('/product/:id', async (req, res, next) => {
        const product = await Product.findByPk(req.params.id);
        res.send(product);
        next();
    });
    // update product
    server.put('/product/:id', async (req, res, next) => {
        try {
            const product = await Product.update(req.body, {
                where: {
                    id: req.params.id,
                }
            });
            res.send({ status: 'success' });
            next();
        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
        }
    });
    server.get('/productsDisplay', async (req, res, next) => {
        try {
            const products = await sequenlize.query('select p.id as pid , u.unit_name,p.product_code, p.product_name,p.cost, p.price,p.quantity,c.currency_name,ct.category_name,s.supplier_name,p.createdAt,us.username from products p, currencies c , categories ct, suppliers s , units u , users us where p.currencyId = c.id and p.currencyId = c.id and p.categoryId = ct.id and p.supplierId = s.id and p.unitId = u.id and p.userId = us.id', { type: sequelize.QueryTypes.SELECT });
            res.send(products);
            next();
        } catch (err) {
            console.log(err);
            res.send({ status: 'error' });
            next();
        }
    });
}