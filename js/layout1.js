function switchTabStyles(tab){
    document.getElementById("map").className=tab;
    deselectComputer();
    selectedComputer = -1;

}

function switchAccordion(id){
    document.getElementsByClassName('accordion active').item(0).className = "accordion";
    document.getElementById(id).className = "accordion active";
}
socket.on('sign out success', function(name){
    switchAccordion("signout-instructions");
});

function deselectComputer(){
    if(selectedComputer != -1){
	var computer = document.getElementById(selectedComputer);
        if(computer.className == "computer taken selected"){
            computer.className = "computer taken";
	    switchAccordion("signout-instructions");
        } else {
           computer.className = "computer";
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
		if(document.getElementById(id).className != "computer taken") {
		 // select new computer
                    selectedComputer = id;
                    document.getElementById(id).className = "computer selected";
		}
	} else {
		if(document.getElementById(id).className == "computer taken"){
                    selectedComputer = id;
                    document.getElementById(id).className = "computer taken selected";
                    //show accordion
		    switchAccordion("signout-options");
		}
	}
}

function chooseDestination(id) {
    if(destination != -1){
        document.getElementById(destination).className = "destination";
    }
    if(destination == id){
    	destination = -1;
        return;
    }
    document.getElementById(id).className = "destination selected";
    destination = id;
}
