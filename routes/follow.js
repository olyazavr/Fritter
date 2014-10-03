var express = require('express');
var router = express.Router();
var User = require('../models/user');

// follow/unfollow a user
router.post('/', function(req, res) {
    var userId = req.session.userId;
    var userIdToFollow = req.body.userIdToFollow;
    var follow = req.body.follow == "true"; // boolean- follow or unfollow

    User.follow(userId, userIdToFollow, follow, function (err, user) {
        if (err) {
            // something bad happened
            console.error(err);
            res.redirect('/?error=Please try again');
        } else {
            // success! show feed
            res.redirect('/feed');
        }
    });
});

module.exports = router;