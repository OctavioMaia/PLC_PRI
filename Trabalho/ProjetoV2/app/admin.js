var User                = require('../app/models/user');
var Post                = require('../app/models/posts');

var express             = require('express');
var fileUpload          = require('express-fileupload');
var fs                  = require('fs');
var passport            = require('passport');
var concat              = require('concatenate-files');
var router              = express.Router();

//for file handling
router.use(fileUpload());

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

//admin POST EXPORT
router.post('/export', isAdmin, function(req, res, next) {
    var db = req.body.collection
    var info
    console.log("COLLECTION: ")
    if (db == 'posts') {
        Post.find({}).select('-_id').lean().exec(function(err, doc) {
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
    } else if (db == 'users') {
        User.find({}).select('-_id').lean().exec(function(err, doc) {
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
    } else if (db == 'both'){
        Post.find({}).lean().exec(function(err, doc) {
            if (!err) {
                fs.writeFile('./json/posts_aux.json', "\"Post\":"+JSON.stringify(doc)+"}")
                User.find({}).lean().exec(function(err, users) {
                    if (!err) {
                        fs.writeFile('./json/users_aux.json', "{\"Users\":"+JSON.stringify(users), function(err) {
                            if (err) {
                                return console.log(err);
                            }
                            else{
                                concat(['./json/users_aux.json', './json/posts_aux.json'], './json/database.json', { separator: ',' }, function(err, result) {
                                    if (err) {
                                        return console.log(err);
                                    } else {
                                        fs.unlinkSync('./json/users_aux.json');
                                        fs.unlinkSync('./json/posts_aux.json');
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


//admin POST IMPORT USERS
router.post('/importUsers', isAdmin, function(req, res, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    
    let json = JSON.parse(req.files.users.data);
    User.collection.insert(json, function(err,result) {
        if (err) {
            console.log("duplicate entry: " + json)
        }
        var message = "Users have been imported with success!"
        var href = '/admin'
        res.render('success', {
            'Title': 'Success!',
            message,
            href
        });
     });
});

//admin POST IMPORT POSTS
router.post('/importPosts', isAdmin, function(req, res, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    
    let json = JSON.parse(req.files.posts.data);
    Post.collection.insert(json, function(err,result) {
        if (err) {
            console.log("duplicate entry: " + json)
        }
        var message = "Posts have been imported with success!"
        var href = '/admin'
        res.render('success', {
            'Title': 'Success!',
            message,
            href
        });
    });
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