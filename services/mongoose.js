const mongoose = require("mongoose");
const config = require("../config/keys");

mongoose.createConnection(config.database, {
	useMongoClient: true
});
