var express = require('express');
var router = express.Router();
var Frit = require('../models/frit');

// edit a frit
router.post('/', function(req, res) {
    var fritId = req.body.fritId;
    var text = req.body.text;
    var userId = req.body.userId;

    Frit.update({ _id: fritId }, { text: text }, function (err, frit) {
        if (err) {
            // something bad happened
            res.redirect('/feed/' + userId + '?error=Please try again');
            console.error(err);
        } else {
            res.redirect('/feed/' + userId);
        }
    });

});

module.exports = router;
