const express   = require('express');
const router    = express.Router();
const mongoose 	= require('mongoose');
const models 	= require('../models/all-models.js');
const menu = models.Menu;

//get all menu items
router.get('/', (req, res, next) => {
    menu.find()
    .then(results => res.json(results))
    .catch(error => res.json(error));
});

//get all categories of menu items
router.get('/categories', (req, res, next) => {
    menu.distinct('category', (err, categories) => {
      if (err) return res.json(err);
      return res.json(categories);
    })
  });


// Add menu Item
router.post('/add', (req,res,next)=>{
    menu.create(req.body)
        .then(results => res.json(results))
        .catch(error => {
            res.json(error);
        });
})

// Delete menu item
router.delete('/delete/:id', (req,res,next)=>{
    if (req.params.id) {
        menu
            .remove({_id: req.params.id})
            .then(result => res.json(result))
            .catch(error => res.json(error));
    }
})

//get menu list from selected menu section
router.get('/:section', (req, res, next) => {
    menu
        .find({})
        .where("category").equals(req.params.section)
        .then(result => res.json(result))
        .catch(error => res.json(error));
});

// Update menu item
router.put('/:id', (req,res,next)=>{
    if (req.params.id) {    
      menu.findById(req.params.id, (err,item)=>{
        if (err) return res.json(err); // Previously handleError
        item.name = req.body.name;
        item.description = req.body.description;
        item.recipe = req.body.recipe;
        item.servingSize = req.body.servingSize;
        item.cost = req.body.cost;
        item.markup = req.body.markup;
        item.retailPrice = req.body.retailPrice;
        item.category = req.body.category;
        item.save((err,updatedItem)=>{
            if (err) return res.json(err); //handleError(err);
            res.send(updatedItem);
        });
      });
    }
  });

module.exports = router;