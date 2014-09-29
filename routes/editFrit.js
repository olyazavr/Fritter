var express = require('express');
var router = express.Router();
var _ = require('underscore');
var Frit = require('../models/frit');

// edit a frit
router.post('/', function(req, res) {
    var fritId = req.body.fritId;
    var text = _.escape(req.body.text);
    var userId = req.session.userId;

    Frit.update({ _id: fritId }, { text: text }, function (err, frit) {
        if (err) {
            // something bad happened
            res.redirect('/feed?error=Please try again');
            console.error(err);
        } else {
            res.redirect('/feed');
        }
    });

});

module.exports = router;
