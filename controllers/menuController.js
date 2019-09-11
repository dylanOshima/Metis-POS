// ./controllers/menuController.js

const mongoose 	= require('mongoose');
const models 	= require('../models/all-models.js');
const menu = models.Menu;

//get all menu items
exports.getMenu = async (req, res, next) => {
  menu.find()
  .then(results => res.json(results))
  .catch(error => res.json(error));
};

//get all categories of menu items
exports.categories = async (req, res, next) => {
  menu.distinct('category', (err, categories) => {
    if (err) return res.json(err);
    return res.json(categories);
  })
};


// Add menu Item
exports.addItem = async (req,res,next)=>{
  menu.create(req.body)
      .then(results => res.json(results))
      .catch(error => {
          res.json(error);
      });
}

// Delete menu item
exports.deleteItem = async (req,res,next)=>{
  if (req.params.id) {
      menu.findById(req.params.id, (err, item)=>{
        if (err) return res.json(err); //handleError(err);
        menu.remove({_id: req.params.id})
          .then(result => res.json(result))
          .catch(error => res.json(error));
      });
  }
};

//get menu list from selected menu section
exports.byCategory = async (req, res, next) => {
    menu
        .find({})
        .where("category").equals(req.params.section)
        .then(result => res.json(result))
        .catch(error => res.json(error));
};

// Update menu item
exports.updateItem = async (req,res,next)=>{
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
};