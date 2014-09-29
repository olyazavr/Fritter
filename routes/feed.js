var express = require('express');
var router = express.Router();
var User = require('../models/user');

// display frits from friends
router.get('/:userId', function(req, res) {
    var error = req.query.error;
    var success = req.query.success;
    var userId = req.params.userId;

    User.findOne({ _id: userId }, function (err, user) {
        if (err) {
            // something bad happened
            console.error(err);
            res.redirect('/?error=Please try again');
        } else if (user == null){
            // user not found
            res.redirect('/?error=Please make an account');
        } else {

            // user logged in, show feed
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
