// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// create a schema
var exhibitionSchema = new Schema({
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
	label: {
		type: String,
		default: ''
	},
	featured: {
        type: Boolean,
        default:false
    },
	price: {
		type: Currency,
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
var Exhibitions = mongoose.model('Exhibition', exhibitionSchema);

// make this available to our Node applications
module.exports = Exhibitions;
