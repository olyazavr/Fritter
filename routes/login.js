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
        } else if (user.verifyPassword(password)) {
            // user correctly logged in, show feed
            res.redirect('/feed/' + user.id);
        } else {
            // incorrect password
            res.redirect('/?error=Incorrect password');
        }

    });

});

module.exports = router;
