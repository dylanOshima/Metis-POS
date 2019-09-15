// MongoDB model that handles the guest/table information

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.Promise = Promise;
  mongoose.connect(require('./connection-string'), {
    useMongoClient: true
  });
}

// TODO; Put in config file
const TAX_PERCENT = 0.12; 
const discountTypes = {
  SENIOR_CITIZEN: "senior_citizen", // 0.2 and no VAT
  CASH_PAYMENT: "cash_payment",     // 0.05
}
const paymentTypes = {
  CARD: 'card',
  CASH: 'cash'
}

var newSchema = new Schema({
  'table': { type: String, required: true },
  'guests': { type: Number, required: true },
  'server': { type: String, required: true },
  'items': [{ 
    _id: { type: Schema.ObjectId, required: true},
    name: { type: String },                            // auto
    quantity: { type: Number, default: 1},
    charge: { type: Number },                          // auto
    comments: { type: String }
  }],
  'sub_total': { type: Number, default: 0.00 },         // auto
  'discountType': { type: String },
  'discountAmount': { type: Number, default: 0.00 },
  'tax': { type: Number, default: 0.00  },
  'total': { type: Number, default: 0.00, min: 0.00 }, // auto
  'paid': { type: Boolean, default: false  },
  'card': { 
      'number': { type: Number },
      'cardexp': { type: String },
      'cvc': { type: Number }
  },
  'paidTime': { type: Date },
  'paymentType':{ type: String },
  'amountTendered': { type: Number },
  'createdAt': { type: Date, default: Date.now },     // auto
  'lastUpdatedAt': { type: Date, default: Date.now }, // auto
  'change': { type: Number, min: 0.00 },              // auto
});

newSchema.methods.getDiscount = function() {
  let { SENIOR_CITIZEN, CASH_PAYMENT } = discountTypes;

  // IN PERCENT FORM
  switch(this.discountType) {
    case SENIOR_CITIZEN:
      return 0.2;
    case CASH_PAYMENT:
      return 0.05;
    default: return 1;
  }
}

/**
 * IDEA: Thios function could just be invoked after being saved
 * so that the data is not actually stored in the datebase. 
 * This could save in space and efficiency.
 **/ 
newSchema.statics.updateItems = async function(items) {
  return await Promise.all(items.map(async item => {
    if(!item.charge || !item.name) {
      let { retailPrice, name } = await this.model('Menu').findById(item._id, 'retailPrice name');
      item.charge = retailPrice;
      item.name = name;
    }
    return item;
  }));
}

newSchema.pre('validate', function(next){
  // update sub_total
  this.sub_total = this.items.reduce((total, item) => {
    let { quantity, charge } = item;
    return total + charge*quantity;
  }, 0);
  // updates tax
  if(this.paid) {
    // this.tax = this.tax || (this.sub_total/(TAX_PERCENT)).toFixed(2);
    let total = this.sub_total/(1+TAX_PERCENT) // VAT exempt sales
    this.discountAmount = (total*this.getDiscount()).toFixed(2);
    this.total = this.sub_total - this.discountAmount;
    this.change = this.change || this.amountTendered - this.total;
  }
  next();
});

newSchema.pre('save', function(next){
  this.lastUpdatedAt = Date.now();
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