var express = require('express');
var router = express.Router();
var suggestion = require('../models/suggestions');
var user = require('../models/users');
var enterprise = require('../models/enterprises');
var url = require('url');
var querystring = require('querystring');

/* GET enterprises listing. */
router.get('/list', function(req, res, next) {
  suggestion.getAll(function (err, suggestions) {
    res.status(200).json(suggestions);
  })
});

// Create suggestion
router.post('/add', function(req, res){
  console.log(req.body.email);
  if(req.body.user_email && req.body.enterprise_email && req.body.content && req.body.country && req.body.satisfaction){
    user.findByEmail(req.body.user_email, function(err, result){
      if(result && result.length>0){
        var user_id = result[0].id;
        enterprise.findByEmail(req.body.enterprise_email, function(err, result){
          if(result && result.length>0){
            var enterprise_id = result[0].id;
            var enterprise_name = result[0].name;
            suggestion.create(user_id, enterprise_id, req.body.content, enterprise_name, req.body.country, req.body.satisfaction, function(err, result){
              console.log("Suggestion success added");
              //res.status(200).json({ insertId: result });
              res.status(200).send('SUCCESS');
            });
          }else{
            res.status(404).send("ENTERPRISE_NOT_FOUND");
          }
        });
      }else{
        res.status(404).send("USER_NOT_FOUND");
      }
    });
  }else{
    console.error('Missing data');
    res.status(500).send("ERROR");
  }
});

module.exports = router;
