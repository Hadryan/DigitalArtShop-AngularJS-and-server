// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var artworkSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artwork'
    }
});

var wishlistSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
	artworks:[artworkSchema]
}, {
    timestamps: true
});



// the schema is useless so far
// we need to create a model using it
var Wishlists = mongoose.model('Wishlist', wishlistSchema);

// make this available to our Node applications
module.exports = Wishlists;
