var User                = require('../app/models/user');
var configDB            = require('../config/auth.js');
var express             = require('express');
var passport            = require('passport');
var router              = express.Router();

// PROFILE SECTION =========================
router.get('/', isLoggedIn,function(req, res, next) {
    if (req.user.google.id != undefined)
        user = req.user.google;
    else if (req.user.facebook.id != undefined) 
        user = req.user.facebook;
    else
        user = req.user.local;
    
    res.render('profile', {
        title: 'Profile',
        user
    }); 
});

// EDITPROFILE ==============================
router.get('/editprofile', isLoggedIn, function(req, res) {
    var type
    if (req.user.google.id != undefined)
        user = req.user.google;
    else if (req.user.facebook.id != undefined)
        user = req.user.facebook;
    else{
        user = req.user.local;
        type = 'local'
    }
    
    res.render('editprofile', {
        title: 'Edit Profile',
        user,
        type
    });
});

router.post('/editprofile', isLoggedIn, function(req, res, next) {
    if (req.body.name) {
        // confirm that user typed same password twice
        if (req.body.password !== req.body.confirmPassword) {
            var err = new Error('Passwords do not match.');
            err.status = 400;
            return next(err);
        }

        // create object with form input
        var userData = {
            name: req.body.name,
            gender: req.body.gender,
            address: req.body.address,
            age: req.body.age,
            profession: req.body.profession,
            cnumber: req.body.cnumber,
        };

        if (req.body.type == configDB.secretToken)
            userData.type = 'admin'
        else
            userData.type = 'user'

        //finds the current user in order to update
        User.findOne({'_id': req.user.id}, function(err, user) {
            if (user.google.id != undefined) {
                user.google.name = userData.name;
                user.google.email = user.google.email;
                user.google.age = userData.age;
                user.google.gender = userData.gender;
                user.google.address = userData.address;
                user.google.profession = userData.profession;
                user.google.cnumber = userData.cnumber;
                user.google.type = userData.type;
            } else if (user.facebook.id != undefined) {
                user.facebook.name = userData.name;
                user.facebook.email = user.facebook.email;
                user.facebook.age = userData.age;
                user.facebook.gender = userData.gender;
                user.facebook.address = userData.address;
                user.facebook.profession = userData.profession;
                user.facebook.cnumber = userData.cnumber;
                user.facebook.type = userData.type;
            } else {
                user.local.name = userData.name;
                if(user.local.password != user.generateHash(req.body.password)) user.local.password = user.generateHash(req.body.password);
                user.local.gender = userData.gender;
                user.local.address = userData.address;
                user.local.profession = userData.profession;
                user.local.cnumber = userData.cnumber;
                user.local.type = userData.type;
            }

            user.save(function(err) {
                if (err) {
                    var err = new Error(err);
                    err.status = 400;
                    return next(err);
                } else {
                    return res.redirect('/profile');
                }
            });
        });
    } else {
        var err = new Error('Name and passwords are mandatory.');
        err.status = 400;
        return next(err);
    }
});

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