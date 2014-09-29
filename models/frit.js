var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FritSchema = new Schema({
  text: String,
  date: {type: Date, default: Date.now},
  authorName: String,
  author: {type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

var Frit = mongoose.model('Frit', FritSchema);
module.exports = Frit;