var db = require('../db.js');

exports.create = function(email, country, done) {
  console.log(email);
  var values = [email, 1, new Date().toISOString().slice(0,10), country];
  console.log(values);
  db.get().query('INSERT INTO user (email, status, datecreation, country) VALUES(?, ?, ?, ?)', values, function(err, result) {
    if (err) return done(err)
    done(null, result.insertId)
  })
}

exports.getAll = function(done) {
  db.get().query('SELECT * FROM user', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.findByEmail = function(email, done){
  console.log('SELECT * FROM user WHERE email='+"'"+email+"'");
  db.get().query('SELECT * FROM user WHERE email='+"'"+email+"'", function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
