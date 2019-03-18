var createError = require('http-errors');
var express = require('express');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var memberRouter = require('./routes/member');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//API DOC Root
app.use('/docs', express.static(path.join(__dirname, 'docs'), {
  index: 'index.html'
}));

//Admin Page Root
app.use('/admin', express.static(path.join(__dirname, '_admin'), {
  index: 'login.html'
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/member/login', memberRouter);

fs.readdirSync(__dirname + '/routes/').forEach(function(fileName) {
  var routeName = fileName.substr(0, fileName.lastIndexOf('.'));
  var fileFullPath = __dirname + '/routes/' + fileName;

  console.log(routeName);

  if (fs.statSync(fileFullPath).isFile()) {
    app.use('/' + routeName, require(fileFullPath));
  }
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


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
