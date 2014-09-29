var express = require('express');
var router = express.Router();
var Frit = require('../models/frit');

// post a new frit
router.post('/', function(req, res) {
    var userId = req.session.userId;
    var text = req.body.text;

    // create new frit
    var frit = new Frit({ text: text, author: userId });
    frit.save(function (err, frit) {
        if (err) {
            // something bad happened
            console.error(err);
            res.redirect('/feed?error=Please try again');
        } else {
            // success! redirect to feed
            res.redirect('/feed');
        }
    });
    
});

module.exports = router;
