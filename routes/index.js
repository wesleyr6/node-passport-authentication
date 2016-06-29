var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportLocal = require('passport-local');
var User = require('../models/user');
var bcrypt = require('bcrypt');

/* Authentications config */
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
			bcrypt.compare(password, user.password, function(err, res) {
				if (res) {
					done(null, {
						name: username
					});
				} else {
					throw 'Authentication failed. Wrong password.';
				}
			});
		}
	});
}));

/* Routes */
router.get('/', function(req, res) {
	res.render('index', {
		title: 'Home - MyApp',
		layout: req.isAuthenticated() ? 'logged/main.hbs' : 'unlogged/main.hbs',
		bodyClass: req.isAuthenticated() ? 'logged' : 'unlogged',
		isAuthenticated: req.isAuthenticated(),
		user: req.user
	});
});

router.post('/', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/'
}));

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
	var signupUser;

	if (req.body.password !== req.body.passwordConfirm) {
		throw 'Incorrect password confirmation';
	}

	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(req.body.password, salt, function(err, hash) {
			signupUser = new User({
				name: req.body.username,
				password: hash,
				securityPhrase: req.body.securityPhrase
			});

			signupUser.save(function(err) {
				if (err) {
					throw err;
				}

				console.log('SignUp: User saved successfully');

				res.redirect('/');
			});
		});
	});
});

router.get('/test', ensureAuthentication, function(req, res) {
	res.send('Test Page');
});

module.exports = router;