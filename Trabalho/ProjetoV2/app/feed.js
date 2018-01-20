var Post                = require('../app/models/posts');

var express             = require('express');
var router              = express.Router();

// NEWSFEED ==============================
router.get('/', function(req, res) {
    var filter = 'all'
    var posts
    console.log("Antes do find.");
    Post.find().lean().exec(function(err, doc) {
        if (!err) {
            posts = doc
            console.log(posts)
        } else {
            console.log("err2")
            /*var err = new Error('There are no posts.');
            err.status = 400;
            next(err);*/
        }
        res.render('newsfeed', {
            title: 'News Feed',
            posts,
            filter
        });
    });
});

router.get('/:filter', function(req, res, next) {
    var filter = req.params.filter
    console.log(filter)
    var posts
    console.log("Antes do find.");
    Post.find({type: filter}).lean().exec(function(err, doc) {
        if (!err && doc.length!=0) {
            posts = doc
            console.log(doc)
            res.render('newsfeed', {
                title: 'News Feed',
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

module.exports = router;