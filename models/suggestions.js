var db = require('../db.js');

exports.create = function(user_id, enterprise_id, content, enterprise_name, country, satisfaction, done) {
  var values = [user_id, enterprise_id, content, new Date().toISOString().slice(0,10), 1, enterprise_name, country, satisfaction];

  db.get().query('INSERT INTO suggestion (user_id, enterprise_id, content, datecreation, visibility, enterprise_name, country, satisfaction) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', values, function(err, result) {
    if (err) return done(err)
    done(null, result.insertId)
  })
}

exports.getAll = function(done) {
  db.get().query('SELECT id, enterprise_id, enterprise_name, content, DATE_FORMAT(datecreation, "%d %b %Y") AS datecreation, UPPER(SUBSTR(enterprise_name, 1,2)) AS enterprise_initial, country, satisfaction FROM suggestion', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
