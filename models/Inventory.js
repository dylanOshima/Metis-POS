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

/** 
 * Updates the quantity of the document.
 * Quantity will always be positive 
 * and if an order has been already it won't change
*/ 
newSchema.methods.consume = function(delta, orderId) {
  // Validation
  if(typeof delta !== 'number') delta = parseInt(delta, 10);
  if(typeof orderId !== 'string') orderId = String(orderId);

  // Update values
  let newQuantity;
  let prevDelta = this.history.get(orderId);
  if(prevDelta){
    if(prevDelta === delta) return;
    newQuantity = this.quantity + delta - (prevDelta);
  } else { newQuantity = this.quantity + delta; }

  this.history.set(orderId, delta);
  this.quantity = (newQuantity < 0) ? 0 : newQuantity;

  // Save
  this.save(() => console.log("Updated: ", this.name));
}

module.exports = mongoose.model('Inventory', newSchema);