var mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	q = require('q'),
	buckets = require('./bucketSchema.js');

var userSchema = mongoose.Schema({

	username: {type: String},
	password: {type: String},
	resetPasswordToken: {type: String},
	resetPasswordExpires: Date,
	openBuckets: [{type: Schema.Types.ObjectId, ref: 'buckets'}],
	complBuckets: [{type: Schema.Types.ObjectId, ref: 'buckets'}],
	status: {
		type: String,
		required: true,
		default: "Active",
		enum: ["Active", "Archived"],
	}


}, {timestamps: true});

userSchema.methods.validPassword = function(givenPassword) {
	var validPass = bcrypt.compareSync(givenPassword, this.password);
	return validPass;
};

userSchema.pre('save', function(next) {
	var user = this;
	if (user.isModified('password')) {
		bcrypt.genSalt(12, function(err, salt) {
			bcrypt.hash(user.password, salt, function(err, hash) {
				user.password = hash;
				next();
			})
		})
	}
	else {
		next();
	}
})

module.exports = mongoose.model('User', userSchema);