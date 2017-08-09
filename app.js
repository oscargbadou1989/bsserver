var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./db');

var index = require('./controllers/index');
var users = require('./controllers/users');
var enterprises = require('./controllers/enterprises');
var suggestions = require('./controllers/suggestions');
var pubs = require('./controllers/publicite');

var app = express();

// Create tables if not exists
db.connect(db.MODE_PROD, function(){
  db.create(function(err){
    if (err) return console.log(err)
    console.log('Tables has been created...');
  });
});

// Load fixtures
db.connect(db.MODE_PROD, function() {
  db.fixtures(function(err) {
    if (err) return console.log(err)
    console.log('Data has been loaded...')
  })
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/enterprises', enterprises);
app.use('/suggestions', suggestions);
app.use('/pubs', pubs);

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
  res.render('error');
});

module.exports = app;
