var express = require('express');
var router = express.Router();

// get homepage
router.get('/', function(req, res) {
    var error = req.query.error;
    res.render('index', { error : error });
});

module.exports = router;
