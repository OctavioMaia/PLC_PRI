var User                = require('../app/models/user');
var Photo               = require('../app/models/photo');
var SportsRegistry      = require('../app/models/sports');
var AcademicRegistry    = require('../app/models/academicres');
var Thought             = require('../app/models/thought');
var Idea                = require('../app/models/idea');
var Recipe              = require('../app/models/recipe');
var Birth               = require('../app/models/birth');
var Wedding             = require('../app/models/wedding');
var AcademicWork        = require('../app/models/academicwork');
var Chronicle           = require('../app/models/chronicle');
var Event               = require('../app/models/event');

var express = require('express');
var router = express.Router();

module.exports = function(router, passport) {
    // show the home page (will also have our login links)
    router.get('/', function(req, res) {
        res.render('index', { title: 'Home'});
    });

    // PROFILE SECTION =========================
    router.get('/profile', function(req, res) {
        if(req.user.google.id!=undefined){
            console.log("match google");
            user = req.user.google;
        }else if(req.user.facebook.id!=undefined){
            console.log("match fb");
            user = req.user.facebook;
        }else{
            console.log("match local");
            user = req.user.local;
        }
        res.render('profile', { title: 'Profile', user});
    });

    // LOGOUT ==============================
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // ABOUT ==============================
    router.get('/about', function(req, res) {
        res.render('about',{ title: 'About'});
    });

    // CONTACT ==============================
    router.get('/contact', function(req, res) {
        res.render('contact',{ title: 'Contact'});
    });

    // User Posts ==============================
    router.get('/myposts', function(req, res) {
        console.log("Before find")
        Idea.find({'ident' : req.user.id}, function(err, post) {
            if(!err){
                console.log("!err")
                res.render('myposts',{ title: 'My Posts',post});
            }else{
                console.log("There are no posts");
                next(err);
            }
        
        });
    });

    // NEWSFEED ==============================
    router.get('/newsfeed', function(req, res) {
        var posts = ''
		console.log("Antes do find.");
        Idea.find({privacy: 'public'}, function(err, post) {
            if(!err){
                posts = post.concat(posts)
                console.log(posts)
                res.render('newsfeed',{ title: 'News Feed', posts});
            }else{
                console.log("There are no posts");
                next(err);
            }
        });
    });

    // NEWPOST ==============================
    router.get('/newpost', isLoggedIn, function(req, res) {
        res.render('newpost',{ title: 'New Post'});
    });
    
    // PHOTO ============================
    router.get('/newPhoto', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Path','obligatory':true},
                      {'type':'text','text':'People','obligatory':false}];
        var name = 'Photo';
        res.render('processnewpost',{ title: 'Photo',name,reqs,extras});
    });

    // SPORTS REGISTRY ============================
    router.get('/newSportsRegistry', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Sport','obligatory':true},
                      {'type':'text','text':'Duration','obligatory':true},
                      {'type':'text','text':'GpxFile','obligatory':false},
                      {'type':'text','text':'Participants','obligatory':false},
                      {'type':'text','text':'Results','obligatory':false},];
        var name = 'Sports Registry';
        res.render('processnewpost',{ title: 'Sports Registry',name,reqs,extras});
    });

    // ACADEMIC REGISTRY ============================
    router.get('/newAcademicRegistry', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Duration','obligatory':false},
                      {'type':'text','text':'Credits','obligatory':true}];
        var name = 'Academic Registry';
        res.render('processnewpost',{ title: 'Academic Registry',name,reqs,extras});
    });

    // EVENT ============================
    router.get('/newEvent', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Files','obligatory':true},
                      {'type':'text','text':'Guests','obligatory':false},
                      {'type':'text','text':'Hosts','obligatory':false},
                      {'type':'text','text':'EventType','obligatory':true},
                      {'type':'text','text':'Text','obligatory':false}];
        var name = 'Event';
        res.render('processnewpost',{ title: 'Event',name,reqs,extras});
    });

    // THOUGHT ============================
    router.get('/newThought', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Keywords','obligatory':true},
                      {'type':'text','text':'Text','obligatory':true}];
        var name = 'Thought';
        res.render('processnewpost',{ title: 'Thought',name,reqs,extras});
    });

    // IDEA ============================
    router.get('/newIdea', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Keywords','obligatory':true},
                      {'type':'text','text':'Priority','obligatory':true},
                      {'type':'text','text':'Text','obligatory':true}];
        var name = 'Idea';
        res.render('processnewpost',{ title: 'Idea',name,reqs,extras});
    });
    
    // NEW RECIPE ==============================
    router.get('/newRecipe', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Ingredients','obligatory':true},
                      {'type':'text','text':'Instructions','obligatory':true}];
        var name = 'Recipe';
        res.render('processnewpost',{ title: 'Recipe',name,reqs,extras});
    });

    // NEW BIRTH ============================
    router.get('/newBirth', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Name','obligatory':true},
                      {'type':'text','text':'Gender','obligatory':true},
                      {'type':'text','text':'Parents','obligatory':true}];
        var name = 'Birth';
        res.render('processnewpost',{ title: 'New Birth',name,reqs,extras});
    });

    // NEW WEDDING ============================
    router.get('/newWedding', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Couple','obligatory':true},
                      {'type':'text','text':'Guests','obligatory':true},
                      {'type':'text','text':'Menu','obligatory':false}];
        var name = 'Wedding';
        res.render('processnewpost',{ title: 'Wedding',name,reqs,extras});
    });

    // NEW ACADEMIC WORK ============================
    router.get('/newAcademicWork', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Course','obligatory':true},
                      {'type':'text','text':'Professor','obligatory':true},
                      {'type':'text','text':'File','obligatory':true},
                      {'type':'text','text':'Classification','obligatory':true}];
        var name = 'Academic Work';
        res.render('processnewpost',{ title: 'Academic Work',name,reqs,extras});
    });

    // NEW CHRONICLE ==============================
    router.get('/newChronicle', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Theme','obligatory':true},
                      {'type':'text','text':'Text','obligatory':true}];
        var name = 'Chronicle';
        res.render('processnewpost',{ title: 'Chronicle',name,reqs,extras});
    });

    // EDITPROFILE ==============================
    router.get('/editprofile',isLoggedIn, function(req, res) {
        if(req.user.google.id!=undefined)
            user = req.user.google;
        else if(req.user.facebook.id!=undefined)
            user = req.user.facebook;
        else
            user = req.user.local;
        res.render('editprofile',{ title: 'Edit Profile', user});
    });

    router.post('/editprofile',isLoggedIn , function(req, res, next) {
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
              cnumber: req.body.cnumber
            };
      
            //finds the current user in order to update
            User.findOne({ '_id' : req.user.id }, function(err, user){
                if(user.google.id!=undefined){
                    user.google.name       = userData.name;
                    user.google.email      = user.google.email;
                    user.google.age        = userData.age;
                    user.google.gender     = userData.gender;
                    user.google.address    = userData.address;
                    user.google.profession = userData.profession;
                    user.google.cnumber    = userData.cnumber;
                }else if(user.facebook.id!=undefined){
                    user.facebook.name       = userData.name;
                    user.facebook.email      = user.facebook.email;
                    user.facebook.age        = userData.age;
                    user.facebook.gender     = userData.gender;
                    user.facebook.address    = userData.address;
                    user.facebook.profession = userData.profession;
                    user.facebook.cnumber    = userData.cnumber;
                }else{
                    user.local.name       = userData.name;
                    user.local.gender     = userData.gender;
                    user.local.address    = userData.address;
                    user.local.profession = userData.profession;
                    user.local.cnumber    = userData.cnumber;
                }
      
                user.save(function(err){
                    if(err){
                        return next(err);
                    }else{
                        return res.redirect('/profile');
                    }
                });
            });
        }else{
            var err2 = new Error('Name and passwords are mandatory.');
            err2.status = 400;
            return next(err2);
        }
    });

    //add post
    router.post('/processnewpost', isLoggedIn, function(req, res, next) {
        if (req.body.Type) {
            var post;
            var name;
            switch (req.body.Type) {
                case 'Chronicle':
                    post = new Chronicle();
                    break;
                case 'Recipe':
                    post = new Recipe();
                    break;
                case 'Idea':
                    post = new Idea();
                    break;
                case 'Birth':
                    post = new Birth();
                    break;
                case 'Photo':
                    post = new Photo();
                    break;
                case 'Sports Registry':
                    post = new SportsRegistry();
                    break;
                case 'Academic Registry':
                    post = new AcademicRegistry();
                    break;
                case 'Thought':
                    post = new Thought();
                    break;
                case 'Wedding':
                    post = new Wedding();
                    break;
                case 'Academic Work':
                    post = new AcademicWork();
                    break;
            }

            for (var key in req.body) {
                console.log("debug: ("+ key +','+req.body[key]+')');
            }

            if(req.user.google.id!=undefined)
                name = req.user.google.name;
            else if(req.user.facebook.id!=undefined)
                name = req.user.facebook.name;
            else
                name = req.user.local.name;

            //populate the previous var
            if(post!=undefined){
                post.author = name;
                post.ident = req.user.id;
                post.location = req.body.Location;
                post.privacy = req.body.Privacy;
                post.title = req.body.Title;
                post.date = req.body.Date;
                post.description = req.body.Description;
                post.type = req.body.Type;
                post.theme = req.body.Theme;
                post.text = req.body.Text;
                post.ingredients = req.body.Ingredients;
                post.instructions = req.body.Instructions;
                post.path = req.body.Path;
                post.people = req.body.People;
                post.sport = req.body.Sport;
                post.duration = req.body.Duration;
                post.gpxFile = req.body.GpxFile;
                post.participants = req.body.Participants;
                post.results = req.body.Results;
                post.credits = req.body.Credits;
                post.file = req.body.File;
                post.files = req.body.Files;
                post.guests = req.body.Guests;
                post.hosts = req.body.Hosts;
                post.eventType = req.body.EventType;
                post.keywords = req.body.Keywords;
                post.priority = req.body.Priority;
                post.name = req.body.Name;
                post.gender = req.body.Gender;
                post.parents = req.body.Parents;
                post.couple = req.body.Couple;
                post.menu = req.body.Menu;
                post.course = req.body.Course;
                post.professor = req.body.Professor;
                post.classification = req.body.Classification;
            }

            console.log("after changes:\n" +post);
            post.save(function(err){
                if(!err){
                    console.log('add post');
                    return res.redirect('/newsfeed');
                }else{
                    console.log(err);
                    next(err);
                }
            });
        } else {
            return next(err);
        }
    });

    router.post('/editpost',isLoggedIn , function(req, res, next) {
        console.log(req);
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        router.get('/login', function(req, res) {
            res.render('login', { message: req.flash('loginMessage')});
        });

        // show the locallogin form
        router.get('/locallogin', function(req, res) {
            res.render('locallogin', { message: req.flash('loginMessage')});
        });

        // process the locallogin form
        router.post('/locallogin', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/error', // redirect back to the login page if there is an error
            failureFlash : true // allow flash messages
        }));

        // REGISTER =================================
        // show the register form
        router.get('/register', function(req, res) {
            res.render('register', { title: 'Sign Up', message: req.flash('registerMessage')});
        });

        // process the signup form
        router.post('/register', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/error', // redirect back to the register page if there is an error
            failureFlash : true // allow flash messages
        }));

        // REGISTER ==============================
        router.get('/register', function(req, res) {
            res.render('register',{ title: 'Local Sign Up'});
        });

        // process the signup form
        router.post('/register', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/error', // redirect back to the register page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        router.get('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile', 'email'] }));

        // handle the callback after facebook has authenticated the user
        router.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // google ---------------------------------

        // send to google to do the authentication
        router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        router.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}