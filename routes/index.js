const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");

/* Authentications config */
function ensureAuthentication(req, res, next) {
	var isAuth = req.session.passport ? true : false;

	if (isAuth) {
		next();
	} else {
		res.redirect("/");
	}
}

/* Routes */
router.get("/", function(req, res) {
	var isAuth = req.session.passport ? true : false;
	console.log(req.session.passport);

	if (isAuth) {
		res.render("logged/index", {
			title: "Home - MyApp",
			layout: "logged/main.hbs",
			bodyClass: "logged"
		});
	} else {
		res.render("unlogged/account/login", {
			title: "Login - MyApp",
			layout: "unlogged/main.hbs",
			bodyClass: "unlogged"
		});
	}
});

router.post("/", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/"
}));

router.get("/logout", function(req, res) {
	req.session.destroy(function(err) {
		res.redirect("/");
	});
});

router.get("/signup", function(req, res) {
	res.render("unlogged/account/signup", {
		title: "Sign Up - MyApp"
	});
});

router.post("/signup", function(req, res) {
	if (req.body.password !== req.body.passwordConfirm)
		throw "Incorrect password confirmation";

	User.find({ email: req.body.email }, function(err, docs) {
		if (docs.length)
			throw "The email " + req.body.email + " is already exist";
	});

	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(req.body.password, salt, function(err, hash) {
			var signupUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: hash,
				securityPhrase: req.body.securityPhrase
			});

			signupUser.save().then(function() {
				console.log("SignUp: User saved successfully");
				res.redirect("/");
			}).catch(function(err) {
				throw err;
			})
		});
	});
});

router.get("/test", ensureAuthentication, function(req, res) {
	res.send("Test Page");
});

module.exports = router;
