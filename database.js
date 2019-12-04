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
    var sql2 = "CREATE TABLE todos (id INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(255), " +
    "description VARCHAR(255), priority VARCHAR(255), done BOOLEAN, user VARCHAR(255)" +
    ", INDEX usr_ind (user),FOREIGN KEY (user) REFERENCES users(username) ON DELETE CASCADE)";
    
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
    con.query(sql2, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });