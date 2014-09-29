var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');

var FritSchema = new Schema({
    text: { type: String, required: true },
    date: {type: Date, default: Date.now},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

// escape the text before saving
FritSchema.pre('save', function(next) {
    this.text = _.escape(this.text);
    next();
});

var Frit = mongoose.model('Frit', FritSchema);
module.exports = Frit;