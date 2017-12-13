const mongoose = require("mongoose");
const config = require("../config/keys");

mongoose.createConnection(config.database, function(err) {
	if (err) {
		throw err;
	}
	console.log("MongoDB: Successfully connected");
});
