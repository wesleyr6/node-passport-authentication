var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportLocal = require('passport-local');
var User = require('../models/user');

// Ensure authentications
function ensureAuthentication(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/');
	}
}

passport.use(new passportLocal.Strategy(function(username, password, done) {
	User.findOne({
		name: username
	}, function(err, user) {
		if (err) {
			throw err;
		}

		if (!user) {
			throw 'Authentication failed. User not found.';
		} else if (user) {
			// check if password matches
			if (user.password !== password) {
				throw 'Authentication failed. Wrong password.';
			} else {
				done(null, {
					_id: 123,
					name: username,
					age: 23
				});
			}
		}
	});
}));

router.get('/', function(req, res) {
	res.render('index', {
		title: 'Home - MyApp',
		isAuthenticated: req.isAuthenticated(),
		user: req.user
	});
});

router.get('/test', ensureAuthentication, function(req, res) {
	res.send('Test Page');
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/signup', function(req, res) {
	res.render('signup', {
		title: 'Sign Up - MyApp'
	});
});

router.post('/signup', function(req, res) {
	if (req.body.password !== req.body.passwordConfirm) {
		throw 'Confirmação de senha incorreta';
	}

	var signupUser = new User({
		name: req.body.username,
		password: req.body.password,
		admin: true
	});

	signupUser.save(function(err) {
		if (err) {
			throw err;
		}

		console.log('User saved successfully');

		res.redirect('/');
	});
});

router.post('/', passport.authenticate('local'), function(req, res) {
	res.render('index', {
		isAuthenticated: true
	}, function() {
		res.redirect('/');
	});
});

module.exports = router;