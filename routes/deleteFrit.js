var express = require('express');
var router = express.Router();
var Frit = require('../models/frit');

// delete a frit
router.post('/', function(req, res) {
    var fritId = req.body.fritId;
    var userId = req.body.userId;

    Frit.remove({ _id: fritId }, function (err) {
      if (err) return handleError(err);
      res.redirect('/feed/' + userId);
    });

});

module.exports = router;
