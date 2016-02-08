var mongoose = require('mongoose');

var bucketSchema = mongoose.Schema({

	title: {type : String},
	coordinate: {type: Object}
	location: {type : String},
	// pictures:
	status: {default: 'open', enum: ['open', 'completed']},
	type: {enum: ['map', 'list']},
	description: {type: String},
	flag: {type: Boolean, default: true},


}, {timestamps: true});

module.exports = mongoose.model('Bucket', bucketSchema);