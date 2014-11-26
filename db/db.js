var fs = require("fs");
var file = "./db/2015.db";
var exists = fs.existsSync(file);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);
    
db.serialize(function() {
        if(!exists){
                 console.log("Creating DB file");
            db.run("CREATE TABLE students (id INTEGER, firstName TEXT, lastName TEXT, grade INTEGER, team TEXT)");
            
                 var stmt = db.prepare("INSERT INTO students VALUES (?,?,?,?,?)");
                 
                 stmt.run(1,"student", "one",7,"team");
                 stmt.run(2,"student", "two",7,"team");
                 stmt.run(3,"student", "three",7,"team");
                 
                 
                 stmt.finalize();
            db.run("CREATE TABLE active (id INTEGER, firstName TEXT, lastName TEXT, grade INTEGER, team TEXT, computer INTEGER, timeIn TEXT)");
            db.run("CREATE TABLE log (id INTEGER, firstName TEXT, lastName TEXT, grade INTEGER, team TEXT, computer INTEGER, timeIn TEXT, timeOut TEXT, destination TEXT)");
             } else {
             console.log("DB already exists");
             }
});

db.close();

/*
function importStudents(){
    db.serialize(function() {
        var csv = "./2015_Sign_In.csv";
        var stmt = db.prepare("INSERT INTO students VALUES (?,?,?,?,?)");
        
        stmt.run(1,"student", "one",7,"team");
        stmt.run(2,"student", "two",7,"team");
        stmt.run(3,"student", "three",7,"team");
        
        
        stmt.finalize();
    }
}
/*
function findStudent(sid){
	var stmt = db.prepare('SELECT EXISTS(SELECT id FROM students WHERE id=?)', sid);
	return stmt.run(sid);

}*/

