var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Frit = require('../models/frit');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

UserSchema.methods.verifyPassword = function (enteredPassword, callback) {
    bcrypt.compare(enteredPassword, this.password, function(err, isMatch) {
        callback(err, isMatch);
    });
}

// check if the user is following a given userId
UserSchema.methods.isFollowing = function (userIdFollowing) {
    var index = this.following.indexOf(userIdFollowing);
    return index > -1;
}

// add/remove user to following
UserSchema.statics.follow = function (userId, userIdToFollow, follow, callback) {
    User.findOne({ _id: userId }, function (err, user) {
        if (err || user == null) return callback(err);
        var following = user.following;
        addRemoveFromList(following, userIdToFollow, follow);
        user.save(function (err, user) {
            return callback(err, user);
        });
    });
}

// find all frits, sorted by date
UserSchema.statics.getAllFrits = function (callback) {
    Frit.find({}).sort({ date: 'desc' }).exec(function (err, frits) {
        Frit.populate(frits, { path: "author" }, function (err, frits) {
            return callback(err, frits);
        });
    });
}

// mutates list and adds or removes first instance of item in list (if present)
var addRemoveFromList = function(list, item, add) {
    // add to list
    if (add) {
        list.push(item);
    } else { 
        // remove from list
        var index = list.indexOf(item);
        if (index > -1) {
            list.splice(index, 1);
        }
    }

    return list;
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