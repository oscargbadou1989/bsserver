var mysql = require('mysql'),
  async = require('async')

var PROD_DB = 'c9_heroku_db', DEV_DB = 'bsserver';

exports.MODE_DEV = 'mode_dev'
exports.MODE_PROD = 'mode_prod'

var state = {
  pool: null,
  mode: null,
}

exports.connect = function(mode, done) {
  if(mode === exports.MODE_PROD){
    state.pool = mysql.createPool({
      host: 'localhost',
      user: 'c9_heroku',
      password: 'iSrzJ@eM64',
      database: PROD_DB
    });
  }else{
    state.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'anastasie',
      database: DEV_DB
    });
  }
  state.mode = mode
  done()
}

exports.get = function() {
  return state.pool;
}

exports.fixtures = function(done) {
  var data = {
    tables: {
      user: [
       {id: 1, email: "ogbadou@gmail.com", status: 1, datecreation: "2017-01-01", country: "BJ"},
      ],
      enterprise: [
        {id: 1, immatriculation: "4455", country: "BJ", name: "MobileLab", telephone: "21653245", email: "mobilelab@gmail.com", status: 1, datecreation: "2017-01-01"},
        {id: 2, immatriculation: "4456", country: "BJ", name: "ADAOBI Sarl", telephone: "21653245", email: "adaobi@gmail.com", status: 1, datecreation: "2017-01-01"},
        {id: 3, immatriculation: "4457", country: "BJ", name: "SYNC", telephone: "21653245", email: "sync@gmail.com", status: 1, datecreation: "2017-01-01"},
      ],
      suggestion: [
        {id: 1, country: "BJ", satisfaction: 2, user_id: 1, enterprise_id: 1, content: "Suggestion pour MobileLab", datecreation: "2017-01-01", visibility: 1, enterprise_name: "MobileLab"},
        {id: 2, country: "BJ", satisfaction: 3, user_id: 1, enterprise_id: 2, content: "Suggestion pour ADAOBI Sarl", datecreation: "2017-01-01", visibility: 0, enterprise_name: "ADAOBI Sarl"},
      ],
      publicite: [
        {id: 1, country: "BJ", titre: "Fifa de Ste Luce", img: "https://proxisante.mobilelabbenin.com/uploads/images/pharmacie.png", siteWeb: "https://proxisante.mobilelabbenin.com", datecreation: "2017-01-01", visibility: 1},
        {id: 2, country: "BJ", titre: "Pharmacie Zongo", img: "https://proxisante.mobilelabbenin.com/uploads/images/37.jpeg", siteWeb: "https://proxisante.mobilelabbenin.com", datecreation: "2017-01-01", visibility: 1},
      ],
    },
  }
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  pool.query('SELECT * FROM enterprise', function(err, results){

    if(results && results.length > 0){
      console.log("Data has already loaded ...");
    }else{
      var names = Object.keys(data.tables)
      async.each(names, function(name, cb) {
        async.each(data.tables[name], function(row, cb) {
          var keys = Object.keys(row)
          , values = keys.map(function(key) { return "'" + row[key] + "'" })

          pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
        }, cb)
      }, done)
    }
  })
}

exports.create = function(cb){
  var tables = [
    {
      name: "user",
      columns: [
        {
          name: "id",
          type: "int NOT NULL AUTO_INCREMENT",
          primary: true,
        },
        {
          name: "email",
          type: "varchar(255) UNIQUE",
          primary: false,
        },
        {
          name: "status",
          type: "boolean",
          primary: false,
        },
        {
          name: "datecreation",
          type: "date",
          primary: false,
        },
        {
          name: "country",
          type: "varchar(255)",
          primary: false,
        }
      ]
    },
    {
      name: "enterprise",
      columns: [
        {
          name: "id",
          type: "int NOT NULL AUTO_INCREMENT",
          primary: true,
        },
        {
          name: "name",
          type: "varchar(255)",
          primary: false,
        },
        {
          name: "telephone",
          type: "varchar(255)",
          primary: false,
        },
        {
          name: "email",
          type: "varchar(255) UNIQUE",
          primary: false,
        },
        {
          name: "country",
          type: "varchar(255)",
          primary: false,
        },
        {
          name: "status",
          type: "boolean",
          primary: false,
        },
        {
          name: "datecreation",
          type: "date",
          primary: false,
        },
        {
          name: "immatriculation",
          type: "varchar(255)",
          primary: false,
        }
      ]
    },
    {
      name: "suggestion",
      columns: [
        {
          name: "id",
          type: "int NOT NULL AUTO_INCREMENT",
          primary: true,
        },
        {
          name: "user_id",
          type: "int",
          primary: false,
        },
        {
          name: "enterprise_id",
          type: "int",
          primary: false,
        },
        {
          name: "satisfaction",
          type: "int",
          primary: false,
        },
        {
          name: "content",
          type: "text",
          primary: false,
        },
        {
          name: "datecreation",
          type: "date",
          primary: false,
        },
        {
          name: "visibility",
          type: "boolean",
          primary: false,
        },
        {
          name: "enterprise_name",
          type: "varchar(255)",
          primary: false,
        },
        {
          name: "country",
          type: "varchar(255)",
          primary: false,
        },
      ]
    },
    {
      name: "publicite",
      columns: [
        {
          name: "id",
          type: "int NOT NULL AUTO_INCREMENT",
          primary: true,
        },
        {
          name: "titre",
          type: "varchar(255)",
          primary: false,
        },
        {
          name: "img",
          type: "varchar(255)",
          primary: false,
        },
        {
          name: "siteWeb",
          type: "varchar(255)",
          primary: false,
        },
        {
          name: "datecreation",
          type: "date",
          primary: false,
        },
        {
          name: "visibility",
          type: "boolean",
          primary: false,
        },
        {
          name: "country",
          type: "varchar(255)",
          primary: false,
        },
      ]
    },
  ];
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  async.each(tables, function(table, cb){
    var query = "CREATE TABLE IF NOT EXISTS "+table.name+"(";
    for(var i=0; i<table.columns.length; i++){
      if(table.columns[i].primary){
        if(i==table.columns.length-1){
          query += table.columns[i].name+" "+table.columns[i].type+" primary key";
        }else{
          query += table.columns[i].name+" "+table.columns[i].type+" primary key, ";
        }
      }else{
        if(i==table.columns.length-1){
          query += table.columns[i].name+" "+table.columns[i].type;
        }else{
          query += table.columns[i].name+" "+table.columns[i].type+", ";
        }
      }
    }
    console.log(query+")");
    pool.query(query+")", cb);
  }, cb);
}


exports.drop = function(tables, done) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  async.each(tables, function(name, cb) {
    console.log('DROP TABLE ' + name);
    pool.query('DROP TABLE ' + name, cb);
  }, done)
}
