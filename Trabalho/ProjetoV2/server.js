var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path     = require('path');
var passport     = require('passport');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url, {useMongoClient: true}); // connect to our database
mongoose.Promise = global.Promise

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// required for passport
app.use(session({
    secret: 'pri2017', // session secret
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

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

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// launch ======================================================================
app.listen(port);
console.log('Server listening on port ' + port);

module.exports = app;