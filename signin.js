var socket = io();

var selectedComputer = -1;
var destination = -1;

socket.on('update map', function(student){
	//if sign in
		document.getElementById(student.id).innerHTML = "Computer " + student.computer + "<br>" + student.info;
		document.getElementById(student.id).className = "computer taken";
	//if sign out
});

function signin() {
	if(selectedComputer == -1) {
		alert('Please select a computer');
		return;
	}
	var student = {"id": document.getElementById('sid').value, "computer": selectedComputer};
	console.log(JSON.stringify(student));
	
	socket.emit('sign in', student); 	// check if student exists, check if student is already signed in
}

function signout(){
    if(selectedComputer == -1 | destination == -1) {
        alert('Please click on your name and select your destination');
        return;
    }
    if(confirm("Are you sure you want to sign out?")){ // then student information.
        var student = {"computer": selectedComputer, "destination": destination};
        socket.emit('sign out', student);
    }

}

socket.on('sign in success', function(student){
	console.log('signing in.... ' + JSON.stringify(student));

	alert(student.info + ' at computer ' + selectedComputer);
	// display student's information
	document.getElementById(selectedComputer).innerHTML = "Computer " + selectedComputer + "<br>" + student.info;
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
	alert('sign out successful: ' + name);
	// change computer to empty
	document.getElementById(selectedComputer).innerHTML = "Computer " + selectedComputer + "<br>";
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

