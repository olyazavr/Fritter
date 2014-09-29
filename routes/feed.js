var express = require('express');
var router = express.Router();
var User = require('../models/user');

// display frits from friends
router.get('/:userId', function(req, res) {
    var userId = req.params.userId;

    User.findOne({ _id: userId }, function (err, user) {
        if (err) return console.error(err);

        if (user == null){
            // user not found FIX
            res.redirect('/');
        } else {

            // user logged in, show feed
            user.getFrits(function(err, frits) {
                if (err) return console.error(err);
                res.render('feed', {user: user, frits: frits});
            });
        }
    });
});

module.exports = router;
