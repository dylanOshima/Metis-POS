// MongoDB model that handles courses items

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}

/**
 * dishes: holds arrays that are options at each part of the course
 */

var newSchema = new Schema({
  'name': { type: String, required: true},
  'dishes': [[{ type: Schema.ObjectId, required: true}]], 
  'cost': { type: Number }, 
  'markup': { type: Number },
  'retailPrice': { type: Number },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
},
{ collection: 'Course'}
);

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
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