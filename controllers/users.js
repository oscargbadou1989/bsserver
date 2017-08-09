var express = require('express');
var router = express.Router();
var user = require('../models/users');
var url = require('url');
var querystring = require('querystring');

/* GET users listing. */
router.get('/list', function(req, res, next) {
  user.getAll(function (err, users) {
   //res.render('users/list', {users: users})
   res.status(200).json(users);
 })
});

// Create user
router.post('/add', function(req, res){
  console.log(req.body.email);
  if(req.body.email){
    user.findByEmail(req.body.email, function(err, result){
      if(result && result.length>0){
        console.log("User already exist");
        res.status(200).send('USER_ALREADY_EXIST');
      }else{
        user.create(req.body.email, req.body.country, function(err, result){
          console.log("User success added");
          //res.status(200).json({ insertId: result });
          res.status(200).send('SUCCESS');
        });
      }
    });
  }else{
    console.error('User email missing');
    res.status(500).send("ERROR");
  }
});

router.get('/add', function(req, res){
  var params = querystring.parse(url.parse(req.url).query);
  if('email' in params){
    user.findByEmail(params['email'], function(err, result){
      if(result && result.length>0){
        console.log("User already exist");
        res.status(200).send('USER_ALREADY_EXIST');
      }else{
        user.create(params['email'], function(err, result){
          console.log("User success added");
          res.status(200).json({ insertId: result });
        });
      }
    });
  }else{
    new Error('User email missing');
  }

});

module.exports = router;
