var express = require('express');
var router = express.Router();
var _ = require('underscore');
var Frit = require('../models/frit');

// post a new frit
router.post('/', function(req, res) {
    var userId = req.session.userId;
    var text = _.escape(req.body.text);

    // create new frit
    var frit = new Frit({ text: text, author: userId });
    frit.save(function (err, frit) {
        if (err) {
            // something bad happened
            res.redirect('/feed?error=Please try again');
            console.error(err);
        } else {
            // success! redirect to feed
            res.redirect('/feed');
        }
    });
    
});

module.exports = router;
