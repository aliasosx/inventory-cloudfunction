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

const Food = sequenlize.import('../models/foods');
const FoodTranx = sequenlize.import('../models/FoodTranx');
const FoodType = sequenlize.import('../models/FoodType');
const Currency = sequenlize.import('../models/currencies.js');
const Subfood = sequenlize.import('../models/subfoods.js');

module.exports = server => {
    server.get('/foods', async (req, res, next) => {
        const foods = await Food.findAll();
        res.send(foods);
        next();
    });
    server.post('/foods', async (req, res, next) => {
        const foods = await Food.create(req.body).then(async (x) => {

            req.body.subfoods.forEach(async (fd) => {
                console.log(fd.foodName);
                const foodtranx = await FoodTranx.create({
                    foodId: x.id,
                    subfoodId: fd.subfoodId,
                    cost: fd.cost,
                    price: fd.price,
                    currencyId: req.body.currencyId,
                    updateById: req.body.updatedBy,
                }).then((y) => {
                    console.log('Food added ' + x.id);
                }).catch(async (err) => {
                    console.log(err);
                    const ftx = await Food.destroy({
                        where: {
                            id: x.id
                        }
                    }).then((z) => {
                        console.log('###################### Food rolled back ######################');
                    });
                });
            });
            res.send({ status: 'success' });
            next();

        }).catch((err) => {
            console.log(err);
            res.send({ status: 'err' });
            next();
        });
    });
    server.put('/foods/:id', async (req, res, next) => {
        const foods = await Food.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.send({ status: 'success' });
            next();
        }).catch((err) => {
            console.log(err);
            res.send({ status: 'err' });
            next();
        });
    });
    server.get('/foods/:id', async (req, res, next) => {
        const foods = await Food.findAll({
            where: {
                id: req.params.id
            }
        });
        res.send(foods);
        next();
    });

    server.post('/foodtranxs', async (req, res, next) => {
        const foodtranx = await FoodTranx.create(req.body).then(() => {
            res.send({ status: 'success' });
            next();
        }).catch((err) => {
            console.log(err);
            res.send({ status: 'err' });
            next();
        });

    });

    server.put('/foodtranxs/:id', async (req, res, next) => {
        const foodtranxs = await FoodTranx.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.send({ status: 'success' });
            next();
        }).catch((err) => {
            console.log(err);
            res.send({ status: 'err' });
            next();
        });
    });

    server.get('/currencies', async (req, res, next) => {
        const currencies = await Currency.findAll({
            order: [['currency_code', 'ASC']]
        });
        res.send(currencies);
        next();
    });

    server.get('/subfoods', async (req, res, next) => {
        const subfoods = await Subfood.findAll();
        res.send(subfoods);
        next();
    });

};