var express             = require('express');
var passport            = require('passport');
var router              = express.Router();

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

// locally --------------------------------
// LOGIN ===============================
// show the login form
router.get('/login', function(req, res) {
    res.render('login', {
        message: req.flash('loginMessage')
    });
});

// show the locallogin form
router.get('/locallogin', function(req, res) {
    res.render('locallogin', {
        message: req.flash('loginMessage')
    });
});

// process the locallogin form
router.post('/locallogin', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/error', // redirect back to the login page if there is an error
    failureFlash: true // allow flash messages
}));

// REGISTER =================================
// show the register form
router.get('/register', function(req, res) {
    res.render('register', {
        title: 'Sign Up',
        message: req.flash('registerMessage')
    });
});

// process the signup form
router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/error', // redirect back to the register page if there is an error
    failureFlash: true // allow flash messages
}));

// REGISTER ==============================
router.get('/register', function(req, res) {
    res.render('register', {
        title: 'Local Sign Up'
    });
});

// facebook -------------------------------

// send to facebook to do the authentication
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

// handle the callback after facebook has authenticated the user
router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

// google ---------------------------------

// send to google to do the authentication
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// the callback after google has authenticated the user
router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

///LOGOUT
router.get('/logout', isLoggedIn,function(req, res, next) {
    if (req.session) {
        // destroy current session and return to home
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                var message = "You have been logged out with success!"
                var href = '/'
                res.render('success', {
                    'Title': 'Success!',
                    message,
                    href
                });
            }
        });
    }
});

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else{
        var err = new Error('You must be logged in to access this page.');
        err.status = 400;
        return next(err);
    }
    res.redirect('/');
}

module.exports = router;