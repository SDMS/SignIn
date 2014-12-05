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
	
	var file = document.getElementById("csv").value; //get file 
	console.log(file);
	socket.emit('load csv', file);
}

