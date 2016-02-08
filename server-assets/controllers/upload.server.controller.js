//--------------use Mongo's GridFS to handle files--------------//

var mongoose = require('mongoose');
var	_  = require('lodash');
var	Grid = require('gridfs-stream');
Grid.mongo=mongoose.mongo;
var	db = require('../config/database.js'),
conn = mongoose.createConnection(db.MONGO_URI)
var gfs = new Grid(conn.db);


//--------------upload files--------------//
exports.create = function(req, res) {

	console.log("hit");

	var part = req.files.filefield;

		var writeStream = gfs.createWriteStream({
			filename: part.name,
			mode : 'w',
			content_type: part.mimetype
		});

		writeStream.on('close', function() {
			return res.status(200).send({
				message: "Create Success"
			});
		});

		writeStream.write(part.data);

		writeStream.end();

};


//--------------download files--------------//
exports.read = function(req, res) {

	gfs.files.find({ filename : req.params.filename }).toArray(function(err, files) {

		if(files.length === 0) {
			return res.status(400).send({
				message : "File not found"
			});
		}

		res.writeHead(200, {'Content-Type' : files[0].contentType});

		var readstream = gfs.createReadStream({
			filename : files[0].filename
		});

		readstream.on('data', function(data) {
			res.write(data);
		});

		readstream.on('end', function() {
			res.end();
		});

		readstream.on('error', function(err) {
			console.log('An error occurred!', err);
			throw err;
		});

	});

};