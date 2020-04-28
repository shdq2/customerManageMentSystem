var mysql = require('mysql');
var config = require('./db_config').local;
var sql = null;
module.exports = function () {
  return {
    init: function () {
      sql = mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database
      });
      return sql;
    },

    test_open: function (con) {
      con.connect(function (err) {
        if (err) {
          console.error('mysql connection error :' + err);
        } else {
          console.info('mysql is connected successfully.');
        }
      })
    },
    get:function(){
      return sql;
    }
  }
};