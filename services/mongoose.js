const mongoose = require('mongoose');
const config = require('../config');

module.exports = (app) => {
    app.set('superSecret', config.secret);
    mongoose.connect(config.database, function(err) {
        if (err) {
            throw err;
        }
        console.log('MongoDB: Successfully connected');
    });
}