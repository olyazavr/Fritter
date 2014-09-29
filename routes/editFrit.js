var express = require('express');
var router = express.Router();
var Frit = require('../models/frit');

// edit a frit
router.post('/', function(req, res) {
    var fritId = req.body.fritId;
    var text = req.body.text;
    var userId = req.session.userId;

    Frit.update({ _id: fritId }, { text: text }, function (err, frit) {
        if (err) {
            // something bad happened
            console.error(err);
            res.redirect('/feed?error=Please try again');
        } else {
            res.redirect('/feed');
        }
    });

});

module.exports = router;
