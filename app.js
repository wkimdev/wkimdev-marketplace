process.env.NODE_ENV = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'production' : 'development';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var logger = require('morgan');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


var indexRouter = require('./routes/index');
var domainRouter = require('./routes/domains');
var productRouter = require('./routes/products');
var marketRouter = require('./routes/markets');

var app = express();

// view engine setup
// ejs view => views, vue.js build => dist
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'dist')]);


app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// router history mode
// app.use(require('connect-history-api-fallback')())

// file download
app.use('/downloadFile', express.static('tmp'));

// default options
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// file save static path 
app.use('/tmp', express.static(path.join(__dirname, 'tmp')));

app.use('/', indexRouter);
app.use('/domains', domainRouter);
app.use('/products', productRouter);
app.use('/markets', marketRouter);

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

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
