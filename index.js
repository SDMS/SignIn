var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendfile('./app.html');
});

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('submit', function(socket) {
		console.log('submitted');
		});
});

var server = http.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('App listening at http://%s%s', host, port);
});
