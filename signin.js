var socket = io();

var selectedComputer;

	function signin() {
		var sid = document.getElementById('sid');
		socket.emit('sign in', {"id": sid.value});
		console.log('sid submitted: ' + sid.value);
	}