var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mid = require('../middleware');

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

// GET /register
router.get('/register', mid.loggedOut, function(req, res, next) {
  return res.render('register', { title: 'Sign Up' });
});

// GET /login
router.get('/login', mid.loggedOut, function(req, res, next) {
  return res.render('login', { title: 'Login'});
});

// GET /editprofile
router.get('/editprofile', mid.requiresLogin, function(req, res, next) {
  User.findOne({_id: req.session.userId})
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          return res.render('editprofile', { title: 'Edit your profile', user});
        }
      });
});

// GET /profile
router.get('/profile', mid.requiresLogin, function(req, res, next) {
  User.findOne({_id: req.session.userId})
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          return res.render('profile', { title: 'Profile', user});
        }
      });
});

// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // destroy current session and return to home
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

// POST /login
router.post('/login', function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.findOne({email: req.body.email }, function (error, user){
      if (error || !user ) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        if(req.body.email!=user.email || req.body.password!=user.password){
          var err = new Error('Wrong email or password.');
          err.status = 401;
          return next(err);
        }else{
          req.session.userId = user._id;
          return res.redirect('/profile');
        }
      }
    });
  } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// POST /register
router.post('/register', function(req, res, next) {
  if (req.body.email && req.body.name && req.body.password && req.body.confirmPassword && req.body.age) {
      // confirm that user typed same password twice
      if (req.body.password !== req.body.confirmPassword) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }

      console.log(req.body)

      // create object with form input
      var userData = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        password: req.body.password
      };

      //checks if a user with the same email already exists
      User.count({email: req.body.email }, (error, count) => {
        if (count==0){
          // use schema's `create` method to insert document into Mongo
          User.create(userData, function (error, user) {
            if (error) {
              return next(error);
            } else {
              req.session.userId = user._id;
              return res.redirect('/profile'); //ou redirect newsfeed
            }
          });
        }else{
          var err = new Error('An account with this email already exists.');
          err.status = 400;
          return next(err);
        }
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
})

// POST /register
router.post('/editprofile', function(req, res, next) {
  if (req.body.name && req.body.password && req.body.confirmPassword) {
      // confirm that user typed same password twice
      if (req.body.password !== req.body.confirmPassword) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }
      // create object with form input
      var userData = {
        name: req.body.name,
        password: req.body.password,
        gender: req.body.gender,
        address: req.body.address,
        profession: req.body.profession,
        cnumber: req.body.cnumber
      };

      //finds the current user in order to update
      User.findOne({_id: req.session.userId}, function(err, user){
        user.name = userData.name
        user.password = userData.password
        if(userData.gender != undefined) user.gender = userData.gender
        user.address = userData.address
        user.profession = userData.profession
        user.cnumber = userData.cnumber

        user.save(function(err){
          if(err){
            return next(err);
          }
          else{
            req.session.userId = user._id;
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

module.exports = router;