// MongoDB model that handles the menu items

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}

var newSchema = new Schema({
  'name': { type: String, required: true},
  'description': { type: String },
  'recipe': [{ 
    _id: { type: Schema.ObjectId, required: true }, // refers to inventory item
    name: { type: String },
    quantity: { type: Number, default: 1 }, // per unit of the good
    price: { type: Number }
  }],
  'servingSize': { type: Number, default: 1 }, // per serving size
  'cost': { type: Number },                       // auto or manual
  'markup': { type: Number, default: 0 }, // per serving size
  'retailPrice': { type: Number },                // auto
  'category': { type: String, lowercase: true, required: true },
  'createdAt': { type: Date, default: Date.now }, // auto
  'updatedAt': { type: Date, default: Date.now }  // auto
},
{ collection: 'menu'}
);

newSchema.methods.computeCost = function() {
  return this.recipe.reduce((total, item) => {
    let { quantity, price } = item;
    return total + price*quantity;
  }, 0);
}

// Ensures that recipe have necessary data
newSchema.post('validate', async function(doc){
  doc.recipe = await Promise.all(doc.recipe.map(async item => {
    if(!item.price || !option.name) {
      let { price, name } = await doc.model('Inventory').findById(item._id, 'price name');
      item.price = price;
      item.name = name;
    }
    return item;
  }));
});

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  this.cost = this.cost || this.computeCost();
  if(this.retailPrice !== this.cost + this.markup)
    this.retailPrice = this.cost + this.markup;
  next();
});

newSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model('Menu', newSchema);