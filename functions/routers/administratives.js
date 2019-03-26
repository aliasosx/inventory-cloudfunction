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

const FoodType = sequenlize.import('../models/foodType.js');
const subFood = sequenlize.import('../models/subfoods.js');
const Vendor = sequenlize.import('../models/vendors.js');

module.exports = server => {
    server.get('/foodtypes', async (req, res, next) => {
        const foodtypes = await FoodType.findAll();
        res.send(foodtypes);
        next();
    });
    server.post('/foodtypes', async (req, res, next) => {
        try {
            const foodType = await FoodType.create(req.body);
            res.send({ status: 'success' });
            next();
        } catch (err) {
            res.send(err.message);
            next();
        }
    });

    server.put('/foodtypes/:id', async (req, res, next) => {
        try {
            const foodType = await FoodType.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.send({ status: 'success' });
            next();
        } catch (err) {
            console.log(err);
            res.send(err.message);
            next();
        }
    });

    server.delete('/foodtypes/:id', async (req, res, next) => {
        try {
            const foodType = await FoodType.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.send({ status: 'success' });
            next();
        } catch (err) {
            res.send(err.message);
            next();
        }
    });


    // subFood
    server.get('/subfoods', async (req, res, next) => {
        const subfoods = await subFood.findAll();
        res.send(subfoods);
        next();
    });

    server.put('/subfoods/:id', async (req, res, next) => {
        try {
            const subfood = await subFood.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.send({ status: 'success' });
            next();
        } catch (err) {
            console.log(err);
            res.send(err.message);
            next();
        }
    });
    server.post('/subfoods', async (req, res, next) => {
        try {
            const subfoods = await subFood.create(req.body);
            res.send({ status: 'success' });
            next();
        } catch (err) {
            res.send(err.message);
            next();
        }
    });

    // Vendor
    server.get('/vendors', async (req, res, next) => {
        const vendors = await Vendor.findAll();
        res.send(vendors);
        next();
    });

    server.put('/vendors/:id', async (req, res, next) => {
        try {
            const vendors = await Vendor.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.send({ status: 'success' });
            next();
        } catch (err) {
            console.log(err);
            res.send(err.message);
            next();
        }
    });
    server.post('/vendors', async (req, res, next) => {
        try {
            const vendors = await Vendor.create(req.body);
            res.send({ status: 'success' });
            next();
        } catch (err) {
            res.send(err.message);
            next();
        }
    });
}