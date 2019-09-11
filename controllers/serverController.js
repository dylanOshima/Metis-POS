// ./controllers/serverController.js

const mongoose = require('mongoose');
const models = require('../models/all-models.js');
const servers = models.Servers;

//print check and close out order
exports.getUsers = async (req, res, next) => {
    servers.find({})
        .then(result => res.json(result))
        .catch(error => res.json(error));
};

exports.addUser = async (req, res, next) => {
    if (req.body) {
        servers.create({'name': req.body.name, 'code': req.body.code})
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            res.json(error);
        })
    }
};

// Checks if login code is valid and returns name of server
exports.login = async (req,res,next) => {
    servers.findOne({}).where("code").equals(req.params.code)
        .then(result => {
                res.json(result.name)
        })
        .catch(error =>{
            res.json(error);
        })
}