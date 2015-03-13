var maclab = {
	school: "Silas Deane Middle School",
	roomName: "Mac Lab",
	layout: 1,
	signInOptions: {
		exists: true,
		type: "dropdown",
		options: [
			"Language Arts",
			"Math",
			"Science",
			"Social Studies",
			"World Language",
			"Unified Arts"
		],
	},
	signOutOptions: {
		exists: true,
		type: "dropdown",
		options: [
			"Cafeteria",
			"Classroom",
			"Media Center",
			"Office/Nurse",
			"Locker",
			"Bathroom",
			"Water"
		]
	},
        bySeat: true,
	byRows: false, //by columns
	classMapData: {
		label: "Computer ",
		seatOrientation: [
			[1,2,3,4,5,6,7,8],
			[9,10,11,12,13,14,15,16],
			[17,18,19,20,21,22,23,24],
			[25,26,27,28,29,30,31]
		]
	}

};
var lmc = {
	school: "Silas Deane Middle School",
	roomName: "Library Media Center",
	layout: 1,
	signInOptions: {
		exists: true,
		type: "dropdown",
		options: [
			"Book Check Out",
			"Typing",
			"Research",
			"Printing"
		],
	},
	signOutOptions: {
		exists: true,
		type: "dropdown",
		options: [
			"Cafeteria",
			"Classroom",
			"Media Center",
			"Office/Nurse",
			"Locker",
			"Bathroom",
			"Water"
		]
	},
        bySeat: false,
	byRows: true
	
};