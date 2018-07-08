var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var passport = require('passport');
var auth = require('./utils/auth');
var flash = require('connect-flash');


var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

// Conect to DB
let MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION || 'mongodb://root:example1@mongo:27017';
let MONGODB_CONNECTION_OPTION = {
  dbName: 'app',
};

mongoose.connect(MONGODB_CONNECTION_STRING, MONGODB_CONNECTION_OPTION);

var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', function() {
  // we're connected! check migration
  console.log('connection open');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'secret key',
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// passport initialize
app.use(passport.initialize());
app.use(passport.session());
auth.init();


app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
