var express = require('express');
var router = express.Router();
var Frit = require('../models/frit');

// delete a frit
router.post('/', function(req, res) {
    var fritId = req.body.fritId;
    var userId = req.session.userId;

    Frit.remove({ _id: fritId }, function (err) {
        if (err) {
            // something bad happened
            console.error(err);
            res.redirect('/feed?error=Please try again');
        } else {
            res.redirect('/feed?success=Successfully deleted Frit');
        }
    });

});

module.exports = router;
