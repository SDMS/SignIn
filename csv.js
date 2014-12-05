var csv = require('ya-csv');

// test
var db = require('./db/db.js');
var f = 'db/2015_Sign_In.csv';

var loadCsv = function(file, callback) {
	var reader = csv.createCsvFileReader(file, {
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
		callback(allEntries);
	});

};

// test
loadCsv(f, db.importStudents);
