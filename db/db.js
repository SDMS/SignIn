var fs = require("fs");
var file = "2015.db";
var exists = fs.existsSync(file);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
             if(!exists){
                db.run("CREATE TABLE students (id INTEGER, firstName TEXT, lastName TEXT, grade INTEGER, team TEXT)");
                importStudents();
                db.run("CREATE TABLE active (firstName TEXT, lastName TEXT, computer INTEGER, timeIn TEXT");
                db.run("CREATE TABLE log (firstName TEXT, lastName TEXT, computer INTEGER, timeIn TEXT, timeOut TEXT, destination TEXT");
             }
             
             
             
             
             });

db.close();

function importStudents(){
    var csv = "./2015_Sign_In.csv";
    var stmt = db.prepare("INSERT INTO students VALUES (?,?,?,?,?)");
    
    stmt.run(1,"student", "one",7,"team");
    stmt.run(2,"student", "two",7,"team");
    stmt.run(3,"student", "three",7,"team");
    
    
    stmt.finalize();
}