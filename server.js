var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var db = require('./js/db.js');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/lab_021/index.html');
});
app.get('/admin', function(req, res) {
	res.sendFile(__dirname + '/lab_021/admin.html');
});
app.get('/index.css', function(req, res) {
	res.sendFile(__dirname + '/css/layout_1.css');
});
app.get('/signin.js', function(req, res) {
	res.sendFile(__dirname + '/js/signin.js');
});
app.get('/layout1.js', function(req, res) {
	res.sendFile(__dirname + '/js/layout1.js');
});
app.get('/admin.js', function(req, res) {
	res.sendFile(__dirname + '/js/admin.js');
});

io.on('connection', function(socket) {
	console.log('a user connected' + "\n");
      // update class map based on active user db
      db.getAllActive(function(err, row){
      	for(var i = 0; i < row.length; i++){
      		var student = {action: "sign in", id: row[i].id, computer: row[i].computer, info: row[i].firstName + " " + row[i].lastName + "<br>" + row[i].team + "/" + row[i].grade};
      		socket.emit('update map', student);
      	}
      });

	socket.on('disconnect', function() { console.log('disconnected'); });
	
	socket.on('sign in', function(student){
		console.log("received data:");
		console.log(student);
		db.checkActive(student.id, function(err, row){
			if(err != null){
				console.log(err);
				return;
			}
			if(row != undefined) { // student not in database 
				socket.emit('sign in fail', "You are already signed in.");
				console.log('check fail: Already signed in.' + "\n");
			} 
			else { 
				db.findStudent(student.id, function(err, row){ 
					if(row == undefined) { // student already signed in
						socket.emit('sign in fail', "Student ID not in database.");
						console.log('check fail: Student ID not in database.' + "\n");
					} 
					else {
						db.signInStudent(row, student.computer);
						student.info = row.firstName + " " + row.lastName + "<br>" + row.team + "/" + row.grade;
						socket.emit('sign in success', student);
						student.action = 'sign in';
						socket.broadcast.emit('update map', student);
						console.log('check success');
						console.log('submitted ' + JSON.stringify(student) + "\n");
					}
				});			
			}
		});
	});
	
	socket.on('sign out', function(student){
		// check to make sure student isn't already signed out
		db.checkActiveComputer(student.computer, function(err, row){
			if(row == undefined) { // student not signed in
				console.log(err + " " + row);
				socket.emit('sign out fail', 'student not signed in');
				console.log('sign out fail: student not signed in' + "\n");
			}
			else {
				// copy data from lab table, record time and destination and remove from lab table
				db.signOutStudent(row, student.destination, function(err, row){
					var name = row.firstName + " " + row.lastName;
					console.log('signed out: ' + name + ' at computer #' + student.computer);
    		    	console.log('destination: ' + student.destination + "\n");
					socket.emit('sign out success', name);
					student.action = 'sign out';
					socket.broadcast.emit('update map', student);
				});
			}
		});
	});
	
	socket.on('load csv', function(file){
		console.log("CSV not implemented yet");
	});
	
	socket.on('add new student', function(student){
		db.findStudent(student.id, function(err, row){
			if(row != undefined) {
				console.log("student already exists in database");
			} else {
				db.addStudent(student);
			}
		});
	});

});

var server = http.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('App listening at http://%s%s', host, port);
});
