const jwt = require('jsonwebtoken');
const user = require('../model/dummyUser.js');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res, next) => {
  const { body } = req;
  const { username } = body;
  const { password } = body;

  //checking to make sure the user entered the correct username/password combo
  if(username === user.username && password === user.password) { 
      //if user log in success, generate a JWT token for the user with a secret key
      jwt.sign({user}, 'SUPER_SECRET_KEY', { expiresIn: 3600 },(err, token) => {
          if(err) { console.log(err) }    
          res.send(token);
      });
  } else {
      console.log('ERROR: Could not log in');
  }
})

router.post('/register', (req, res, next) => {
  res.send('User successfully added.');
})

module.exports = router;
