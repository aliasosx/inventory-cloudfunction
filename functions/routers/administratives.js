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

module.exports = server => {
    server.get('/foodtypes', async (req, res, next) => {
        const foodtypes = await FoodType.findAll({
            where: {
                enabled: 1
            }
        });
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
            const foodType = await FoodType.create(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.send({ status: 'success' });
            next();
        } catch (err) {
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
}