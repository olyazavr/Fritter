var Frit = require('../models/frit');
var _ = require('underscore');

module.exports = {

    // post a new frit
    newFrit: function(req, res) {
        var userId = req.session.userId;
        var content = _.escape(req.body.content);

        // create new frit
        var frit = new Frit({ content: content, author: userId });
        frit.save(function (err) {
            redirect(res, err);
        });
    },

    // delete a frit
    deleteFrit: function(req, res) {
        var fritId = req.body.fritId;
        var userId = req.session.userId;

        Frit.remove({ _id: fritId }, function (err) {
            redirect(res, err, 'Successfully deleted Frit');
        });
    },

    // edit a frit
    editFrit: function(req, res) {
        var fritId = req.body.fritId;
        var content = _.escape(req.body.content);
        var userId = req.session.userId;

        Frit.update({ _id: fritId }, { content: content }, function (err) {
            redirect(res, err);
        });
    },
    
    // favorite/unfavorite a frit
    favorite: function(req, res) {
        var userId = req.session.userId;
        var fritIdToFavorite = req.body.fritIdToFavorite;
        var favorite = req.body.favorite == "true"; // boolean- fav or unfav

        Frit.favorite(userId, fritIdToFavorite, favorite, function (err) {
            redirect(res, err);
        });
    }
}

// redirects to feed and reports on errors or successes
var redirect = function(res, error, success) {
    if (error) {
        // report error
        console.error(error);
        res.redirect('/feed?error=Please try again');
    } else if (success) {
        // report success
        res.redirect('/feed?success=' + success);
    } else {
        // just redirect to feed
        res.redirect('/feed');
    }
}
