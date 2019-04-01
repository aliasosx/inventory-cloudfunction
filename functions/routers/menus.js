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

const Menu = sequenlize.import('../models/inventory_menu.js');

module.exports = server => {
    server.get('/inventory_menu/:id', async (req, res, next) => {
        try {
            const menus = await sequenlize.query('select menuId,menu_link,menu_name from inventory_menu im , inventory_tranx_menu imt, users u where im.id = imt.menuId and u.id = imt.userId and u.id = ' + req.params.id, { type: sequelize.QueryTypes.SELECT });
            res.send(menus);
            next();
        } catch (err) {
            res.send({ status: 'error' });
            next();
        }
    });
}