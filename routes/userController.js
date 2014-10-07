var User = require('../models/user');

module.exports = {

    // login existing users
    login: function(req, res) {
        var email = req.body.email;
        var password = req.body.password;

        User.findOne({ email: email }, function (err, user) {
            if (err) {
                // something bad happened
                console.error(err);
                res.redirect('/?error=Please try again');

            } else if (user == null) {
                // user not found
                res.redirect('/?error=Please make an account');

            } else {
                // all good! verify password
                verifyPassword(password, user, req, res);
            }
        });
    },

    // register new users
    register: function(req, res) {
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;

        var user = new User({ name: name, email: email, password: password });
        user.save(function (err, user) {
            if (err) {
                if (err.code == 11000) {
                    // duplicate email
                    res.redirect('/?error=An account is already associated with that email');
                } else {
                    // something bad happened
                    console.error(err);
                    res.redirect('/?error=Please try again');
                }
            } else {
                // success! redirect to feed
                req.session.userId = user.id
                req.session.save(function(err) {
                    if (err) console.error(err);
                    res.redirect('/feed?success=Successfully created account!');
                });
            }
        });
    },

    // destroy cookie, go to homepage
    logout: function(req, res) {
        req.session.destroy(function(err) {
            if (err) console.error(err);
            res.redirect('/');
        });
    },

    // display frits
    getFeed: function(req, res) {
        var error = req.query.error;
        var success = req.query.success;
        var userId = req.session.userId;

        // not logged in
        if (userId == undefined) {
            return res.redirect('/?error=Please log in');
        }

        // logged in, find the user and their frits
        User.findOne({ _id: userId }, function (err, user) {
            if (err || user == null) {
                // something bad happened
                console.error(err);
                res.redirect('/?error=Please try again');
            } else {
                // user exists, get frits and show feed
                getFrits(user, res, error, success);
            }
        });
    },

    // follow/unfollow a user
    follow: function(req, res) {
        var userId = req.session.userId;
        var userIdToFollow = req.body.userIdToFollow;
        var follow = req.body.follow == "true"; // boolean- follow or unfollow

        User.follow(userId, userIdToFollow, follow, function (err, user) {
            if (err) {
                // something bad happened
                console.error(err);
                res.redirect('/?error=Please try again');
            } else {
                // success! show feed
                res.redirect('/feed');
            }
        });
    }

}

// get frits and display feed on success (on error, display failure)
var getFrits = function(user, res, error, success) {
    User.getAllFrits(function(err, frits) {
        if (err) {
            // something bad happened
            console.error(err);
            res.render('feed', { user: user, frits: [], error: 'Please try again'});
        } else {
            res.render('feed', { user: user, frits: frits, error: error, success: success });
        }
    });
}

// if correct password, redirect to feed, otherwise 
// redirect to home and show error messsage
var verifyPassword = function(password, user, req, res) {
    user.verifyPassword(password, function(err, match) {
        if (err || !match) {
            // incorrect password
            res.redirect('/?error=Incorrect password');
        } else {
            // save userId cookie, show feed
            req.session.userId = user.id
            req.session.save(function(err) {
                res.redirect('/feed');
            });
        }
    });
}