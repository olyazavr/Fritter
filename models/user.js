var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name:  String,
  email: String,
  password:   String,
  frits: [{type: mongoose.Schema.Types.ObjectId, ref: 'Frit'}],
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

var User = mongoose.model('User', UserSchema);
module.exports = User;