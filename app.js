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
var memberRouter = require('./routes/member');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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

app.use('/', indexRouter);
app.use('/domains', domainRouter);
app.use('/products', productRouter);
app.use('/members', memberRouter);

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//Admin Page Root
app.use('/admin', express.static(path.join(__dirname, '_admin'), {
  index: 'login.html'
}));

// fs.readdirSync(__dirname + '/routes/').forEach(function(fileName) {
//   var routeName = fileName.substr(0, fileName.lastIndexOf('.'));
//   var fileFullPath = __dirname + '/routes/' + fileName;

//   console.log(routeName);

//   if (fs.statSync(fileFullPath).isFile()) {
//     app.use('/' + routeName, require(fileFullPath));
//   }
// });

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
