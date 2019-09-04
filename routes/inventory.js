const express   = require('express');
const router    = express.Router();
const mongoose 	= require('mongoose');
const models 	= require('../models/all-models.js');
const inventory = models.Inventory;

//get all inventory items
router.get('/', (req, res, next) => {
  inventory.find()
    .then(results => res.json(results))
    .catch(error => res.json(error));
});

//get all categories of inventory items
router.get('/categories', (req, res, next) => {
  inventory.distinct('category', (err, categories) => {
    if (err) return res.json(err);
    return res.json(categories);
  })
});


// Add inventory Item
router.post('/add', (req,res,next)=>{  
  inventory.create(req.body)
    .then(results => res.json(results))
    .catch(error => {      
      res.json(error);
    });
});

// Delete inventory item
router.delete('/delete/:id', (req,res,next)=>{
  if (req.params.id) {
    inventory.findById(req.params.id, (err, item)=>{
      if (err) return res.json(err); //handleError(err);
      inventory.remove({_id: req.params.id})
        .then(result => res.json(result))
        .catch(error => res.json(error));
    });
  }
});

// Update inventory item
router.put('/:id', (req,res,next)=>{
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
      item.save((err,updatedItem)=>{
          if (err) return res.json(err); //handleError(err);
          res.send(updatedItem);
      });
    });
  }
});

//get inventory list from selected inventory section
// router.get('/:section', (req, res, next) => {
//     inventory
//         .find({})
//         .where("category").equals(req.params.section)
//         .then(result => res.json(result))
//         .catch(error => res.json(error));
// });

module.exports = router;