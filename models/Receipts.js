// MongoDB model that handles the guest/table information

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.Promise = Promise;
  mongoose.connect(require('./connection-string'), {
    useMongoClient: true
  });
}

var newSchema = new Schema({
  'table': { type: String, required: true },
  'guests': { type: Number, required: true },
  'server': { type: String, required: true },
  'items': [{ 
    _id: Schema.ObjectId,
    name: String,
    quantity: Number,
    price: Number,
  }],
  'sub_total': { type: Number, default: 0.00 },
  'discountType': { type: String },
  'discountAmount': { type: Number, default: 0.00 },
  'tax': { type: Number, default: 0.00  },
  'total': { type: Number, default: 0.00  },
  'paid': { type: Boolean, default: false  },
  'card': { 
      'number': { type: Number },
      'cardexp': { type: String },
      'cvc': { type: Number }
  },
  'paidTime': { type: Date },
  'paymentType':{ type: String },
  'amountTendered': { type: Number },
  'createdAt': { type: Date, default: Date.now },
  'lastUpdatedAt': { type: Date, default: Date.now },
  'bills': { type: Array },
});

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

newSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now()} });
});


/** TODO: Clean this shit up.
 * 1. Iterates over every dish in the order
 * 2. Saves number of times that dish was ordered
 * 3. Finds the menu item
 * 4. Iterates over every ingredient in the menu's recipe
 * 5. Gets the quantity of the ingredient in that recipe
 * 6. Finds the ingredient
 * 7. Calculates the recipeQuantity * numbOrders
 * 8. updates the quantity of the ingredient using the delta provided
 */
newSchema.methods.updateInventory = function() {
  const orderId = this._id;
  this.items.forEach(dish => {
    let numOrders = dish.quantity;
    this.model('Menu').findById(dish._id,'recipe',(err, menuItem) => {
      if(err) return err;
      if(!menuItem) return; // Cannot find item
      menuItem.recipe.forEach(ingredient => {
        let recipeQuantity = ingredient.quantity;
        this.model('Inventory').findOne({_id:ingredient._id},function(err, entry) {
          if(err) return err;
          if(!entry) return; // Cannot find item
          let delta = -(recipeQuantity*numOrders);
          entry.consume(delta, orderId);
        })
      })
    })
  })
};

module.exports = mongoose.model('Receipts', newSchema);