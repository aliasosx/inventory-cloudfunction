const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const sequenlize = require('../config/db');
const User = sequenlize.import('../models/users.js');

exports.authenticate = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                where: {
                    username: username
                }
            });
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    resolve(user);
                } else {
                    reject('Authentication failed');
                }
            });
        } catch (err) {
            console.log(err);
            reject('Authentication failed');
        }
    });
}