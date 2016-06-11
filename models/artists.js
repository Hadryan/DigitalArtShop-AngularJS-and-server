// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var artistSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
	image: {
		type: String,
		required: true,
		unique: true
	},
	designation: {
		type: String,
		required: true
	},
	featured: {
        type: Boolean,
        default:false
    },
	abbr: {
		type: String,
		required: true
	},
	description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Artists = mongoose.model('Artist', artistSchema);

// make this available to our Node applications
module.exports = Artists;
