var express = require('express');
var router = express.Router();
var User = require('../models/user');

// display frits
router.get('/', function(req, res) {
    var error = req.query.error;
    var success = req.query.success;
    var userId = req.session.userId;

    // not logged in
    if (userId == undefined) {
        return res.redirect('/?error=Please log in');
    }

    // logged in, find the user and their frits
    User.findOne({ _id: userId }, function (err, user) {
        if (err || user == null) {
            // something bad happened
            console.error(err);
            res.redirect('/?error=Please try again');
        } else {
            // user exists, get frits and show feed
            getFrits(user, res, error, success);
        }
    });
});

// get frits and display feed on success (on error, display failure)
var getFrits = function(user, res, error, success) {
    User.getAllFrits(function(err, frits) {
        if (err) {
            // something bad happened
            console.error(err);
            res.render('feed', { user: user, frits: [], error: 'Please try again'});
        } else {
            res.render('feed', { user: user, frits: frits, error: error, success: success });
        }
    });
}

module.exports = router;
