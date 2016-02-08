var express = require('express'),
	app = express(),
	passport = require('passport'),
	mongoose = require('mongoose'),
	port = process.env.PORT || 9001,
	busBoy = require('busboy-body-parser'),
	// bodyParser = require('body-parser'),
	session = require('express-session'),
	LocalStrategy = require('passport-local').Strategy,

	db = require('./server-assets/config/database.js'),
	secret = require('./server-assets/secrets/secrets.js');




//---------------MIDDLEWARE---------------//
app.use(busBoy());
// app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use(session({ 
	secret: secret.SESSION_SECRET,
	resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

//---------------PASSPORT STUFF---------------//


//---------------CONTROLLER STUFF---------------//
// require('./server-assets/controllers/upload.server.controller');

//---------------ROUTE STUFF---------------//
require('./server-assets/routes/upload.server.routes')(app);






app.listen(port, function() {
	console.log("listening on port ", port);
});

mongoose.connect( db.MONGO_URI || 'mongodb://127.0.0.1:27017/mapper' );
mongoose.connection.once('connected', function() {
	console.log('db connected');
})