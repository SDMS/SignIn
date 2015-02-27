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
          document.getElementById("destination-accordion").className = "accordion";
          document.getElementById("signout-instructions").className = "accordion active";
          //hide accordion again
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
                    document.getElementById("signout-instructions").className = "accordion";
                    document.getElementById("destination-accordion").className = "accordion active";
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
