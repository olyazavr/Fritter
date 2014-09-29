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
    Frit.find({ author: userId }, function (err, frits) {
        if (err) return callback(err);

        var sortedFrits = frits;

        // sort by newest
        if (sortedFrits != []) {
            sortedFrits.sort(function(frit1, frit2) {
                return frit2.date - frit1.date;
            });
        }

        return callback(null, sortedFrits);
    });
}

// find all frits, sorted by date
UserSchema.methods.getFrits = function (callback) {
    Frit.find({}, function (err, frits) {
        if (err) return callback(err);

        var sortedFrits = frits;

        // sort by newest
        if (sortedFrits != []) {
            sortedFrits.sort(function(frit1, frit2) {
                return frit2.date - frit1.date;
            });
        }

        return callback(null, sortedFrits);
    });
}

var User = mongoose.model('User', UserSchema);
module.exports = User;