var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/index.css', function(req, res) {
	res.sendFile(__dirname + '/index.css');
});
app.get('/signin.js', function(req, res) {
	res.sendFile(__dirname + '/signin.js');
});

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('sign in', function(data) {
		console.log('submitted ' + JSON.stringify(data));
		});
});

var server = http.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('App listening at http://%s%s', host, port);
});
