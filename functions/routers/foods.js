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

const Food = sequenlize.import('../models/foods.js');
const FoodTranx = sequenlize.import('../models/foodTranx.js');
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
            // check subfood come
            if (req.body.subfoods != null) {
                req.body.subfoods.forEach(async (fd) => {
                    console.log('###################### Containe subfood with id ' + fd.id + ' ######################');
                    const foodtranx = await FoodTranx.create({
                        foodId: x.id,
                        subfoodId: fd.id,
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
            } else {
                // Not subfood
                const foodtranx = await FoodTranx.create({
                    foodId: x.id,
                    cost: req.body.cost,
                    price: req.body.price,
                    currencyId: req.body.currencyId,
                    updateById: req.body.updatedBy,
                }).then((y) => {
                    console.log('###################### Food added ' + x.id + ' ######################');
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
            }
            res.send({ status: 'success' });
            next();
        }).catch((err) => {
            console.log(err);
            res.send({ status: 'error' });
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

    server.get('/foodsDisplay', async (req, res, next) => {
        const foods = await sequenlize.query("select fd.id,fd.food_name,fd.food_name_en,fd.food_photo ,sf.subFoodName,ft.cost , ft.price, ft2.foodTypeName , cr.currency_name, ks.kitchenName , fd.isParent from foods fd, foodTranx ft, subfoods sf, foodType ft2 , currencies cr , kitchens ks where ks.id = fd.kitchenId and fd.id = ft.foodId and ft.subFoodId = sf.id and fd.foodTypeId = ft2.id and ft.currencyId = cr.id group by fd.food_name union  all select fd.id,fd.food_name,fd.food_name_en,fd.food_photo,'',ft.cost , ft.price , fT3.foodTypeName, cr.currency_name , ks.kitchenName, fd.isParent from foods fd, foodTranx ft , foodType fT3, currencies cr , kitchens ks where ks.id = fd.kitchenId and fd.id = ft.foodId and ft.subFoodId is null and fT3.id = fd.foodTypeId and ft.currencyId = cr.id group by fd.food_name", { type: sequelize.QueryTypes.SELECT })
            .then((foods) => {
                res.send(foods);
                next();
            }).catch((err) => {
                console.log(err);
                res.send({ status: 'error' });
                next();
            });
    });
    server.get('/subfoodByFoodId/:id', async (req, res, next) => {
        const subfoods = await FoodTranx.findAll({
            where: {
                foodId: req.params.id
            }
        }).then((resp) => {
            res.send(resp);
            next();
        }).catch((err) => {
            res.send({ status: 'error' });
            next();
        });
    });
};