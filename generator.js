/*
 * school name
 * classroom name
 * layout option (0 or 1)
 * sign in options? y/n
 * 	name (assignment/teacher/reason)
 * 	check boxes, drop down
 * 	list the options
 * sign out options? y/n
 * 	name (destinations or something else)
 * 	check boxes or drop down
 * 	list the options
 * set amount of seats? y/n
 * 	by rows or cols?
 * 	input names of spots (numbers or text)
 * Each room has a default html file skeleton & a json object
 * there is a generator.js that takes the json object and writes to the html files
 *
*/

var layout_1 = {
	name: 'layout_1',
	css: 'css/layout_1.css',
	js: 'js/layout_1.js',
	signInTabContent: 'Student ID: <input id="sid" type="text" maxlength="8" autofocus /> <div class="button" onclick="signin()">Go</div>',
	signInTabContentChoices: '<div id="signin-instructions" class="accordion active"> Click on a computer to sign in! </div>' +
				 '<div id="signin-options" class="accordion">' +
				 '<div id="choice-container"></div>' + //put choices here. also needs to be implemented in CSS & tested
				 '<div class="button" onclick="chooseComputer(selectedComputer)">Cancel</div><div class="button" onclick="signin()">Go</div>' + //can we dry this up
				 '</div>',
	signOutTabContent: 'Click on your name to sign out. <div class="button" onclick="signin()">Go</div>',
	signOutTabContentChoices: '<div id="signout-instructions" class="accordion active"> Click on your name to sign out! </div>' +
				  '<div id="signout-options" class="accordion">' +
				  '<div id="destination-container"></div> ' + // put choices in here
				  '<div class="button" onclick="chooseComputer(selectedComputer)">Cancel</div><div class="button" onclick="signout()">Go</div>' +
				  '</div>'
}

var testRooms = require('./rooms.js');

//set CSS
//set supplemental js
//tab content of sign in option
//tab content of sign out option
//populate classroom map
