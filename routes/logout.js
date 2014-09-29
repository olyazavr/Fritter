var express = require('express');
var router = express.Router();

// destroy cookie, go to homepage
router.post('/', function(req, res) {
    req.session.destroy(function(err) {
        if (err) console.error(err);
        res.redirect('/');
    });
});

module.exports = router;


