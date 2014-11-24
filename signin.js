var socket = io();

var selectedComputer = -1;
var destination = -1;

function signin() {
	var sid = document.getElementById('sid').value;
	var message = {"id": sid, "computer": selectedComputer};
	if(selectedComputer == -1) {
		alert('Please select a computer');
		return;
	}
	socket.emit('check student', sid); 	// check if student exists, check if student is already signed in
	socket.on('check success', function(){
		socket.emit('sign in', message);
		alert('student id ' + sid + ' at computer ' + selectedComputer);
		// display student's information
		document.getElementById(selectedComputer).className = "computer taken";
		document.getElementById('sid').value = '';// clear text box
		selectedComputer = -1;
	});
	socket.on('check fail', function(message){
		alert('error: ' + message);
		// clear text box
	});
}

function signout(){
    if(selectedComputer == -1 | destination == -1) {
        alert('Please click on your name and select your destination');
        return;
    }
    if(confirm("Are you sure you want to sign out?")){ // then student information.
        var message = {"computer": selectedComputer, "destination": destination};
        socket.emit('sign out', message)
    }
    socket.on('sign out success', function(){
              alert('sign out successful');
              // change computer to empty
              deselectComputer();
              document.getElementById(destination).className = "destination";
              destination = -1;
              });
}


function switchTabStyles(tab){
    document.getElementById("map").className=tab;
    deselectComputer();
    selectedComputer = -1;

    
}

function deselectComputer(){
    if(selectedComputer != -1){
        if(document.getElementById(selectedComputer).className == "computer taken selected"){
            document.getElementById(selectedComputer).className = "computer taken";
        } else {
            document.getElementById(selectedComputer).className = "computer";
        }

    }
}

function chooseComputer(id) {
     deselectComputer();
     if(id == selectedComputer){
          selectedComputer = -1;
          return;
     }
	if(document.getElementById("signin").checked){
        
		// check if new computer is already occupied
		if(document.getElementById(id).className != "computer taken") {
			// select new computer
            selectedComputer = id;
            document.getElementById(id).className = "computer selected";
            
		}
	} else {
        // if computer is occupied
		if(document.getElementById(id).className == "computer taken"){
            selectedComputer = id;
            document.getElementById(id).className = "computer taken selected";
			
		}
	}
}

function chooseDestination(id) {
    if(destination != -1){
        document.getElementById(destination).className = "destination";
    }
    if(destination == id){
        return;
    }
    document.getElementById(id).className = "destination selected";
    destination = id;
}

