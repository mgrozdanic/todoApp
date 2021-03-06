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


const add = (user, res) => {
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

const addTodo = (todo, user, res) => {
    if (con.state === 'disconnected') connect();
    var sql = "INSERT INTO todos (text, description, priority, done, user) VALUES ('" + 
    todo.text + "', '" + todo.description + "', '" + todo.priority + "', " + todo.done + ", '" + user + "')";
    
    con.query(sql, function(err, result) {
        if (err) throw err;
        res.send('Token successfully added.');
    })
}

const getTodos = (user, res) => {
    if (con.state === 'disconnected') connect();
    var sql = "SELECT * FROM todos WHERE '" + user + "' = user";
    con.query(sql, function(err, result){
        if (err) throw err;
        res.send(result);
    });
}

const deleteTodo = (user, id, res) => {
    if (con.state === 'disconnected') connect();
    var sql = "DELETE FROM todos WHERE " + id + " = id";
    con.query(sql, function(err, result){
        if (err) throw err;
        res.send('Todo successfully deleted.');
    });
}

const updateTodo = (id, todo, res) => {
    if (con.state === 'disconnected') connect();
    var sql = "UPDATE todos SET text = '" + todo.text + "', description = '" + todo.description + 
    "', priority = '" + todo.priority + "', done = " + todo.done + " WHERE " + id + " = id";
    con.query(sql, function(err, result){
        if (err) throw err;
        res.send('Todo successfully updated.');
    });
}

const checkCredentials = (user, res) => {
    if (con.state === 'disconnected') connect();
    var sql = "SELECT * FROM users WHERE '" + user.username + "' = username AND '" + user.password 
    + "' = password";
    con.query(sql, function(err, result) {
        if (err) throw err;
        if (result.length === 0) {
            res.send("Bad credentials.");
            return;
        }
        if (user.username === result[0].username && user.password === result[0].password) {
            user = {username: result[0].username, password: result[0].password, firstName: result[0].firstName,
            lastName: result[0].lastName, email: result[0].email};

            jwt.sign({user}, 'SUPER_SECRET_KEY', { expiresIn: 3600 },(err, token) => {
                if(err) { console.log(err) }    
                res.send(token);
            });
        }
    })
}

exports.add = add;
exports.checkCredentials = checkCredentials;
exports.addTodo = addTodo;
exports.getTodos = getTodos;
exports.deleteTodo = deleteTodo;
exports.updateTodo = updateTodo;