var User                = require('../app/models/user');
var Post                = require('../app/models/posts');

var express             = require('express');
var fs                  = require('fs');
var passport            = require('passport');
var router              = express.Router();
var concat              = require('concatenate-files');

// ADMIN ==============================
router.get('/',isAdmin, function(req, res) {
    res.render('admin', {
        title: 'Admin panel'
    });
});

// ADMIN ==============================
router.get('/success', isAdmin,function(req, res) {
    res.render('success', {
        title: 'Success!'
    });
});

// ADMIN DISCARD ==============================
router.get('/discard',function(req, res) {
    return res.redirect('/');
});

//admin POST
router.post('/confirm', isAdmin, function(req, res, next) {
    var db = req.body.collection
    var info
    if (db == 'posts') {
        Post.find({}).lean().exec(function(err, doc) {
            if (!err) {
                fs.writeFile('./json/posts.json', JSON.stringify(doc), function(err) {
                    if (err) {
                        return console.log(err);
                    } else {
                        var message = "Posts have been exported with success!"
                        var href = '/admin'
                        res.render('success', {
                            'Title': 'Success!',
                            message,
                            href
                        });
                    }
                });
            } else {
                var err = new Error('Could not find the posts collection, this shouldnt happen.');
                err.status = 404;
                return next(err);
            }
        });
    } if (db == 'users') {
        User.find({}).lean().exec(function(err, doc) {
            if (!err) {
                fs.writeFile('./json/users.json', JSON.stringify(doc), function(err) {
                    if (err) {
                        return console.log(err);
                    } else {
                        var message = "Users have been exported with success!"
                        var href = '/admin'
                        res.render('success', {
                            'Title': 'Success!',
                            message,
                            href
                        });
                    }
                });
            } else {
                var err = new Error('Could not find the users collection, this shouldnt happen.');
                err.status = 404;
                return next(err);
            }
        });
    } else  {
        Post.find({}).lean().exec(function(err, doc) {
            if (!err) {
                fs.writeFile('./json/posts.json', "\"Post\":"+JSON.stringify(doc)+"}")
                User.find({}).lean().exec(function(err, users) {
                    if (!err) {
                        fs.writeFile('./json/users.json', "{\"Users\":"+JSON.stringify(users), function(err) {
                            if (err) {
                                return console.log(err);
                            }
                            else{
                                concat(['./json/users.json', './json/posts.json'], './json/database.json', { separator: ',' }, function(err, result) {
                                    if (err) {
                                        return console.log(err);
                                    } else {
                                        var message = "Database exported with success!"
                                        var href = '/admin'
                                        res.render('success', {
                                            'Title': 'Success!',
                                            message,
                                            href
                                        });
                                    }
                                  });
                            }
                        })
                    }
                })
            }
});
    }
});

function isAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        var user
        if (req.user.google.id != undefined) 
            user = req.user.google;
        else if (req.user.facebook.id != undefined) 
            user = req.user.facebook;
        else 
            user = req.user.local;
        
        if (user.type == 'admin') 
            return next();
        else {
            var message = "You must be an admin to access this function!"
            res.render('error', {
                'Title': 'Error',
                message
            });
        }
    } else {
        var message = "You must be logged in to access this function!"
        res.render('error', {
            'Title': 'Error',
            message
        });
    }
}

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