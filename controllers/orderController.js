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

//add order to receipt
exports.updateOrder = async (req, res, next) => {
    receipts.update({_id: req.params.id}, {
        'items': req.body.bill.items,
        'total': req.body.bill.total,
        'paid': req.body.paid,
    })
        .then(result => {
            res.json(result)
        })
        .catch(error => res.json("error" + error));
};