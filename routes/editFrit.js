var express = require('express');
var router = express.Router();
var Frit = require('../models/frit');
var _ = require('underscore');

// edit a frit
router.post('/', function(req, res) {
    var fritId = req.body.fritId;
    var text = _.escape(req.body.text);
    var userId = req.session.userId;

    Frit.update({ _id: fritId }, { text: text }, function (err) {
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
