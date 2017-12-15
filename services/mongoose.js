const mongoose = require("mongoose");
const config = require("../config/keys");

mongoose.Promise = global.Promise;

mongoose.connect(
	config.localdatabase,
	{
		useMongoClient: true
	},
	err => {
		if (err) throw err;
		console.log("MongoDB is connected");
	}
);
