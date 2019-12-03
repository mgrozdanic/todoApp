const jwt = require('jsonwebtoken');
const user = require('../model/dummyUser.js');
var express = require('express');
var router = express.Router();
var add = require("../databaseCRUD");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res, next) => {
  const { body } = req;
  const { username } = body;
  const { password } = body;

  add.checkCredentials(req.body, res);
})

router.post('/register', (req, res, next) => {
  console.log(req.body);
  add.add(req.body, res);
  //res.send('User successfully added.');
})

router.post('/addTodo', (req, res, next) => {
  console.log(req.body);
  var decoded;
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split(' ')[1];
    try {
        decoded = jwt.verify(authorization, 'SUPER_SECRET_KEY');
    } catch (e) {
        return res.status(401).send('unauthorized');
    }
    var user = decoded.user.username;
    add.addTodo(req.body, user, res);
  }
})

router.delete('/delete/:id', (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split(' ')[1];
    try {
        decoded = jwt.verify(authorization, 'SUPER_SECRET_KEY');
    } catch (e) {
        return res.status(401).send('unauthorized');
    }
    var user = decoded.user.username;
    add.deleteTodo(user, req.params.id, res);  
  }
})

router.get('/todos', (req, res, next) => {
  var decoded;
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split(' ')[1];
    try {
        decoded = jwt.verify(authorization, 'SUPER_SECRET_KEY');
    } catch (e) {
        return res.status(401).send('unauthorized');
    }
    var user = decoded.user.username;
    add.getTodos(user, res);
  }
})

module.exports = router;
