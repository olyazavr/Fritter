var express = require('express');
var router = express.Router();
var Frit = require('../models/frit');

// post a new frit
router.post('/', function(req, res) {
    var userName = req.body.userName;
    var userId = req.body.userId;
    var text = req.body.text;

    // create new frit
    var frit = new Frit({ text: text, authorName: userName, author: userId });
    frit.save(function (err, frit) {
        if (err) return console.error(err);

            // redirect to feed
            res.redirect('/feed/' + userId);      
    });
    
});

module.exports = router;
