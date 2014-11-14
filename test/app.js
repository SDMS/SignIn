var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
	res.sendfile('./classmap.html');
});

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('dork', function(socket) {
		console.log('dokrekrdorkdorkd');
	});
});


var server = http.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Example app listening at http://%s%s', host, port);
});
