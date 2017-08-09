var express = require('express');
var router = express.Router();
var publicite = require('../models/publicite');
var url = require('url');
var querystring = require('querystring');

/* GET enterprises listing. */
router.get('/list', function(req, res, next) {
  publicite.getAll(function (err, pubs) {
    res.status(200).json(pubs);
  })
});

// Create pub
router.post('/add', function(req, res){
  console.log(req.body.email);
  if(req.body.titre && req.body.img && req.body.siteWeb && req.body.country){
    publicite.create(req.body.titre, req.body.img, req.body.siteWeb, req.body.country, function(err, result){
      console.log("Pub success added");
      res.status(200).json({ insertId: result });
    });
  }else{
    console.error('Missing data');
    res.status(500).send("ERROR");
  }
});

module.exports = router;
