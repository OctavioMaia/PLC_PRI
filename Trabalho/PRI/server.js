var express      = require('express');
var app          = express();
var port         = process.env.PORT || 8080;
var mongoose     = require('mongoose');
var passport     = require('passport');
var path         = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB     = require('./config/database.js');

// configuration ===============================================================
var db = mongoose.connect(configDB.url, {useMongoClient: true}); // connect to our database
var conn = mongoose.connection;       
mongoose.Promise = global.Promise

//cant connect to mLab
conn.on('error', console.error.bind(console, 'Cannot connect to mLab'));  
    
//connection successfull
conn.once('open', function() {
    console.log("Connected to mLab")  
    // required for passport
    app.use(session({
        secret: 'pri2017', // session secret
        resave: true,
        saveUninitialized: true
    }));

    // atribute currentuser for login in PUG
    app.use(function (req, res, next) {
        res.locals.currentUser = req.session.passport;
        next();
    });

    // express setup
    app.use(morgan('dev')); // dev logging
    app.use(cookieParser()); // cookies for auth
    app.use(bodyParser.json()); // parsing html forms
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    // routes ======================================================================
    passport    = require('./config/passport')(passport); // pass passport for configuration
    var index   = require('./app/index.js');
    var feed    = require('./app/feed.js');
    var auth    = require('./app/auth.js');
    var posts   = require('./app/posts.js');
    var profile = require('./app/profile.js');
    var admin   = require('./app/admin.js');

    app.use('/',  index);
    app.use('/newsfeed',  feed);
    app.use('/auth',  auth);
    app.use('/posts',  posts);
    app.use('/profile',  profile);
    app.use('/admin',  admin);

    //error handling
    app.use(function(req, res, next) {
        var err = new Error('File Not Found');
        err.status = 404;
        next(err);
    });

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    // launch 
    app.listen(port);
    console.log('Server listening on port ' + port);

    module.exports = app;
});