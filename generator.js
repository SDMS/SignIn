// simplest classroom
var basic = {
	school: "Silas Deane Middle School",
	roomName: "Media Center",
	bySeat: false,
	signOut: false
};

var classroom = {
	school: "Silas Deane Middle School",
	roomName: "Mac Lab",
	layout: 1,
	bySeat: true,
	byRows: false, //by columns
	classMapData: {
		label: "Computer ",
		seatOrientation: [
			[1,2,3,4,5,6,7,8],
			[9,10,11,12,13,14,15,16],
			[17,18,19,20,21,22,23,24],
			[25,26,27,28,29,30,31]]
	}
	signInOptions: {
		exists: true,
		type: "checkboxes",
		options: [
			"Printing",
			"Typing",
			"Project"
		]
	}
	
};

/*
 * school name
 * classroom name
 * layout option (0 or 1)
 * set amount of seats? y/n
 * 	by rows or cols?
 * 	input names of spots (numbers or text)
 * sign in options? y/n
 * 	name (assignment/teacher/reason)
 * 	check boxes, drop down
 * 	list the options
 * sign out options? y/n
 * 	name (destinations or something else)
 * 	check boxes or drop down
 * 	list the options
 * Each room has a default html file skeleton & a json object
 * there is a generator.js that takes the json object and writes to the html files
 *
*/