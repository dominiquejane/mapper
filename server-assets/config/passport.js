var LocalStrategy = require('passport-local').Strategy,
	User = require('../models/userSchema.js');

module.exports = function(passport, app) { 
	
	passport.serializeUser(function(user, done) {
	  done(null, user);
	});
	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});

	passport.use(new LocalStrategy({
		passReqToCallback : true,
	},
	function(req, username, password, done) {
		User.findOne({username: username}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false);
			}
			
			user.validPassword(password).then(function(result){
				if (!result) {
					return done(null, false);
				}
				return done(null, user);
			})

		})
	}
	))//LocalStrategy

}//module.exports