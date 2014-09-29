var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Frit = require('../models/frit');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

UserSchema.methods.verifyPassword = function (enteredPassword, callback) {
    bcrypt.compare(enteredPassword, this.password, function(err, isMatch) {
        callback(err, isMatch);
    });
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

UserSchema.pre('save', function(next) {
    var user = this;

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

var User = mongoose.model('User', UserSchema);
module.exports = User;