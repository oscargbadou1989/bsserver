var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Delete tables */
router.get('/droptables', function(req, res, next) {
  db.connect(db.MODE_PROD, function(){
    db.drop(function(err){
      if (err) return console.log(err)
      console.log('Tables has been droped...');
    });
  });
  res.status(200).send("TABLE_DROPED");
});

/* Create tables */
router.get('/createtables', function(req, res, next) {
  db.connect(db.MODE_PROD, function(){
    db.create(function(err){
      if (err) return console.log(err)
      console.log('Tables has been created...');
    });
  });
  res.status(200).send("TABLE_CREATED");
});

module.exports = router;
