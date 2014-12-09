var socket = io();

var selectedComputer = -1;
var destination = -1;

socket.on('update map', function(student){
	if(student.action == "sign in") {
		document.getElementById(student.computer).innerHTML = student.info;
		document.getElementById(student.computer).className = "computer taken";
	} else {
		document.getElementById(student.computer).innerHTML = student.computer;
		document.getElementById(student.computer).className = "computer"; 
	}
		
});

function signin() {
	if(selectedComputer == -1) {
		alert('Please select a computer');
		return;
	}
	var sid = document.getElementById('sid').value;
	if(sid.charAt(0) == 'P') sid = sid.substring(1);

	var student = {"id": sid, "computer": selectedComputer};
	console.log(JSON.stringify(student));
	
	socket.emit('sign in', student); 	// check if student exists, check if student is already signed in
}

function signout(){
    if(selectedComputer == -1 | destination == -1) {
        alert('Please click on your name and select your destination');
        return;
    }
    var student = {"computer": selectedComputer, "destination": destination};
    socket.emit('sign out', student);
}

socket.on('sign in success', function(student){
	console.log('signing in.... ' + JSON.stringify(student));

//	alert(student.info + ' at computer ' + selectedComputer);
	// display student's information
	document.getElementById(selectedComputer).innerHTML = student.info;
	document.getElementById(selectedComputer).className = "computer taken";
	
	document.getElementById('sid').value = '';
	selectedComputer = -1;
});

socket.on('sign in fail', function(err){
	alert('error: ' + err);
	document.getElementById('sid').value = '';
	deselectComputer();
	selectedComputer = -1;
});

socket.on('sign out success', function(name){
	// change computer to empty
	document.getElementById(selectedComputer).innerHTML = selectedComputer;
    deselectComputer(); // this doesn't do what i think it should do
    document.getElementById(destination).className = "destination";
    destination = -1;
    });
    
socket.on('sign out fail', function(err){
	alert('error: ' + err);
	deselectComputer(); // this doesn't do what i think it should do
	destination = -1;
});


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

