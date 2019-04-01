const Sequelize = require('sequelize');

const bcrypt = require('bcrypt');
const config = require('../config/config');
const auth = require('../auth/auth');
const sequenlize = require('../config/db');
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken');
const errors = require('restify-error');

const User = sequenlize.import('../models/users.js');
const Menu = sequenlize.import('../models/menus.js');
const UserActivity = sequenlize.import('../models/userActivities.js');


module.exports = server => {
    // Register user
    server.post('/register', async (req, res, next) => {
        try {
            const { gender, username, email, mobile, fullname, dateOfbirth, employed_date, photo, password, enabled, roleId, kitchenId, currentAddress, idCardNumber } = req.body;
            const user = new User({
                password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, async (err, hash) => {
                    user.password = hash;
                    try {
                        const usr = await User.create({
                            gender, username, email, mobile, fullname, dateOfbirth, employed_date, photo, password: user.password, enabled, roleId, kitchenId, currentAddress, idCardNumber
                        });
                        res.send({ status: 'success' });
                        next();
                    } catch (err) {
                        return next(err.message);
                    }
                });
            });
        } catch (err) {
            return next(err.message);
        }
    });

    // Auth
    server.post('/auth', async (req, res, next) => {
        // console.log(req.body);
        try {
            const { username, password } = req.body;
            const user = await auth.authenticate(username, password);

            //Create token

            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
                expiresIn: '24h',
            });
            const { iat, exp } = jwt.decode(token);
            // console.log(user);
            res.send({ user, iat, exp, token });
            next();
        } catch (err) {
            res.send({ status: 'Authentication failed' });
        }
    });
    // get all user

    server.post('/tokenverify', async (req, res, next) => {
        try {

            const { token } = req.body;
            console.log(token);

            const a = await jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.send({ status: 'failed' });
                    next();
                } else {
                    res.send(decoded);
                    next();
                }
            });

        } catch (err) {
            console.log(err);
            res.send({ status: 'Authentication failed' });
            next();
        }
    });

    server.get('/users', async (req, res, next) => {
        try {
            const users = await User.findAll();
            res.send(users);
            next();
        } catch (err) {
            return next(errors.InternalError(err.message));
        }
    });
    // get 1 user
    server.get('/users/:id', async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.id);
            // console.log(user);
            res.send(user);
            next();
        } catch (err) {
            // console.log(err);
            res.send({ status: 'error' });
        }
    });
    // First login check
    server.get('/firstlogin/:id', async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.id).then(user => {
                res.send(user);
                next();
            }).catch((err) => {
                res.send({ status: err.message });
                next();
            });

        } catch (err) {
            return next(new errors.InvalidContentError(err.message));
        }
    });
    // Update user info
    server.put('/users/:id', async (req, res, next) => {

        try {
            //const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
            const user = await User.update(req.body, {
                where: {
                    id: req.params.id
                }
            }).then(() => {
                console.log("******************** User updated ******************** ");
                res.send({ status: 'success' });
                next();
            }).catch((err) => {
                console.log(err.message);
                res.send({ status: 'failed', reason: err.message });
                next();
            });

        } catch (err) {
            return next(errors.InvalidContentError(err.message));
        }
    });
    // Change password
    server.put('/changepassword/:id', async (req, res, next) => {
        try {
            const { password } = req.body;
            const user = new User({
                password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, async (err, hash) => {
                    user.password = hash;
                    console.log(user.password);
                    try {
                        const userx = await User.update({
                            password: user.password,
                            firstlogin: false
                        }, {
                                where: {
                                    id: req.params.id
                                }
                            });
                        res.send({ status: 'success' });
                        next();
                    } catch (err) {
                        console.log(err);
                        return next(new errors.InvalidContentError(err.message));
                    }
                });

            });
        } catch (err) {
            console.log(err);
            return next(new errors.InternalError(err.message));
        }
    });
    // get Menus all
    server.get('/menus', async (req, res, next) => {
        try {
            const menus = await Menu.findAll();
            res.send(menus);
            next();
        } catch (err) {
            res.send({ status: 'error' });
            next();
        }
    });
    // get Menu by user id role
    server.get('/menus/:id', async (req, res, next) => {
        let sql = 'select menu_name, menu_link from users u , menus m, roles r, roleTranx t where u.roleId = r.id and m.id = t.menuId and r.id = t.roleId and m.enabled = 1 and r.enabled = 1 and u.id=' + req.params.id + ' and m.enabled = 1 order by m.menu_order asc';
        try {
            const menus = await sequenlize.query(sql, { type: sequelize.QueryTypes.SELECT }).then((menus) => {
                res.send(menus);
                next();
            });
        } catch (err) {
            res.send({ status: 'error' });
            next();
        }
    });
    server.post('/useractivity', async (req, res, next) => {
        try {
            const useractivity = await UserActivity.create(req.body);
            res.send({ status: 'success' });
            next();
        } catch (err) {
            res.send({ status: 'error' });
            next();
        }
    });
};