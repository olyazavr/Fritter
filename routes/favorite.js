var express = require('express');
var router = express.Router();
var Frit = require('../models/frit');

// favorite/unfavorite a frit
router.post('/', function(req, res) {
    var userId = req.session.userId;
    var fritIdToFavorite = req.body.fritIdToFavorite;
    var favorite = req.body.favorite == "true"; // boolean- fav or unfav

    Frit.favorite(userId, fritIdToFavorite, favorite, function (err, user) {
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