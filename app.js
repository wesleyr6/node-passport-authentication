var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var routes = require('./routes/');
var passport = require('passport');

// Configs
app.set('view engine', 'ejs');
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

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(username, done) {
	done(null, username);
});
passport.deserializeUser(function(username, done) {
	done(null, username);
});

// Routes
app.use('/', routes);

module.exports = app;