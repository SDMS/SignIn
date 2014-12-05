var csv = require('ya-csv');

var loadCsv = function() {
	var reader = csv.createCsvFileReader('db/2015_Sign_In.csv', {
		columnsFromHeader: true,
		'separator': ',',
		'quote': '"',
		'escape': '"',
		'comment': '',
	});
	
	var allEntries = new Array();
	
	//reader.setColumnNames(['id', 'firstName', 'lastName', 'grade', 'team']);
	reader.addListener('data', function(data) {
		if(data.id != '') { 
			allEntries.push(data);
			console.log(data);
		}
	});
	
	reader.addListener('end', function(data) {
		return allEntries;
	});

};

var students = loadCsv();

console.log(students);