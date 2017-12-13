const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const routes = require('./routes/');
const logger = require('morgan');

require('./services/passport')(app);
require('./services/handlebars')(app);
require('./services/mongoose')(app);

// Configs
app.use(logger('dev'));
app.use(cookieParser());
app.use(expressSession({
	secret: process.env.SESSION_SECRET || 'safadao',
	resave: false,
	saveUninitialized: false
}));

// Views
app.use('/views', express.static(__dirname + '/views'));
app.use('/static', express.static(__dirname + '/static'));

// To parse request params in req.body json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// Routes
app.use('/', routes);

module.exports = app;