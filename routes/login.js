var express = require('express');
var router = express.Router();
var User = require('../models/user');

// login existing users
router.post('/', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email: email }, function (err, user) {
        if (err) {
            // something bad happened
            console.error(err.code);
            res.redirect('/?error=Please try again');

        } else if (user == null){
            // user not found
            res.redirect('/?error=Please make an account');

        } else {
            // all good! verify password
            verifyPassword(password, user, req, res);
        }
    });
});


// if correct password, redirect to feed, otherwise 
// redirect to home and show error messsage
var verifyPassword = function(password, user, req, res) {
    user.verifyPassword(password, function(err, match) {
        if (err || !match) {
            // incorrect password
            res.redirect('/?error=Incorrect password');
        } else {
            // save userId cookie, show feed
            req.session.userId = user.id
            req.session.save(function(err) {
                res.redirect('/feed');
            });
        }
    });
}

module.exports = router;
