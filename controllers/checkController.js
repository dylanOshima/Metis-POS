// ./controllers/checkController.js
// Controller for all calls to /check

const mongoose 	= require('mongoose');
const models 	= require('../models/all-models.js');
const receipt = models.Receipts;

// Get all receipts that have not been paid and return them
exports.getChecks = async (req,res,next) => {
    receipt.find()
    .where('paid')
    .equals(false)
    .then(result =>{
        res.json(result);
    })
    .catch(error =>{
        res.json(error);
    })
};


// Get all paid reciepts and return them
exports.getPaid = async (req, res, next) => {
    receipt.find().where('paid').equals(true)
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            res.json(error)
        })
};

// Get all receipts that have not been paid and return them
exports.getUnpaid = async (req, res, next) => {
    receipt.find().where('paid').equals(false)
        .then(results => {
            res.json(results)
        })
        .catch(error => {
            res.json(error)
        })

};

//create new reciept
exports.seat = async (req, res, next) => {
    receipt
        .create({ table: req.body.table, guests: req.body.guests, server: req.body.server })
        .then(results => {
            res.json(results)
        })
        .catch(error => res.json(error));

};

// Update check information
exports.updateCheck = async (req, res, next) => {
    try {
        receipt.findById(req.params.id,(err,check)=>{
            if(err) return next(err);
            if(!check) return next(new Error("Couldn't find check!"));
            if(check.paid === true) return next(new Error("This order has already been paid."));
            check.paid = true;
            check.card = req.body.card
            check.amountTendered = req.body.amountTendered;
            check.paymentType = req.body.paymentType;
            check.discountType = req.body.discountType;
            check.paidTime = Date.now();
            check.save((err,updatedCheck)=>{
                if (err) return next(err);
                res.send(updatedCheck);
                if (updatedCheck.paid) updatedCheck.updateInventory();
            });
        });
    } catch(error) {
        next(error);
    }
};

// Query for check based on ID field
exports.getByID = async (req, res, next) => {
    receipt.findById(String(req.params.id))
        .then(result => {
            console.log(result)
            res.json(result)
        })
        .catch(error => {
            console.log(error)
            res.json(error);
        })
};

// Delete Check based on ID
exports.deleteCheck = async(req,res,next) => {
    receipt.remove({_id: req.params.id})
        .then(result => res.json(result))
        .catch(error => res.json(error));
}