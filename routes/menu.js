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

module.exports = router;