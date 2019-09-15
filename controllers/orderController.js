// ./controllers/orderController.js

const mongoose = require('mongoose');
const models = require('../models/all-models.js');
const receipts = models.Receipts;

// 
exports.getOrders = async (req, res, next) => {
    receipts.find()
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            res.json(error)
        })
};

exports.getPaid = async (req, res, next) => {
    receipts.find().where('paid').equals(true)
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            res.json(error)
        })
};

exports.getUnpaid = async (req, res, next) => {
    receipts.find().where("paid").equals(false)
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            res.json(error)
        })

};

//used for adding items to an order receipt
exports.updateOrder = async (req, res, next) => {
    receipts.findById(req.params.id, (err, order) => {
        if(err) next(error);
        if(!order) next(new Error("Couldn't find order: " + req.params.id))
        order.table = req.body.table;
        order.guests = req.body.guests;
        order.server = req.body.server;
        order.items = req.body.items; // Should verify item input
        order.discountType = req.body.discountType;
        order.paid = req.body.paid;
        order.card = req.body.card;
        order.paymentType = req.body.paymentType;
        order.amountTendered = req.body.amountTendered;
        order.change = req.body.change;
        order.save((err, updatedOrder) => {
            if(err) next(error);
            res.json(updatedOrder);
        });
    }).catch(error => res.json("error" + error));
};

//used for adding items to an order receipt
exports.addOrderItem = async (req, res, next) => {
    receipts.findById(req.params.id, (err, order) => {
        if(err) next(error);
        if(!order) next(new Error("Couldn't find order: " + req.params.id));
        if(order.paid === true) return next(new Error("This order has already been paid."));
        order.items = req.body.items;
        order.save((err, updatedOrder) => {
            if(err) next(error);
            res.json(updatedOrder);
        });
    }).catch(error => res.json("error" + error));
};