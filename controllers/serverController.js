// ./controllers/serverController.js

const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const jwt      = require('jsonwebtoken');
const models   = require('../models/all-models.js');
const servers  = models.Servers;

const path = require('path');
require("dotenv").config({
  path: path.join(__dirname, "../.env")
});
let secret = process.env.secret;

//print check and close out order
exports.getServers = async (req, res, next) => {
    let fields;
    // Check if logged in
    if(res.locals.loggedInServerId) fields = 'name role updatedAt';
    else fields = 'name -_id';
    servers.find({}, fields)
        .then(result => res.json(result))
        .catch(error => res.json(error));
};

exports.deleteServer = async (req, res, next) => {
    try {
        servers.findByIdAndDelete(req.params.id)        
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            next(error);
        })
    } catch(error) {
        next(error);
    }
};

const hashPassword = async password => await bcrypt.hash(password, 10);
const validatePassword = async (plainPass, hashedPass) => {
    if(typeof plainPass !== 'string') plainPass = String(plainPass);
    return await bcrypt.compare(plainPass, hashedPass);
}

// Creates a new server and generates a code hash and
// a JWT token for them.
exports.signup = async (req,res,next) => {
    try {
        const { name, code, role } = req.body;
        const exists = await servers.find({name});
        // Check if name already exists
        if(exists.length >= 1) return next(new Error("Server's name already exists"))
        const hashedCode = await hashPassword(code);
        const newServer = await servers.create({
            name,
            code: hashedCode,
            role: role || 'basic' 
        }).catch((error) => {return next(error);});
        const accessToken = jwt.sign(
            { serverId: newServer._id }, 
            secret,
            { expiresIn: "1d" },
        );
        newServer.accessToken = accessToken;
        await newServer.save();
        res.json({data: newServer, accessToken})
    } catch (error) {
        next(error);
    }
}

// Checks if login code is valid and returns name of server
exports.login = async (req,res,next) => {
    try {
        const { name, code } = req.body;
        const server = await servers.findOne({name});
        if(!server) return res.status(404).json("Server doesn't exist");
        const valid = await validatePassword(code, server.code);
        if(!valid) return res.status(404).json("Incorrect code");
        const accessToken = jwt.sign({ serverId: server._id }, secret, {
            expiresIn: "1d"
        });
        await servers.findByIdAndUpdate(server.id, { accessToken });
        res.status(200).json({
            data: { 
                name:server.name,
                role:server.role,
                updatedAt:server.updatedAt
            },
            accessToken
        });
    } catch (error) {
        // console.log(error)
        next(error);
    } 
}