var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('Students.db');

db.serialize(function() {
	db.run("CREATE TABLE students (id INTEGER, firstName TEXT, lastName TEXT)");
	
	var stmt = db.prepare("INSERT INTO students VALUES (?,?,?)");
	
	stmt.run(1,"sally", "asdf");
	stmt.run(2,"silas", "deane");
	stmt.run(0,"eric is a", "dork");
	
	stmt.finalize();

});

db.close();