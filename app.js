var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
// var users = require('./routes/users');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//sessions
const Session = require('express-session');
const FileStore = require('session-file-store')(Session);


app.use(Session({
  store: new FileStore({
    path: path.join(__dirname, '/tmp'),
    encrypt: true
  }),
  secret: 'Super Secret !',
  resave: true,
  saveUninitialized: true,
  name : 'mysession'
}));

app.use('/', index);


app.use('/admin', function (req, res, next) {
  // console.log(req.session);

  if (req.session.connected){
    return next();
  } else {
    return res.redirect('/');
  }
});
app.use('/admin', admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('./index/error', {connected : req.session.connected});
  // res.render('./index/error', {connected : req.session.connected});
});

module.exports = app;
