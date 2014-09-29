var express = require('express');
var router = express.Router();
var Frit = require('../models/frit');

// edit a frit
router.post('/', function(req, res) {
    var fritId = req.body.fritId;
    var text = req.body.text;
    var userId = req.body.userId;

    Frit.update({ _id: fritId }, { text: text }, function (err, frit) {
      if (err) return console.log(err);
      console.log(frit);
      res.redirect('/feed/' + userId);
    });

});

module.exports = router;
