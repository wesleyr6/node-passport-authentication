const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
