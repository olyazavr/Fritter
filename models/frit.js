var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FritSchema = new Schema({
    content: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    favoritedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// check if this frit is a favorite of a given user
FritSchema.methods.isFavoriteOf = function (userId) {
    var index = this.favoritedBy.indexOf(userId);
    return index > -1;
}

// add/remove user to favoritedBy
FritSchema.statics.favorite = function (userId, fritIdToFavorite, favorite, callback) {
    Frit.findOne({ _id: fritIdToFavorite }, function (err, frit) {
        if (err || frit == null) return callback(err);
        var favoritedBy = frit.favoritedBy;
        addRemoveFromList(favoritedBy, userId, favorite);
        frit.save(function (err, frit) {
            return callback(err, frit);
        });
    });
}

// mutates list and adds or removes first instance of item in list (if present)
var addRemoveFromList = function(list, item, add) {
    // add to list
    if (add) {
        list.push(item);
    } else { 
        // remove from list
        var index = list.indexOf(item);
        if (index > -1) {
            list.splice(index, 1);
        }
    }

    return list;
}

var Frit = mongoose.model('Frit', FritSchema);
module.exports = Frit;