var express = require('express');
var router  = express.Router();

// HOMEPAGE
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Home'
    });
});

// LOGOUT ==============================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// ABOUT ==============================
router.get('/about', function(req, res) {
    res.render('about', {
        title: 'About'
    });
});

// CONTACT ==============================
router.get('/contact', function(req, res) {
    res.render('contact', {
        title: 'Contact'
    });
});

// VERIFY ==============================
router.get('/verifyemail', function(req, res) {
    res.render('verifyemail');
});

module.exports = router;