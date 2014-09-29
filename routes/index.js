var express = require('express');
var router = express.Router();

// get homepage
router.get('/', function(req, res) {
    // already logged in
    if (req.session.userId != undefined) {
        return res.redirect('/feed');
    }
    
    // not logged in, render homepage
    var error = req.query.error;
    res.render('index', { error : error });
});

module.exports = router;
