var express = require('express');
var app = express.createServer();
var socket = require('socket.io');


app.configure(function(){
  app.use(express.static(__dirname + '/'));
});
var server = app.listen(8080);
var io = socket.listen(server);

var sockets =  [];

io.sockets.on('connection', function (socket) {
	console.log("connnect");
	socket.on('disconnect', function (socket) {
		console.log("disconnect");
	});
	socket.emit("pong",{txt:"Connected to server"});
	socket.on('ping', function (data) {
		console.log(data.txt);
		socket.emit("pong",{txt:"Pong (from server)"});
	});
    sockets.push(socket);
    socket.on('m', function(data) {
	    sockets.forEach(function (socket) {
	        //socket.emit('relayX', {msg:'MouseX: ' + data.x});
	        //socket.emit('relayY', {msg:'MouseY: ' + data.y});
	       	socket.emit('relayX', {msg:data.x});
	        socket.emit('relayY', {msg:data.y});
	    });
	});
});

