var express = require('express');
var router = express.Router();
var User = require('../models/user');

// login existing users
router.post('/', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email: email, password: password }, function (err, user) {
        if (err) return console.error(err);

        if (user == null){
            // user not found
            res.redirect('/');
        } else {
            // user logged in, show feed
            res.redirect('/feed/' + user.id);
        }
    });

});

module.exports = router;
