const passport = require('passport');

passport.serializeUser(function(username, done) {
	done(null, username);
});

passport.deserializeUser(function(username, done) {
	done(null, username);
});

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
}