// MongoDB model that handles courses items

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}

/**
 * dishes: holds arrays that are options at each part of the course
 *  Each element in the array has options, the default option is the
 *  choice if you just buy the course. If you change the option then
 *  the total cost increases based on the options 'cost'. This is the
 *  cost of making the dish.
 */

var newSchema = new Schema({
  'name': { type: String, required: true},
  'dishes': [{
    'courseName': { type: String, default:"round" },
    'defaultIndex': { type: Number, default: 0 },
    'optional': { type: Boolean, default: false },
    'options': [{ 
      '_id': { type: Schema.ObjectId, required: true},
      'cost': { type: Number },
      'name': { type: String }
    }],
  }], 
  'cost': { type: Number },                       // auto
  'markup': { type: Number, default: 0 },
  'retailPrice': { type: Number },                // auto
  'createdAt': { type: Date, default: Date.now }, // auto
  'updatedAt': { type: Date, default: Date.now }  // auto
},
{ collection: 'Course'}
);

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  // Calculates the cost based on the dish costs
  this.cost = this.dishes.reduce((sum, item) => {
      let { optional, defaultIndex, options } = item;
      return optional ? sum : sum + options[defaultIndex].cost;
    }, 0);
  this.retailPrice = this.cost + this.markup;
  next();
});

newSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.post('update', function() {
  this.update({}, { $set: { retailPrice: (this.cost + this.markup) }});
});

newSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model('Course', newSchema);