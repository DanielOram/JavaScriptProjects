var app = require('express')();
var http = require('http').Server(app);
//initialises a new instance of socket.io by passing the http object
var io = require('socket.io')(http);

//add static route in server that fetches files from ./node_modules/bootstrap/dist/
var express = require("express");
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
	//res.send('<h1>My first message with socket.io!</h1>');
});

//listen on the connection event for incoming sockets, and log to console
io.on('connection', function(socket){
	
	/*
	console.log('a user connected');
	//disconnect event
	socket.on('disconnect', function(){
	    console.log('user disconnected');
	  });
	*/
	//display chat message on console
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
});

http.listen(3000, function(){
	console.log('listening on *3000');
});