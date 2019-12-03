var mysql = require('mysql');
const jwt = require('jsonwebtoken');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vojkodvojko",
  database: "todoapp"
});

const connect = () => {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
}


module.exports = add = (user, res) => {
  if (con.state === 'disconnected') connect();
  var sql = "INSERT INTO users (firstName, lastName, username, email, password) VALUES " +
  "('" + user.firstName + "', '" + user.lastName + "', '" + user.username + "', '" + user.email + "', '" +
  user.password + "')";
  con.query(sql, function (err, result) {
    if (err) {
        if (err.code === 'ER_DUP_ENTRY'){
            res.send('Username already exists.');
            return;
        } else
            throw err;
    }
    console.log("1 record inserted");
    jwt.sign({user}, 'SUPER_SECRET_KEY', { expiresIn: 3600 },(err, token) => {
        if(err) { console.log(err) }    
        res.send(token);
    });
    //res.send("User successfully added");
  });
}
/*
exports.checkUsername = (username) => {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT * FROM users WHERE username =" + username;
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      });
}*/