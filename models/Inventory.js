// MongoDB model that handles the menu items

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}

var newSchema = new Schema({
  
  'name': { type: String, required: true},
  'description': { type: String },
  'unitOfMeasurement': { type: String, required: true },
  'price': { type: Number }, // per UoM
  'category': { type: String, required: true },
  'quantity': { type: Number, default: 0, required: true},
  'dishes': { type: Array }, // String array
  'history': { type: Map, of: Number }, // A sequence of order ids and their quantity
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
},
{ collection: 'Inventory'}
);

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

newSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model('Inventory', newSchema);