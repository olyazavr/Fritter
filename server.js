var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var feed = require('./routes/feed');
var newFrit = require('./routes/newFrit');
var editFrit = require('./routes/editFrit');
var deleteFrit = require('./routes/deleteFrit');

var app = express();


// connect to db
connection_string = 'mongodb://';

if (process.env.OPENSHIFT_MONGODB_DB_HOST) {
  connection_string += process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT;
} else {
    connection_string += 'localhost/test';
}

mongoose.connect(connection_string);
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
//   console.log('YAY');
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/feed', feed);
app.use('/newFrit', newFrit);
app.use('/editFrit', editFrit);
app.use('/deleteFrit', deleteFrit);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var port = process.env.OPENSHIFT_NODEJS_PORT;
var ip = process.env.OPENSHIFT_NODEJS_IP;

app.listen(port || 8080, ip);

module.exports = app;