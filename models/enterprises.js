var db = require('../db.js');

exports.create = function(name, telephone, email, country, done) {
  var values = [name, telephone, email, 1, new Date().toISOString().slice(0,10), country];

  db.get().query('INSERT INTO enterprise (name, telephone, email, status, datecreation, country, immatriculation) VALUES(?, ?, ?, ?, ?, ?)', values, function(err, result) {
    if (err) return done(err)
    done(null, result.insertId)
  })
}

exports.getAll = function(done) {
  db.get().query('SELECT e.id, e.name, e.email, UPPER(SUBSTR(e.name, 1,2)) AS initial, COUNT(s.id) AS nbreSuggestion, e.country AS country, e.immatriculation AS immatriculation FROM enterprise e LEFT JOIN suggestion s ON e.id = s.enterprise_id GROUP BY (e.id)', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}


exports.findByEmail = function(email, done){
  console.log('SELECT * FROM enterprise WHERE email='+"'"+email+"'");
  db.get().query('SELECT * FROM enterprise WHERE email='+"'"+email+"'", function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.update = function(id, name, telephone, email, done){
  var values = [name, telephone, email, id];
  db.get().query('UPDATE enterprise SET name=?, telephone=?, email=? WHERE id=?', values, function (err, result) {
    if (err) return done(err)
    console.log(result);
    done(null, result.insertId)
  })
}
