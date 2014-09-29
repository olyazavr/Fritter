var express = require('express');
var router = express.Router();
var User = require('../models/user');

// register new users
router.post('/', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var user = new User({ name: name, email: email, password: password });
    user.save(function (err, user) {
        if (err) {
            if (err.code == 11000) {
                // duplicate email
                res.redirect('/?error=An account is already associated with that email');
            } else {
                // something bad happened
                console.error(err);
                res.redirect('/?error=Please try again');
            }
        } else {
            // success! redirect to feed
            req.session.userId = user.id
            req.session.save(function(err) {
                if (err) console.error(err);
                res.redirect('/feed?success=Successfully created account!');
            });
        }
    });
});

module.exports = router;
