const passport = require("passport");
const passportLocal = require("passport-local");
const expressSession = require("express-session");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const keys = require("../config/keys");

passport.serializeUser(function(id, done) {
	console.log("serialize", id);
	done(null, id);
});

passport.deserializeUser(function(id, done) {
	console.log("deserialize", id);
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use(
	new passportLocal.Strategy(function(email, password, done) {
		User.findOne(
			{
				email: email
			},
			function(err, user) {
				if (err) throw err;

				if (!user) {
					throw "Authentication failed. User not found.";
				} else if (user) {
					bcrypt.compare(password, user.password, function(err, res) {
						if (res) {
							done(null, {
								id: user._id
							});
						} else {
							throw "Authentication failed. Wrong password.";
						}
					});
				}
			}
		);
	})
);

module.exports = app => {
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(
		expressSession({
			secret: process.env.SESSION_SECRET || keys.cookieKey,
			resave: false,
			saveUninitialized: false
		})
	);
};
