// get an instance of mongoose and mongoose.Schema
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const User = new Schema({
	name: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},

	password: {
		type: String,
		required: true
	},

	securityPhrase: {
		type: String
	}
});

module.exports = mongoose.model("User", User);
