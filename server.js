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
      db.getAllActive(function(err, row){
      	console.log(row);
      	console.log(err);
      });
	
	socket.on('sign in', function(message){
		console.log("received data:");
		console.log(message);
		db.checkActive(message.id, function(err, row){
			if(err != null){
				console.log(err);
				return;
			}
			if(row != undefined) { // student not in database 
				socket.emit('sign in fail', "You are already signed in.");
				console.log('check fail: Already signed in.');
			} 
			else { 
				db.findStudent(message.id, function(err, row){ 
					if(row == undefined) { // student already signed in
						socket.emit('sign in fail', "Student ID not in database.");
						console.log('check fail: Student ID not in database.');
					} 
					else {
						db.signInStudent(row, message.computer);
						message.student = row.firstName + " " + row.lastName + "<br>" + row.team + "/" + row.grade;
						socket.emit('sign in success', message);
						console.log('check success');
						console.log('row: ' + JSON.stringify(row));
						console.log('submitted ' + JSON.stringify(message));
					}
				});			
			}
		});
	});
	
	socket.on('sign out', function(message){
		// check to make sure student isn't already signed out
		db.checkActiveComputer(message.computer, function(err, row){
			if(row == undefined) { // student not signed in
				console.log(err + " " + row);
				socket.emit('sign out fail', 'student not signed in');
				console.log('sign out fail: student not signed in');
			}
			else {
				// copy data from lab table, record time and destination and remove from lab table
				db.signOutStudent(row, message.destination, function(err, row){
					var name = row.firstName + " " + row.lastName;
					console.log('signed out: ' + name + ' at computer #' + message.computer);
    		    	console.log('destination: ' + message.destination);
					socket.emit('sign out success', name);
				});
			}
		});
	});
});

var server = http.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('App listening at http://%s%s', host, port);
});
