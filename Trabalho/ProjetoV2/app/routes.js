var User       = require('../app/models/user');
var Post       = require('../app/models/post');

module.exports = function(app, passport) {
// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index', { title: 'Home'});
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        if(req.user.google.id!=undefined){
            console.log("match google")
            user = req.user.google
        }else if(req.user.facebook.id!=undefined){
            console.log("match fb")
            user = req.user.facebook
        }else{
            console.log("match local")
            user = req.user.local
        }
        res.render('profile', { title: 'Profile', user});
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // ABOUT ==============================
    app.get('/about', function(req, res) {
        res.render('about',{ title: 'About'});
    });

    // CONTACT ==============================
    app.get('/contact', function(req, res) {
        res.render('contact',{ title: 'Contact'});
    });

    // NEWSFEED ==============================
    app.get('/newsfeed', function(req, res) {
        res.render('newsfeed',{ title: 'News Feed'});
    });

    // NEWPOST ==============================
    app.get('/newpost', isLoggedIn, function(req, res) {
        res.render('newpost',{ title: 'New Post'});
    });
    
    // NEW RECIPE ==============================
    app.get('/newRecipe', function(req, res) {
        res.render('processnewpost',{ title: 'New recipe'});
    });

    // NEW IDEa ==============================
    app.get('/newChronicle', function(req, res) {
        var reqs = [{'type':'text','text':'Type'},
                    {'type':'text','text':'Location'},
                    {'type':'text','text':'Privacy'},
                    {'type':'text','text':'Title'},
                    {'type':'date','text':'Date'},
                    {'type':'text','text':'Description'}];
        var extras = [{'type':'text','text':'Theme'},
                      {'type':'text','text':'Text'}];
        var name = 'Chronicle';
        res.render('processnewpost',{ title: 'Chronicle',name,reqs,extras});
    });

    // EDITPROFILE ==============================
    app.get('/editprofile',isLoggedIn, function(req, res) {
        if(req.user.google.id!=undefined){
            console.log("match google")
            user = req.user.google
        }else if(req.user.facebook.id!=undefined){
            console.log("match fb")
            user = req.user.facebook
        }else{
            console.log("match local")
            user = req.user.local
        }
        res.render('editprofile',{ title: 'Edit Profile', user});
    });

    app.post('/editprofile',isLoggedIn , function(req, res, next) {
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
                    console.log("entrei google")
                    user.google.name       = userData.name
                    user.google.email      = user.google.email
                    user.google.age        = userData.age
                    user.google.gender     = userData.gender
                    user.google.address    = userData.address
                    user.google.profession = userData.profession
                    user.google.cnumber    = userData.cnumber
                }else if(user.facebook.id!=undefined){
                    console.log("entrei facebook")
                    user.facebook.name       = userData.name
                    user.facebook.email      = user.facebook.email
                    user.facebook.age        = userData.age
                    user.facebook.gender     = userData.gender
                    user.facebook.address    = userData.address
                    user.facebook.profession = userData.profession
                    user.facebook.cnumber    = userData.cnumber
                }else{
                    console.log("entrei local")
                    user.local.name       = userData.name
                    user.local.gender     = userData.gender
                    user.local.address    = userData.address
                    user.local.profession = userData.profession
                    user.local.cnumber    = userData.cnumber
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
            var err = new Error('Name and passwords are mandatory.');
            err.status = 400;
            return next(err);
        }
    });

      //add post
      app.post('/processnewpost', isLoggedIn, function(req, res, next) {
          if (req.body.Type) {
            var nova = new Post({
                ident: req.user.id,
                location: req.body.Location,
                privacy: req.body.Privacy,
                title: req.body.Title,
                date: req.body.Date,
                description: req.body.Description,
                type: req.body.Type,
                notes: []
            })

            nova.save((err)=>{
                if(!err){
                    console.log('add post')
                    return res.redirect('/newsfeed');
                }else
                    next(err);
            });
          } else {
            var err = new Error('Name and passwords are mandatory.');
            err.status = 400;
            return next(err);
          }
      });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login', { message: req.flash('loginMessage')});
        });

        // show the locallogin form
        app.get('/locallogin', function(req, res) {
            res.render('locallogin', { message: req.flash('loginMessage')});
        });

        // process the locallogin form
        app.post('/locallogin', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/error', // redirect back to the login page if there is an error
            failureFlash : true // allow flash messages
        }));

        // REGISTER =================================
        // show the register form
        app.get('/register', function(req, res) {
            res.render('register', { title: 'Sign Up', message: req.flash('registerMessage')});
        });

        // process the signup form
        app.post('/register', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/error', // redirect back to the register page if there is an error
            failureFlash : true // allow flash messages
        }));

        // REGISTER ==============================
        app.get('/register', function(req, res) {
            res.render('register',{ title: 'Local Sign Up'});
        });

        // process the signup form
        app.post('/register', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/error', // redirect back to the register page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile', 'email'] }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
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