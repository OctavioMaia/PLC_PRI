//setup dependancies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

//setup routes
var routes = require('./routes/index');

//database connection
var mongoose = require('mongoose')
var db = mongoose.connect('mongodb://admin:pri2017@ds133077.mlab.com:33077/pri2017-tp', {useMongoClient: true})
var conn = mongoose.connection;           
mongoose.Promise = global.Promise;

//cant connect to mLab
conn.on('error', console.error.bind(console, 'connection error to mLab'));  
 
conn.once('open', function() {
  console.log("connected to mLab")         

  // use sessions for tracking logins
  app.use(session({
    secret: 'pri2017',
    resave: true,
    saveUninitialized: false,
    mongooseConnection: db
  }));

  // atribute a userID to use in the templates
  app.use(function (req, res, next) {
    res.locals.currentUser = req.session.userId;
    next();
  });

  // parse incoming requests
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  // routes
  app.use('/', routes);

  // catch 404 and forward to error handler
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

  // listen on port 3000
  app.listen(3000, function () {
    console.log('Listening on port 3000');
  });
});