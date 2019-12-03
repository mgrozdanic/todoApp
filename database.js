var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vojkodvojko",
  database: "todoapp"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, firstName VARCHAR(255), " +
    "lastName VARCHAR(255), username VARCHAR(255) UNIQUE, email VARCHAR(255), password VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });