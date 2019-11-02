// ./controllers/inventoryController.js

const mongoose 	= require('mongoose');
const models 	= require('../models/all-models.js');
const inventory = models.Inventory;
const { inventoryConfig } = require('../config');

//get all inventory items
exports.getInventory = async (req, res, next) => {
  inventory.find()
    .then(results => res.json(results))
    .catch(error => res.json(error));
};

//get all categories of inventory items
exports.categories = async (req, res, next) => {
  inventory.distinct('category', (err, cat) => {
    if (err) return res.json(err);
    let categories = inventoryConfig.categories;
    categories.concat(cat);
    return res.json(categories);
  })
};


// Add inventory entry
exports.addEntry = async (req,res,next)=>{
  if(!req.body.history) req.body.history = {};
  inventory.create(req.body)
    .then(results => res.json(results))
    .catch(error => {      
      res.json(error);
    });
};

// Delete inventory entry
exports.deleteEntry = async (req,res,next)=>{
  if (req.params.id) {
    inventory.findById(req.params.id, (err, item)=>{
      if (err) return res.json(err); //handleError(err);
      inventory.remove({_id: req.params.id})
        .then(result => res.json(result))
        .catch(error => res.json(error));
    });
  }
};

// Update inventory item
exports.updateEntry = async (req,res,next)=>{
  if (req.params.id) {    
    inventory.findById(req.params.id, (err,item)=>{
      if (err) return res.json(err); // Previously handleError
      item.name = req.body.name;
      item.description = req.body.description;
      item.unitOfMeasurement = req.body.unitOfMeasurement;
      item.price = req.body.price;
      item.category = req.body.category;
      item.dishes = req.body.dishes;
      item.quantity = req.body.quantity;
      item.history = req.body.history;
      item.save((err,updatedItem)=>{
          if (err) return res.json(err); //handleError(err);
          res.send(updatedItem);
      });
    });
  }
};

// Only update history
exports.updateHistory = async (req,res,next)=>{
  if (req.params.id && req.body.history) {
    try {
      inventory.findById(req.params.id, (err,item)=>{
        if (err) return next(err); // Previously handleError
        let { history } = req.body;
        item.history = item.history.concat(history);

        // Update the price of the item
        if(history.length > 0) item.price = history[history.length-1].price;
        
        // Update the quantity
        history.forEach(change => {
          item.quantity += change.value;
        });

        // Save
        item.save((err,updatedItem)=>{
            if (err) return next(err); //handleError(err);
            res.send(updatedItem);
        });
      });
    } catch(err) {
      next(err);v
    }
  }
};

//get inventory list from selected inventory section
// , (req, res, next) => {
//     inventory
//         .find({})
//         .where("category").equals(req.params.section)
//         .then(result => res.json(result))
//         .catch(error => res.json(error));
// });