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

module.exports = router;
