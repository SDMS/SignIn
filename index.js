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
	
	socket.on('check student', function(message){
		if(false) { // student not in database 
			socket.emit('check fail', "Student ID not in database.");
			console.log('check fail: 1');
		} else if(false){ // student already signed in
			socket.emit('check fail', "You are already signed in.");
			console.log('check fail: 2');
		} else {
			socket.emit('check success');
			console.log('check success');
		}
	});
});

var server = http.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('App listening at http://%s%s', host, port);
});
