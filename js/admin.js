var socket = io();

var active = -1;

function toggleAccordion(id){
	if(active == id) {
		document.getElementById(id).className = "accordion";
		active = -1;
	} else {
		if(active != -1){
			document.getElementById(active).className = "accordion";
		}
		document.getElementById(id).className = "accordion active";
		active = id;
	}	
}

function loadCsv(){
	// if no file uploaded
	// please upload your csv
	
	var file; //change this lol
	socket.emit('load csv', file);
}

function addNewStudent(){
	// check if fields are empty
	var student = {id: document.getElementById("addnew-sid").value, firstName: document.getElementById("addnew-first").value, lastName: document.getElementById("addnew-last").value, team: document.getElementById("addnew-team").value, grade: document.getElementById("addnew-grade").value };
	socket.emit('add new student', student);
	console.log(student);
}
