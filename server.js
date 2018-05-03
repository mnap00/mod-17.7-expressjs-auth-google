/*eslint-disable no-console*/
var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./config');
var app = express();
var googleProfile = {};

app.set('view engine', 'pug');
app.set('views', './views');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy(
    {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, cb) {
        googleProfile = {
            id: profile.id,
            displayName: profile.displayName
        };
        cb(null, profile);
    }
));

// Turn off snippet below - returns always 'false'
//function ensureAuthenticated(req, res, next) {
//    if (req.isAuthenticated()) {
//        console.log('authenticated');
//        return next();
//    }
//    console.log('not authenticated');
//    res.redirect('/');
//}

app.get('/', function(req, res) {
    res.render('aa-welcome', {user: req.user});
});

app.get('/logged', function(req, res) {
//app.get('/logged', ensureAuthenticated, function(req, res) {
    console.log(googleProfile);
    (googleProfile.id && googleProfile.displayName)
        ? res.render('aa-logged', {user: googleProfile})
        : res.redirect('/');
});

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/logged',
        failureRedirect: '/'
    })
);

app.get('/auth/logout', function(req, res) {
    googleProfile = {};
    res.redirect('/');
});

var server = app.listen(3000, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening on http://' + host + ':' + port);
});

app.use(function (req, res, next) {
    res.status(404).send('Sorry, cannot find requested site');
});
