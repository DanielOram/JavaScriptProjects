var app = require('express')();
var http = require('http').Server(app);

//add static route in server that fetches files from ./node_modules/bootstrap/dist/
var express = require("express");
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
	//res.send('<h1>My first message with socket.io!</h1>');
});

http.listen(3000, function(){
	console.log('listening on *3000');
});