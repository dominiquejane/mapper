var BS = require('../models/bucketSchema.js');

module.exports {

	createBucket = function(req, res) {
		var bucket = new BS(req.body);
		bucket.save().then(fuction(err, result) {
			console.log("bucket created", res.result);
			return res.status(201).end();
		}, function(err) {
			console.log("error on creating bucket", err);
			return res.status(500).json(err);
		})
	},

	getOpenListBuckets = function(req, res) {
		BS.find({ status: 'open', type: 'list'}).exec().then(function(buckets) {
			return res.json(buckets);
		})
	},

	getOpenMapBuckets = function(req, res) {
		BS.find({ status: 'open', type: 'map'}).exec().then(function(buckets) {
			return res.json(buckets);
		})
	},

	getBucket = function(req, res) {
		BS.findOne({ _id : req.params.id }, req.body).exec().then(function(bucket) {
			return res.json(bucket);
		})
	}

	editBucket = function(req, res) {
		BS.update({ _id : req.params.id}, req.body).then(function(bucket) {
			return res.status(200).end();
		})
	},

	deleteBucket = function(req, res) {
		BS.remove({ _id : req.params.id}, req.body).then(function(bucket) {
			return res.status(200).end();
		})
	},

}