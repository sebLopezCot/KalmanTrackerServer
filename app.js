var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

var routes = require('./routes');

// Set server port and listener
app.set('port', process.env.PORT || 5000);

server.listen(app.get('port'), '0.0.0.0', function(){
    console.log('Server listening at port %d', app.get('port'));
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// Error handlers ----------------------------------------------------------

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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



// Socket Events ----------------------------------------------------------

io.on('connection', function(socket) {
    socket.broadcast.emit('new connection');
    socket.on('measurement', function(measurement) {
        socket.broadcast.emit('measurement', measurement);
    });
});


module.exports = app;




