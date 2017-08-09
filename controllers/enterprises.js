var express = require('express');
var router = express.Router();
var enterprise = require('../models/enterprises');
var url = require('url');
var querystring = require('querystring');

/* GET enterprises listing. */
router.get('/list', function(req, res, next) {
  enterprise.getAll(function (err, enterprises) {
    res.status(200).json(enterprises);
  })
});

// Create enterprise
router.post('/add', function(req, res){
  //if(req.body.email && req.body.name && req.body.telephone && req.body.country){
  if(req.body.enterprise_email && req.body.enterprise_name && req.body.enterprise_tel && req.body.country && req.body.enterprise_immatriculation){
    enterprise.findByEmail(req.body.enterprise_email, function(err, result){
      if(result && result.length>0){
        console.log("Enterprise already exist");
        res.status(200).send('ENTERPRISE_ALREADY_EXIST');
      }else{
        enterprise.create(req.body.enterprise_name, req.body.enterprise_tel, req.body.enterprise_email, req.body.country, req.body.enterprise_immatriculation, function(err, result){
          console.log("Enterprise success added");
          res.status(200).send('SUCCESS');
        });
      }
    });
  }else{
    console.error('Enterprise email missing');
    res.status(500).send("ERROR");
  }
});

// Create enterprise
router.post('/update', function(req, res){
  if(req.body.id && req.body.name && req.body.email && req.body.telephone){
    enterprise.update(req.body.id,req.body.name, req.body.telephone, req.body.email, function(err, result){
      console.log("Enterprise success updated");
      res.status(200).json({ insertId: result });
    });
  }else{
    console.error('Enterprise id missing');
    res.status(500).send("ERROR");
  }
});

module.exports = router;
