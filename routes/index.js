var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportLocal = require('passport-local');

// Ensure authentications
function ensureAuthentication(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/');
	}
}

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

router.get('/', function(req, res) {
	res.render('index', {
		isAuthenticated: req.isAuthenticated(),
		user: req.user
	});
});

router.get('/test', ensureAuthentication, function(req, res) {
	res.send('Test Page');
});

router.get('/teste32', ensureAuthentication, function(req, res) {
	res.send('Test Page');
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.post('/', passport.authenticate('local'), function(req, res) {
	res.render('index', {
		isAuthenticated: true
	}, function() {
		res.redirect('/');
	});
});

module.exports = router;