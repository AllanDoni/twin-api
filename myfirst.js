var mysql = require('mysql');

var con = mysql.createConnection({
  host: "twin-projectone.rf.gd",
  user: "root",
  password: "seemon"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});