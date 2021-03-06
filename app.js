var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var io = require('socket.io');
var routes = require('./routes/liveblogs');
var app = express();
var slurp = require('./slurp/slurp');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Videos Route
app.get( '/',                routes.index);
app.get( '/admin',           routes.admin);
app.get( '/liveblogs',       routes.liveblogs.all);
app.get( '/liveblogs/:id',   routes.liveblogs.one);
app.post('/liveblogs',       routes.liveblogs.create);

app.get( '/post',            routes.post.all);
app.get( '/post/site/:site', routes.post.site);
app.get( '/post/skip/:num',  routes.post.offset);
app.get( '/post/:id',        routes.post.one);

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

module.exports = app;
