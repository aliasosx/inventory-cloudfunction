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
const StockTracking = sequenlize.import('../models/stocktrackings.js');
const Product = sequenlize.import('../models/products.js');

// update stock with Product id

async function stockUpdate(_order, type) {
    /*
        requirment data:
                        quantity,
                        productId,
    */
    let title = '';
    if (type === 'purchase') {
        title = 'Purchase'
        _order.quantity = _order.quantity * (-1);
    } else if (type === 'purchase-rev') {
        title = 'Purchase reversal';
        _order.quantity = _order.quantity;
    }

    console.log('Product Id ' + _order.productId);

    // Get Current stock by Product Id
    const stockAtCurrent = await Stock.findAll({
        raw: true,
        limit: 1,
        where: {
            productId: _order.productId
        }
    }).then(async (rsp_stock) => {
        console.log(rsp_stock);
        if (rsp_stock[0].id) {
            const stock = await Stock.update({
                previous_quantity: rsp_stock[0].current_quantity,
                used_quantity: _order.quantity,
                current_quantity: rsp_stock[0].current_quantity - _order.quantity,
                remarks: title + ' stock sale order with purchase ID ' + _order.purchaseId,
                userId: _order.userId
            }, {
                    where: {
                        id: rsp_stock[0].id
                    }
                }).then(async (rsp_stock_update) => {
                    console.log('################## Stock updated id ' + rsp_stock[0].id + ' ##################');
                    const latest_stock = await Stock.findByPk(rsp_stock[0].id, {
                        raw: true
                    });
                    let c = await stockTrackingUpdate(latest_stock);
                });
        }
    });

}
// stock tracking update 
async function stockTrackingUpdate(stock) {
    console.log(stock);
    const stockTracking = await StockTracking.create({
        stockId: stock.id,
        sourceId: 2,
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
            let a = await updateProductCurrentQuantity(stock);
        });
}

// update product at current use
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
module.exports = {
    stockUpdate: stockUpdate
}