const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true })
.then(function(){
	console.log("MongoDB is connected");
}).catch(function(err) {
	throw err
});
