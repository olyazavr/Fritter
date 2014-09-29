var express = require('express');
var router = express.Router();
var _ = require('underscore');
var Frit = require('../models/frit');

// post a new frit
router.post('/', function(req, res) {
    var userName = req.body.userName;
    var userEmail = req.body.userEmail;
    var userId = req.body.userId;
    var text = _.escape(req.body.text);

    // create new frit
    var frit = new Frit({ text: text, authorName: userName, author: userId, authorEmail: userEmail });
    frit.save(function (err, frit) {
        if (err) {
            // something bad happened
            res.redirect('/feed/' + userId + '?error=Please try again');
            console.error(err);
        } else {
            // success! redirect to feed
            res.redirect('/feed/' + userId);
        }
    });
    
});

module.exports = router;
