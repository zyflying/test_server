var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var log4js = require('./src/common/log4js-config');
var testMiddleware = require("./src/common/test-middleware");
var merRouter = require("./src/view/mer-router");

var app = express();

const loggerDefault = log4js.getLogger();
const loggerInfo = log4js.getLogger("info");
const loggerError = log4js.getLogger("error");
global.__logger_default__ = loggerDefault;
global.__logger_info__ = loggerInfo;
global.__logger_error__ = loggerError;
//log4js.useLogger(app,loggerDefault);


//__logger_default__.debug("log111111111");
//__logger_error__.error("log222222222");
//__logger_info__.info("log333333333");
// view engine setup
app.set('views', path.join(__dirname, 'src/view'));
app.set('view engine', 'ejs');

app.use(log4js.useLogger());
//app.use(testMiddleware.showInfo);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.raw());
//app.use(testMiddleware);
app.use(bodyParser.json());
//app.use(testMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
testMiddleware.testConfig("./src/controller");
testMiddleware.use(function(req,res,next){
  __logger_error__.error("TestMiddleware use method22222222222222222");
});


app.use(testMiddleware.showInfo);
app.use(express.static(path.join(__dirname, 'public')));// 所有的请求都会往静态资源路径找下

//app.use(testMiddleware.handleReq());
//app.all("/",testMiddleware.handleReq());
//app.all("/:controller",testMiddleware.handleReq());
//app.all("/:controller/:action",testMiddleware.handleReq());
app.use("/:prefix/:controller/:action",testMiddleware.handleReq());

app.use('/',merRouter);
app.use('/',function(req,res,next){
  __logger_error__.error("12312312312312");
  next();
});
//app.use('/', index);
app.use('/users', users);


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
