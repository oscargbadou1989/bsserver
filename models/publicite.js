var db = require('../db.js');

exports.create = function(titre, img, siteWeb, country, done) {
  var values = [titre, img, siteWeb, new Date().toISOString().slice(0,10), 1, country];

  db.get().query('INSERT INTO suggestion (titre, img, siteWeb, datecreation, visibility, country) VALUES(?, ?, ?, ?, ?, ?)', values, function(err, result) {
    if (err) return done(err)
    done(null, result.insertId)
  })
}

exports.getAll = function(done) {
  db.get().query('SELECT id, titre, img, siteWeb, datecreation, country FROM publicite WHERE visibility=1', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
