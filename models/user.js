// get an instance of mongoose and mongoose.Schema
const mongoose = require("mongoose");
//mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const User = new Schema({
	name: String,
	email: {
		type: String,
		index: {
			unique: true
		}
	},
	password: String,
	securityPhrase: String,
	facebookID: String,
	googleID: String,
	token: String
});

module.exports = mongoose.model("User", User);
