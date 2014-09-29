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
        if (err) return console.error(err);
        res.redirect('/feed/' + user.id);
    });
});

module.exports = router;
