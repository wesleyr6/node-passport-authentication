var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');

var router = express.Router();

// Configs
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(expressSession({
	secret: process.env.SESSION_SECRET || 'safadao',
	resave: false,
	saveUninitialized: false
}));

// Views
app.use(express.static(__dirname + '/views'));
app.use('/static', express.static(__dirname + '/static'));

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(username, done) {
	done(null, username);
});
passport.deserializeUser(function(username, done) {
	done(null, username);
});

passport.use(new passportLocal.Strategy(function(username, password, done) {
	if (username === 'wesleyamaro' && password === 'ps654321') {
		done(null, {
			_id: 123,
			name: username,
			age: 23
		});
	} else {
		done(null, null);
	}
}));

// To parse request params in req.body json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.get('/', function(req, res) {
	res.render('index', {
		isAuthenticated: req.isAuthenticated(),
		user: req.user
	});
});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.post('/', passport.authenticate('local'), function(req, res) {
	res.render('index', {
		isAuthenticated: true
	});
});

module.exports = app;