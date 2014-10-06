var UserController = require('./userController');
var FritController = require('./fritController');

module.exports = function(app) {
    app.get('/', function(req, res) {
        // already logged in
        if (req.session.userId != undefined) {
            return res.redirect('/feed');
        }
        
        // not logged in, render homepage
        return res.render('index', { error : req.query.error });
    });

    app.post('/register', function(req, res) {
        UserController.register(req, res);
    });

    app.post('/login', function(req, res) {
        UserController.login(req, res);
    });

    app.post('/logout', function(req, res) {
        UserController.logout(req, res);
    });

    app.get('/feed', function(req, res) {
        UserController.getFeed(req, res);
    });

    app.post('/newFrit', function(req, res) {
        FritController.newFrit(req, res);
    });

    app.post('/deleteFrit', function(req, res) {
        FritController.deleteFrit(req, res);
    });

    app.post('/editFrit', function(req, res) {
        FritController.editFrit(req, res);
    });

    app.post('/favorite', function(req, res) {
        FritController.favorite(req, res);
    });

    app.post('/follow', function(req, res) {
        UserController.follow(req, res);
    });
}