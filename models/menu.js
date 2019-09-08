// MongoDB model that handles the menu items

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}

var newSchema = new Schema({
  'name': { type: String, required: true},
  'description': { type: String },
  'recipe': { type: Array, required: true },
  'servingSize': { type: Number, default: 1 }, // per serving size
  'cost': { type: Number, required: true }, // per serving size
  'markup': { type: Number, default: 0 }, // per serving size
  'retailPrice': { type: Number }, // per serving size
  'category': { type: String, required: true },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
},
{ collection: 'menu'}
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

module.exports = mongoose.model('Menu', newSchema);