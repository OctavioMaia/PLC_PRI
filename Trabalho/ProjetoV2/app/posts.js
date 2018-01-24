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
var Appointment         = require('../app/models/appointment');
var Post                = require('../app/models/posts');

var express             = require('express');
var router              = express.Router();

// NEWPOST ==============================
router.get('/newpost', isLoggedIn, function(req, res) {
    res.render('newpost', {
        title: 'New Post'
    });
});

// PHOTO ============================
router.get('/newPhoto', function(req, res) {
    var reqs = [{'type':'text','text':'Type','obligatory':true},
                {'type':'text','text':'Location','obligatory':false},
                {'type':'text','text':'Privacy','obligatory':true},
                {'type':'text','text':'Title','obligatory':true},
                {'type':'date','text':'Date','obligatory':false},
                {'type':'text','text':'Description','obligatory':true}];
    var extras = [{'type':'text','text':'File','obligatory':true},
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
                {'type':'date','text':'Date','obligatory':false},
                {'type':'text','text':'Description','obligatory':true}];
    var extras = [{'type':'text','text':'Sport','obligatory':true},
                  {'type':'text','text':'Duration','obligatory':true},
                  {'type':'text','text':'Participants','obligatory':false},
                  {'type':'text','text':'Results','obligatory':false},];
    var name = 'SportsRegistry';
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
    var name = 'AcademicRegistry';
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
    var extras = [{'type':'text','text':'Files','obligatory':false},
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
                {'type':'date','text':'Date','obligatory':false},
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
                {'type':'date','text':'Date','obligatory':false},
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
                {'type':'date','text':'Date','obligatory':false},
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
    var name = 'AcademicWork';
    res.render('processnewpost',{ title: 'Academic Work',name,reqs,extras});
});

// NEW CHRONICLE ==============================
router.get('/newChronicle', function(req, res) {
    var reqs = [{'type':'text','text':'Type','obligatory':true},
                {'type':'text','text':'Location','obligatory':false},
                {'type':'text','text':'Privacy','obligatory':true},
                {'type':'text','text':'Title','obligatory':true},
                {'type':'date','text':'Date','obligatory':false},
                {'type':'text','text':'Description','obligatory':true}];
    var extras = [{'type':'text','text':'Theme','obligatory':true},
                  {'type':'text','text':'Text','obligatory':true}];
    var name = 'Chronicle';
    res.render('processnewpost',{ title: 'Chronicle',name,reqs,extras});
});

// NEW APPOINTMENT ==============================
router.get('/newAppointment', function(req, res) {
    var reqs = [{'type':'text','text':'Type','obligatory':true},
                {'type':'text','text':'Location','obligatory':false},
                {'type':'text','text':'Privacy','obligatory':true},
                {'type':'text','text':'Title','obligatory':true},
                {'type':'date','text':'Date','obligatory':true},
                {'type':'text','text':'Description','obligatory':true}];
    var extras = [];
    var name = 'Appointment';
    res.render('processnewpost',{ title: 'Appointment',name,reqs,extras});
});

//add post
router.post('/processnewpost', isLoggedIn, function(req, res, next) {
    if (req.body.Type) {
        var post;
        var name;
        console.log("type:" + req.body.Type);
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
            case 'SportsRegistry':
                post = new SportsRegistry();
                break;
            case 'AcademicRegistry':
                post = new AcademicRegistry();
                break;
            case 'Thought':
                post = new Thought();
                break;
            case 'Wedding':
                post = new Wedding();
                break;
            case 'AcademicWork':
                post = new AcademicWork();
                break;
            case 'Event':
                post = new Event();
                break;
            case 'Appointment':
                post = new Appointment();
                break;
        }

        for (var key in req.body) {
            console.log("debug: (" + key + ',' + req.body[key] + ')');
        }

        if (req.user.google.id != undefined)
            name = req.user.google.name;
        else if (req.user.facebook.id != undefined)
            name = req.user.facebook.name;
        else
            name = req.user.local.name;

        //populate the previous var
        if (post != undefined) {
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
            post.people = req.body.People;
            post.sport = req.body.Sport;
            post.duration = req.body.Duration;
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

        Post.collection.insert(post, function(err, docs) {
            if (err) {
                var message = post.type + " has failed to be posted!"
                res.render('error', {
                    'Title': 'Error!',
                    message
                });
            } else {
                var message = post.type + " has been posted with success!"
                var href = '/newsfeed'
                res.render('success', {
                    'Title': 'Success!',
                    message,
                    href
                });
            }
        });
    }else{
        var err = new Error('Unknown type ' + req.body.Type);
        err.status = 404;
        next(err);
    }
});

// User Posts ==============================
router.get('/myposts', isLoggedIn, function(req, res, next) {
    var filter = 'all'
    var posts

    Post.find({ident: req.user.id}).sort({pubdate: 'descending'}).lean().exec(function(err, doc) {
        if (!err && JSON.stringify(doc)!='[]') {
            posts = doc
            res.render('myposts', {
                title: 'My Posts',
                posts,
                filter
            });
        } else {
            var err = new Error('You have no posts.');
            err.status = 400;
            next(err);
        }
    });
});

//myposts
router.get('/myposts/:filter', isLoggedIn,function(req, res, next) {
    var filter = req.params.filter
    var posts
    Post.find({ident: req.user.id,type:filter}).sort({pubdate: 'descending'}).lean().exec(function(err, doc) {
        if (!err && JSON.stringify(doc)!='[]') {
            posts = doc
            res.render('myposts', {
                title: 'My Posts',
                posts,
                filter
            });
        } else {
            var err = new Error('There are no posts in this category.');
            err.status = 400;
            next(err);
        }
    });
});

router.get('/editpost/:id', isLoggedIn, function(req, res, next) {
    Post.findOne({'_id': req.params.id}).lean().exec(function(err, post) {
        if (!err) {
            res.render('editpost', {
                'Title': 'Edit your post',
                post
            });
        } else {
            var err = new Error('Could not find the posts collection, this shouldnt happen.');
            err.status = 404;
            next(err);
        }
    });
});

router.post('/editpost/:id', isLoggedIn, function(req, res, next) {
    //find the original post
    Post.findOne({_id: req.params.id}).lean().exec(function(err, out) {
        if (err) {
            var err = new Error('Could not find the post you wish to edit.');
            err.status = 404;
            next(err);
        } else {
            var post;
            switch (req.body.type) {
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
                case 'SportsRegistry':
                    post = new SportsRegistry();
                    break;
                case 'AcademicRegistry':
                    post = new AcademicRegistry();
                    break;
                case 'Thought':
                    post = new Thought();
                    break;
                case 'Wedding':
                    post = new Wedding();
                    break;
                case 'AcademicWork':
                    post = new AcademicWork();
                    break;
                case 'Event':
                    post = new Event();
                    break;
                case 'Appointment':
                    post = new Appointment();
                    break;
            }    
    
            if (req.user.google.id != undefined)
                name = req.user.google.name;
            else if (req.user.facebook.id != undefined)
                name = req.user.facebook.name;
            else
                name = req.user.local.name;
                
            //populate the previous var
            if (post != undefined) {
                //needed for backup
                post._id = req.params.id
                post.author = name;
                post.ident = req.user.id;
                post.pubdate = out.pubdate;
                
                //new values
                post.location = req.body.location;
                post.privacy = req.body.privacy;
                post.title = req.body.title;
                post.description = req.body.description;
                post.type = req.body.type;
                post.theme = req.body.theme;
                post.text = req.body.text;
                post.date = req.body.date;
                post.ingredients = req.body.ingredients;
                post.instructions = req.body.instructions;
                post.people = req.body.people;
                post.sport = req.body.sport;
                post.duration = req.body.duration;
                post.participants = req.body.participants;
                post.results = req.body.results;
                post.credits = req.body.credits;
                post.file = req.body.file;
                post.files = req.body.files;
                post.guests = req.body.guests;
                post.hosts = req.body.hosts;
                post.eventType = req.body.eventType;
                post.keywords = req.body.keywords;
                post.priority = req.body.priority;
                post.name = req.body.name;
                post.gender = req.body.gender;
                post.parents = req.body.parents;
                post.couple = req.body.couple;
                post.menu = req.body.menu;
                post.course = req.body.course;
                post.professor = req.body.professor;
                post.classification = req.body.classification;
                post.comments = out.comments;
            }

            Post.remove({_id:req.params.id}, function(err) {
                if (!err) {
                    console.log("removed")
                    Post.collection.insert(post, function(err, docs) {
                        if (err) {
                            var message = "Failed to edit " + post.type
                            res.render('error', {
                                'Title': 'Error!',
                                message
                            });
                        } else {
                            var message = post.type + " has been edited with success!"
                            var href = '/posts/myposts'
                            res.render('success', {
                                'Title': 'Success!',
                                message,
                                href
                            });
                        }
                    });
                }else{
                    var err = new Error('Failed to remove the post.');
                    err.status = 404;
                    next(err);
                }
            });
        }
    });
});


router.post('/addcomment/:id', isLoggedIn, function(req, res, next) {
    console.log("entrei addcomment")
    console.log("PARAMS: " + JSON.stringify(req.params))
    console.log("POST_ID: "+ req.params.id)
    
    //find the original post
    Post.findOne({_id: req.params.id}).lean().exec(function(err, out) {
        if (err) {
            var err = new Error('Could not find the post you wish to edit.');
            err.status = 404;
            next(err);
        } else {
            console.log("before:"+out)
            var post;
            switch (out.type) {
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
                case 'SportsRegistry':
                    post = new SportsRegistry();
                    break;
                case 'AcademicRegistry':
                    post = new AcademicRegistry();
                    break;
                case 'Thought':
                    post = new Thought();
                    break;
                case 'Wedding':
                    post = new Wedding();
                    break;
                case 'AcademicWork':
                    post = new AcademicWork();
                    break;
                case 'Event':
                    post = new Event();
                    break;
                case 'Appointment':
                    post = new Appointment();
                    break;
            }    

            if (req.user.google.id != undefined)
                name = req.user.google.name;
            else if (req.user.facebook.id != undefined)
                name = req.user.facebook.name;
            else
                name = req.user.local.name;
    
            //populate the previous var
            if (post != undefined) {
                //needed for backup
                post._id = out._id
                post.author = out.author;
                post.ident = out.ident;
                post.pubdate = out.pubdate;
                
                //new values
                post.location = out.location;
                post.privacy = out.privacy;
                post.title = out.title;
                post.description = out.description;
                post.type = out.type;
                post.theme = out.theme;
                post.text = out.text;
                post.date = out.date;
                post.ingredients = out.ingredients;
                post.instructions = out.instructions;
                post.people = out.people;
                post.sport = out.sport;
                post.duration = out.duration;
                post.participants = out.participants;
                post.results = out.results;
                post.credits = out.credits;
                post.file = out.file;
                post.files = out.files;
                post.guests = out.guests;
                post.hosts = out.hosts;
                post.eventType = out.eventType;
                post.keywords = out.keywords;
                post.priority = out.priority;
                post.name = out.name;
                post.gender = out.gender;
                post.parents = out.parents;
                post.couple = out.couple;
                post.menu = out.menu;
                post.course = out.course;
                post.professor = out.professor;
                post.classification = out.classification;
                post.comments = out.comments.concat(name + ': ' +req.body.comment);
            }

            Post.remove({_id:req.params.id}, function(err) {
                if (!err) {
                    console.log("removed")
                    Post.collection.insert(post, function(err, docs) {
                        if (err) {
                            var message = "Failed to add comment."
                            res.render('error', {
                                'Title': 'Error!',
                                message
                            });
                        } else {
                            res.redirect('/newsfeed')
                        }
                    });
                }else{
                    var err = new Error('Failed to add comment.');
                    err.status = 404;
                    next(err);
                }
            });
        }
    });
});

/*
router.post('/editpost/:id', isLoggedIn, function(req, res, next) {
    console.log("body"+req.body)
    console.log("ID"+req.params.id)

    /*
    Post.find({_id: req.params.id}).remove(function(err, post) {
        if (!err) {
            Post.collection.insert(req.body), function(err2, post2){
                if(!err2){
                    console.log("maybe inseriu");
                }else{
                    console.log("erro2"+err);
                }
            }
        } else {
            console.log("erro"+err);
        }
    });*/

    /*
    Post.findByIdAndUpdate(req.params.id, req.body).exec(function(err, post) {
        if (!err) {
            console.log("found this"+post);
            return res.redirect('/posts/myposts');
        } else {
            console.log("erro2"+err);
        }
    });
    */

    /*
    var newData = req.body
    Post.findOne({_id: req.params.id}).exec(function(err, post) {
        console.log("post:"+post)
        if(!err)
            Post.update(post.toObject(), newData, function(err2, post2) {
                if (!err2) {
                    console.log("new vals"+post2);
                    return res.redirect('/posts/myposts');
                } else {
                    console.log("erro2"+err2);
                }
            });
        else
            console.log("err3:+err")
    });*/

    /*
    var newData = req.body
    Post.findOne({_id: req.params.id}).lean().exec(function(err, post) {
        console.log("antes:"+JSON.stringify(post))
        post=newData
        console.log("depois:"+JSON.stringify(post))
        post.save(function(err) {
            if (err) {
                return next(err);
            } else {
                console.log("new data:" + post)
            }
        });
    });
    */

    /*
    var newData = req.body
    Post.findOne({_id: req.params.id}).lean().exec(function(err, post) {
        if (err) {
            return next(err);
        } else {
            for (var id in post){
                if(req.body[id]!=undefined){
                    var old = id
                    var upd = req.body[id];
                    console.log(old,JSON.stringify(upd))
                    Post.update({_id: req.params.id, old:upd},function(err, post) {
                        if (err) {
                            return next(err);
                        } else {
                            console.log("new data:" + post)
                        }
                    })
                }
            }
        }
    });
    
    /*
    Post.findOne({_id: req.params.id}).lean().exec(function(err, post) {
        if (err) {
            return next(err);
        } else {
            for (var id in post){
                var old
                var upd
                if(req.body[id]!='_id'){
                    if(req.body[id]!=undefined){
                        old = post[id]
                        upd = req.body[id];
                    }else{
                        upd = post[id]
                    }
                    console.log(id + ': ' + upd)
                }
            }
        }
    });

    Post.update({_id: req.params.id, author: 'teste'},function(err, post) {
        if (err) {
            return next(err);
        } else {
            console.log("new data: " + post)
        }
    })
});
*/

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