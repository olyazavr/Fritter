var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Frit = require('../models/frit');

var UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

UserSchema.methods.verifyPassword = function (enteredPassword) {
    return enteredPassword == this.password;
}

// find all frits made by me, sorted by date
UserSchema.methods.getMyFrits = function (callback) {
    Frit.find({ author: userId }).sort({ date: 'desc' }).exec(function (err, frits) {
        Frit.populate(frits, { path: "author" }, function (err, frits) {
            return callback(err, frits);
        });
    });
}

// find all frits, sorted by date
UserSchema.methods.getFrits = function (callback) {
    Frit.find({}).sort({ date: 'desc' }).exec(function (err, frits) {
        Frit.populate(frits, { path: "author" }, function (err, frits) {
            return callback(err, frits);
        });
    });
}

var User = mongoose.model('User', UserSchema);
module.exports = User;