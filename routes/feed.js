var express = require('express');
var router = express.Router();
var User = require('../models/user');

// display frits from friends
router.get('/', function(req, res) {
    var error = req.query.error;
    var success = req.query.success;
    var userId = req.session.userId;

    // not logged in
    if (userId == undefined) {
        return res.redirect('/?error=Please log in');
    }

    User.findOne({ _id: userId }, function (err, user) {
        if (err || user == null) {
            // something bad happened
            console.error(err);
            res.redirect('/?error=Please try again');
        } else {

            // user exists, show feed
            user.getFrits(function(err, frits) {
                if (err) {
                    // something bad happened
                    res.render('feed', { user: user, frits: [], error: 'Please try again'});
                    console.error(err);
                } else {
                    res.render('feed', { user: user, frits: frits, error: error, success: success });
                }
            });
        }
    });
});

module.exports = router;
