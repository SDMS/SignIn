var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var db = require('./db/db.js');


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
      // update class map based on active user db
	
	socket.on('sign in', function(message){
		console.log("received data:");
		console.log(message);
		db.findStudent(message.id, function(err, row){
			if(err != null){
				console.log(err);
				return;
			}
			if(row == undefined) { // student not in database 
				socket.emit('sign in fail', "Student ID not in database.");
				console.log('check fail: Student ID not in database.');
			} else if(false){ // student already signed in
				socket.emit('sign in fail', "You are already signed in.");
				console.log('check fail: Already signed in.');
			} else {
				socket.emit('sign in success', message);
				console.log('emitting check success');
				console.log('submitted ' + JSON.stringify(message));
			}
		});
	});
	
	socket.on('sign out', function(data){
		// check to make sure student isn't already signed out
		// copy data from lab table, record time and destination
		// remove from lab table
		// set signed in to false
		var name = ""; // actually get name lol
		console.log('signed out: ' + name + 'at computer #' + data.computer);
        console.log('destination: ' + data.destination);
		socket.emit('sign out success');
	});
});

var server = http.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('App listening at http://%s%s', host, port);
});
