/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);


//my code
var dir_path = require('path');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);


//serve files in static folder
app.use(express.static(path.join(__dirname, 'public')));

//send get request to server at given uri
app.get('/hello', function(req,res) {
  //res.send('Hello World!');
  res.sendFile(dir_path.join(__dirname + '/public/views/index.html'));
});

app.get('/memory-card-app', function (req, res) {
  res.send('memory-card-app');
});

// set static directories
//app.use(express.static(path.join(__dirname, 'public')));


// viewed at http://localhost:8080 -> this should route the index.html page to the root url
app.get('/', function(req, res) {
  res.sendFile(dir_path.join(__dirname + '/index.html'));
});

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Working');
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
