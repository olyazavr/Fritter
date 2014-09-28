var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FritSchema = new Schema({
  body:  String,
  date: {type: Date, default: Date.now},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var Frit = mongoose.model('Frit', FritSchema);